// ============================================================
// PCDEAL - APP.JS
// VERSION 4
// ============================================================
//
// Requires:
//
// <script src="platform.js"></script>
// <script src="parts.js"></script>
// <script src="app.js"></script>
//
// Features:
// - PC deal analysis
// - Automatic CPU RAM compatibility
// - CPU socket detection
// - Motherboard chipset detection
// - CPU + motherboard compatibility checking
// - CPU + RAM compatibility checking
// - Listing parser
// - Better CPU/GPU detection
// - Suggested offer
// - Confidence rating
//
// ============================================================



// ============================================================
// GLOBAL VARIABLES
// ============================================================

let originalRamTypeOptions = "";



// ============================================================
// PAGE STARTUP
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

  const cpuInput =
    document.getElementById("cpu");

  const ramType =
    document.getElementById("ramType");


  // Save original RAM dropdown so it can be restored.

  if (ramType) {
    originalRamTypeOptions =
      ramType.innerHTML;
  }


  // Automatically update RAM compatibility
  // whenever CPU field changes.

  if (cpuInput) {

    cpuInput.addEventListener(
      "change",
      updateMemoryFromCPU
    );

    cpuInput.addEventListener(
      "blur",
      updateMemoryFromCPU
    );

  }


  // Run once in case the page already
  // contains a CPU value.

  updateMemoryFromCPU();

});



// ============================================================
// NORMALIZE TEXT FOR LISTING DETECTION
// ============================================================

function normalizeDetectionText(text) {

  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .replace(/[-_/(),]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}



// ============================================================
// FORMAT MONEY
// ============================================================

function formatMoney(value) {

  if (
    value === null ||
    value === undefined ||
    isNaN(value)
  ) {
    return "$0";
  }

  return "$" +
    Math.round(value)
      .toLocaleString();
}



// ============================================================
// DETECT MOTHERBOARD CHIPSET
// ============================================================

function detectChipsetFromText(text) {

  if (!text) {
    return null;
  }


  const normalized =
    normalizeDetectionText(text);


  if (
    typeof chipsetDatabase ===
    "undefined"
  ) {

    return null;

  }


  // Longest names first.

  const chipsets =
    Object.keys(chipsetDatabase)
      .sort(
        (a, b) =>
          b.length - a.length
      );


  for (const chipset of chipsets) {

    const normalizedChipset =
      normalizeDetectionText(
        chipset
      );


    // Word-boundary style test so
    // B550 doesn't accidentally match
    // random text containing the same
    // characters.

    const escaped =
      normalizedChipset.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );


    const regex =
      new RegExp(
        `(^|\\s)${escaped}(?=\\s|$)`,
        "i"
      );


    if (regex.test(normalized)) {

      return chipset.toUpperCase();

    }

  }


  return null;
}



// ============================================================
// RESTORE DEFAULT RAM TYPE DROPDOWN
// ============================================================

function restoreRamTypeDropdown() {

  const ramType =
    document.getElementById("ramType");


  if (!ramType) {
    return;
  }


  ramType.disabled = false;


  if (originalRamTypeOptions) {

    ramType.innerHTML =
      originalRamTypeOptions;

  } else {

    ramType.innerHTML = `
      <option value="">Select RAM type</option>
      <option value="DDR2">DDR2</option>
      <option value="DDR3">DDR3</option>
      <option value="DDR4">DDR4</option>
      <option value="DDR5">DDR5</option>
    `;

  }

}



// ============================================================
// SET RAM OPTIONS
// ============================================================

function setRamOptions(
  memoryTypes,
  automatic = false
) {

  const ramType =
    document.getElementById("ramType");


  if (!ramType) {
    return;
  }


  if (
    !memoryTypes ||
    memoryTypes.length === 0
  ) {

    restoreRamTypeDropdown();

    return;

  }


  ramType.innerHTML = "";


  // One possible RAM type:
  // automatically select it.

  if (
    memoryTypes.length === 1 ||
    automatic
  ) {

    const type =
      memoryTypes[0];


    const option =
      document.createElement(
        "option"
      );


    option.value = type;
    option.textContent = type;


    ramType.appendChild(option);


    ramType.value = type;

    ramType.disabled = true;

    return;

  }


  // Multiple possible memory types.

  ramType.disabled = false;


  const placeholder =
    document.createElement(
      "option"
    );


  placeholder.value = "";

  placeholder.textContent =
    "Select RAM type";


  ramType.appendChild(
    placeholder
  );


  for (const type of memoryTypes) {

    const option =
      document.createElement(
        "option"
      );


    option.value = type;
    option.textContent = type;


    ramType.appendChild(option);

  }

}



// ============================================================
// AUTOMATIC RAM TYPE FROM CPU
// ============================================================

function updateMemoryFromCPU() {

  const cpuInput =
    document.getElementById("cpu");


  if (!cpuInput) {
    return;
  }


  const cpu =
    findCPU(cpuInput.value);


  if (!cpu) {

    restoreRamTypeDropdown();

    return;

  }


  const compatibility =
    getCPUCompatibility(cpu);


  if (
    !compatibility ||
    !compatibility.memory ||
    compatibility.memory.length === 0
  ) {

    restoreRamTypeDropdown();

    return;

  }


  setRamOptions(
    compatibility.memory,
    compatibility.automaticMemory
  );

}



// ============================================================
// STORAGE VALUE
// ============================================================

function getStorageValue(storage) {

  switch (storage) {

    case "256GB SSD":
      return 15;

    case "500GB SSD":
      return 25;

    case "1TB SSD":
      return 50;

    case "2TB SSD":
      return 90;

    case "HDD Only":
      return 10;

    default:
      return 0;

  }

}



// ============================================================
// RAM VALUE
// ============================================================

function getRamValue(
  ram,
  ramType
) {

  let value = 0;


  switch (ram) {

    case "8GB":
      value = 20;
      break;

    case "16GB":
      value = 40;
      break;

    case "32GB":
      value = 70;
      break;

    case "64GB+":
      value = 120;
      break;

    default:
      value = 0;

  }


  // General generation adjustments.

  if (ramType === "DDR5") {
    value += 25;
  }

  if (ramType === "DDR3") {
    value -= 5;
  }

  if (ramType === "DDR2") {
    value -= 10;
  }


  return Math.max(
    value,
    0
  );

}



// ============================================================
// MOTHERBOARD VALUE
// ============================================================

function getMotherboardValue(
  motherboard,
  cpu
) {

  const chipset =
    detectChipsetFromText(
      motherboard
    );


  if (!motherboard) {

    if (cpu) {

      if (cpu.socket === "AM5") {
        return 130;
      }

      if (
        cpu.socket ===
        "LGA1700"
      ) {
        return 110;
      }

      if (cpu.socket === "AM4") {
        return 80;
      }

      if (
        cpu.socket ===
        "LGA1150"
      ) {
        return 45;
      }

    }

    return 60;

  }


  if (!chipset) {
    return 70;
  }


  // Enthusiast / high-end

  if (
    chipset.startsWith("X870") ||
    chipset.startsWith("X670") ||
    chipset.startsWith("X570") ||
    chipset.startsWith("Z890") ||
    chipset.startsWith("Z790") ||
    chipset.startsWith("Z690") ||
    chipset === "X299" ||
    chipset === "X99"
  ) {

    return 170;

  }


  // Mainstream

  if (
    chipset.startsWith("B850") ||
    chipset.startsWith("B650") ||
    chipset.startsWith("B550") ||
    chipset.startsWith("B450") ||
    chipset.startsWith("B860") ||
    chipset.startsWith("B760") ||
    chipset.startsWith("B660")
  ) {

    return 110;

  }


  // Older enthusiast

  if (
    chipset === "Z390" ||
    chipset === "Z370" ||
    chipset === "Z270" ||
    chipset === "Z170" ||
    chipset === "Z97" ||
    chipset === "Z87" ||
    chipset === "Z77"
  ) {

    return 80;

  }


  // Entry-level

  if (
    chipset.startsWith("A620") ||
    chipset.startsWith("A520") ||
    chipset.startsWith("A320") ||
    chipset.startsWith("H810") ||
    chipset.startsWith("H610") ||
    chipset.startsWith("H510") ||
    chipset.startsWith("H410") ||
    chipset === "H81"
  ) {

    return 60;

  }


  return 80;
}



// ============================================================
// PSU VALUE
// ============================================================

function getPSUValue(psu) {

  if (!psu) {
    return 50;
  }


  const lower =
    psu.toLowerCase();


  let value = 50;


  const qualityBrands = [

    "corsair rm",
    "rm650",
    "rm750",
    "rm850",
    "rm1000",

    "seasonic",
    "focus",

    "supernova",

    "straight power",
    "pure power",

    "rog thor",

    "msi mpg"

  ];


  if (
    qualityBrands.some(
      brand =>
        lower.includes(brand)
    )
  ) {

    value = 100;

  }


  if (
    lower.includes("1300w") ||
    lower.includes("1200w") ||
    lower.includes("1000w")
  ) {

    value += 30;

  }

  else if (
    lower.includes("850w")
  ) {

    value += 20;

  }

  else if (
    lower.includes("750w")
  ) {

    value += 10;

  }


  return value;
}



// ============================================================
// COOLER VALUE
// ============================================================

function getCoolerValue(cooler) {

  switch (cooler) {

    case "stock":
      return 10;

    case "air":
      return 40;

    case "aio240":
      return 60;

    case "aio280":
      return 75;

    case "aio360":
      return 90;

    default:
      return 20;

  }

}



// ============================================================
// CASE VALUE
// ============================================================

function getCaseValue(
  caseQuality
) {

  switch (caseQuality) {

    case "basic":
      return 35;

    case "mid":
      return 70;

    case "premium":
      return 120;

    default:
      return 50;

  }

}



// ============================================================
// CONDITION MULTIPLIER
// ============================================================

function getConditionMultiplier(
  condition
) {

  switch (condition) {

    case "excellent":
      return 1.05;

    case "good":
      return 1;

    case "fair":
      return 0.90;

    case "poor":
      return 0.75;

    default:
      return 1;

  }

}



// ============================================================
// GAMING DESCRIPTION
// ============================================================

function getGamingDescription(
  gpu
) {

  if (!gpu) {
    return "Unknown";
  }


  if (
    gpu.performance >= 80
  ) {

    return "High-end 1440p / 4K gaming";

  }


  if (
    gpu.performance >= 60
  ) {

    return "Excellent 1440p gaming";

  }


  if (
    gpu.performance >= 45
  ) {

    return "Excellent 1080p / strong 1440p gaming";

  }


  if (
    gpu.performance >= 25
  ) {

    return "Good 1080p gaming";

  }


  return "Entry-level / lighter 1080p gaming";
}



// ============================================================
// CPU / GPU BALANCE
// ============================================================

function getBalanceDescription(
  cpu,
  gpu
) {

  const difference =
    gpu.performance -
    cpu.performance;


  if (difference > 30) {

    return "GPU is much stronger than the CPU — possible CPU bottleneck.";

  }


  if (difference < -30) {

    return "CPU is much stronger than the GPU — GPU upgrade could improve gaming performance.";

  }


  return "CPU and GPU are reasonably balanced.";
}



// ============================================================
// DEAL VERDICT
// ============================================================

function getDealVerdict(score) {

  if (score >= 90) {

    return {
      text: "Excellent deal",
      emoji: "🔥"
    };

  }


  if (score >= 80) {

    return {
      text: "Good deal",
      emoji: "✅"
    };

  }


  if (score >= 65) {

    return {
      text: "Fair price",
      emoji: "👍"
    };

  }


  if (score >= 50) {

    return {
      text:
        "Slightly overpriced",
      emoji: "⚠️"
    };

  }


  return {
    text: "Overpriced",
    emoji: "❌"
  };

}



// ============================================================
// MAIN ANALYZER
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
    document.getElementById(
      "motherboard"
    );

  const psuInput =
    document.getElementById("psu");

  const coolerInput =
    document.getElementById(
      "cooler"
    );

  const caseInput =
    document.getElementById(
      "caseQuality"
    );

  const conditionInput =
    document.getElementById(
      "condition"
    );


  const result =
    document.getElementById(
      "result"
    );

  const scoreElement =
    document.getElementById(
      "score"
    );

  const verdictElement =
    document.getElementById(
      "verdict"
    );

  const resultText =
    document.getElementById(
      "resultText"
    );


  const cpuName =
    cpuInput
      ? cpuInput.value.trim()
      : "";


  const gpuName =
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


  const askingPrice =
    priceInput
      ? Number(
          priceInput.value
        )
      : 0;


  const currency =
    currencyInput
      ? currencyInput.value
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
      : "";


  // ----------------------------------------------------------
  // REQUIRED FIELDS
  // ----------------------------------------------------------

  if (
    !cpuName ||
    !gpuName ||
    !askingPrice
  ) {

    alert(
      "Please enter a CPU, GPU, and asking price."
    );

    return;

  }


  // ----------------------------------------------------------
  // FIND PARTS
  // ----------------------------------------------------------

  const cpu =
    findCPU(cpuName);


  const gpu =
    findGPU(gpuName);


  if (!cpu) {

    alert(
      "CPU not found in the database yet."
    );

    return;

  }


  if (!gpu) {

    alert(
      "GPU not found in the database yet."
    );

    return;

  }


  // ----------------------------------------------------------
  // CPU PLATFORM
  // ----------------------------------------------------------

  const compatibility =
    getCPUCompatibility(cpu);


  // ----------------------------------------------------------
  // VALUES
  // ----------------------------------------------------------

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


  let estimatedValue =

    cpu.value +
    gpu.value +
    ramValue +
    storageValue +
    motherboardValue +
    psuValue +
    coolerValue +
    caseValue;


  estimatedValue *=
    getConditionMultiplier(
      condition
    );


  // ----------------------------------------------------------
  // VALUE RANGE
  // ----------------------------------------------------------

  const lowValue =
    estimatedValue * 0.90;


  const highValue =
    estimatedValue * 1.10;


  // ----------------------------------------------------------
  // DEAL SCORE
  // ----------------------------------------------------------

  const priceRatio =
    askingPrice /
    estimatedValue;


  let score;


  if (priceRatio <= 0.70) {

    score = 95;

  }

  else if (
    priceRatio <= 0.80
  ) {

    score = 90;

  }

  else if (
    priceRatio <= 0.90
  ) {

    score = 85;

  }

  else if (
    priceRatio <= 1.00
  ) {

    score = 78;

  }

  else if (
    priceRatio <= 1.10
  ) {

    score = 68;

  }

  else if (
    priceRatio <= 1.20
  ) {

    score = 55;

  }

  else {

    score = 35;

  }


  // ----------------------------------------------------------
  // COMPATIBILITY CHECKS
  // ----------------------------------------------------------

  const compatibilityMessages = [];

  let compatibilityProblem =
    false;


  // RAM compatibility

  if (
    ramType &&
    compatibility &&
    compatibility.memory.length
  ) {

    const memoryCheck =
      checkCPUMemoryCompatibility(
        cpu,
        ramType
      );


    if (
      memoryCheck.compatible ===
      true
    ) {

      compatibilityMessages.push(
        `✅ ${ramType} is compatible with ${cpu.name}.`
      );

    }

    else if (
      memoryCheck.compatible ===
      false
    ) {

      compatibilityMessages.push(
        `❌ RAM incompatibility: ${cpu.name} uses ${cpu.socket} and requires ${compatibility.memory.join(" / ")}.`
      );


      compatibilityProblem = true;

    }

  }


  // Motherboard compatibility

  const detectedChipset =
    detectChipsetFromText(
      motherboard
    );


  if (
    detectedChipset
  ) {

    const motherboardCheck =
      checkCPUChipsetCompatibility(
        cpu,
        detectedChipset
      );


    if (
      motherboardCheck.compatible ===
      true
    ) {

      compatibilityMessages.push(
        `✅ ${detectedChipset} motherboard chipset is compatible with ${cpu.name}.`
      );

    }

    else if (
      motherboardCheck.compatible ===
      false
    ) {

      compatibilityMessages.push(
        `❌ Motherboard incompatibility: ${cpu.name} uses ${cpu.socket}, but ${detectedChipset} is not a compatible chipset.`
      );


      compatibilityProblem = true;

    }

  }


  // Penalize impossible systems.

  if (compatibilityProblem) {

    score =
      Math.min(
        score,
        25
      );

  }


  // ----------------------------------------------------------
  // CONFIDENCE
  // ----------------------------------------------------------

  let confidencePoints = 2;

  const totalPossible = 9;


  if (ram) {
    confidencePoints++;
  }

  if (ramType) {
    confidencePoints++;
  }

  if (storage) {
    confidencePoints++;
  }

  if (motherboard) {
    confidencePoints++;
  }

  if (psu) {
    confidencePoints++;
  }

  if (cooler) {
    confidencePoints++;
  }

  if (caseQuality) {
    confidencePoints++;
  }


  const confidencePercent =
    Math.round(
      confidencePoints /
      totalPossible *
      100
    );


  let confidenceLabel;


  if (
    confidencePercent >= 80
  ) {

    confidenceLabel = "High";

  }

  else if (
    confidencePercent >= 55
  ) {

    confidenceLabel = "Medium";

  }

  else {

    confidenceLabel = "Low";

  }


  // ----------------------------------------------------------
  // MISSING INFORMATION
  // ----------------------------------------------------------

  const missing = [];


  if (!motherboard) {
    missing.push(
      "motherboard"
    );
  }

  if (!psu) {
    missing.push(
      "power supply"
    );
  }

  if (!ram) {
    missing.push(
      "RAM capacity"
    );
  }

  if (!ramType) {
    missing.push(
      "RAM type"
    );
  }

  if (!cooler) {
    missing.push(
      "CPU cooler"
    );
  }

  if (!caseQuality) {
    missing.push(
      "case quality"
    );
  }


  // ----------------------------------------------------------
  // OFFER
  // ----------------------------------------------------------

  let suggestedOffer =
    Math.round(
      estimatedValue *
      0.85 /
      10
    ) * 10;


  suggestedOffer =
    Math.min(
      suggestedOffer,
      askingPrice
    );


  // ----------------------------------------------------------
  // VERDICT
  // ----------------------------------------------------------

  let verdict =
    getDealVerdict(score);


  if (
    compatibilityProblem
  ) {

    verdict = {
      text:
        "Compatibility problem",
      emoji: "❌"
    };

  }


  // ----------------------------------------------------------
  // RESULT
  // ----------------------------------------------------------

  if (scoreElement) {

    scoreElement.textContent =
      `${score}/100`;

  }


  if (verdictElement) {

    verdictElement.textContent =
      `${verdict.emoji} ${verdict.text}`;

  }


  if (resultText) {

    const platformText =
      compatibility
        ? compatibility.socket
        : cpu.socket;


    const memoryText =
      compatibility &&
      compatibility.memory.length
        ? compatibility.memory.join(
            " / "
          )
        : "Unknown";


    let compatibilityHTML = "";


    if (
      compatibilityMessages.length
    ) {

      compatibilityHTML = `

        <div style="
          margin-top:18px;
          padding-top:14px;
          border-top:1px solid rgba(255,255,255,0.12);
        ">

          <strong>
            Compatibility
          </strong>

          <div style="margin-top:8px; line-height:1.7;">
            ${compatibilityMessages.join("<br>")}
          </div>

        </div>

      `;

    }


    let missingHTML = "";


    if (missing.length) {

      missingHTML = `

        <div style="margin-top:14px;">
          ⚠️ <strong>Missing information:</strong>
          ${missing.join(", ")}
        </div>

      `;

    }


    resultText.innerHTML = `

      <div style="line-height:1.8;">

        <strong>CPU:</strong>
        ${cpu.name}
        <br>

        <strong>GPU:</strong>
        ${gpu.name}
        <br>

        <strong>Asking price:</strong>
        ${formatMoney(askingPrice)}
        ${currency}
        <br><br>


        <strong>
          Estimated system value:
        </strong>

        ${formatMoney(lowValue)}
        –
        ${formatMoney(highValue)}
        ${currency}

        <br>


        <strong>
          Estimate confidence:
        </strong>

        ${confidenceLabel}
        (${confidencePercent}%)

        <br><br>


        <strong>Gaming:</strong>
        ${getGamingDescription(gpu)}
        <br>


        <strong>CPU socket:</strong>
        ${platformText}
        <br>


        <strong>
          Compatible RAM:
        </strong>

        ${memoryText}
        <br>


        ${
          detectedChipset
            ? `<strong>Detected chipset:</strong> ${detectedChipset}<br>`
            : ""
        }


        <br>


        <strong>
          CPU estimated value:
        </strong>

        ${formatMoney(cpu.value)}
        <br>


        <strong>
          GPU estimated value:
        </strong>

        ${formatMoney(gpu.value)}
        <br>


        <strong>
          Motherboard estimate:
        </strong>

        ${formatMoney(motherboardValue)}
        <br>


        <strong>
          PSU estimate:
        </strong>

        ${formatMoney(psuValue)}
        <br><br>


        <strong>
          System balance:
        </strong>

        ${getBalanceDescription(cpu, gpu)}

        <br><br>


        <strong>
          Suggested starting offer:
        </strong>

        ${formatMoney(suggestedOffer)}
        ${currency}


        ${compatibilityHTML}

        ${missingHTML}

      </div>

    `;

  }


  if (result) {

    result.style.display =
      "block";


    result.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

  }

}



// ============================================================
// DETECT RAM CAPACITY
// ============================================================

function detectRamCapacity(text) {

  const normalized =
    text.toLowerCase();


  // Prefer RAM / DDR context.

  const contextualPatterns = [

    /(?:ram|memory)[^\d]{0,12}(64)\s?gb/i,
    /(?:ram|memory)[^\d]{0,12}(32)\s?gb/i,
    /(?:ram|memory)[^\d]{0,12}(16)\s?gb/i,
    /(?:ram|memory)[^\d]{0,12}(8)\s?gb/i,

    /(64)\s?gb\s?(?:ddr2|ddr3|ddr4|ddr5)/i,
    /(32)\s?gb\s?(?:ddr2|ddr3|ddr4|ddr5)/i,
    /(16)\s?gb\s?(?:ddr2|ddr3|ddr4|ddr5)/i,
    /(8)\s?gb\s?(?:ddr2|ddr3|ddr4|ddr5)/i

  ];


  for (
    const pattern
    of contextualPatterns
  ) {

    const match =
      normalized.match(
        pattern
      );


    if (match) {

      const amount =
        Number(match[1]);


      if (amount >= 64) {
        return "64GB+";
      }

      return `${amount}GB`;

    }

  }


  // If no RAM context exists,
  // use common system RAM capacities.

  const generalMatch =
    normalized.match(
      /\b(64|32|16|8)\s?gb\b/i
    );


  if (generalMatch) {

    const amount =
      Number(
        generalMatch[1]
      );


    if (amount >= 64) {
      return "64GB+";
    }


    return `${amount}GB`;

  }


  return null;
}



// ============================================================
// DETECT RAM TYPE
// ============================================================

function detectRamType(text) {

  const lower =
    text.toLowerCase();


  if (
    /\bddr5\b/i.test(lower)
  ) {
    return "DDR5";
  }


  if (
    /\bddr4\b/i.test(lower)
  ) {
    return "DDR4";
  }


  if (
    /\bddr3l?\b/i.test(lower)
  ) {
    return "DDR3";
  }


  if (
    /\bddr2\b/i.test(lower)
  ) {
    return "DDR2";
  }


  return null;
}



// ============================================================
// DETECT STORAGE
// ============================================================

function detectStorage(text) {

  const lower =
    text.toLowerCase();


  const hasSSD =
    lower.includes("ssd") ||
    lower.includes("nvme") ||
    lower.includes("m.2");


  if (hasSSD) {

    if (
      /\b2\s?tb\b/i.test(
        lower
      )
    ) {

      return "2TB SSD";

    }


    if (
      /\b1\s?tb\b/i.test(
        lower
      )
    ) {

      return "1TB SSD";

    }


    if (
      /\b(500|512)\s?gb\b/i.test(
        lower
      )
    ) {

      return "500GB SSD";

    }


    if (
      /\b256\s?gb\b/i.test(
        lower
      )
    ) {

      return "256GB SSD";

    }

  }


  if (
    lower.includes("hdd") &&
    !hasSSD
  ) {

    return "HDD Only";

  }


  return null;
}



// ============================================================
// DETECT PSU
// ============================================================

function detectPSU(text) {

  const lower =
    text.toLowerCase();


  const wattMatch =
    lower.match(
      /\b(450|500|550|600|650|700|750|800|850|900|1000|1200|1300)\s?w\b/i
    );


  const modelPatterns = [

    /corsair\s+rm\d{3,4}x?/i,

    /seasonic\s+[a-z0-9\- ]+/i,

    /evga\s+supernova\s+[a-z0-9\- ]+/i,

    /msi\s+mpg\s+[a-z0-9\- ]+/i

  ];


  let model = "";


  for (
    const pattern
    of modelPatterns
  ) {

    const match =
      text.match(pattern);


    if (match) {

      model =
        match[0].trim();

      break;

    }

  }


  if (
    model &&
    wattMatch
  ) {

    if (
      !model
        .toLowerCase()
        .includes(
          wattMatch[0]
            .toLowerCase()
        )
    ) {

      return (
        model +
        " " +
        wattMatch[0].toUpperCase()
      );

    }


    return model;

  }


  if (model) {
    return model;
  }


  if (wattMatch) {

    return wattMatch[0]
      .toUpperCase();

  }


  return null;
}



// ============================================================
// DETECT COOLER
// ============================================================

function detectCooler(text) {

  const lower =
    text.toLowerCase();


  if (
    lower.includes("360mm") &&
    (
      lower.includes("aio") ||
      lower.includes("liquid")
    )
  ) {

    return "aio360";

  }


  if (
    lower.includes("280mm") &&
    (
      lower.includes("aio") ||
      lower.includes("liquid")
    )
  ) {

    return "aio280";

  }


  if (
    lower.includes("240mm") &&
    (
      lower.includes("aio") ||
      lower.includes("liquid")
    )
  ) {

    return "aio240";

  }


  if (
    lower.includes("stock cooler")
  ) {

    return "stock";

  }


  if (
    lower.includes("air cooler")
  ) {

    return "air";

  }


  return null;
}



// ============================================================
// DETECT CONDITION
// ============================================================

function detectCondition(text) {

  const lower =
    text.toLowerCase();


  if (
    lower.includes(
      "excellent condition"
    ) ||
    lower.includes(
      "like new"
    ) ||
    lower.includes(
      "mint condition"
    )
  ) {

    return "excellent";

  }


  if (
    lower.includes(
      "poor condition"
    ) ||
    lower.includes(
      "for parts"
    ) ||
    lower.includes(
      "needs repair"
    )
  ) {

    return "poor";

  }


  if (
    lower.includes(
      "fair condition"
    )
  ) {

    return "fair";

  }


  if (
    lower.includes(
      "good condition"
    ) ||
    lower.includes(
      "works great"
    ) ||
    lower.includes(
      "fully working"
    )
  ) {

    return "good";

  }


  return null;
}



// ============================================================
// DETECT PRICE
// ============================================================

function detectPrice(text) {

  const patterns = [

    /(?:asking|price|priced at|selling for)\s*:?\s*\$?\s*([\d,]+(?:\.\d{1,2})?)/i,

    /\$\s*([\d,]+(?:\.\d{1,2})?)/g

  ];


  const directMatch =
    text.match(
      patterns[0]
    );


  if (directMatch) {

    return Number(
      directMatch[1]
        .replace(/,/g, "")
    );

  }


  const dollarMatches =
    [
      ...text.matchAll(
        patterns[1]
      )
    ];


  if (
    dollarMatches.length
  ) {

    const last =
      dollarMatches[
        dollarMatches.length - 1
      ];


    return Number(
      last[1]
        .replace(/,/g, "")
    );

  }


  return null;
}



// ============================================================
// DETECT CURRENCY
// ============================================================

function detectCurrency(text) {

  const lower =
    text.toLowerCase();


  if (
    lower.includes("usd") ||
    lower.includes(
      "us dollars"
    )
  ) {

    return "USD";

  }


  if (
    lower.includes("cad") ||
    lower.includes(
      "canadian"
    )
  ) {

    return "CAD";

  }


  // PCDeal currently assumes CAD
  // when no currency is specified.

  return "CAD";
}



// ============================================================
// SET SELECT VALUE SAFELY
// ============================================================

function setSelectValue(
  elementId,
  value
) {

  if (!value) {
    return false;
  }


  const select =
    document.getElementById(
      elementId
    );


  if (!select) {
    return false;
  }


  const options =
    Array.from(
      select.options
    );


  const exact =
    options.find(
      option =>
        option.value === value
    );


  if (exact) {

    select.value = value;

    return true;

  }


  return false;
}



// ============================================================
// LISTING PARSER
// ============================================================

function parseListing() {

  const listingElement =
    document.getElementById(
      "listingText"
    );


  const messageElement =
    document.getElementById(
      "parseMessage"
    );


  if (!listingElement) {

    console.error(
      "listingText element not found."
    );

    return;

  }


  const listing =
    listingElement.value.trim();


  if (!listing) {

    if (messageElement) {

      messageElement.innerHTML =
        "Paste a PC listing first.";

    }

    return;

  }


  const found = [];


  // ----------------------------------------------------------
  // CPU
  // ----------------------------------------------------------

  const detectedCPU =
    detectCPUFromText(
      listing
    );


  if (detectedCPU) {

    const cpuField =
      document.getElementById(
        "cpu"
      );


    if (cpuField) {

      cpuField.value =
        detectedCPU.name;

    }


    found.push(
      `CPU: ${detectedCPU.name}`
    );


    // CPU immediately controls RAM compatibility.

    updateMemoryFromCPU();

  }


  // ----------------------------------------------------------
  // GPU
  // ----------------------------------------------------------

  const detectedGPU =
    detectGPUFromText(
      listing
    );


  if (detectedGPU) {

    const gpuField =
      document.getElementById(
        "gpu"
      );


    if (gpuField) {

      gpuField.value =
        detectedGPU.name;

    }


    found.push(
      `GPU: ${detectedGPU.name}`
    );

  }


  // ----------------------------------------------------------
  // RAM CAPACITY
  // ----------------------------------------------------------

  const detectedRam =
    detectRamCapacity(
      listing
    );


  if (detectedRam) {

    if (
      setSelectValue(
        "ram",
        detectedRam
      )
    ) {

      found.push(
        `RAM: ${detectedRam}`
      );

    }

  }


  // ----------------------------------------------------------
  // RAM TYPE
  // ----------------------------------------------------------

  const listedRamType =
    detectRamType(
      listing
    );


  if (detectedCPU) {

    const cpuCompatibility =
      getCPUCompatibility(
        detectedCPU
      );


    // CPU only allows one memory generation.

    if (
      cpuCompatibility &&
      cpuCompatibility.memory.length ===
      1
    ) {

      const requiredRam =
        cpuCompatibility.memory[0];


      setRamOptions(
        [requiredRam],
        true
      );


      found.push(
        `RAM Type: ${requiredRam} (from CPU compatibility)`
      );


      // Listing says something incompatible.

      if (
        listedRamType &&
        listedRamType !==
        requiredRam
      ) {

        found.push(
          `⚠️ Listing says ${listedRamType}, but ${detectedCPU.name} requires ${requiredRam}`
        );

      }

    }


    // CPU allows several memory generations.

    else if (
      cpuCompatibility &&
      cpuCompatibility.memory.length >
      1
    ) {

      setRamOptions(
        cpuCompatibility.memory,
        false
      );


      if (
        listedRamType &&
        cpuCompatibility.memory.includes(
          listedRamType
        )
      ) {

        setSelectValue(
          "ramType",
          listedRamType
        );


        found.push(
          `RAM Type: ${listedRamType}`
        );

      }

      else {

        found.push(
          `RAM Type: ${cpuCompatibility.memory.join(" / ")} depending on motherboard`
        );

      }

    }

  }


  // No CPU detected:
  // use listing RAM information normally.

  else if (listedRamType) {

    restoreRamTypeDropdown();


    if (
      setSelectValue(
        "ramType",
        listedRamType
      )
    ) {

      found.push(
        `RAM Type: ${listedRamType}`
      );

    }

  }


  // ----------------------------------------------------------
  // STORAGE
  // ----------------------------------------------------------

  const detectedStorage =
    detectStorage(
      listing
    );


  if (detectedStorage) {

    if (
      setSelectValue(
        "storage",
        detectedStorage
      )
    ) {

      found.push(
        `Storage: ${detectedStorage}`
      );

    }

  }


  // ----------------------------------------------------------
  // MOTHERBOARD
  // ----------------------------------------------------------

  const chipset =
    detectChipsetFromText(
      listing
    );


  if (chipset) {

    const motherboardField =
      document.getElementById(
        "motherboard"
      );


    if (motherboardField) {

      motherboardField.value =
        chipset;

    }


    found.push(
      `Motherboard chipset: ${chipset}`
    );


    // Check immediately if CPU known.

    if (detectedCPU) {

      const check =
        checkCPUChipsetCompatibility(
          detectedCPU,
          chipset
        );


      if (
        check.compatible ===
        false
      ) {

        found.push(
          `❌ ${chipset} is not compatible with ${detectedCPU.name}`
        );

      }

    }

  }


  // ----------------------------------------------------------
  // PSU
  // ----------------------------------------------------------

  const detectedPSU =
    detectPSU(
      listing
    );


  if (detectedPSU) {

    const psuField =
      document.getElementById(
        "psu"
      );


    if (psuField) {

      psuField.value =
        detectedPSU;

    }


    found.push(
      `PSU: ${detectedPSU}`
    );

  }


  // ----------------------------------------------------------
  // COOLER
  // ----------------------------------------------------------

  const detectedCooler =
    detectCooler(
      listing
    );


  if (detectedCooler) {

    if (
      setSelectValue(
        "cooler",
        detectedCooler
      )
    ) {

      found.push(
        "CPU cooler detected"
      );

    }

  }


  // ----------------------------------------------------------
  // CONDITION
  // ----------------------------------------------------------

  const detectedCondition =
    detectCondition(
      listing
    );


  if (detectedCondition) {

    if (
      setSelectValue(
        "condition",
        detectedCondition
      )
    ) {

      const label =
        detectedCondition
          .charAt(0)
          .toUpperCase() +
        detectedCondition.slice(1);


      found.push(
        `Condition: ${label}`
      );

    }

  }


  // ----------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------

  const detectedPrice =
    detectPrice(
      listing
    );


  if (detectedPrice) {

    const priceField =
      document.getElementById(
        "price"
      );


    if (priceField) {

      priceField.value =
        detectedPrice;

    }


    found.push(
      `Price: ${formatMoney(detectedPrice)}`
    );

  }


  // ----------------------------------------------------------
  // CURRENCY
  // ----------------------------------------------------------

  const detectedCurrency =
    detectCurrency(
      listing
    );


  if (
    setSelectValue(
      "currency",
      detectedCurrency
    )
  ) {

    if (detectedPrice) {

      found.push(
        `Currency: ${detectedCurrency}`
      );

    }

  }


  // ----------------------------------------------------------
  // PARSE MESSAGE
  // ----------------------------------------------------------

  if (messageElement) {

    if (
      found.length === 0
    ) {

      messageElement.innerHTML = `

        ❌ No supported hardware detected.

        <br><br>

        Try something like:

        <br>

        Ryzen 7 5700X,
        RTX 3080,
        32GB DDR4,
        1TB NVMe SSD,
        B550 motherboard,
        $1000 CAD

      `;

    }

    else {

      messageElement.innerHTML = `

        <strong>
          ✅ Detected ${found.length} details:
        </strong>

        <br><br>

        ${found.join("<br>")}

      `;

    }

  }


  // ----------------------------------------------------------
  // SCROLL TO ANALYZER
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
// DEBUG FUNCTIONS
// ============================================================
//
// Open Chrome console and try:
//
// testPCDeal()
//
// ============================================================

function testPCDeal() {

  console.log(
    "===== PCDeal Test ====="
  );


  console.log(
    "Database:",
    typeof getDatabaseStats ===
      "function"
      ? getDatabaseStats()
      : "Database unavailable"
  );


  const testCPU =
    findCPU(
      "i7-4790K"
    );


  console.log(
    "i7-4790K:",
    testCPU
  );


  if (testCPU) {

    console.log(
      "4790K compatibility:",
      getCPUCompatibility(
        testCPU
      )
    );

  }


  console.log(
    "GTX 1080 Ti:",
    findGPU(
      "GTX 1080 Ti"
    )
  );


  console.log(
    "Listing CPU test:",
    detectCPUFromText(
      "Intel Core i7-4790K GTX 1080 Ti"
    )
  );


  console.log(
    "Listing GPU test:",
    detectGPUFromText(
      "Intel Core i7-4790K GTX 1080 Ti"
    )
  );


  console.log(
    "======================="
  );

}
