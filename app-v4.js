// ============================================================
// PCDEAL - APP-V4.JS
// VERSION 5
// ============================================================
//
// Requires:
// platform.js
// cpu-data.js
// gpu-data.js
// parts.js
//
// This file contains ONLY:
// - UI logic
// - Deal analyzer
// - Listing parser
// - Compatibility display
//
// It must NOT contain:
// const platformDatabase
// const cpuDatabase
// const gpuDatabase
//
// ============================================================



// ============================================================
// PAGE STARTUP
// ============================================================

document.addEventListener("DOMContentLoaded", () => {

  const cpuInput =
    document.getElementById("cpu");

  const motherboardInput =
    document.getElementById("motherboard");


  if (cpuInput) {

    cpuInput.addEventListener(
      "change",
      updateMemoryCompatibility
    );

    cpuInput.addEventListener(
      "blur",
      updateMemoryCompatibility
    );

  }


  if (motherboardInput) {

    motherboardInput.addEventListener(
      "change",
      updateMemoryCompatibility
    );

    motherboardInput.addEventListener(
      "blur",
      updateMemoryCompatibility
    );

  }


  updateMemoryCompatibility();

});



// ============================================================
// BASIC NORMALIZATION
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

function formatMoney(
  amount,
  currency = "CAD"
) {

  const number =
    Number(amount) || 0;


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
// RAM TYPE DROPDOWN
// ============================================================

function restoreRamTypeDropdown() {

  const ramTypeSelect =
    document.getElementById("ramType");


  if (!ramTypeSelect) {
    return;
  }


  const currentValue =
    ramTypeSelect.value;


  ramTypeSelect.innerHTML = `
    <option value="">Unknown / Not listed</option>
    <option value="DDR2">DDR2</option>
    <option value="DDR3">DDR3</option>
    <option value="DDR4">DDR4</option>
    <option value="DDR5">DDR5</option>
  `;


  ramTypeSelect.disabled =
    false;


  if (
    ["DDR2", "DDR3", "DDR4", "DDR5"]
      .includes(currentValue)
  ) {

    ramTypeSelect.value =
      currentValue;

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

  const select =
    document.getElementById("ramType");


  if (!select) {
    return;
  }


  const types =
    Array.isArray(memoryTypes)
      ? memoryTypes
      : [];


  select.innerHTML = "";


  // ----------------------------------------------------------
  // NO PLATFORM INFO
  // ----------------------------------------------------------

  if (types.length === 0) {

    restoreRamTypeDropdown();

    return;

  }


  // ----------------------------------------------------------
  // AUTOMATIC SINGLE RAM TYPE
  // ----------------------------------------------------------

  if (
    automatic &&
    selectedMemory
  ) {

    const option =
      document.createElement(
        "option"
      );


    option.value =
      selectedMemory;

    option.textContent =
      `${selectedMemory} — required`;


    select.appendChild(
      option
    );


    select.value =
      selectedMemory;

    select.disabled =
      true;


    return;

  }


  // ----------------------------------------------------------
  // MULTIPLE RAM OPTIONS
  // ----------------------------------------------------------

  select.disabled =
    false;


  const unknown =
    document.createElement(
      "option"
    );


  unknown.value = "";
  unknown.textContent =
    "Select RAM type";


  select.appendChild(
    unknown
  );


  for (
    const memoryType
    of types
  ) {

    const option =
      document.createElement(
        "option"
      );


    option.value =
      memoryType;

    option.textContent =
      memoryType;


    select.appendChild(
      option
    );

  }


  if (
    selectedMemory &&
    types.includes(selectedMemory)
  ) {

    select.value =
      selectedMemory;

  }

}



// ============================================================
// UPDATE RAM COMPATIBILITY
// ============================================================

function updateMemoryCompatibility() {

  const cpuInput =
    document.getElementById("cpu");

  const motherboardInput =
    document.getElementById("motherboard");


  if (!cpuInput) {
    return;
  }


  const cpuText =
    cpuInput.value.trim();


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
    typeof getBestMemorySelection ===
    "function"
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


  // ----------------------------------------------------------
  // FALLBACK IF platform.js HELPER IS MISSING
  // ----------------------------------------------------------

  if (
    typeof getCPUMemoryTypes ===
    "function"
  ) {

    const memory =
      getCPUMemoryTypes(cpu);


    if (memory.length === 1) {

      setRamOptions(
        memory,
        true,
        memory[0]
      );

    }

    else {

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

function getStorageValue(
  storage
) {

  const values = {

    "256GB SSD": 15,
    "500GB SSD": 25,
    "1TB SSD": 50,
    "2TB SSD": 90,
    "HDD Only": 10

  };


  return (
    values[storage] ||
    0
  );

}



// ============================================================
// RAM VALUE
// ============================================================

function getRamValue(
  capacity,
  type
) {

  const capacityValues = {

    "8GB": 20,
    "16GB": 40,
    "32GB": 70,
    "64GB+": 120

  };


  let value =
    capacityValues[capacity] ||
    0;


  if (
    type === "DDR5"
  ) {

    value += 25;

  }


  else if (
    type === "DDR3"
  ) {

    value -= 5;

  }


  else if (
    type === "DDR2"
  ) {

    value -= 10;

  }


  return Math.max(
    0,
    value
  );

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

    // --------------------------------------------------------
    // HIGH-END CHIPSETS
    // --------------------------------------------------------

    if (
      /\b(x870e|x870|x670e|x670|z890|z790|z690|x570|x470|x370|x299|x99|x79|x58)\b/i
        .test(text)
    ) {

      return 170;

    }


    // --------------------------------------------------------
    // MID-RANGE CHIPSETS
    // --------------------------------------------------------

    if (
      /\b(b850|b840|b650e|b650|b760|b660|b560|b550|b450|h770|h670|h570|z590|z490|z390|z370)\b/i
        .test(text)
    ) {

      return 110;

    }


    // --------------------------------------------------------
    // OLDER ENTHUSIAST
    // --------------------------------------------------------

    if (
      /\b(z270|z170|z97|z87|z77|z75|z68|p67|990fx|990x|970)\b/i
        .test(text)
    ) {

      return 80;

    }


    // --------------------------------------------------------
    // ENTRY LEVEL
    // --------------------------------------------------------

    if (
      /\b(a620|a520|a320|h610|h510|h410|h310|h110|h81|h61)\b/i
        .test(text)
    ) {

      return 55;

    }


    return 75;

  }


  // ----------------------------------------------------------
  // FALLBACK BY CPU PLATFORM
  // ----------------------------------------------------------

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

function getPSUValue(
  psu
) {

  if (!psu) {
    return 50;
  }


  const text =
    psu.toLowerCase();


  let value = 50;


  if (
    /corsair|seasonic|super flower|be quiet|evga|fsp|thermaltake toughpower|msi mpg|asus rog|cooler master v|nzxt c/i
      .test(text)
  ) {

    value = 100;

  }


  if (
    /1000w|1200w|1300w/i
      .test(text)
  ) {

    value += 30;

  }


  else if (
    /850w/i.test(text)
  ) {

    value += 20;

  }


  else if (
    /750w/i.test(text)
  ) {

    value += 10;

  }


  return value;

}



// ============================================================
// COOLER VALUE
// ============================================================

function getCoolerValue(
  cooler
) {

  const values = {

    "stock": 10,
    "air": 40,
    "aio240": 60,
    "aio280": 75,
    "aio360": 90

  };


  return (
    values[cooler] ||
    20
  );

}



// ============================================================
// CASE VALUE
// ============================================================

function getCaseValue(
  caseQuality
) {

  const values = {

    "basic": 35,
    "mid": 70,
    "premium": 120

  };


  return (
    values[caseQuality] ||
    50
  );

}



// ============================================================
// CONDITION MULTIPLIER
// ============================================================

function getConditionMultiplier(
  condition
) {

  const values = {

    "excellent": 1.05,
    "good": 1,
    "fair": 0.90,
    "poor": 0.75

  };


  return (
    values[condition] ||
    1
  );

}



// ============================================================
// GAMING DESCRIPTION
// ============================================================

function getGamingDescription(
  gpu
) {

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

function getBalanceDescription(
  cpu,
  gpu
) {

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
    cpuScore -
    gpuScore;


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

function getDealVerdict(
  score
) {

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
// DEAL ANALYZER
// ============================================================

function analyzeDeal() {

  const cpuInput =
    document.getElementById("cpu");

  const gpuInput =
    document.getElementById("gpu");

  const ramInput =
    document.getElementById("ram");

  const ramTypeInput =
    document.getElementById("ramType");

  const storageInput =
    document.getElementById("storage");

  const priceInput =
    document.getElementById("price");

  const currencyInput =
    document.getElementById("currency");

  const motherboardInput =
    document.getElementById("motherboard");

  const psuInput =
    document.getElementById("psu");

  const coolerInput =
    document.getElementById("cooler");

  const caseInput =
    document.getElementById("caseQuality");

  const conditionInput =
    document.getElementById("condition");


  const cpuText =
    cpuInput
      ? cpuInput.value.trim()
      : "";

  const gpuText =
    gpuInput
      ? gpuInput.value.trim()
      : "";

  const ram =
    ramInput
      ? ramInput.value
      : "";

  const ramType =
    ramTypeInput
      ? ramTypeInput.value
      : "";

  const storage =
    storageInput
      ? storageInput.value
      : "";

  const price =
    priceInput
      ? Number(priceInput.value)
      : 0;

  const currency =
    currencyInput
      ? currencyInput.value || "CAD"
      : "CAD";

  const motherboard =
    motherboardInput
      ? motherboardInput.value.trim()
      : "";

  const psu =
    psuInput
      ? psuInput.value.trim()
      : "";

  const cooler =
    coolerInput
      ? coolerInput.value
      : "";

  const caseQuality =
    caseInput
      ? caseInput.value
      : "";

  const condition =
    conditionInput
      ? conditionInput.value
      : "good";


  // ----------------------------------------------------------
  // REQUIRED FIELDS
  // ----------------------------------------------------------

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
      "CPU not recognized yet. Try using the exact model name."
    );

    return;

  }


  if (!gpu) {

    alert(
      "GPU not recognized yet. Try using the exact model name."
    );

    return;

  }


  // ----------------------------------------------------------
  // PART VALUES
  // ----------------------------------------------------------

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
    getStorageValue(
      storage
    );

  const motherboardValue =
    getMotherboardValue(
      motherboard,
      cpu
    );

  const psuValue =
    getPSUValue(
      psu
    );

  const coolerValue =
    getCoolerValue(
      cooler
    );

  const caseValue =
    getCaseValue(
      caseQuality
    );


  const subtotal =
    cpuValue +
    gpuValue +
    ramValue +
    storageValue +
    motherboardValue +
    psuValue +
    coolerValue +
    caseValue;


  const conditionMultiplier =
    getConditionMultiplier(
      condition
    );


  const estimatedValue =
    Math.round(
      subtotal *
      conditionMultiplier
    );


  const lowValue =
    Math.round(
      estimatedValue *
      0.90
    );


  const highValue =
    Math.round(
      estimatedValue *
      1.10
    );


  // ----------------------------------------------------------
  // DEAL SCORE
  // ----------------------------------------------------------

  const ratio =
    estimatedValue > 0
      ? price / estimatedValue
      : 999;


  let score;


  if (
    ratio <= 0.70
  ) {

    score = 95;

  }


  else if (
    ratio <= 0.80
  ) {

    score = 90;

  }


  else if (
    ratio <= 0.90
  ) {

    score = 85;

  }


  else if (
    ratio <= 1.00
  ) {

    score = 78;

  }


  else if (
    ratio <= 1.10
  ) {

    score = 68;

  }


  else if (
    ratio <= 1.20
  ) {

    score = 55;

  }


  else {

    score = 35;

  }


  // ----------------------------------------------------------
  // COMPATIBILITY
  // ----------------------------------------------------------

  let compatibility = {

    compatible: true,
    issues: [],
    warnings: [],
    passed: []

  };


  if (
    typeof checkFullPlatformCompatibility ===
    "function"
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


  // ----------------------------------------------------------
  // CONFIDENCE
  // ----------------------------------------------------------

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


  for (
    const field
    of confidenceFields
  ) {

    if (field) {
      filledFields++;
    }

  }


  const confidence =
    Math.round(
      (
        filledFields /
        confidenceFields.length
      ) *
      100
    );


  let confidenceLabel =
    "Low";


  if (
    confidence >= 80
  ) {

    confidenceLabel =
      "High";

  }


  else if (
    confidence >= 55
  ) {

    confidenceLabel =
      "Medium";

  }


  // ----------------------------------------------------------
  // SUGGESTED OFFER
  // ----------------------------------------------------------

  let suggestedOffer =
    Math.round(
      (
        estimatedValue *
        0.85
      ) /
      10
    ) *
    10;


  suggestedOffer =
    Math.min(
      suggestedOffer,
      price
    );


  // ----------------------------------------------------------
  // PLATFORM INFO
  // ----------------------------------------------------------

  const compatibilityInfo =
    typeof getCPUCompatibility ===
    "function"
      ? getCPUCompatibility(cpu)
      : null;


  const socket =
    cpu.socket ||
    "Unknown";


  const supportedMemory =
    compatibilityInfo &&
    compatibilityInfo.memory
      ? compatibilityInfo.memory.join(", ")
      : "Unknown";


  const detectedChipset =
    (
      typeof findChipsetInText ===
      "function" &&
      motherboard
    )
      ? (
          findChipsetInText(
            motherboard
          ) ||
          "Not detected"
        )
      : "Not detected";


  // ----------------------------------------------------------
  // FALLBACK PART WARNING
  // ----------------------------------------------------------

  const fallbackWarnings = [];


  if (
    cpu.fallback ||
    cpu.exactMarketValue === false
  ) {

    fallbackWarnings.push(
      "CPU was detected, but an exact used-market value is not available."
    );

  }


  if (
    gpu.fallback ||
    gpu.exactMarketValue === false
  ) {

    fallbackWarnings.push(
      "GPU was detected, but an exact used-market value is not available."
    );

  }


  // ----------------------------------------------------------
  // RESULT HTML
  // ----------------------------------------------------------

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
      "One or more result elements are missing from index.html."
    );

    return;

  }


  scoreElement.textContent =
    `${score}/100`;


  verdictElement.textContent =
    getDealVerdict(score);


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
            .map(
              issue =>
                `<li>${issue}</li>`
            )
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
            .map(
              warning =>
                `<li>${warning}</li>`
            )
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
            .map(
              item =>
                `<li>${item}</li>`
            )
            .join("")}
        </ul>
      </div>
    `;

  }


  if (
    fallbackWarnings.length
  ) {

    compatibilityHTML += `
      <div style="margin-top:14px;">
        <strong>⚠️ Value accuracy</strong>
        <ul>
          ${fallbackWarnings
            .map(
              warning =>
                `<li>${warning}</li>`
            )
            .join("")}
        </ul>
      </div>
    `;

  }


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
          ? formatMoney(
              cpuValue,
              currency
            )
          : "Exact value unavailable"
      }
    </p>

    <p>
      <strong>GPU value:</strong>
      ${
        gpuValue > 0
          ? formatMoney(
              gpuValue,
              currency
            )
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


  result.style.display =
    "block";


  result.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}



// ============================================================
// DETECT RAM CAPACITY
// ============================================================

function detectRamCapacity(
  text
) {

  const normalized =
    normalizeDetectionText(
      text
    );


  if (
    /\b(64|96|128)\s*gb\b/i
      .test(normalized)
  ) {

    return "64GB+";

  }


  if (
    /\b32\s*gb\b/i
      .test(normalized)
  ) {

    return "32GB";

  }


  if (
    /\b16\s*gb\b/i
      .test(normalized)
  ) {

    return "16GB";

  }


  if (
    /\b8\s*gb\b/i
      .test(normalized)
  ) {

    return "8GB";

  }


  return "";

}



// ============================================================
// DETECT RAM TYPE
// ============================================================

function detectRamType(
  text
) {

  if (
    /\bddr5\b/i.test(text)
  ) {

    return "DDR5";

  }


  if (
    /\bddr4\b/i.test(text)
  ) {

    return "DDR4";

  }


  if (
    /\bddr3\b/i.test(text)
  ) {

    return "DDR3";

  }


  if (
    /\bddr2\b/i.test(text)
  ) {

    return "DDR2";

  }


  return "";

}



// ============================================================
// DETECT STORAGE
// ============================================================

function detectStorage(
  text
) {

  const normalized =
    text.toLowerCase();


  // ----------------------------------------------------------
  // 2TB SSD / NVME
  // ----------------------------------------------------------

  if (
    /\b2\s*tb\b/.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/.test(normalized)
  ) {

    return "2TB SSD";

  }


  // ----------------------------------------------------------
  // 1TB SSD / NVME
  // ----------------------------------------------------------

  if (
    /\b1\s*tb\b/.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/.test(normalized)
  ) {

    return "1TB SSD";

  }


  // ----------------------------------------------------------
  // 500GB / 512GB SSD
  // ----------------------------------------------------------

  if (
    /\b(480|500|512)\s*gb\b/.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/.test(normalized)
  ) {

    return "500GB SSD";

  }


  // ----------------------------------------------------------
  // 240 / 250 / 256GB SSD
  // ----------------------------------------------------------

  if (
    /\b(240|250|256)\s*gb\b/.test(normalized) &&
    /\b(ssd|nvme|m\.?2)\b/.test(normalized)
  ) {

    return "256GB SSD";

  }


  // ----------------------------------------------------------
  // HDD ONLY
  // ----------------------------------------------------------

  if (
    /\bhdd\b|hard drive/i
      .test(normalized) &&
    !/\bssd\b|\bnvme\b|\bm\.?2\b/i
      .test(normalized)
  ) {

    return "HDD Only";

  }


  return "";

}



// ============================================================
// DETECT PSU
// ============================================================

function detectPSU(
  text
) {

  const lines =
    text.split(/\r?\n/);


  for (
    const line
    of lines
  ) {

    if (
      /\b[4-9][0-9]{2}\s*w\b/i
        .test(line) ||
      /\b1[0-5][0-9]{2}\s*w\b/i
        .test(line) ||
      /\bpsu\b|power supply/i
        .test(line)
    ) {

      return line.trim();

    }

  }


  const wattage =
    text.match(
      /\b([4-9][0-9]{2}|1[0-5][0-9]{2})\s*w\b/i
    );


  if (wattage) {

    return `${wattage[1]}W PSU`;

  }


  return "";

}



// ============================================================
// DETECT COOLER
// ============================================================

function detectCooler(
  text
) {

  const normalized =
    text.toLowerCase();


  if (
    /360\s*mm|360mm/.test(normalized)
  ) {

    return "aio360";

  }


  if (
    /280\s*mm|280mm/.test(normalized)
  ) {

    return "aio280";

  }


  if (
    /240\s*mm|240mm/.test(normalized)
  ) {

    return "aio240";

  }


  if (
    /\baio\b|liquid cooler|water cooler/.test(normalized)
  ) {

    return "aio240";

  }


  if (
    /air cooler|tower cooler|hyper 212|peerless assassin|nh-d15|dark rock/.test(normalized)
  ) {

    return "air";

  }


  if (
    /stock cooler|wraith stealth|wraith spire/.test(normalized)
  ) {

    return "stock";

  }


  return "";

}



// ============================================================
// DETECT CONDITION
// ============================================================

function detectCondition(
  text
) {

  const normalized =
    text.toLowerCase();


  if (
    /brand new|like new|mint|excellent condition/.test(normalized)
  ) {

    return "excellent";

  }


  if (
    /poor condition|damaged|broken|needs repair|for parts/.test(normalized)
  ) {

    return "poor";

  }


  if (
    /fair condition|wear and tear|scratches|cosmetic wear/.test(normalized)
  ) {

    return "fair";

  }


  return "good";

}



// ============================================================
// DETECT PRICE
// ============================================================

function detectPrice(
  text
) {

  const patterns = [

    /\$\s*([0-9]{2,5})(?:\.[0-9]{1,2})?/g,
    /\b([0-9]{2,5})\s*(?:cad|cdn|usd)\b/gi

  ];


  const prices = [];


  for (
    const pattern
    of patterns
  ) {

    let match;


    while (
      (
        match =
          pattern.exec(text)
      ) !== null
    ) {

      const number =
        Number(match[1]);


      if (
        number >= 20 &&
        number <= 20000
      ) {

        prices.push(
          number
        );

      }

    }

  }


  if (
    prices.length === 0
  ) {

    return null;

  }


  return prices[0];

}



// ============================================================
// DETECT CURRENCY
// ============================================================

function detectCurrency(
  text
) {

  if (
    /\busd\b|us dollars?/i
      .test(text)
  ) {

    return "USD";

  }


  if (
    /\bcad\b|\bcdn\b|canadian dollars?/i
      .test(text)
  ) {

    return "CAD";

  }


  return "CAD";

}



// ============================================================
// SET SELECT VALUE SAFELY
// ============================================================

function setSelectValue(
  id,
  value
) {

  if (!value) {
    return;
  }


  const select =
    document.getElementById(id);


  if (!select) {
    return;
  }


  const valid =
    Array.from(
      select.options
    ).some(
      option =>
        option.value === value
    );


  if (valid) {

    select.value =
      value;

  }

}



// ============================================================
// PASTE LISTING PARSER
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

    console.error(
      "listingText textarea not found."
    );

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


  // ----------------------------------------------------------
  // CPU
  // ----------------------------------------------------------

  const cpu =
    typeof detectCPUFromText ===
    "function"
      ? detectCPUFromText(
          listing
        )
      : null;


  if (cpu) {

    const cpuInput =
      document.getElementById(
        "cpu"
      );


    if (cpuInput) {

      cpuInput.value =
        cpu.name;

    }


    detected.push(
      `CPU: ${cpu.name}`
    );


    if (
      cpu.fallback ||
      cpu.exactMarketValue === false
    ) {

      warnings.push(
        `CPU ${cpu.name} was identified, but exact market pricing is unavailable.`
      );

    }

  }


  else {

    warnings.push(
      "CPU could not be detected."
    );

  }


  // ----------------------------------------------------------
  // GPU
  // ----------------------------------------------------------

  const gpu =
    typeof detectGPUFromText ===
    "function"
      ? detectGPUFromText(
          listing
        )
      : null;


  if (gpu) {

    const gpuInput =
      document.getElementById(
        "gpu"
      );


    if (gpuInput) {

      gpuInput.value =
        gpu.name;

    }


    detected.push(
      `GPU: ${gpu.name}`
    );


    if (
      gpu.fallback ||
      gpu.exactMarketValue === false
    ) {

      warnings.push(
        `GPU ${gpu.name} was identified, but exact market pricing is unavailable.`
      );

    }

  }


  else {

    warnings.push(
      "GPU could not be detected."
    );

  }


  // ----------------------------------------------------------
  // MOTHERBOARD / CHIPSET
  // ----------------------------------------------------------

  let motherboardText = "";


  if (
    typeof findChipsetInText ===
    "function"
  ) {

    const chipset =
      findChipsetInText(
        listing
      );


    if (chipset) {

      const lines =
        listing.split(
          /\r?\n/
        );


      const matchingLine =
        lines.find(
          line =>
            line
              .toUpperCase()
              .includes(
                chipset.toUpperCase()
              )
        );


      motherboardText =
        matchingLine
          ? matchingLine.trim()
          : chipset;


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


  // ----------------------------------------------------------
  // UPDATE RAM PLATFORM FIRST
  // ----------------------------------------------------------

  updateMemoryCompatibility();


  // ----------------------------------------------------------
  // RAM CAPACITY
  // ----------------------------------------------------------

  const ramCapacity =
    detectRamCapacity(
      listing
    );


  if (ramCapacity) {

    setSelectValue(
      "ram",
      ramCapacity
    );


    detected.push(
      `RAM: ${ramCapacity}`
    );

  }


  // ----------------------------------------------------------
  // RAM TYPE
  // ----------------------------------------------------------

  const listedRamType =
    detectRamType(
      listing
    );


  const ramTypeSelect =
    document.getElementById(
      "ramType"
    );


  if (
    cpu &&
    typeof getBestMemorySelection ===
      "function"
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
          `${listedRamType} was listed, but ${cpu.name} / motherboard platform requires ${selection.selected}.`
        );

      }

    }


    else if (
      selection &&
      Array.isArray(
        selection.options
      )
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


      else if (
        listedRamType
      ) {

        warnings.push(
          `${listedRamType} does not match the detected CPU / motherboard platform.`
        );

      }

    }

  }


  else if (
    listedRamType
  ) {

    setSelectValue(
      "ramType",
      listedRamType
    );


    detected.push(
      `RAM type: ${listedRamType}`
    );

  }


  // ----------------------------------------------------------
  // STORAGE
  // ----------------------------------------------------------

  const storage =
    detectStorage(
      listing
    );


  if (storage) {

    setSelectValue(
      "storage",
      storage
    );


    detected.push(
      `Storage: ${storage}`
    );

  }


  // ----------------------------------------------------------
  // PSU
  // ----------------------------------------------------------

  const psu =
    detectPSU(
      listing
    );


  if (psu) {

    const psuInput =
      document.getElementById(
        "psu"
      );


    if (psuInput) {

      psuInput.value =
        psu;

    }


    detected.push(
      `PSU: ${psu}`
    );

  }


  // ----------------------------------------------------------
  // COOLER
  // ----------------------------------------------------------

  const cooler =
    detectCooler(
      listing
    );


  if (cooler) {

    setSelectValue(
      "cooler",
      cooler
    );

  }


  // ----------------------------------------------------------
  // CONDITION
  // ----------------------------------------------------------

  const condition =
    detectCondition(
      listing
    );


  setSelectValue(
    "condition",
    condition
  );


  // ----------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------

  const price =
    detectPrice(
      listing
    );


  if (price) {

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

  }


  // ----------------------------------------------------------
  // CURRENCY
  // ----------------------------------------------------------

  const currency =
    detectCurrency(
      listing
    );


  setSelectValue(
    "currency",
    currency
  );


  // ----------------------------------------------------------
  // QUICK COMPATIBILITY CHECK
  // ----------------------------------------------------------

  const finalRamType =
    document.getElementById(
      "ramType"
    )
      ? document.getElementById(
          "ramType"
        ).value
      : "";


  if (
    cpu &&
    typeof checkFullPlatformCompatibility ===
      "function"
  ) {

    const compatibility =
      checkFullPlatformCompatibility(
        cpu,
        motherboardText,
        finalRamType
      );


    if (
      compatibility &&
      compatibility.issues &&
      compatibility.issues.length
    ) {

      for (
        const issue
        of compatibility.issues
      ) {

        warnings.push(
          issue
        );

      }

    }


    if (
      compatibility &&
      compatibility.warnings &&
      compatibility.warnings.length
    ) {

      for (
        const warning
        of compatibility.warnings
      ) {

        warnings.push(
          warning
        );

      }

    }

  }


  // ----------------------------------------------------------
  // PARSER MESSAGE
  // ----------------------------------------------------------

  if (message) {

    let output = "";


    if (
      detected.length
    ) {

      output +=
        "Detected: " +
        detected.join(
          " • "
        );

    }


    if (
      warnings.length
    ) {

      output +=
        `${output ? " | " : ""}` +
        "Warnings: " +
        warnings.join(
          " • "
        );

    }


    if (!output) {

      output =
        "No PC components were detected.";

    }


    message.textContent =
      output;

  }


  // ----------------------------------------------------------
  // SCROLL TO FORM
  // ----------------------------------------------------------

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



// ============================================================
// TEST PCDEAL
// ============================================================

function testPCDeal() {

  console.log(
    "===== PCDeal Test ====="
  );


  console.log(
    "Database stats:",
    typeof getDatabaseStats ===
      "function"
      ? getDatabaseStats()
      : "getDatabaseStats unavailable"
  );


  const cpu4790 =
    typeof findCPU ===
    "function"
      ? findCPU(
          "i7-4790K"
        )
      : null;


  console.log(
    "4790K:",
    cpu4790
  );


  if (
    cpu4790 &&
    typeof checkFullPlatformCompatibility ===
      "function"
  ) {

    console.log(
      "4790K + Z97 + DDR3:",
      checkFullPlatformCompatibility(
        cpu4790,
        "ASUS Z97 motherboard",
        "DDR3"
      )
    );


    console.log(
      "4790K + B550 + DDR4:",
      checkFullPlatformCompatibility(
        cpu4790,
        "MSI B550 motherboard",
        "DDR4"
      )
    );

  }


  const cpu13600 =
    typeof findCPU ===
    "function"
      ? findCPU(
          "i5-13600K"
        )
      : null;


  console.log(
    "13600K:",
    cpu13600
  );


  if (
    cpu13600 &&
    typeof getBestMemorySelection ===
      "function"
  ) {

    console.log(
      "13600K memory:",
      getBestMemorySelection(
        cpu13600
      )
    );


    console.log(
      "13600K + Z790 D4:",
      getBestMemorySelection(
        cpu13600,
        "ASUS TUF GAMING Z790-PLUS WIFI D4"
      )
    );

  }


  console.log(
    "======================="
  );

}
