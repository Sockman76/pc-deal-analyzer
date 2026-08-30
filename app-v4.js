// ============================================================
// PCDEAL APP-V4.JS
// VERSION 10
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
    .replace(/®|™/g, "")
    .replace(/[|•]/g, " ")
    .replace(/[-_/(),.:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function formatMoney(amount, currency = "CAD") {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency || "CAD",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);
}


function setSelectValue(id, value) {
  if (!value) return;

  const select = document.getElementById(id);

  if (!select) return;

  const exists = Array.from(select.options).some(
    option => option.value === value
  );

  if (exists) {
    select.value = value;
  }
}


// ============================================================
// RAM TYPE DROPDOWN
// ============================================================

function restoreRamTypeDropdown() {
  const select = document.getElementById("ramType");

  if (!select) return;

  const previous = select.value;

  select.innerHTML = `
    <option value="">Unknown / Not listed</option>
    <option value="DDR2">DDR2</option>
    <option value="DDR3">DDR3</option>
    <option value="DDR4">DDR4</option>
    <option value="DDR5">DDR5</option>
  `;

  select.disabled = false;

  if (
    ["DDR2", "DDR3", "DDR4", "DDR5"].includes(previous)
  ) {
    select.value = previous;
  }
}


function setRamOptions(
  memoryTypes,
  automatic = false,
  selectedMemory = null
) {
  const select = document.getElementById("ramType");

  if (!select) return;

  const types = Array.isArray(memoryTypes)
    ? memoryTypes
    : [];

  if (!types.length) {
    restoreRamTypeDropdown();
    return;
  }

  select.innerHTML = "";

  if (automatic && selectedMemory) {
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


function updateMemoryCompatibility() {
  const cpuInput = document.getElementById("cpu");
  const motherboardInput =
    document.getElementById("motherboard");

  if (!cpuInput) return;

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
      getBestMemorySelection(cpu, motherboard);

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
    const memory = getCPUMemoryTypes(cpu);

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
// VALUE FUNCTIONS
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


function getRamValue(capacity, type) {
  const values = {
    "8GB": 20,
    "16GB": 40,
    "32GB": 70,
    "64GB+": 120
  };

  let value = values[capacity] || 0;

  if (type === "DDR5") value += 25;
  if (type === "DDR3") value -= 5;
  if (type === "DDR2") value -= 10;

  return Math.max(0, value);
}


function getMotherboardValue(motherboard, cpu) {
  const text =
    normalizeDetectionText(motherboard);

  if (text) {
    if (
      /\b(x870e|x870|x670e|x670|z890|z790|z690|x570|x470|x370|x299|x99|x79|x58)\b/i.test(text)
    ) {
      return 170;
    }

    if (
      /\b(b850|b840|b650e|b650|b760|b660|b560|b550|b450|h770|h670|h570|z590|z490|z390|z370)\b/i.test(text)
    ) {
      return 110;
    }

    if (
      /\b(z270|z170|z97|z87|z77|z75|z68|p67|990fx|990x|970)\b/i.test(text)
    ) {
      return 80;
    }

    if (
      /\b(a620|a520|a320|h610|h510|h410|h310|h110|h81|h61)\b/i.test(text)
    ) {
      return 55;
    }

    return 75;
  }

  if (cpu && cpu.socket) {
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


function getPSUValue(psu) {
  if (!psu) return 50;

  const text = psu.toLowerCase();

  let value = 50;

  if (
    /corsair|seasonic|super flower|be quiet|evga|fsp|thermaltake|toughpower|cooler master|nzxt|xpg|silverstone|antec|asus|msi/i.test(text)
  ) {
    value = 100;
  }

  if (
    /\b(1000|1050|1200|1300|1500)\s*w\b/i.test(text)
  ) {
    value += 30;
  } else if (
    /\b850\s*w\b/i.test(text)
  ) {
    value += 20;
  } else if (
    /\b750\s*w\b/i.test(text)
  ) {
    value += 10;
  }

  return value;
}


function getCoolerValue(cooler) {
  const values = {
    stock: 10,
    air: 40,
    aio240: 60,
    aio280: 75,
    aio360: 90
  };

  return values[cooler] || 20;
}


function getCaseValue(caseQuality) {
  const values = {
    basic: 35,
    mid: 70,
    premium: 120
  };

  return values[caseQuality] || 50;
}


function getConditionMultiplier(condition) {
  const values = {
    excellent: 1.05,
    good: 1,
    fair: 0.90,
    poor: 0.75
  };

  return values[condition] || 1;
}


// ============================================================
// PERFORMANCE DESCRIPTIONS
// ============================================================

function getGamingDescription(gpu) {
  if (!gpu) {
    return "Gaming performance unknown";
  }

  const score = gpu.performance || 0;

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


function getBalanceDescription(cpu, gpu) {
  if (!cpu || !gpu) {
    return "Unknown";
  }

  const cpuScore = cpu.performance || 0;
  const gpuScore = gpu.performance || 0;

  const difference =
    cpuScore - gpuScore;

  if (
    Math.abs(difference) <= 15
  ) {
    return "CPU and GPU are reasonably balanced";
  }

  if (difference > 30) {
    return "GPU is likely the main gaming bottleneck";
  }

  if (difference > 15) {
    return "System is somewhat GPU-limited";
  }

  if (difference < -30) {
    return "CPU may significantly limit the GPU in some games";
  }

  return "System may be somewhat CPU-limited";
}


function getDealVerdict(score) {
  if (score >= 90) return "Excellent deal";
  if (score >= 80) return "Good deal";
  if (score >= 70) return "Fair price";
  if (score >= 55) return "A little expensive";
  if (score >= 40) return "Overpriced";

  return "Very overpriced";
}


// ============================================================
// RAM CAPACITY DETECTOR
// ============================================================

function mapRamCapacity(amount) {
  const value = Number(amount);

  if (value >= 64) return "64GB+";
  if (value >= 32) return "32GB";
  if (value >= 16) return "16GB";
  if (value >= 8) return "8GB";

  return "";
}


function detectRamCapacity(text) {
  const t = String(text || "")
    .toLowerCase()
    .replace(/×/g, "x")
    .replace(/\s+/g, " ");

  // Examples:
  // 2x16gb
  // 2 x 16 gb
  // 4x8gb
  // 4 x 8

  const kitMatches = [
    ...t.matchAll(
      /(?:^|[^0-9])([1-8])\s*x\s*(4|8|16|24|32|48|64)\s*(?:gb|gigs?|gigabytes?)?/gi
    )
  ];

  for (const match of kitMatches) {
    const sticks =
      Number(match[1]);

    const perStick =
      Number(match[2]);

    const total =
      sticks * perStick;

    if (
      total === 8 ||
      total === 16 ||
      total === 32 ||
      total >= 64
    ) {
      return mapRamCapacity(total);
    }
  }

  // RAM-specific lines

  const lines =
    String(text || "").split(/\r?\n/);

  for (const line of lines) {
    if (
      !/\b(ram|memory|ddr2|ddr3|ddr4|ddr5)\b/i.test(line)
    ) {
      continue;
    }

    const direct =
      line.match(
        /\b(8|12|16|24|32|48|64|96|128)\s*(?:gb|gigs?|gigabytes?)\b/i
      );

    if (direct) {
      return mapRamCapacity(
        direct[1]
      );
    }
  }

  // 32GB RAM
  // 16GB memory

  const directRam =
    t.match(
      /\b(8|12|16|24|32|48|64|96|128)\s*(?:gb|gigs?|gigabytes?)\s*(?:ram|memory)\b/i
    );

  if (directRam) {
    return mapRamCapacity(
      directRam[1]
    );
  }

  // 32GB DDR4

  const beforeDDR =
    t.match(
      /\b(8|12|16|24|32|48|64|96|128)\s*(?:gb|gigs?|gigabytes?)\s*ddr\s*[2345]\b/i
    );

  if (beforeDDR) {
    return mapRamCapacity(
      beforeDDR[1]
    );
  }

  // Final fallback

  const fallback =
    t.match(
      /\b(8|16|32|64|96|128)\s*(?:gb|gigs?|gigabytes?)\b/i
    );

  if (fallback) {
    return mapRamCapacity(
      fallback[1]
    );
  }

  return "";
}


// ============================================================
// RAM TYPE DETECTOR
// ============================================================

function detectRamType(text) {
  const t = String(text || "")
    .toLowerCase()
    .replace(/[-_/(),.:]/g, " ")
    .replace(/\s+/g, " ");

  if (/\bddr\s*5\b/i.test(t)) return "DDR5";
  if (/\bddr\s*4\b/i.test(t)) return "DDR4";
  if (/\bddr\s*3\b/i.test(t)) return "DDR3";
  if (/\bddr\s*2\b/i.test(t)) return "DDR2";

  if (/\bd5\b/i.test(t)) return "DDR5";
  if (/\bd4\b/i.test(t)) return "DDR4";
  if (/\bd3\b/i.test(t)) return "DDR3";

  return "";
}


// ============================================================
// RAM SPEED
// ============================================================

function detectRamSpeed(text) {
  const lines =
    String(text || "").split(/\r?\n/);

  for (const line of lines) {
    if (
      !/\b(ram|memory|ddr2|ddr3|ddr4|ddr5)\b/i.test(line)
    ) {
      continue;
    }

    const match =
      line.match(
        /\b(1600|1866|2133|2400|2666|2800|2933|3000|3200|3333|3466|3600|3733|3800|4000|4400|4800|5200|5600|6000|6200|6400|6600|6800|7200|7600|8000)\s*(?:mhz|mt\/s|mts)?\b/i
      );

    if (match) {
      return `${match[1]}MHz`;
    }
  }

  return "";
}


// ============================================================
// STORAGE DETECTION
// ============================================================

function storageCapacityToGB(amount, unit) {
  const value = Number(amount);

  if (
    String(unit).toLowerCase() === "tb"
  ) {
    return value * 1000;
  }

  return value;
}


function detectStorageDetails(text) {
  const lines =
    String(text || "").split(/\r?\n/);

  const drives = [];

  for (const line of lines) {
    if (
      !/\b(ssd|nvme|m\.?2|hard drive|hdd|sata)\b/i.test(line)
    ) {
      continue;
    }

    const matches = [
      ...line.matchAll(
        /\b(\d+(?:\.\d+)?)\s*(tb|gb)\b/gi
      )
    ];

    for (const match of matches) {
      let type = "SSD";

      if (
        /\bnvme\b|\bm\.?2\b/i.test(line)
      ) {
        type = "NVMe";
      } else if (
        /\bhdd\b|hard drive/i.test(line) &&
        !/\bssd\b/i.test(line)
      ) {
        type = "HDD";
      }

      drives.push({
        capacityGB:
          storageCapacityToGB(
            match[1],
            match[2]
          ),

        type,

        line: line.trim()
      });
    }
  }

  return drives;
}


function detectStorage(text) {
  const drives =
    detectStorageDetails(text);

  if (drives.length) {
    const solidState =
      drives.filter(
        drive => drive.type !== "HDD"
      );

    if (solidState.length) {
      const largest =
        Math.max(
          ...solidState.map(
            drive => drive.capacityGB
          )
        );

      if (largest >= 1800) {
        return "2TB SSD";
      }

      if (largest >= 900) {
        return "1TB SSD";
      }

      if (largest >= 450) {
        return "500GB SSD";
      }

      if (largest >= 200) {
        return "256GB SSD";
      }
    }

    if (
      drives.every(
        drive => drive.type === "HDD"
      )
    ) {
      return "HDD Only";
    }
  }

  return "";
}


function getStorageDescription(text) {
  const drives =
    detectStorageDetails(text);

  if (!drives.length) {
    return "";
  }

  return drives
    .map(drive => {
      const capacity =
        drive.capacityGB >= 1000
          ? `${drive.capacityGB / 1000}TB`
          : `${drive.capacityGB}GB`;

      return `${capacity} ${drive.type}`;
    })
    .join(" + ");
}


// ============================================================
// PSU DETECTION
// ============================================================

function detectPSU(text) {
  const lines =
    String(text || "").split(/\r?\n/);

  let bestLine = "";
  let bestScore = 0;

  for (const line of lines) {
    let score = 0;

    if (
      /\bpsu\b|power supply/i.test(line)
    ) {
      score += 5;
    }

    if (
      /\b([4-9][0-9]{2}|1[0-5][0-9]{2})\s*(?:w|watt|watts)\b/i.test(line)
    ) {
      score += 4;
    }

    if (
      /corsair|seasonic|evga|cooler master|thermaltake|be quiet|super flower|msi|asus|nzxt|xpg|antec|silverstone/i.test(line)
    ) {
      score += 2;
    }

    if (
      /80\s*\+|80\s*plus|bronze|silver|gold|platinum|titanium/i.test(line)
    ) {
      score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestLine = line.trim();
    }
  }

  return bestScore >= 4
    ? bestLine
    : "";
}


// ============================================================
// COOLER
// ============================================================

function detectCooler(text) {
  const t =
    String(text || "").toLowerCase();

  if (/420\s*mm|420mm/i.test(t)) {
    return "aio360";
  }

  if (/360\s*mm|360mm/i.test(t)) {
    return "aio360";
  }

  if (/280\s*mm|280mm/i.test(t)) {
    return "aio280";
  }

  if (/240\s*mm|240mm/i.test(t)) {
    return "aio240";
  }

  if (
    /\baio\b|liquid cooler|water cooler|watercooler/i.test(t)
  ) {
    return "aio240";
  }

  if (
    /air cooler|tower cooler|hyper ?212|peerless assassin|phantom spirit|nh ?d15|dark rock|ak400|ak500|ak620/i.test(t)
  ) {
    return "air";
  }

  if (
    /stock cooler|wraith stealth|wraith spire|wraith prism|intel stock/i.test(t)
  ) {
    return "stock";
  }

  return "";
}


// ============================================================
// CONDITION
// ============================================================

function detectCondition(text) {
  const t =
    String(text || "").toLowerCase();

  if (
    /brand new|like new|mint condition|mint|excellent condition|barely used|hardly used/i.test(t)
  ) {
    return "excellent";
  }

  if (
    /poor condition|damaged|broken|needs repair|for parts|not working|doesn't work|does not work/i.test(t)
  ) {
    return "poor";
  }

  if (
    /fair condition|wear and tear|scratches|cosmetic wear|some wear|visible wear/i.test(t)
  ) {
    return "fair";
  }

  return "good";
}


// ============================================================
// PRICE DETECTION
// ============================================================

function extractPriceFromLine(line) {
  let match =
    String(line).match(
      /\$\s*([0-9]{2,5})/i
    );

  if (match) {
    return Number(match[1]);
  }

  match =
    String(line).match(
      /\b([0-9]{2,5})\s*(?:cad|cdn|usd)\b/i
    );

  if (match) {
    return Number(match[1]);
  }

  match =
    String(line).match(
      /\b([0-9]{2,5})\s*(?:obo|firm)\b/i
    );

  if (match) {
    return Number(match[1]);
  }

  return null;
}


function detectPrice(text) {
  const lines =
    String(text || "").split(/\r?\n/);

  const oldPriceWords =
    /\b(originally|original price|paid|retail|retails|retail price|msrp|bought for|cost me|new price|brand new price)\b/i;

  const askingWords =
    /\b(asking|asking price|price is|price:|priced at|selling for|sell for|selling at|want|wanting|take|firm|obo|or best offer)\b/i;

  for (const line of lines) {
    if (
      oldPriceWords.test(line)
    ) {
      continue;
    }

    if (
      askingWords.test(line)
    ) {
      const value =
        extractPriceFromLine(line);

      if (
        value !== null &&
        value >= 20 &&
        value <= 20000
      ) {
        return value;
      }

      const loose =
        line.match(
          /\b(?:asking|price|selling for|sell for|want|take)\D{0,20}([0-9]{2,5})\b/i
        );

      if (loose) {
        const number =
          Number(loose[1]);

        if (
          number >= 20 &&
          number <= 20000
        ) {
          return number;
        }
      }
    }
  }

  const currencyCandidates = [];

  for (const line of lines) {
    if (
      oldPriceWords.test(line)
    ) {
      continue;
    }

    if (
      /\b(cad|cdn|usd)\b/i.test(line)
    ) {
      const value =
        extractPriceFromLine(line);

      if (
        value !== null &&
        value >= 20 &&
        value <= 20000
      ) {
        currencyCandidates.push(value);
      }
    }
  }

  if (currencyCandidates.length) {
    return currencyCandidates[
      currencyCandidates.length - 1
    ];
  }

  const dollarCandidates = [];

  for (const line of lines) {
    if (
      oldPriceWords.test(line)
    ) {
      continue;
    }

    const matches = [
      ...line.matchAll(
        /\$\s*([0-9]{2,5})/g
      )
    ];

    for (const match of matches) {
      const value =
        Number(match[1]);

      if (
        value >= 20 &&
        value <= 20000
      ) {
        dollarCandidates.push(value);
      }
    }
  }

  if (dollarCandidates.length) {
    return dollarCandidates[
      dollarCandidates.length - 1
    ];
  }

  for (
    let i = lines.length - 1;
    i >= 0;
    i--
  ) {
    const line =
      lines[i].trim();

    if (
      oldPriceWords.test(line)
    ) {
      continue;
    }

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


function detectCurrency(text) {
  if (
    /\busd\b|us dollars?|u\.s\. dollars?/i.test(text)
  ) {
    return "USD";
  }

  return "CAD";
}


// ============================================================
// MOTHERBOARD DETECTION
// ============================================================

function detectMotherboardLine(
  listing,
  chipset
) {
  const lines =
    String(listing || "")
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

  let bestLine = "";
  let bestScore = 0;

  for (const line of lines) {
    let score = 0;

    if (
      /\b(motherboard|mobo|mainboard)\b/i.test(line)
    ) {
      score += 5;
    }

    if (
      chipset &&
      line
        .toUpperCase()
        .includes(
          chipset.toUpperCase()
        )
    ) {
      score += 6;
    }

    if (
      /asus|gigabyte|msi|asrock|evga|supermicro|biostar/i.test(line)
    ) {
      score += 1;
    }

    if (
      /\b(rog|strix|tuf|aorus|tomahawk|mortar|gaming|prime|pro|steel legend|taichi|eagle|vision)\b/i.test(line)
    ) {
      score += 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestLine = line;
    }
  }

  if (bestScore >= 5) {
    return bestLine;
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

  if (!listingBox) return;

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

  // CPU

  const cpu =
    typeof detectCPUFromText === "function"
      ? detectCPUFromText(listing)
      : null;

  if (cpu) {
    const input =
      document.getElementById("cpu");

    if (input) {
      input.value = cpu.name;
    }

    detected.push(
      `CPU: ${cpu.name}`
    );

    if (
      cpu.fallback ||
      cpu.exactMarketValue === false
    ) {
      warnings.push(
        `${cpu.name} does not have an exact market value yet.`
      );
    }
  } else {
    warnings.push(
      "CPU could not be detected."
    );
  }

  // GPU

  const gpu =
    typeof detectGPUFromText === "function"
      ? detectGPUFromText(listing)
      : null;

  if (gpu) {
    const input =
      document.getElementById("gpu");

    if (input) {
      input.value = gpu.name;
    }

    detected.push(
      `GPU: ${gpu.name}`
    );
  } else {
    warnings.push(
      "GPU could not be detected."
    );
  }

  // Motherboard

  let chipset = "";
  let motherboardText = "";

  if (
    typeof findChipsetInText === "function"
  ) {
    chipset =
      findChipsetInText(listing) || "";

    motherboardText =
      detectMotherboardLine(
        listing,
        chipset
      );

    if (motherboardText) {
      const input =
        document.getElementById(
          "motherboard"
        );

      if (input) {
        input.value =
          motherboardText;
      }

      detected.push(
        `Motherboard: ${motherboardText}`
      );
    }
  }

  // RAM CAPACITY

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
  } else {
    warnings.push(
      "RAM capacity could not be detected."
    );
  }

  // RAM SPEED

  const ramSpeed =
    detectRamSpeed(listing);

  if (ramSpeed) {
    detected.push(
      `RAM speed: ${ramSpeed}`
    );
  }

  // RAM TYPE

  const listedRamType =
    detectRamType(listing);

  updateMemoryCompatibility();

  const ramSelect =
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
        listedRamType !== selection.selected
      ) {
        warnings.push(
          `Listing says ${listedRamType}, but this platform requires ${selection.selected}.`
        );
      }
    } else if (
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
        if (ramSelect) {
          ramSelect.value =
            listedRamType;
        }

        detected.push(
          `RAM type: ${listedRamType}`
        );
      }
    }
  }

  // STORAGE

  const storage =
    detectStorage(listing);

  if (storage) {
    setSelectValue(
      "storage",
      storage
    );

    const description =
      getStorageDescription(listing);

    detected.push(
      `Storage: ${
        description || storage
      }`
    );
  }

  // PSU

  const psu =
    detectPSU(listing);

  if (psu) {
    const input =
      document.getElementById("psu");

    if (input) {
      input.value = psu;
    }

    detected.push(
      `PSU: ${psu}`
    );
  }

  // COOLER

  const cooler =
    detectCooler(listing);

  if (cooler) {
    setSelectValue(
      "cooler",
      cooler
    );

    detected.push(
      "Cooler detected"
    );
  }

  // CONDITION

  const condition =
    detectCondition(listing);

  setSelectValue(
    "condition",
    condition
  );

  detected.push(
    `Condition: ${condition}`
  );

  // PRICE

  const price =
    detectPrice(listing);

  if (price !== null) {
    const input =
      document.getElementById(
        "price"
      );

    if (input) {
      input.value = price;
    }

    detected.push(
      `Price: $${price}`
    );
  } else {
    warnings.push(
      "Asking price could not be detected."
    );
  }

  // CURRENCY

  setSelectValue(
    "currency",
    detectCurrency(listing)
  );

  // COMPATIBILITY

  const finalRamType =
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
        motherboardText,
        finalRamType
      );

    if (
      compatibility?.issues
    ) {
      for (
        const issue of
        compatibility.issues
      ) {
        warnings.push(issue);
      }
    }

    if (
      compatibility?.warnings
    ) {
      for (
        const warning of
        compatibility.warnings
      ) {
        warnings.push(warning);
      }
    }
  }

  // MESSAGE

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

    message.textContent =
      output ||
      "No PC components were detected.";
  }
}


// ============================================================
// ANALYZE DEAL
// ============================================================

function analyzeDeal() {
  const cpuText =
    document.getElementById("cpu")
      ?.value.trim() || "";

  const gpuText =
    document.getElementById("gpu")
      ?.value.trim() || "";

  const ram =
    document.getElementById("ram")
      ?.value || "";

  const ramType =
    document.getElementById("ramType")
      ?.value || "";

  const storage =
    document.getElementById("storage")
      ?.value || "";

  const price =
    Number(
      document.getElementById("price")
        ?.value || 0
    );

  const currency =
    document.getElementById("currency")
      ?.value || "CAD";

  const motherboard =
    document.getElementById("motherboard")
      ?.value.trim() || "";

  const psu =
    document.getElementById("psu")
      ?.value.trim() || "";

  const cooler =
    document.getElementById("cooler")
      ?.value || "";

  const caseQuality =
    document.getElementById("caseQuality")
      ?.value || "";

  const condition =
    document.getElementById("condition")
      ?.value || "good";

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
    alert("CPU not recognized yet.");
    return;
  }

  if (!gpu) {
    alert("GPU not recognized yet.");
    return;
  }

  const cpuValue =
    Number(cpu.value) || 0;

  const gpuValue =
    Number(gpu.value) || 0;

  const motherboardValue =
    getMotherboardValue(
      motherboard,
      cpu
    );

  const psuValue =
    getPSUValue(psu);

  const subtotal =
    cpuValue +
    gpuValue +
    getRamValue(ram, ramType) +
    getStorageValue(storage) +
    motherboardValue +
    psuValue +
    getCoolerValue(cooler) +
    getCaseValue(caseQuality);

  const estimatedValue =
    Math.round(
      subtotal *
      getConditionMultiplier(
        condition
      )
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
  } else if (ratio <= 0.80) {
    score = 90;
  } else if (ratio <= 0.90) {
    score = 85;
  } else if (ratio <= 1.00) {
    score = 78;
  } else if (ratio <= 1.10) {
    score = 68;
  } else if (ratio <= 1.20) {
    score = 55;
  }

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
    compatibility.issues?.length
  ) {
    score =
      Math.min(score, 25);
  }

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

  const filledFields =
    confidenceFields.filter(Boolean).length;

  const confidence =
    Math.round(
      filledFields /
      confidenceFields.length *
      100
    );

  let confidenceLabel = "Low";

  if (confidence >= 80) {
    confidenceLabel = "High";
  } else if (confidence >= 55) {
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

  const info =
    typeof getCPUCompatibility ===
      "function"
      ? getCPUCompatibility(cpu)
      : null;

  const supportedMemory =
    info?.memory?.length
      ? info.memory.join(", ")
      : "Unknown";

  const chipset =
    typeof findChipsetInText ===
      "function"
      ? findChipsetInText(
          motherboard
        ) || "Not detected"
      : "Not detected";

  let compatibilityHTML = "";

  if (
    compatibility.issues?.length
  ) {
    compatibilityHTML += `
      <div style="margin-top:14px;">
        <strong>❌ Compatibility issues</strong>
        <ul>
          ${compatibility.issues
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
    compatibility.warnings?.length
  ) {
    compatibilityHTML += `
      <div style="margin-top:14px;">
        <strong>⚠️ Compatibility warnings</strong>
        <ul>
          ${compatibility.warnings
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
    compatibility.passed?.length
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

  const result =
    document.getElementById("result");

  const scoreElement =
    document.getElementById("score");

  const verdictElement =
    document.getElementById("verdict");

  const resultText =
    document.getElementById(
      "resultText"
    );

  if (
    !result ||
    !scoreElement ||
    !verdictElement ||
    !resultText
  ) {
    console.error(
      "Result elements missing."
    );

    return;
  }

  scoreElement.textContent =
    `${score}/100`;

  verdictElement.textContent =
    getDealVerdict(score);

  resultText.innerHTML = `
    <p><strong>CPU:</strong> ${cpu.name}</p>
    <p><strong>GPU:</strong> ${gpu.name}</p>

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
      ${confidenceLabel} (${confidence}%)
    </p>

    <p>
      <strong>Gaming:</strong>
      ${getGamingDescription(gpu)}
    </p>

    <hr>

    <p>
      <strong>CPU socket:</strong>
      ${cpu.socket || "Unknown"}
    </p>

    <p>
      <strong>Compatible RAM:</strong>
      ${supportedMemory}
    </p>

    <p>
      <strong>Detected chipset:</strong>
      ${chipset}
    </p>

    <hr>

    <p>
      <strong>CPU value:</strong>
      ${
        cpuValue
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
        gpuValue
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
