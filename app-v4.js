// ============================================================
// PCDEAL - APP-V4.JS
// VERSION 7
// ============================================================
//
// Requires:
// platform.js
// cpu-data.js
// gpu-data.js
// parts.js
//
// Handles:
// - Listing parser
// - Deal analyzer
// - RAM compatibility
// - Automatic RAM generation
// - Better price detection
// - Motherboard/chipset detection
// - PSU/storage/cooler detection
//
// ============================================================


// ============================================================
// PAGE STARTUP
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cpuInput = document.getElementById("cpu");
  const motherboardInput = document.getElementById("motherboard");

  if (cpuInput) {
    cpuInput.addEventListener("change", updateMemoryCompatibility);
    cpuInput.addEventListener("blur", updateMemoryCompatibility);
  }

  if (motherboardInput) {
    motherboardInput.addEventListener("change", updateMemoryCompatibility);
    motherboardInput.addEventListener("blur", updateMemoryCompatibility);
  }

  updateMemoryCompatibility();

});


// ============================================================
// NORMALIZATION
// ============================================================

function normalizeDetectionText(text) {

  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .replace(/®|™/g, "")
    .replace(/[-_/(),.:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}


// ============================================================
// MONEY FORMAT
// ============================================================

function formatMoney(amount, currency = "CAD") {

  const number = Number(amount) || 0;

  return new Intl.NumberFormat(
    "en-CA",
    {
      style: "currency",
      currency: currency || "CAD",
      maximumFractionDigits: 0
    }
  ).format(number);

}


// ============================================================
// RESTORE RAM TYPE DROPDOWN
// ============================================================

function restoreRamTypeDropdown() {

  const select = document.getElementById("ramType");

  if (!select) {
    return;
  }

  const previousValue = select.value;

  select.innerHTML = `
    <option value="">Unknown / Not listed</option>
    <option value="DDR2">DDR2</option>
    <option value="DDR3">DDR3</option>
    <option value="DDR4">DDR4</option>
    <option value="DDR5">DDR5</option>
  `;

  select.disabled = false;

  if (
    ["DDR2", "DDR3", "DDR4", "DDR5"]
      .includes(previousValue)
  ) {
    select.value = previousValue;
  }

}


// ============================================================
// SET RAM OPTIONS
// ============================================================

function setRamOptions(
  memoryTypes,
  automatic = false,
  selectedMemory = null
) {

  const select = document.getElementById("ramType");

  if (!select) {
    return;
  }

  const types = Array.isArray(memoryTypes)
    ? memoryTypes
    : [];

  if (types.length === 0) {
    restoreRamTypeDropdown();
    return;
  }

  select.innerHTML = "";

  if (
    automatic &&
    selectedMemory
  ) {

    const option = document.createElement("option");

    option.value = selectedMemory;
    option.textContent = `${selectedMemory} — required`;

    select.appendChild(option);

    select.value = selectedMemory;
    select.disabled = true;

    return;
  }

  select.disabled = false;

  const unknown = document.createElement("option");

  unknown.value = "";
  unknown.textContent = "Select RAM type";

  select.appendChild(unknown);

  for (const memoryType of types) {

    const option = document.createElement("option");

    option.value = memoryType;
    option.textContent = memoryType;

    select.appendChild(option);
  }

  if (
    selectedMemory &&
    types.includes(selectedMemory)
  ) {
    select.value = selectedMemory;
  }

}


// ============================================================
// UPDATE RAM COMPATIBILITY
// ============================================================

function updateMemoryCompatibility() {

  const cpuInput = document.getElementById("cpu");
  const motherboardInput = document.getElementById("motherboard");

  if (!cpuInput) {
    return;
  }

  const cpuText = cpuInput.value.trim();

  if (!cpuText) {
    restoreRamTypeDropdown();
    return;
  }

  const cpu =
    typeof findCPU === "function"
      ? findCPU(cpuText)
      : null;

  if (!cpu) {
    restoreRamTypeDropdown();
    return;
  }

  const motherboard =
    motherboardInput
      ? motherboardInput.value.trim()
      : "";

  if (
    typeof getBestMemorySelection === "function"
  ) {

    const selection =
      getBestMemorySelection(
        cpu,
        motherboard
      );

    if (selection) {

      setRamOptions(
        selection.options || [],
        selection.automatic || false,
        selection.selected || null
      );

      return;
    }
  }

  if (
    typeof getCPUMemoryTypes === "function"
  ) {

    const memory =
      getCPUMemoryTypes(cpu);

    if (memory.length === 1) {

      setRamOptions(
        memory,
        true,
        memory[0]
      );

    } else {

      setRamOptions(
        memory,
        false,
        null
      );
    }
  }

}


// ============================================================
// STORAGE VALUE
// ============================================================

function getStorageValue(storage) {

  const values = {
    "256GB SSD": 15,
    "500GB SSD": 25,
    "1TB SSD": 50,
    "2TB SSD": 90,
    "HDD Only": 10
  };

  return values[storage] || 0;

}


// ============================================================
// RAM VALUE
// ============================================================

function getRamValue(capacity, type) {

  const capacityValues = {
    "8GB": 20,
    "16GB": 40,
    "32GB": 70,
    "64GB+": 120
  };

  let value =
    capacityValues[capacity] || 0;

  if (type === "DDR5") {
    value += 25;
  }

  if (type === "DDR3") {
    value -= 5;
  }

  if (type === "DDR2") {
    value -= 10;
  }

  return Math.max(0, value);

}


// ============================================================
// MOTHERBOARD VALUE
// ============================================================

function getMotherboardValue(
  motherboard,
  cpu
) {

  const text =
    normalizeDetectionText(
      motherboard
    );

  if (text) {

    if (
      /\b(x870e|x870|x670e|x670|z890|z790|z690|x570|x470|x370|x299|x99|x79|x58)\b/i
        .test(text)
    ) {
      return 170;
    }

    if (
      /\b(b850|b840|b650e|b650|b760|b660|b560|b550|b450|h770|h670|h570|z590|z490|z390|z370)\b/i
        .test(text)
    ) {
      return 110;
    }

    if (
      /\b(z270|z170|z97|z87|z77|z75|z68|p67|990fx|990x|970)\b/i
        .test(text)
    ) {
      return 80;
    }

    if (
      /\b(a620|a520|a320|h610|h510|h410|h310|h110|h81|h61)\b/i
        .test(text)
    ) {
      return 55;
    }

    return 75;
  }

  if (
    cpu &&
    cpu.socket
  ) {

    if (
      cpu.socket === "AM5" ||
      cpu.socket === "LGA1851"
    ) {
      return 100;
    }

    if (
      cpu.socket === "AM4" ||
      cpu.socket === "LGA1700"
    ) {
      return 85;
    }

    if (
      cpu.socket === "LGA1200" ||
      cpu.socket === "LGA1151-300"
    ) {
      return 65;
    }

    if (
      cpu.socket === "LGA1150" ||
      cpu.socket === "LGA1155"
    ) {
      return 45;
    }
  }

  return 50;

}


// ============================================================
// PSU VALUE
// ============================================================

function getPSUValue(psu) {

  if (!psu) {
    return 50;
  }

  const text = psu.toLowerCase();

  let value = 50;

  if (
    /corsair|seasonic|super flower|be quiet|evga|fsp|toughpower|msi mpg|asus rog|cooler master|nzxt/i
      .test(text)
  ) {
    value = 100;
  }

  if (
    /1000\s*w|1200\s*w|1300\s*w/i
      .test(text)
  ) {
    value += 30;
  }

  else if (
    /850\s*w/i.test(text)
  ) {
    value += 20;
  }

  else if (
    /750\s*w/i.test(text)
  ) {
    value += 10;
  }

  return value;

}


// ============================================================
// COOLER VALUE
// ============================================================

function getCoolerValue(cooler) {

  const values = {
    "stock": 10,
    "air": 40,
    "aio240": 60,
    "aio280": 75,
    "aio360": 90
  };

  return values[cooler] || 20;

}


// ============================================================
// CASE VALUE
// ============================================================

function getCaseValue(caseQuality) {

  const values = {
    "basic": 35,
    "mid": 70,
    "premium": 120
  };

  return values[caseQuality] || 50;

}


// ============================================================
// CONDITION MULTIPLIER
// ============================================================

function getConditionMultiplier(condition) {

  const values = {
    "excellent": 1.05,
    "good": 1,
    "fair": 0.90,
    "poor": 0.75
  };

  return values[condition] || 1;

}


// ============================================================
// GAMING DESCRIPTION
// ============================================================

function getGamingDescription(gpu) {

  if (!gpu) {
    return "Gaming performance unknown";
  }

  const score =
    gpu.performance || 0;

  if (score >= 85) {
    return "Excellent high-end 4K gaming";
  }

  if (score >= 65) {
    return "Excellent 1440p / strong 4K gaming";
  }

  if (score >= 45) {
    return "Strong 1440p gaming";
  }

  if (score >= 30) {
    return "Excellent 1080p / capable 1440p gaming";
  }

  if (score >= 18) {
    return "Good 1080p gaming";
  }

  if (score >= 10) {
    return "Entry-level 1080p gaming";
  }

  return "Very light / older gaming";

}


// ============================================================
// CPU/GPU BALANCE
// ============================================================

function getBalanceDescription(cpu, gpu) {

  if (
    !cpu ||
    !gpu
  ) {
    return "Unknown";
  }

  const cpuScore =
    cpu.performance || 0;

  const gpuScore =
    gpu.performance || 0;

  const difference =
    cpuScore - gpuScore;

  if (
    Math.abs(difference) <= 15
  ) {
    return "CPU and GPU are reasonably balanced";
  }

  if (
    difference > 30
  ) {
    return "GPU is likely the main gaming bottleneck";
  }

  if (
    difference > 15
  ) {
    return "System is somewhat GPU-limited";
  }

  if (
    difference < -30
  ) {
    return "CPU may significantly limit the GPU in some games";
  }

  return "System may be somewhat CPU-limited";

}


// ============================================================
// DEAL VERDICT
// ============================================================

function getDealVerdict(score) {

  if (score >= 90) {
    return "Excellent deal";
  }

  if (score >= 80) {
    return "Good deal";
  }

  if (score >= 70) {
    return "Fair price";
  }

  if (score >= 55) {
    return "A little expensive";
  }

  if (score >= 40) {
    return "Overpriced";
  }

  return "Very overpriced";

}


// ============================================================
// ANALYZE DEAL
// ============================================================

function analyzeDeal() {

  const cpuText =
    document.getElementById("cpu")?.value.trim() || "";

  const gpuText =
    document.getElementById("gpu")?.value.trim() || "";

  const ram =
    document.getElementById("ram")?.value || "";

  const ramType =
    document.getElementById("ramType")?.value || "";

  const storage =
    document.getElementById("storage")?.value || "";

  const price =
    Number(
      document.getElementById("price")?.value || 0
    );

  const currency =
    document.getElementById("currency")?.value || "CAD";

  const motherboard =
    document.getElementById("motherboard")?.value.trim() || "";

  const psu =
    document.getElementById("psu")?.value.trim() || "";

  const cooler =
    document.getElementById("cooler")?.value || "";

  const caseQuality =
    document.getElementById("caseQuality")?.value || "";

  const condition =
    document.getElementById("condition")?.value || "good";


  if (
    !cpuText ||
    !gpuText ||
    !price
  ) {

    alert(
      "Please enter at least the CPU, GPU, and asking price."
    );

    return;
  }


  const cpu =
    typeof findCPU === "function"
      ? findCPU(cpuText)
      : null;


  const gpu =
    typeof findGPU === "function"
      ? findGPU(gpuText)
      : null;


  if (!cpu) {

    alert(
      "CPU not recognized yet."
    );

    return;
  }


  if (!gpu) {

    alert(
      "GPU not recognized yet."
    );

    return;
  }


  const cpuValue =
    Number(cpu.value) || 0;

  const gpuValue =
    Number(gpu.value) || 0;

  const ramValue =
    getRamValue(
      ram,
      ramType
    );

  const storageValue =
    getStorageValue(storage);

  const motherboardValue =
    getMotherboardValue(
      motherboard,
      cpu
    );

  const psuValue =
    getPSUValue(psu);

  const coolerValue =
    getCoolerValue(cooler);

  const caseValue =
    getCaseValue(caseQuality);


  const subtotal =
    cpuValue +
    gpuValue +
    ramValue +
    storageValue +
    motherboardValue +
    psuValue +
    coolerValue +
    caseValue;


  const estimatedValue =
    Math.round(
      subtotal *
      getConditionMultiplier(condition)
    );


  const lowValue =
    Math.round(
      estimatedValue * 0.90
    );


  const highValue =
    Math.round(
      estimatedValue * 1.10
    );


  const ratio =
    estimatedValue > 0
      ? price / estimatedValue
      : 999;


  let score = 35;


  if (ratio <= 0.70) {
    score = 95;
  }

  else if (ratio <= 0.80) {
    score = 90;
  }

  else if (ratio <= 0.90) {
    score = 85;
  }

  else if (ratio <= 1.00) {
    score = 78;
  }

  else if (ratio <= 1.10) {
    score = 68;
  }

  else if (ratio <= 1.20) {
    score = 55;
  }


  let compatibility = {
    compatible: true,
    issues: [],
    warnings: [],
    passed: []
  };


  if (
    typeof checkFullPlatformCompatibility === "function"
  ) {

    compatibility =
      checkFullPlatformCompatibility(
        cpu,
        motherboard,
        ramType
      ) || compatibility;
  }


  if (
    compatibility.issues &&
    compatibility.issues.length > 0
  ) {

    score =
      Math.min(
        score,
        25
      );
  }


  let filledFields = 0;


  const confidenceFields = [
    cpuText,
    gpuText,
    ram,
    ramType,
    storage,
    motherboard,
    psu,
    cooler,
    caseQuality
  ];


  for (const field of confidenceFields) {

    if (field) {
      filledFields++;
    }
  }


  const confidence =
    Math.round(
      filledFields /
      confidenceFields.length *
      100
    );


  let confidenceLabel = "Low";


  if (confidence >= 80) {
    confidenceLabel = "High";
  }

  else if (confidence >= 55) {
    confidenceLabel = "Medium";
  }


  let suggestedOffer =
    Math.round(
      estimatedValue *
      0.85 /
      10
    ) * 10;


  suggestedOffer =
    Math.min(
      suggestedOffer,
      price
    );


  const compatibilityInfo =
    typeof getCPUCompatibility === "function"
      ? getCPUCompatibility(cpu)
      : null;


  const socket =
    cpu.socket || "Unknown";


  const supportedMemory =
    compatibilityInfo &&
    compatibilityInfo.memory
      ? compatibilityInfo.memory.join(", ")
      : "Unknown";


  const detectedChipset =
    typeof findChipsetInText === "function" &&
    motherboard
      ? findChipsetInText(motherboard) || "Not detected"
      : "Not detected";


  const fallbackWarnings = [];


  if (
    cpu.fallback ||
    cpu.exactMarketValue === false
  ) {

    fallbackWarnings.push(
      "CPU detected, but exact market value is unavailable."
    );
  }


  if (
    gpu.fallback ||
    gpu.exactMarketValue === false
  ) {

    fallbackWarnings.push(
      "GPU detected, but exact market value is unavailable."
    );
  }


  let compatibilityHTML = "";


  if (
    compatibility.issues &&
    compatibility.issues.length
  ) {

    compatibilityHTML += `
      <div style="margin-top:14px;">
        <strong>❌ Compatibility issues</strong>
        <ul>
          ${compatibility.issues
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }


  if (
    compatibility.warnings &&
    compatibility.warnings.length
  ) {

    compatibilityHTML += `
      <div style="margin-top:14px;">
        <strong>⚠️ Compatibility warnings</strong>
        <ul>
          ${compatibility.warnings
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }


  if (
    compatibility.passed &&
    compatibility.passed.length
  ) {

    compatibilityHTML += `
      <div style="margin-top:14px;">
        <strong>✅ Compatibility checks</strong>
        <ul>
          ${compatibility.passed
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }


  if (fallbackWarnings.length) {

    compatibilityHTML += `
      <div style="margin-top:14px;">
        <strong>⚠️ Value accuracy</strong>
        <ul>
          ${fallbackWarnings
            .map(item => `<li>${item}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  }


  const result =
    document.getElementById("result");

  const scoreElement =
    document.getElementById("score");

  const verdictElement =
    document.getElementById("verdict");

  const resultText =
    document.getElementById("resultText");


  if (
    !result ||
    !scoreElement ||
    !verdictElement ||
    !resultText
  ) {

    console.error(
      "Result elements missing from index.html."
    );

    return;
  }


  scoreElement.textContent =
    `${score}/100`;


  verdictElement.textContent =
    getDealVerdict(score);


  resultText.innerHTML = `

    <p>
      <strong>CPU:</strong>
      ${cpu.name}
    </p>

    <p>
      <strong>GPU:</strong>
      ${gpu.name}
    </p>

    <p>
      <strong>Asking price:</strong>
      ${formatMoney(price, currency)}
    </p>

    <p>
      <strong>Estimated system value:</strong>
      ${formatMoney(lowValue, currency)}
      –
      ${formatMoney(highValue, currency)}
    </p>

    <p>
      <strong>Confidence:</strong>
      ${confidenceLabel}
      (${confidence}%)
    </p>

    <p>
      <strong>Gaming:</strong>
      ${getGamingDescription(gpu)}
    </p>

    <hr>

    <p>
      <strong>CPU socket:</strong>
      ${socket}
    </p>

    <p>
      <strong>Compatible RAM:</strong>
      ${supportedMemory}
    </p>

    <p>
      <strong>Detected chipset:</strong>
      ${detectedChipset}
    </p>

    <hr>

    <p>
      <strong>CPU value:</strong>
      ${
        cpuValue > 0
          ? formatMoney(cpuValue, currency)
          : "Exact value unavailable"
      }
    </p>

    <p>
      <strong>GPU value:</strong>
      ${
        gpuValue > 0
          ? formatMoney(gpuValue, currency)
          : "Exact value unavailable"
      }
    </p>

    <p>
      <strong>Motherboard estimate:</strong>
      ${formatMoney(
        motherboardValue,
        currency
      )}
    </p>

    <p>
      <strong>PSU estimate:</strong>
      ${formatMoney(
        psuValue,
        currency
      )}
    </p>

    <p>
      <strong>System balance:</strong>
      ${getBalanceDescription(
        cpu,
        gpu
      )}
    </p>

    <p>
      <strong>Suggested offer:</strong>
      ${formatMoney(
        suggestedOffer,
        currency
      )}
    </p>

    ${compatibilityHTML}
  `;


  result.style.display = "block";


  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


// ============================================================
// DETECT RAM CAPACITY
// ============================================================

function detectRamCapacity(text) {

  const normalized =
    normalizeDetectionText(text);


  if (
    /\b(64|96|128)\s*(gb|gigs?|gigabytes?)\b/i
      .test(normalized)
  ) {
    return "64GB+";
  }


  if (
    /\b32\s*(gb|gigs?|gigabytes?)\b/i
      .test(normalized)
  ) {
    return "32GB";
  }


  if (
    /\b16\s*(gb|gigs?|gigabytes?)\b/i
      .test(normalized)
  ) {
    return "16GB";
  }


  if (
    /\b8\s*(gb|gigs?|gigabytes?)\b/i
      .test(normalized)
  ) {
    return "8GB";
  }


  return "";

}


// ============================================================
// DETECT RAM TYPE
// ============================================================

function detectRamType(text) {

  const normalized =
    text
      .toLowerCase()
      .replace(/[-_/(),.:]/g, " ")
      .replace(/\s+/g, " ");


  if (
    /\bddr\s*5\b/i.test(normalized)
  ) {
    return "DDR5";
  }


  if (
    /\bddr\s*4\b/i.test(normalized)
  ) {
    return "DDR4";
  }


  if (
    /\bddr\s*3\b/i.test(normalized)
  ) {
    return "DDR3";
  }


  if (
    /\bddr\s*2\b/i.test(normalized)
  ) {
    return "DDR2";
  }


  if (
    /\bd5\b/i.test(normalized)
  ) {
    return "DDR5";
  }


  if (
    /\bd4\b/i.test(normalized)
  ) {
    return "DDR4";
  }


  if (
    /\bd3\b/i.test(normalized)
  ) {
    return "DDR3";
  }


  return "";

}


// ============================================================
// DETECT STORAGE
// ============================================================

function detectStorage(text) {

  const normalized =
    text.toLowerCase();


  if (
    /\b2\s*tb\b/i.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/i.test(normalized)
  ) {
    return "2TB SSD";
  }


  if (
    /\b1\s*tb\b/i.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/i.test(normalized)
  ) {
    return "1TB SSD";
  }


  if (
    /\b(480|500|512)\s*gb\b/i.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/i.test(normalized)
  ) {
    return "500GB SSD";
  }


  if (
    /\b(240|250|256)\s*gb\b/i.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/i.test(normalized)
  ) {
    return "256GB SSD";
  }


  if (
    /\bhdd\b|hard drive/i.test(normalized) &&
    !/\bssd\b|\bnvme\b|\bm\.?2\b/i.test(normalized)
  ) {
    return "HDD Only";
  }


  return "";

}


// ============================================================
// DETECT PSU
// ============================================================

function detectPSU(text) {

  const lines =
    text.split(/\r?\n/);


  for (const line of lines) {

    if (
      /\b([4-9][0-9]{2}|1[0-5][0-9]{2})\s*(w|watt|watts)\b/i
        .test(line) ||
      /\bpsu\b|power supply/i
        .test(line)
    ) {

      return line.trim();
    }
  }


  return "";

}


// ============================================================
// DETECT COOLER
// ============================================================

function detectCooler(text) {

  const normalized =
    text.toLowerCase();


  if (
    /360\s*mm|360mm/i.test(normalized)
  ) {
    return "aio360";
  }


  if (
    /280\s*mm|280mm/i.test(normalized)
  ) {
    return "aio280";
  }


  if (
    /240\s*mm|240mm/i.test(normalized)
  ) {
    return "aio240";
  }


  if (
    /\baio\b|liquid cooler|water cooler/i
      .test(normalized)
  ) {
    return "aio240";
  }


  if (
    /air cooler|tower cooler|hyper 212|peerless assassin|nh d15|dark rock/i
      .test(normalized)
  ) {
    return "air";
  }


  if (
    /stock cooler|wraith stealth|wraith spire/i
      .test(normalized)
  ) {
    return "stock";
  }


  return "";

}


// ============================================================
// DETECT CONDITION
// ============================================================

function detectCondition(text) {

  const normalized =
    text.toLowerCase();


  if (
    /brand new|like new|mint|excellent condition/i
      .test(normalized)
  ) {
    return "excellent";
  }


  if (
    /poor condition|damaged|broken|needs repair|for parts/i
      .test(normalized)
  ) {
    return "poor";
  }


  if (
    /fair condition|wear and tear|scratches|cosmetic wear/i
      .test(normalized)
  ) {
    return "fair";
  }


  return "good";

}


// ============================================================
// DETECT PRICE
// ============================================================
//
// Priority:
//
// 1. Lines saying asking / price / firm / OBO / selling for
// 2. Currency-labelled price
// 3. Dollar-sign prices
// 4. Final standalone number line
//
// This helps avoid using:
//
// "Paid $1800 originally"
//
// instead of:
//
// "Asking $950"
//
// ============================================================

function detectPrice(text) {

  const lines =
    text.split(/\r?\n/);


  // ----------------------------------------------------------
  // PRIORITY 1: ASKING PRICE LINES
  // ----------------------------------------------------------

  const askingWords =
    /\b(asking|asking price|price|priced at|selling for|sell for|firm|obo|or best offer|want|take)\b/i;


  for (const line of lines) {

    if (!askingWords.test(line)) {
      continue;
    }


    let match =
      line.match(
        /\$\s*([0-9]{2,5})(?:\.[0-9]{1,2})?/i
      );


    if (!match) {

      match =
        line.match(
          /\b([0-9]{2,5})(?:\.[0-9]{1,2})?\s*(cad|cdn|usd)\b/i
        );
    }


    if (!match) {

      match =
        line.match(
          /\b(?:asking|price|firm|obo|selling for|sell for|take)\D{0,15}([0-9]{2,5})\b/i
        );
    }


    if (match) {

      const value =
        Number(match[1]);


      if (
        value >= 20 &&
        value <= 20000
      ) {
        return value;
      }
    }
  }


  // ----------------------------------------------------------
  // PRIORITY 2: CAD / CDN / USD
  // ----------------------------------------------------------

  const currencyMatches =
    [
      ...text.matchAll(
        /\$?\s*([0-9]{2,5})(?:\.[0-9]{1,2})?\s*(cad|cdn|usd)\b/gi
      )
    ];


  if (currencyMatches.length) {

    const values =
      currencyMatches
        .map(match => Number(match[1]))
        .filter(
          value =>
            value >= 20 &&
            value <= 20000
        );


    if (values.length) {

      return values[
        values.length - 1
      ];
    }
  }


  // ----------------------------------------------------------
  // PRIORITY 3: DOLLAR SIGN
  // ----------------------------------------------------------

  const dollarMatches =
    [
      ...text.matchAll(
        /\$\s*([0-9]{2,5})(?:\.[0-9]{1,2})?/g
      )
    ];


  if (dollarMatches.length) {

    const values =
      dollarMatches
        .map(match => Number(match[1]))
        .filter(
          value =>
            value >= 20 &&
            value <= 20000
        );


    if (values.length) {

      return values[
        values.length - 1
      ];
    }
  }


  // ----------------------------------------------------------
  // PRIORITY 4: LAST STANDALONE NUMBER LINE
  // ----------------------------------------------------------

  for (
    let i = lines.length - 1;
    i >= 0;
    i--
  ) {

    const line =
      lines[i].trim();


    const match =
      line.match(
        /^\$?\s*([0-9]{2,5})\s*(?:cad|cdn|usd|obo|firm)?$/i
      );


    if (match) {

      const value =
        Number(match[1]);


      if (
        value >= 20 &&
        value <= 20000
      ) {

        return value;
      }
    }
  }


  return null;

}


// ============================================================
// DETECT CURRENCY
// ============================================================

function detectCurrency(text) {

  if (
    /\busd\b|us dollars?/i.test(text)
  ) {
    return "USD";
  }


  if (
    /\bcad\b|\bcdn\b|canadian dollars?/i.test(text)
  ) {
    return "CAD";
  }


  return "CAD";

}


// ============================================================
// SET SELECT VALUE
// ============================================================

function setSelectValue(id, value) {

  if (!value) {
    return;
  }

  const select =
    document.getElementById(id);

  if (!select) {
    return;
  }

  const exists =
    Array.from(
      select.options
    ).some(
      option =>
        option.value === value
    );

  if (exists) {
    select.value = value;
  }

}


// ============================================================
// DETECT MOTHERBOARD LINE
// ============================================================

function detectMotherboardLine(
  listing,
  chipset
) {

  const lines =
    listing.split(/\r?\n/);


  if (chipset) {

    const chipsetLine =
      lines.find(
        line =>
          line
            .toUpperCase()
            .includes(
              chipset.toUpperCase()
            )
      );


    if (chipsetLine) {
      return chipsetLine.trim();
    }
  }


  const motherboardLine =
    lines.find(
      line =>
        /\b(motherboard|mobo|mainboard|board)\b/i
          .test(line)
    );


  if (motherboardLine) {
    return motherboardLine.trim();
  }


  return chipset || "";

}


// ============================================================
// LISTING PARSER
// ============================================================

function parseListing() {

  const listingBox =
    document.getElementById(
      "listingText"
    );


  const message =
    document.getElementById(
      "parseMessage"
    );


  if (!listingBox) {
    return;
  }


  const listing =
    listingBox.value.trim();


  if (!listing) {

    if (message) {

      message.textContent =
        "Paste a listing first.";
    }

    return;
  }


  const detected = [];
  const warnings = [];


  // ==========================================================
  // CPU
  // ==========================================================

  const cpu =
    typeof detectCPUFromText === "function"
      ? detectCPUFromText(listing)
      : null;


  if (cpu) {

    const cpuInput =
      document.getElementById("cpu");


    if (cpuInput) {
      cpuInput.value = cpu.name;
    }


    detected.push(
      `CPU: ${cpu.name}`
    );


    if (
      cpu.fallback ||
      cpu.exactMarketValue === false
    ) {

      warnings.push(
        `${cpu.name} was detected but does not have an exact market value yet.`
      );
    }

  } else {

    warnings.push(
      "CPU could not be detected."
    );
  }


  // ==========================================================
  // GPU
  // ==========================================================

  const gpu =
    typeof detectGPUFromText === "function"
      ? detectGPUFromText(listing)
      : null;


  if (gpu) {

    const gpuInput =
      document.getElementById("gpu");


    if (gpuInput) {
      gpuInput.value = gpu.name;
    }


    detected.push(
      `GPU: ${gpu.name}`
    );


    if (
      gpu.fallback ||
      gpu.exactMarketValue === false
    ) {

      warnings.push(
        `${gpu.name} was detected but does not have an exact market value yet.`
      );
    }

  } else {

    warnings.push(
      "GPU could not be detected."
    );
  }


  // ==========================================================
  // MOTHERBOARD
  // ==========================================================

  let motherboardText = "";


  if (
    typeof findChipsetInText === "function"
  ) {

    const chipset =
      findChipsetInText(listing);


    motherboardText =
      detectMotherboardLine(
        listing,
        chipset
      );


    if (motherboardText) {

      const motherboardInput =
        document.getElementById(
          "motherboard"
        );


      if (motherboardInput) {

        motherboardInput.value =
          motherboardText;
      }


      detected.push(
        `Motherboard: ${motherboardText}`
      );
    }
  }


  // ==========================================================
  // RAM CAPACITY
  // ==========================================================

  const ramCapacity =
    detectRamCapacity(listing);


  if (ramCapacity) {

    setSelectValue(
      "ram",
      ramCapacity
    );


    detected.push(
      `RAM: ${ramCapacity}`
    );
  }


  // ==========================================================
  // RAM TYPE
  // ==========================================================

  const listedRamType =
    detectRamType(listing);


  // First configure possible RAM types based on CPU + board.

  updateMemoryCompatibility();


  const ramTypeSelect =
    document.getElementById(
      "ramType"
    );


  if (
    cpu &&
    typeof getBestMemorySelection === "function"
  ) {

    const selection =
      getBestMemorySelection(
        cpu,
        motherboardText
      );


    if (
      selection &&
      selection.automatic &&
      selection.selected
    ) {

      setRamOptions(
        selection.options || [],
        true,
        selection.selected
      );


      detected.push(
        `RAM type: ${selection.selected}`
      );


      if (
        listedRamType &&
        listedRamType !==
          selection.selected
      ) {

        warnings.push(
          `Listing says ${listedRamType}, but this platform requires ${selection.selected}.`
        );
      }

    }

    else if (
      selection &&
      Array.isArray(selection.options)
    ) {

      setRamOptions(
        selection.options,
        false,
        null
      );


      if (
        listedRamType &&
        selection.options.includes(
          listedRamType
        )
      ) {

        if (ramTypeSelect) {

          ramTypeSelect.value =
            listedRamType;
        }


        detected.push(
          `RAM type: ${listedRamType}`
        );

      }

      else if (listedRamType) {

        warnings.push(
          `${listedRamType} does not match the detected CPU / motherboard platform.`
        );
      }
    }

  }

  else if (
    listedRamType &&
    ramTypeSelect
  ) {

    const options =
      Array.from(
        ramTypeSelect.options
      ).map(
        option => option.value
      );


    if (
      options.includes(
        listedRamType
      )
    ) {

      ramTypeSelect.value =
        listedRamType;


      detected.push(
        `RAM type: ${listedRamType}`
      );
    }
  }


  // ==========================================================
  // STORAGE
  // ==========================================================

  const storage =
    detectStorage(listing);


  if (storage) {

    setSelectValue(
      "storage",
      storage
    );


    detected.push(
      `Storage: ${storage}`
    );
  }


  // ==========================================================
  // PSU
  // ==========================================================

  const psu =
    detectPSU(listing);


  if (psu) {

    const psuInput =
      document.getElementById("psu");


    if (psuInput) {
      psuInput.value = psu;
    }


    detected.push(
      `PSU: ${psu}`
    );
  }


  // ==========================================================
  // COOLER
  // ==========================================================

  const cooler =
    detectCooler(listing);


  if (cooler) {

    setSelectValue(
      "cooler",
      cooler
    );
  }


  // ==========================================================
  // CONDITION
  // ==========================================================

  const condition =
    detectCondition(listing);


  setSelectValue(
    "condition",
    condition
  );


  // ==========================================================
  // PRICE
  // ==========================================================

  const price =
    detectPrice(listing);


  if (price !== null) {

    const priceInput =
      document.getElementById(
        "price"
      );


    if (priceInput) {

      priceInput.value =
        price;
    }


    detected.push(
      `Price: $${price}`
    );

  } else {

    warnings.push(
      "Asking price could not be detected."
    );
  }


  // ==========================================================
  // CURRENCY
  // ==========================================================

  const currency =
    detectCurrency(listing);


  setSelectValue(
    "currency",
    currency
  );


  // ==========================================================
  // COMPATIBILITY
  // ==========================================================

  const finalRamType =
    document.getElementById(
      "ramType"
    )?.value || "";


  if (
    cpu &&
    typeof checkFullPlatformCompatibility === "function"
  ) {

    const compatibility =
      checkFullPlatformCompatibility(
        cpu,
        motherboardText,
        finalRamType
      );


    if (
      compatibility &&
      compatibility.issues
    ) {

      for (
        const issue
        of compatibility.issues
      ) {

        warnings.push(issue);
      }
    }


    if (
      compatibility &&
      compatibility.warnings
    ) {

      for (
        const warning
        of compatibility.warnings
      ) {

        warnings.push(warning);
      }
    }
  }


  // ==========================================================
  // MESSAGE
  // ==========================================================

  if (message) {

    let output = "";


    if (detected.length) {

      output +=
        "Detected: " +
        detected.join(" • ");
    }


    if (warnings.length) {

      output +=
        `${output ? " | " : ""}` +
        "Warnings: " +
        warnings.join(" • ");
    }


    if (!output) {

      output =
        "No PC components were detected.";
    }


    message.textContent =
      output;
  }


  const cpuField =
    document.getElementById(
      "cpu"
    );


  if (cpuField) {

    cpuField.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }

}
