// ============================================================
// PCDEAL APP
// FULL REPLACEMENT
// STORAGE PARSER UPGRADE
// ============================================================


// ============================================================
// INITIAL SETUP
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
// GENERAL HELPERS
// ============================================================

function normalizeDetectionText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/\s+/g, " ")
    .trim();
}


function formatMoney(amount, currency = "CAD") {
  const value = Number(amount || 0);

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency || "CAD",
    maximumFractionDigits: 0
  }).format(value);
}


// ============================================================
// RAM TYPE DROPDOWN
// ============================================================

function restoreRamTypeDropdown() {
  const select = document.getElementById("ramType");

  if (!select) {
    return;
  }

  select.innerHTML = `
    <option value="">Unknown</option>
    <option value="DDR2">DDR2</option>
    <option value="DDR3">DDR3</option>
    <option value="DDR4">DDR4</option>
    <option value="DDR5">DDR5</option>
  `;

  select.disabled = false;
}


function setRamOptions(memoryTypes, automatic = false, selectedMemory = null) {
  const select = document.getElementById("ramType");

  if (!select) {
    return;
  }

  restoreRamTypeDropdown();

  const validTypes = Array.isArray(memoryTypes)
    ? memoryTypes.filter(Boolean)
    : [];

  if (validTypes.length === 0) {
    return;
  }

  select.innerHTML = "";

  for (const type of validTypes) {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    select.appendChild(option);
  }

  if (
    selectedMemory &&
    validTypes.includes(selectedMemory)
  ) {
    select.value = selectedMemory;
  } else {
    select.value = validTypes[0];
  }

  select.disabled =
    automatic === true &&
    validTypes.length === 1;
}


// ============================================================
// CPU -> RAM COMPATIBILITY
// ============================================================

function updateMemoryCompatibility() {
  const cpuInput = document.getElementById("cpu");
  const motherboardInput = document.getElementById("motherboard");

  if (!cpuInput) {
    return;
  }

  const cpuText = cpuInput.value.trim();
  const motherboardText =
    motherboardInput?.value.trim() || "";

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

  if (typeof getBestMemorySelection === "function") {
    const memory =
      getBestMemorySelection(
        cpu,
        motherboardText
      );

    if (memory) {
      const options =
        memory.memoryTypes ||
        memory.allowedMemory ||
        memory.options ||
        [];

      const selected =
        memory.selectedMemory ||
        memory.memoryType ||
        null;

      const automatic =
        memory.automatic === true ||
        options.length === 1;

      if (options.length > 0) {
        setRamOptions(
          options,
          automatic,
          selected
        );
        return;
      }
    }
  }

  if (typeof getCPUMemoryTypes === "function") {
    const memoryTypes =
      getCPUMemoryTypes(cpu);

    if (memoryTypes.length > 0) {
      setRamOptions(
        memoryTypes,
        memoryTypes.length === 1
      );
      return;
    }
  }

  restoreRamTypeDropdown();
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
  let value = 0;

  if (capacity === "8GB") {
    value = 20;
  } else if (capacity === "16GB") {
    value = 40;
  } else if (capacity === "32GB") {
    value = 70;
  } else if (capacity === "64GB+") {
    value = 120;
  }

  if (type === "DDR5") {
    value += 25;
  } else if (type === "DDR3") {
    value -= 5;
  } else if (type === "DDR2") {
    value -= 10;
  }

  return Math.max(value, 0);
}


// ============================================================
// MOTHERBOARD VALUE
// ============================================================

function getMotherboardValue(motherboard, cpu) {
  const text =
    String(motherboard || "")
      .toLowerCase();

  if (
    /(x870e|x870|x670e|x670|z890|z790|z690|x570|x470|x370|x299|x99|x79|x58)/i
      .test(text)
  ) {
    return 170;
  }

  if (
    /(b850|b840|b650e|b650|b760|b660|b560|b550|b450|h770|h670|h570|z590|z490|z390|z370)/i
      .test(text)
  ) {
    return 110;
  }

  if (
    /(z270|z170|z97|z87|z77|z75|z68|p67|990fx|990x|970)/i
      .test(text)
  ) {
    return 80;
  }

  if (
    /(a620|a520|a320|h610|h510|h410|h310|h110|h81|h61)/i
      .test(text)
  ) {
    return 55;
  }

  if (motherboard) {
    return 75;
  }

  const socket =
    cpu?.socket ||
    cpu?.platform ||
    "";

  if (
    socket === "AM5" ||
    socket === "LGA1851"
  ) {
    return 100;
  }

  if (
    socket === "AM4" ||
    socket === "LGA1700"
  ) {
    return 85;
  }

  if (
    socket === "LGA1200" ||
    socket === "LGA1151-300"
  ) {
    return 65;
  }

  if (
    socket === "LGA1150" ||
    socket === "LGA1155"
  ) {
    return 45;
  }

  return 50;
}


// ============================================================
// PSU VALUE
// ============================================================

function getPSUValue(psu) {
  const text =
    String(psu || "")
      .toLowerCase();

  if (!text) {
    return 0;
  }

  let value = 50;

  if (
    /(corsair|seasonic|evga|super flower|be quiet|thermaltake|msi|asus|cooler master|nzxt|antec)/i
      .test(text)
  ) {
    value = 100;
  }

  if (/(1000|1200|1300)\s*w/i.test(text)) {
    value += 30;
  } else if (/850\s*w/i.test(text)) {
    value += 20;
  } else if (/750\s*w/i.test(text)) {
    value += 10;
  }

  return value;
}


// ============================================================
// COOLER VALUE
// ============================================================

function getCoolerValue(cooler) {
  const values = {
    "Stock cooler": 10,
    "Air cooler": 40,
    "240mm AIO": 60,
    "280mm AIO": 75,
    "360mm AIO": 90
  };

  return values[cooler] || 20;
}


// ============================================================
// CASE VALUE
// ============================================================

function getCaseValue(caseQuality) {
  const values = {
    basic: 35,
    mid: 70,
    premium: 120
  };

  return values[caseQuality] || 50;
}


// ============================================================
// CONDITION
// ============================================================

function getConditionMultiplier(condition) {
  const values = {
    excellent: 1.05,
    good: 1,
    fair: 0.9,
    poor: 0.75
  };

  return values[condition] || 1;
}


// ============================================================
// GAMING DESCRIPTION
// ============================================================

function getGamingDescription(gpu) {
  const performance =
    Number(gpu?.performance || 0);

  if (performance >= 80) {
    return "Excellent 1440p / capable 4K gaming";
  }

  if (performance >= 60) {
    return "Strong 1440p gaming";
  }

  if (performance >= 40) {
    return "Good 1080p gaming";
  }

  if (performance >= 25) {
    return "Entry-level 1080p gaming";
  }

  return "Basic or older gaming performance";
}


// ============================================================
// BALANCE DESCRIPTION
// ============================================================

function getBalanceDescription(cpu, gpu) {
  const cpuScore =
    Number(cpu?.performance || 0);

  const gpuScore =
    Number(gpu?.performance || 0);

  const difference =
    cpuScore - gpuScore;

  if (Math.abs(difference) <= 20) {
    return "CPU and GPU are reasonably balanced.";
  }

  if (difference > 20) {
    return "CPU is stronger relative to the GPU.";
  }

  return "GPU is stronger relative to the CPU.";
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

  if (score >= 65) {
    return "Fair price";
  }

  if (score >= 50) {
    return "Slightly overpriced";
  }

  return "Overpriced";
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

  const askingPrice =
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

  const result =
    document.getElementById("result");

  const scoreElement =
    document.getElementById("score");

  const verdictElement =
    document.getElementById("verdict");

  const resultText =
    document.getElementById("resultText");

  if (
    !cpuText ||
    !gpuText ||
    !askingPrice
  ) {
    alert(
      "Please enter the CPU, GPU, and asking price."
    );
    return;
  }

  const cpu =
    typeof findCPU === "function"
      ? findCPU(cpuText) ||
        (
          typeof detectCPUFromText === "function"
            ? detectCPUFromText(cpuText)
            : null
        )
      : null;

  const gpu =
    typeof findGPU === "function"
      ? findGPU(gpuText) ||
        (
          typeof detectGPUFromText === "function"
            ? detectGPUFromText(gpuText)
            : null
        )
      : null;

  if (!cpu || !gpu) {
    alert(
      "PCDeal could not identify the CPU or GPU."
    );
    return;
  }

  const cpuValue =
    Number(cpu.value || 0);

  const gpuValue =
    Number(gpu.value || 0);

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

  const rawValue =
    cpuValue +
    gpuValue +
    ramValue +
    storageValue +
    motherboardValue +
    psuValue +
    coolerValue +
    caseValue;

  const estimatedValue =
    rawValue *
    getConditionMultiplier(condition);

  const lowEstimate =
    Math.round(
      estimatedValue * 0.9
    );

  const highEstimate =
    Math.round(
      estimatedValue * 1.1
    );

  const ratio =
    askingPrice /
    Math.max(
      estimatedValue,
      1
    );

  let score = 35;

  if (ratio <= 0.7) {
    score = 95;
  } else if (ratio <= 0.8) {
    score = 90;
  } else if (ratio <= 0.9) {
    score = 85;
  } else if (ratio <= 1) {
    score = 78;
  } else if (ratio <= 1.1) {
    score = 68;
  } else if (ratio <= 1.2) {
    score = 55;
  }

  let compatibility = null;

  if (
    typeof checkFullPlatformCompatibility ===
      "function"
  ) {
    compatibility =
      checkFullPlatformCompatibility(
        cpu,
        motherboard,
        ramType
      );
  }

  if (
    compatibility &&
    Array.isArray(
      compatibility.issues
    ) &&
    compatibility.issues.length > 0
  ) {
    score =
      Math.min(
        score,
        25
      );
  }

  const filledFields = [
    cpuText,
    gpuText,
    ram,
    ramType,
    storage,
    motherboard,
    psu,
    cooler,
    condition
  ].filter(Boolean).length;

  const confidence =
    Math.round(
      (
        filledFields / 9
      ) *
      100
    );

  const suggestedOffer =
    Math.min(
      askingPrice,
      Math.round(
        estimatedValue *
        0.85 /
        10
      ) *
      10
    );

  const socket =
    cpu.socket ||
    cpu.platform ||
    "Unknown";

  const compatibleRam =
    typeof getCPUMemoryTypes === "function"
      ? getCPUMemoryTypes(cpu)
      : [];

  let detectedChipset = "";

  if (
    motherboard &&
    typeof findChipsetInText === "function"
  ) {
    detectedChipset =
      findChipsetInText(
        motherboard
      ) || "";
  }

  const warnings = [];

  if (
    cpu.fallback ||
    cpu.exactMarketValue === false
  ) {
    warnings.push(
      "CPU detected, but exact market value is unavailable."
    );
  }

  if (
    gpu.fallback ||
    gpu.exactMarketValue === false
  ) {
    warnings.push(
      "GPU detected, but exact market value is unavailable."
    );
  }

  if (
    compatibility?.issues?.length
  ) {
    warnings.push(
      ...compatibility.issues
    );
  }

  if (
    compatibility?.warnings?.length
  ) {
    warnings.push(
      ...compatibility.warnings
    );
  }

  const verdict =
    getDealVerdict(score);

  if (scoreElement) {
    scoreElement.textContent =
      `${score}/100`;
  }

  if (verdictElement) {
    verdictElement.textContent =
      verdict;
  }

  if (resultText) {
    resultText.innerHTML = `
      <p><strong>CPU:</strong> ${cpu.name || cpuText}</p>

      <p><strong>GPU:</strong> ${gpu.name || gpuText}</p>

      <p><strong>Asking price:</strong> ${formatMoney(askingPrice, currency)}</p>

      <p>
        <strong>Estimated system value:</strong>
        ${formatMoney(lowEstimate, currency)}
        –
        ${formatMoney(highEstimate, currency)}
      </p>

      <p><strong>Suggested offer:</strong> ${formatMoney(suggestedOffer, currency)}</p>

      <p><strong>Confidence:</strong> ${confidence}%</p>

      <p><strong>Gaming:</strong> ${getGamingDescription(gpu)}</p>

      <p><strong>CPU socket:</strong> ${socket}</p>

      <p>
        <strong>Compatible RAM:</strong>
        ${
          compatibleRam.length
            ? compatibleRam.join(", ")
            : "Unknown"
        }
      </p>

      <p>
        <strong>Detected chipset:</strong>
        ${detectedChipset || "Unknown"}
      </p>

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

      <p><strong>RAM estimate:</strong> ${formatMoney(ramValue, currency)}</p>

      <p><strong>Storage estimate:</strong> ${formatMoney(storageValue, currency)}</p>

      <p><strong>Motherboard estimate:</strong> ${formatMoney(motherboardValue, currency)}</p>

      <p><strong>PSU estimate:</strong> ${formatMoney(psuValue, currency)}</p>

      <p><strong>System balance:</strong> ${getBalanceDescription(cpu, gpu)}</p>

      ${
        warnings.length
          ? `
            <p>
              <strong>Warnings:</strong>
              ${warnings.join(" • ")}
            </p>
          `
          : ""
      }
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
// RAM CAPACITY
// ============================================================

function detectRamCapacity(text) {
  const t =
    String(text || "")
      .toLowerCase()
      .replace(/×/g, "x")
      .replace(/\s+/g, " ");

  const kit =
    t.match(
      /(\d)\s*x\s*(4|8|16|24|32|48|64)\s*(?:gb)?/i
    );

  if (kit) {
    const sticks =
      Number(kit[1]);

    const perStick =
      Number(kit[2]);

    const total =
      sticks * perStick;

    if (total >= 64) {
      return "64GB+";
    }

    if (total >= 32) {
      return "32GB";
    }

    if (total >= 16) {
      return "16GB";
    }

    if (total >= 8) {
      return "8GB";
    }
  }

  const direct =
    t.match(
      /\b(8|16|32|64|96|128)\s*(?:gb|gigs?|gigabytes?)\b/i
    );

  if (direct) {
    const total =
      Number(direct[1]);

    if (total >= 64) {
      return "64GB+";
    }

    if (total >= 32) {
      return "32GB";
    }

    if (total >= 16) {
      return "16GB";
    }

    if (total >= 8) {
      return "8GB";
    }
  }

  return "";
}


// ============================================================
// RAM TYPE
// ============================================================

function detectRamType(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (
    /\bddr\s*5\b/i.test(t) ||
    /\bd5\b/i.test(t)
  ) {
    return "DDR5";
  }

  if (
    /\bddr\s*4\b/i.test(t) ||
    /\bd4\b/i.test(t)
  ) {
    return "DDR4";
  }

  if (
    /\bddr\s*3\b/i.test(t) ||
    /\bd3\b/i.test(t)
  ) {
    return "DDR3";
  }

  if (
    /\bddr\s*2\b/i.test(t)
  ) {
    return "DDR2";
  }

  return "";
}


// ============================================================
// RAM SPEED
// ============================================================

function detectRamSpeed(text) {
  const match =
    String(text || "")
      .match(
        /\b(\d{3,5})\s*(?:mhz|mt\/s|mts)\b/i
      );

  if (!match) {
    return "";
  }

  const speed =
    Number(match[1]);

  if (
    speed < 800 ||
    speed > 10000
  ) {
    return "";
  }

  return `${speed}MHz`;
}


// ============================================================
// STORAGE HELPERS
// ============================================================

function storageCapacityToGB(number, unit) {
  const value =
    Number(number);

  if (!Number.isFinite(value)) {
    return 0;
  }

  if (
    String(unit)
      .toLowerCase() === "tb"
  ) {
    return value * 1000;
  }

  return value;
}


function detectStorageType(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (
    /\bnvme\b/i.test(t) ||
    /\bm\.?2\b/i.test(t)
  ) {
    return "NVMe SSD";
  }

  if (
    /\bssd\b/i.test(t) ||
    /solid\s*state/i.test(t)
  ) {
    return "SSD";
  }

  if (
    /\bhdd\b/i.test(t) ||
    /hard\s*drive/i.test(t) ||
    /hard\s*disk/i.test(t)
  ) {
    return "HDD";
  }

  return "Unknown";
}


// ============================================================
// DETECT ALL STORAGE DRIVES
// ============================================================

function detectStorageDetails(text) {
  const listing =
    String(text || "")
      .replace(/×/g, "x");

  const sections =
    listing
      .split(/\n|•|\||;/)
      .map(
        section =>
          section.trim()
      )
      .filter(Boolean);

  const drives = [];

  for (const section of sections) {
    const looksLikeRam =
      /\b(?:ddr[2345]|ram|memory)\b/i
        .test(section);

    const looksLikeStorage =
      /\b(?:ssd|nvme|m\.?2|hdd|storage|hard\s*drive|hard\s*disk|drive)\b/i
        .test(section);

    if (
      looksLikeRam &&
      !looksLikeStorage
    ) {
      continue;
    }

    const regex =
      /(\d+(?:\.\d+)?)\s*(tb|gb)\b(?:\s*(nvme|ssd|hdd|m\.?2|storage|hard\s*drive|hard\s*disk))?/gi;

    let match;

    while (
      (
        match =
          regex.exec(section)
      ) !== null
    ) {
      const amount =
        Number(match[1]);

      const unit =
        String(match[2])
          .toUpperCase();

      const capacityGB =
        storageCapacityToGB(
          amount,
          unit
        );

      if (
        capacityGB < 64 &&
        !looksLikeStorage
      ) {
        continue;
      }

      const nearbyStart =
        Math.max(
          0,
          match.index - 30
        );

      const nearbyEnd =
        Math.min(
          section.length,
          regex.lastIndex + 30
        );

      const nearby =
        section.slice(
          nearbyStart,
          nearbyEnd
        );

      let type =
        detectStorageType(
          nearby
        );

      const matchedType =
        String(
          match[3] || ""
        ).toLowerCase();

      if (
        matchedType === "nvme" ||
        matchedType === "m.2" ||
        matchedType === "m2"
      ) {
        type = "NVMe SSD";
      } else if (
        matchedType === "ssd"
      ) {
        type = "SSD";
      } else if (
        matchedType === "hdd" ||
        matchedType.includes("hard")
      ) {
        type = "HDD";
      }

      const duplicate =
        drives.some(
          drive =>
            drive.capacityGB === capacityGB &&
            drive.type === type
        );

      if (!duplicate) {
        drives.push({
          capacity:
            `${amount}${unit}`,
          capacityGB,
          type,
          raw:
            match[0]
        });
      }
    }
  }

  const genericStorageRegex =
    /\b(\d+(?:\.\d+)?)\s*(tb|gb)\s+(?:of\s+)?storage\b/gi;

  let genericMatch;

  while (
    (
      genericMatch =
        genericStorageRegex.exec(
          listing
        )
    ) !== null
  ) {
    const amount =
      Number(
        genericMatch[1]
      );

    const unit =
      String(
        genericMatch[2]
      ).toUpperCase();

    const capacityGB =
      storageCapacityToGB(
        amount,
        unit
      );

    const duplicate =
      drives.some(
        drive =>
          drive.capacityGB ===
            capacityGB
      );

    if (!duplicate) {
      drives.push({
        capacity:
          `${amount}${unit}`,
        capacityGB,
        type:
          "Unknown",
        raw:
          genericMatch[0]
      });
    }
  }

  return drives;
}


// ============================================================
// STORAGE DESCRIPTION
// ============================================================

function getStorageDescription(drives) {
  if (
    !Array.isArray(drives) ||
    drives.length === 0
  ) {
    return "";
  }

  return drives
    .map(
      drive => {
        if (
          drive.type === "Unknown"
        ) {
          return `${drive.capacity} storage`;
        }

        return `${drive.capacity} ${drive.type}`;
      }
    )
    .join(" + ");
}


// ============================================================
// STORAGE DROPDOWN MAPPING
// ============================================================

function detectStorage(text) {
  const drives =
    detectStorageDetails(text);

  if (
    drives.length === 0
  ) {
    return "";
  }

  const solidState =
    drives.filter(
      drive =>
        drive.type === "SSD" ||
        drive.type === "NVMe SSD"
    );

  let primary;

  if (
    solidState.length > 0
  ) {
    primary =
      [...solidState]
        .sort(
          (a, b) =>
            b.capacityGB -
            a.capacityGB
        )[0];
  } else {
    primary =
      [...drives]
        .sort(
          (a, b) =>
            b.capacityGB -
            a.capacityGB
        )[0];
  }

  const size =
    primary.capacityGB;

  if (
    primary.type === "SSD" ||
    primary.type === "NVMe SSD"
  ) {
    if (size >= 1500) {
      return "2TB SSD";
    }

    if (size >= 750) {
      return "1TB SSD";
    }

    if (size >= 350) {
      return "500GB SSD";
    }

    return "256GB SSD";
  }

  if (
    primary.type === "Unknown"
  ) {
    if (size >= 1500) {
      return "2TB SSD";
    }

    if (size >= 750) {
      return "1TB SSD";
    }

    if (size >= 350) {
      return "500GB SSD";
    }

    if (size >= 64) {
      return "256GB SSD";
    }
  }

  if (
    primary.type === "HDD"
  ) {
    return "HDD Only";
  }

  return "";
}


// ============================================================
// PSU DETECTION
// ============================================================

function detectPSU(text) {
  const lines =
    String(text || "")
      .split(/\n|•|\|/)
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);

  for (const line of lines) {
    if (
      /\b(?:psu|power\s*supply)\b/i
        .test(line) ||
      /\b(?:4\d\d|5\d\d|6\d\d|7\d\d|8\d\d|9\d\d|1[0-5]\d\d)\s*w\b/i
        .test(line)
    ) {
      return line;
    }
  }

  return "";
}


// ============================================================
// COOLER DETECTION
// ============================================================

function detectCooler(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (
    /\b360\s*mm\b.*\b(?:aio|liquid|water)\b/i
      .test(t) ||
    /\b(?:aio|liquid|water)\b.*\b360\s*mm\b/i
      .test(t)
  ) {
    return "360mm AIO";
  }

  if (
    /\b280\s*mm\b.*\b(?:aio|liquid|water)\b/i
      .test(t) ||
    /\b(?:aio|liquid|water)\b.*\b280\s*mm\b/i
      .test(t)
  ) {
    return "280mm AIO";
  }

  if (
    /\b240\s*mm\b.*\b(?:aio|liquid|water)\b/i
      .test(t) ||
    /\b(?:aio|liquid|water)\b.*\b240\s*mm\b/i
      .test(t)
  ) {
    return "240mm AIO";
  }

  if (
    /\b240\s*mm\s*aio\b/i
      .test(t)
  ) {
    return "240mm AIO";
  }

  if (
    /\b280\s*mm\s*aio\b/i
      .test(t)
  ) {
    return "280mm AIO";
  }

  if (
    /\b360\s*mm\s*aio\b/i
      .test(t)
  ) {
    return "360mm AIO";
  }

  if (
    /\b(?:aio|liquid cooler|water cooler)\b/i
      .test(t)
  ) {
    return "240mm AIO";
  }

  if (
    /\b(?:air cooler|hyper 212|peerless assassin|ak400|ak620|nh-d15|dark rock)\b/i
      .test(t)
  ) {
    return "Air cooler";
  }

  if (
    /\b(?:stock cooler|wraith stealth|wraith prism|intel stock)\b/i
      .test(t)
  ) {
    return "Stock cooler";
  }

  return "";
}


// ============================================================
// CONDITION DETECTION
// ============================================================

function detectCondition(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (
    /\b(?:brand new|like new|mint|excellent)\b/i
      .test(t)
  ) {
    return "excellent";
  }

  if (
    /\b(?:damaged|broken|not working|for parts|poor condition)\b/i
      .test(t)
  ) {
    return "poor";
  }

  if (
    /\b(?:fair|wear|scratches|scratched|cosmetic damage)\b/i
      .test(t)
  ) {
    return "fair";
  }

  return "good";
}


// ============================================================
// PRICE DETECTION
// ============================================================

function detectPrice(text) {
  const listing =
    String(text || "");

  const lines =
    listing
      .split(/\n|•|\|/)
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);

  const trigger =
    /\b(?:asking|asking price|price|priced at|selling for|sell for|firm|obo|or best offer|want|take)\b/i;

  for (const line of lines) {
    if (!trigger.test(line)) {
      continue;
    }

    let match =
      line.match(
        /\$\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)/i
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

    match =
      line.match(
        /\b([0-9]{2,5}(?:\.[0-9]{1,2})?)\s*(?:cad|cdn|usd)\b/i
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

    match =
      line.match(
        trigger.source +
        String.raw`[^0-9$]{0,20}\$?\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)`
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

  const currencyMatches =
    [
      ...listing.matchAll(
        /\$?\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)\s*(?:cad|cdn|usd)\b/gi
      )
    ];

  const validCurrencyPrices =
    currencyMatches
      .map(
        match =>
          Number(match[1])
      )
      .filter(
        value =>
          value >= 20 &&
          value <= 20000
      );

  if (
    validCurrencyPrices.length > 0
  ) {
    return validCurrencyPrices[
      validCurrencyPrices.length - 1
    ];
  }

  const dollarMatches =
    [
      ...listing.matchAll(
        /\$\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)/g
      )
    ];

  const validDollarPrices =
    dollarMatches
      .map(
        match =>
          Number(match[1])
      )
      .filter(
        value =>
          value >= 20 &&
          value <= 20000
      );

  if (
    validDollarPrices.length > 0
  ) {
    return validDollarPrices[
      validDollarPrices.length - 1
    ];
  }

  for (
    let i =
      lines.length - 1;
    i >= 0;
    i--
  ) {
    const match =
      lines[i].match(
        /^\s*\$?\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)\s*(?:cad|cdn|usd|obo|firm)?\s*$/i
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
// CURRENCY
// ============================================================

function detectCurrency(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (
    /\busd\b/i.test(t)
  ) {
    return "USD";
  }

  if (
    /\b(?:cad|cdn)\b/i.test(t)
  ) {
    return "CAD";
  }

  return "CAD";
}


// ============================================================
// SELECT HELPER
// ============================================================

function setSelectValue(id, value) {
  const select =
    document.getElementById(id);

  if (
    !select ||
    !value
  ) {
    return false;
  }

  const exists =
    Array.from(
      select.options
    ).some(
      option =>
        option.value === value
    );

  if (!exists) {
    return false;
  }

  select.value =
    value;

  return true;
}


// ============================================================
// MOTHERBOARD LINE
// ============================================================

function detectMotherboardLine(
  listing,
  chipset
) {
  const lines =
    String(listing || "")
      .split(/\n|•|\|/)
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);

  if (chipset) {
    for (const line of lines) {
      if (
        line
          .toLowerCase()
          .includes(
            String(chipset)
              .toLowerCase()
          )
      ) {
        return line;
      }
    }
  }

  for (const line of lines) {
    if (
      /\b(?:motherboard|mobo|mainboard|board)\b/i
        .test(line)
    ) {
      return line;
    }
  }

  return chipset || "";
}


// ============================================================
// PARSE LISTING
// ============================================================

function parseListing() {
  const listing =
    document.getElementById("listingText")?.value || "";

  const message =
    document.getElementById("parseMessage");

  if (!listing.trim()) {
    if (message) {
      message.textContent =
        "Paste a PC listing first.";
    }

    return;
  }

  const detected = [];
  const warnings = [];

  // ----------------------------------------------------------
  // CPU
  // ----------------------------------------------------------

  const cpu =
    typeof detectCPUFromText === "function"
      ? detectCPUFromText(listing)
      : null;

  if (cpu) {
    const cpuInput =
      document.getElementById("cpu");

    if (cpuInput) {
      cpuInput.value =
        cpu.name || "";
    }

    detected.push(
      `CPU: ${cpu.name}`
    );

    if (
      cpu.fallback ||
      cpu.exactMarketValue === false
    ) {
      warnings.push(
        "CPU recognized, but exact market value is unavailable."
      );
    }
  }

  // ----------------------------------------------------------
  // GPU
  // ----------------------------------------------------------

  const gpu =
    typeof detectGPUFromText === "function"
      ? detectGPUFromText(listing)
      : null;

  if (gpu) {
    const gpuInput =
      document.getElementById("gpu");

    if (gpuInput) {
      gpuInput.value =
        gpu.name || "";
    }

    detected.push(
      `GPU: ${gpu.name}`
    );

    if (
      gpu.fallback ||
      gpu.exactMarketValue === false
    ) {
      warnings.push(
        "GPU recognized, but exact market value is unavailable."
      );
    }
  }

  // ----------------------------------------------------------
  // CHIPSET / MOTHERBOARD
  // ----------------------------------------------------------

  let chipset = "";

  if (
    typeof findChipsetInText === "function"
  ) {
    chipset =
      findChipsetInText(
        listing
      ) || "";
  }

  const motherboard =
    detectMotherboardLine(
      listing,
      chipset
    );

  if (motherboard) {
    const motherboardInput =
      document.getElementById(
        "motherboard"
      );

    if (motherboardInput) {
      motherboardInput.value =
        motherboard;
    }

    detected.push(
      `Motherboard: ${motherboard}`
    );
  }

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

  const listingRamType =
    detectRamType(
      listing
    );

  updateMemoryCompatibility();

  if (
    cpu &&
    typeof getBestMemorySelection ===
      "function"
  ) {
    const memory =
      getBestMemorySelection(
        cpu,
        motherboard
      );

    const allowed =
      memory?.memoryTypes ||
      memory?.allowedMemory ||
      memory?.options ||
      [];

    const automatic =
      memory?.automatic === true ||
      allowed.length === 1;

    const preferred =
      memory?.selectedMemory ||
      memory?.memoryType ||
      null;

    if (
      automatic &&
      allowed.length === 1
    ) {
      setRamOptions(
        allowed,
        true,
        allowed[0]
      );

      detected.push(
        `RAM Type: ${allowed[0]}`
      );

      if (
        listingRamType &&
        listingRamType !==
          allowed[0]
      ) {
        warnings.push(
          `${listingRamType} RAM conflicts with the detected CPU platform, which requires ${allowed[0]}.`
        );
      }
    } else if (
      allowed.length > 0
    ) {
      let selected =
        preferred;

      if (
        listingRamType &&
        allowed.includes(
          listingRamType
        )
      ) {
        selected =
          listingRamType;
      }

      setRamOptions(
        allowed,
        false,
        selected
      );

      if (selected) {
        detected.push(
          `RAM Type: ${selected}`
        );
      }

      if (
        listingRamType &&
        !allowed.includes(
          listingRamType
        )
      ) {
        warnings.push(
          `${listingRamType} RAM may not be compatible with the detected CPU/platform.`
        );
      }
    }
  } else if (
    listingRamType
  ) {
    restoreRamTypeDropdown();

    setSelectValue(
      "ramType",
      listingRamType
    );

    detected.push(
      `RAM Type: ${listingRamType}`
    );
  }

  // ----------------------------------------------------------
  // STORAGE
  // ----------------------------------------------------------

  const storageDetails =
    detectStorageDetails(
      listing
    );

  const storageDescription =
    getStorageDescription(
      storageDetails
    );

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
      storageDescription
        ? `Storage: ${storageDescription}`
        : `Storage: ${storage}`
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
      document.getElementById("psu");

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

    detected.push(
      `Cooler: ${cooler}`
    );
  }

  // ----------------------------------------------------------
  // CONDITION
  // ----------------------------------------------------------

  const condition =
    detectCondition(
      listing
    );

  if (condition) {
    setSelectValue(
      "condition",
      condition
    );

    detected.push(
      `Condition: ${condition}`
    );
  }

  // ----------------------------------------------------------
  // PRICE
  // ----------------------------------------------------------

  const price =
    detectPrice(
      listing
    );

  if (price !== null) {
    const priceInput =
      document.getElementById("price");

    if (priceInput) {
      priceInput.value =
        price;
    }

    detected.push(
      `Price: ${price}`
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

  detected.push(
    `Currency: ${currency}`
  );

  // ----------------------------------------------------------
  // COMPATIBILITY CHECK
  // ----------------------------------------------------------

  const selectedRamType =
    document.getElementById(
      "ramType"
    )?.value || "";

  if (
    cpu &&
    typeof checkFullPlatformCompatibility ===
      "function"
  ) {
    const compatibility =
      checkFullPlatformCompatibility(
        cpu,
        motherboard,
        selectedRamType
      );

    if (
      compatibility?.issues?.length
    ) {
      warnings.push(
        ...compatibility.issues
      );
    }

    if (
      compatibility?.warnings?.length
    ) {
      warnings.push(
        ...compatibility.warnings
      );
    }
  }

  // ----------------------------------------------------------
  // STATUS MESSAGE
  // ----------------------------------------------------------

  if (message) {
    let output =
      detected.length
        ? `Detected: ${detected.join(" • ")}`
        : "No parts detected.";

    if (
      warnings.length > 0
    ) {
      output +=
        ` | Warnings: ${warnings.join(" • ")}`;
    }

    message.textContent =
      output;
  }

  // ----------------------------------------------------------
  // SCROLL TO CPU
  // ----------------------------------------------------------

  const cpuField =
    document.getElementById("cpu");

  if (cpuField) {
    cpuField.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}
