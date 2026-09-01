// ============================================================
// PCDEAL APP
// VERSION 19 - V3 CORE COMPATIBILITY
// ============================================================

let originalRamTypeOptions = "";
let detectedStorageDrives = [];

document.addEventListener("DOMContentLoaded", () => {
  const ramType = document.getElementById("ramType");

  if (ramType) {
    originalRamTypeOptions = ramType.innerHTML;
  }

  const cpuInput = document.getElementById("cpu");

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
});


// ============================================================
// NORMALIZE TEXT
// ============================================================

function normalizeDetectionText(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[\-_/(),]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


// ============================================================
// MONEY
// ============================================================

function formatMoney(
  amount,
  currency = "CAD"
) {
  const value =
    Number(amount || 0);

  try {
    return new Intl.NumberFormat(
      "en-CA",
      {
        style: "currency",
        currency:
          currency || "CAD",
        maximumFractionDigits: 0
      }
    ).format(value);
  }

  catch {
    return "$" +
      Math.round(value)
        .toLocaleString();
  }
}


// ============================================================
// SET SELECT VALUE
// ============================================================

function setSelectValue(
  id,
  value
) {
  const select =
    document.getElementById(id);

  if (
    !select ||
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return false;
  }

  const target =
    String(value)
      .trim()
      .toLowerCase();

  const option =
    Array.from(
      select.options
    ).find(
      opt => {
        return (
          String(opt.value)
            .trim()
            .toLowerCase() ===
            target
        ) ||
        (
          String(opt.textContent)
            .trim()
            .toLowerCase() ===
            target
        );
      }
    );

  if (!option) {
    return false;
  }

  select.value =
    option.value;

  select.dispatchEvent(
    new Event(
      "change",
      {
        bubbles: true
      }
    )
  );

  return true;
}


// ============================================================
// CHIPSET DETECTION
// ============================================================

function detectChipsetFromText(
  text
) {
  if (
    typeof findChipsetInText ===
    "function"
  ) {
    return (
      findChipsetInText(text) ||
      ""
    );
  }

  if (
    typeof chipsetDatabase ===
    "undefined"
  ) {
    return "";
  }

  const normalized =
    normalizeDetectionText(
      text
    );

  const chipsets =
    Object.keys(
      chipsetDatabase
    ).sort(
      (a, b) =>
        b.length -
        a.length
    );

  for (
    const chipset
    of chipsets
  ) {
    const escaped =
      normalizeDetectionText(
        chipset
      ).replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const regex =
      new RegExp(
        `(^|\\s)${escaped}(?=\\s|$)`,
        "i"
      );

    if (
      regex.test(
        normalized
      )
    ) {
      return chipset
        .toUpperCase();
    }
  }

  return "";
}


// ============================================================
// RAM TYPE DROPDOWN
// ============================================================

function restoreRamTypeDropdown() {
  const select =
    document.getElementById(
      "ramType"
    );

  if (!select) {
    return;
  }

  select.disabled =
    false;

  select.innerHTML =
    originalRamTypeOptions ||
    `
    <option value="">
      Unknown
    </option>

    <option value="DDR2">
      DDR2
    </option>

    <option value="DDR3">
      DDR3
    </option>

    <option value="DDR4">
      DDR4
    </option>

    <option value="DDR5">
      DDR5
    </option>
  `;
}


function setRamOptions(
  memoryTypes,
  automatic = false,
  selectedMemory = ""
) {
  const select =
    document.getElementById(
      "ramType"
    );

  if (!select) {
    return;
  }

  const types =
    Array.from(
      new Set(
        (
          Array.isArray(
            memoryTypes
          )
            ? memoryTypes
            : []
        ).filter(Boolean)
      )
    );

  if (
    !types.length
  ) {
    restoreRamTypeDropdown();
    return;
  }

  select.innerHTML =
    "";

  if (
    types.length > 1
  ) {
    const placeholder =
      document.createElement(
        "option"
      );

    placeholder.value =
      "";

    placeholder.textContent =
      "Select RAM type";

    select.appendChild(
      placeholder
    );
  }

  for (
    const type
    of types
  ) {
    const option =
      document.createElement(
        "option"
      );

    option.value =
      type;

    option.textContent =
      type;

    select.appendChild(
      option
    );
  }

  select.disabled =
    automatic === true &&
    types.length === 1;

  if (
    selectedMemory &&
    types.includes(
      selectedMemory
    )
  ) {
    select.value =
      selectedMemory;
  }

  else if (
    types.length === 1
  ) {
    select.value =
      types[0];
  }
}


// ============================================================
// CPU -> RAM COMPATIBILITY
// ============================================================

function updateMemoryCompatibility() {
  const cpuText =
    document
      .getElementById(
        "cpu"
      )
      ?.value
      .trim() || "";

  const motherboardText =
    document
      .getElementById(
        "motherboard"
      )
      ?.value
      .trim() || "";

  if (!cpuText) {
    restoreRamTypeDropdown();
    return;
  }

  const cpu =
    typeof findCPU ===
    "function"
      ? findCPU(
          cpuText
        )
      : null;

  if (!cpu) {
    restoreRamTypeDropdown();
    return;
  }

  if (
    typeof getBestMemorySelection ===
    "function"
  ) {
    const result =
      getBestMemorySelection(
        cpu,
        motherboardText
      );

    if (result) {
      const types =
        result.memoryTypes ||
        result.allowedMemory ||
        result.options ||
        result.memory ||
        [];

      const selected =
        result.selectedMemory ||
        result.memoryType ||
        "";

      if (
        Array.isArray(types) &&
        types.length
      ) {
        setRamOptions(
          types,
          result.automatic ===
            true ||
            types.length === 1,
          selected
        );

        return;
      }
    }
  }

  if (
    typeof getCPUCompatibility ===
    "function"
  ) {
    const compatibility =
      getCPUCompatibility(
        cpu
      );

    const types =
      compatibility
        ?.memory ||
      [];

    if (
      types.length
    ) {
      setRamOptions(
        types,
        compatibility
          .automaticMemory ===
          true ||
          types.length === 1
      );

      return;
    }
  }

  if (
    typeof getCPUMemoryTypes ===
    "function"
  ) {
    const types =
      getCPUMemoryTypes(
        cpu
      ) || [];

    if (
      types.length
    ) {
      setRamOptions(
        types,
        types.length ===
          1
      );

      return;
    }
  }

  restoreRamTypeDropdown();
}


// ============================================================
// RAM CAPACITY
// ============================================================

function detectRamCapacity(
  text
) {
  const t =
    String(text || "")
      .toLowerCase()
      .replace(/×/g, "x")
      .replace(
        /\s+/g,
        " "
      );

  const kit =
    t.match(
      /\b(\d)\s*x\s*(4|8|16|24|32|48|64)\s*(?:gb)?\b/i
    );

  if (kit) {
    const total =
      Number(
        kit[1]
      ) *
      Number(
        kit[2]
      );

    if (
      total >= 64
    ) {
      return "64GB+";
    }

    if (
      total >= 32
    ) {
      return "32GB";
    }

    if (
      total >= 16
    ) {
      return "16GB";
    }

    if (
      total >= 8
    ) {
      return "8GB";
    }
  }

  const ramLine =
    String(text || "")
      .split(
        /\n|•|\|/
      )
      .find(
        line =>
          /\b(?:ram|memory|ddr[2345])\b/i
            .test(line)
      );

  const source =
    ramLine || t;

  const direct =
    String(source)
      .match(
        /\b(8|16|32|64|96|128)\s*(?:gb|gigs?|gigabytes?)\b/i
      );

  if (direct) {
    const total =
      Number(
        direct[1]
      );

    if (
      total >= 64
    ) {
      return "64GB+";
    }

    if (
      total >= 32
    ) {
      return "32GB";
    }

    if (
      total >= 16
    ) {
      return "16GB";
    }

    if (
      total >= 8
    ) {
      return "8GB";
    }
  }

  return "";
}


// ============================================================
// RAM TYPE
// ============================================================

function detectRamType(
  text
) {
  const t =
    String(text || "");

  if (
    /\bddr\s*5\b/i
      .test(t)
  ) {
    return "DDR5";
  }

  if (
    /\bddr\s*4\b/i
      .test(t)
  ) {
    return "DDR4";
  }

  if (
    /\bddr\s*3\b/i
      .test(t)
  ) {
    return "DDR3";
  }

  if (
    /\bddr\s*2\b/i
      .test(t)
  ) {
    return "DDR2";
  }

  return "";
}


// ============================================================
// STORAGE CAPACITY
// ============================================================

function storageCapacityToGB(
  number,
  unit
) {
  const value =
    Number(number);

  if (
    !Number.isFinite(
      value
    )
  ) {
    return 0;
  }

  return (
    String(unit || "")
      .toLowerCase() ===
      "tb"
  )
    ? value * 1000
    : value;
}


// ============================================================
// NORMALIZE STORAGE SIZE
// ============================================================

function normalizeStorageSize(
  number,
  unit
) {
  const gb =
    storageCapacityToGB(
      number,
      unit
    );

  if (
    gb >= 7900
  ) {
    return "8TB";
  }

  if (
    gb >= 5900
  ) {
    return "6TB";
  }

  if (
    gb >= 3900
  ) {
    return "4TB";
  }

  if (
    gb >= 2900
  ) {
    return "3TB";
  }

  if (
    gb >= 1900
  ) {
    return "2TB";
  }

  if (
    gb >= 1400
  ) {
    return "1.5TB";
  }

  if (
    gb >= 900
  ) {
    return "1TB";
  }

  if (
    gb >= 506
  ) {
    return "512GB";
  }

  if (
    gb >= 490
  ) {
    return "500GB";
  }

  if (
    gb >= 470
  ) {
    return "480GB";
  }

  if (
    gb >= 255
  ) {
    return "256GB";
  }

  if (
    gb >= 245
  ) {
    return "250GB";
  }

  if (
    gb >= 235
  ) {
    return "240GB";
  }

  if (
    gb >= 126
  ) {
    return "128GB";
  }

  if (
    gb >= 118
  ) {
    return "120GB";
  }

  return "";
}


// ============================================================
// STORAGE TYPE
// ============================================================

function detectStorageType(
  text
) {
  const t =
    String(text || "")
      .toLowerCase();

  // Any NVMe wording is normalized to the single NVME M.2 option.
  if (
    /\bnvme\b|\bm\.?\s*2\b.*\bnvme\b|\bnvme\b.*\bm\.?\s*2\b/i
      .test(t)
  ) {
    return "NVME M.2";
  }

  // HDD / hard-drive wording.
  if (
    /\bhdd\b|hard\s*drive|hard\s*disk/i
      .test(t)
  ) {
    return "HDD";
  }

  // Every non-NVMe SSD, including SATA and M.2 SATA, is just SSD.
  if (
    /\bssd\b|solid\s*state|\bsata\b.*\bm\.?\s*2\b|\bm\.?\s*2\b.*\bsata\b/i
      .test(t)
  ) {
    return "SSD";
  }

  // Capacity-only storage is allowed, but type stays blank.
  return "";
}


// ============================================================
// DETECT STORAGE
// ============================================================

function detectStorageDetails(
  text
) {
  const lines =
    String(text || "")
      .replace(
        /×/g,
        "x"
      )
      .split(
        /\n|•|\||;/
      )
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);

  const drives =
    [];

  for (
    const line
    of lines
  ) {
    if (
      !/\b(?:ssd|nvme|m\.?\s*2|hdd|storage|hard\s*drive|hard\s*disk|sata)\b/i
        .test(line)
    ) {
      continue;
    }

    const chunks =
      line
        .split(
          /\s*\+\s*|\s*,\s*/
        )
        .filter(Boolean);

    for (
      const chunk
      of chunks
    ) {
      const matches =
        [
          ...chunk.matchAll(
            /(\d+(?:\.\d+)?)\s*(tb|gb)\b/gi
          )
        ];

      for (
        const match
        of matches
      ) {
        const number =
          Number(
            match[1]
          );

        const unit =
          match[2];

        const capacityGB =
          storageCapacityToGB(
            number,
            unit
          );

        if (
          capacityGB < 64
        ) {
          continue;
        }

        const size =
          normalizeStorageSize(
            number,
            unit
          );

        if (!size) {
          continue;
        }

        let type =
          detectStorageType(
            chunk
          );

        if (!type) {
          type =
            detectStorageType(
              line
            );
        }


        const duplicate =
          drives.some(
            drive =>
              drive.size ===
                size &&
              drive.type ===
                type
          );

        if (!duplicate) {
          drives.push({
            size,
            type,
            capacityGB
          });
        }
      }
    }
  }

  return drives;
}


// ============================================================
// STORAGE DROPDOWNS
// ============================================================

function setStorageDropdowns(
  drive
) {
  if (!drive) {
    return;
  }

  const typeSelect =
    document.getElementById(
      "storageType"
    );

  if (typeSelect) {
    if (drive.type) {
      setSelectValue(
        "storageType",
        drive.type
      );
    }
    else {
      typeSelect.value = "";
    }
  }

  setSelectValue(
    "storageSize",
    drive.size
  );
}


// ============================================================
// STORAGE STRING -> GB
// ============================================================

function storageSizeStringToGB(
  size
) {
  const match =
    String(size || "")
      .match(
        /^(\d+(?:\.\d+)?)(TB|GB)$/i
      );

  if (!match) {
    return 0;
  }

  return storageCapacityToGB(
    match[1],
    match[2]
  );
}


// ============================================================
// STORAGE VALUE
// ============================================================

function getSingleDriveValue(
  drive
) {
  if (!drive) {
    return 0;
  }

  const gb =
    drive.capacityGB ||
    storageSizeStringToGB(
      drive.size
    );

  const type =
    drive.type ||
    "";


  if (
    type === "HDD"
  ) {
    if (
      gb >= 8000
    ) {
      return 100;
    }

    if (
      gb >= 6000
    ) {
      return 80;
    }

    if (
      gb >= 4000
    ) {
      return 60;
    }

    if (
      gb >= 3000
    ) {
      return 50;
    }

    if (
      gb >= 2000
    ) {
      return 35;
    }

    if (
      gb >= 1000
    ) {
      return 20;
    }

    if (
      gb >= 500
    ) {
      return 10;
    }

    return 5;
  }


  if (
    type ===
    "NVME M.2"
  ) {
    if (
      gb >= 8000
    ) {
      return 450;
    }

    if (
      gb >= 4000
    ) {
      return 220;
    }

    if (
      gb >= 2000
    ) {
      return 100;
    }

    if (
      gb >= 1000
    ) {
      return 60;
    }

    if (
      gb >= 500
    ) {
      return 35;
    }

    if (
      gb >= 250
    ) {
      return 20;
    }

    return 12;
  }


  if (
    type === "SSD"
  ) {
    if (
      gb >= 4000
    ) {
      return 180;
    }

    if (
      gb >= 2000
    ) {
      return 90;
    }

    if (
      gb >= 1000
    ) {
      return 50;
    }

    if (
      gb >= 500
    ) {
      return 25;
    }

    if (
      gb >= 250
    ) {
      return 15;
    }

    return 10;
  }


  if (
    gb >= 4000
  ) {
    return 100;
  }

  if (
    gb >= 2000
  ) {
    return 60;
  }

  if (
    gb >= 1000
  ) {
    return 35;
  }

  if (
    gb >= 500
  ) {
    return 20;
  }

  return 10;
}


// ============================================================
// CURRENT STORAGE VALUE
// ============================================================

function getDetectedStorageValue() {
  const type =
    document
      .getElementById(
        "storageType"
      )
      ?.value || "";

  const size =
    document
      .getElementById(
        "storageSize"
      )
      ?.value || "";

  if (
    !type ||
    !size
  ) {
    return 0;
  }

  return getSingleDriveValue({
    type,
    size,
    capacityGB:
      storageSizeStringToGB(
        size
      )
  });
}


// ============================================================
// RAM VALUE
// ============================================================

function getRamValue(
  ram,
  ramType
) {
  let value =
    0;

  if (
    ram === "8GB"
  ) {
    value = 20;
  }

  if (
    ram === "16GB"
  ) {
    value = 40;
  }

  if (
    ram === "32GB"
  ) {
    value = 70;
  }

  if (
    ram === "64GB+"
  ) {
    value = 120;
  }

  if (
    ramType === "DDR5"
  ) {
    value += 25;
  }

  if (
    ramType === "DDR3"
  ) {
    value -= 5;
  }

  if (
    ramType === "DDR2"
  ) {
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
      socket ===
        "LGA1151-300"
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

  if (
    /^(X870E?|X670E?|X570|Z890|Z790|Z690|X299|X99)$/i
      .test(chipset)
  ) {
    return 170;
  }

  if (
    /^(B850|B840|B650E?|B760|B660|B560|B550|B450|H770|H670|H570|Z590|Z490)$/i
      .test(chipset)
  ) {
    return 110;
  }

  if (
    /^(Z390|Z370|Z270|Z170|Z97|Z87|Z77|Z75|Z68|P67|990FX|990X|970)$/i
      .test(chipset)
  ) {
    return 80;
  }

  if (
    /^(A620|A520|A320|H610|H510|H410|H310|H110|H81|H61)$/i
      .test(chipset)
  ) {
    return 55;
  }

  return 75;
}


// ============================================================
// PSU VALUE
// ============================================================

function getPSUValue(
  psu
) {
  const text =
    String(psu || "")
      .toLowerCase();

  if (!text) {
    return 0;
  }

  let value =
    50;

  if (
    /(corsair|seasonic|evga|super flower|be quiet|thermaltake|msi|asus|cooler master|nzxt|antec)/i
      .test(text)
  ) {
    value = 100;
  }

  if (
    /(1000|1200|1300)\s*w/i
      .test(text)
  ) {
    value += 30;
  }

  else if (
    /850\s*w/i
      .test(text)
  ) {
    value += 20;
  }

  else if (
    /750\s*w/i
      .test(text)
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
    "Stock cooler": 10,
    "Air cooler": 40,
    "240mm AIO": 60,
    "280mm AIO": 75,
    "360mm AIO": 90
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
  return (
    {
      basic: 35,
      mid: 70,
      premium: 120
    }[caseQuality] ||
    50
  );
}


// ============================================================
// CONDITION MULTIPLIER
// ============================================================

function getConditionMultiplier(
  condition
) {
  return (
    {
      excellent: 1.05,
      good: 1,
      fair: 0.9,
      poor: 0.75
    }[condition] ||
    1
  );
}


// ============================================================
// GAMING DESCRIPTION
// ============================================================

function getGamingDescription(
  gpu
) {
  const performance =
    Number(
      gpu?.performance ||
      0
    );

  if (
    performance >= 80
  ) {
    return "High-end 1440p / 4K gaming";
  }

  if (
    performance >= 60
  ) {
    return "Excellent 1440p gaming";
  }

  if (
    performance >= 45
  ) {
    return "Excellent 1080p / strong 1440p gaming";
  }

  if (
    performance >= 25
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
    Number(
      gpu?.performance ||
      0
    ) -
    Number(
      cpu?.performance ||
      0
    );

  if (
    difference > 30
  ) {
    return "GPU is much stronger than the CPU — possible CPU bottleneck.";
  }

  if (
    difference < -30
  ) {
    return "CPU is much stronger than the GPU — GPU upgrade could improve gaming performance.";
  }

  return "CPU and GPU are reasonably balanced.";
}


// ============================================================
// DEAL VERDICT
// ============================================================

function getDealVerdict(
  score
) {
  if (
    score >= 90
  ) {
    return {
      text:
        "Excellent deal",
      emoji:
        "🔥"
    };
  }

  if (
    score >= 80
  ) {
    return {
      text:
        "Good deal",
      emoji:
        "✅"
    };
  }

  if (
    score >= 65
  ) {
    return {
      text:
        "Fair price",
      emoji:
        "👍"
    };
  }

  if (
    score >= 50
  ) {
    return {
      text:
        "Slightly overpriced",
      emoji:
        "⚠️"
    };
  }

  return {
    text:
      "Overpriced",
    emoji:
      "❌"
  };
}


// ============================================================
// ANALYZE DEAL
// ============================================================

function analyzeDeal() {
  const cpuText =
    document
      .getElementById(
        "cpu"
      )
      ?.value
      .trim() || "";

  const gpuText =
    document
      .getElementById(
        "gpu"
      )
      ?.value
      .trim() || "";

  const ram =
    document
      .getElementById(
        "ram"
      )
      ?.value || "";

  const ramType =
    document
      .getElementById(
        "ramType"
      )
      ?.value || "";

  const motherboard =
    document
      .getElementById(
        "motherboard"
      )
      ?.value
      .trim() || "";

  const psu =
    document
      .getElementById(
        "psu"
      )
      ?.value
      .trim() || "";

  const cooler =
    document
      .getElementById(
        "cooler"
      )
      ?.value || "";

  const caseQuality =
    document
      .getElementById(
        "caseQuality"
      )
      ?.value || "";

  const condition =
    document
      .getElementById(
        "condition"
      )
      ?.value ||
    "good";

  const askingPrice =
    Number(
      document
        .getElementById(
          "price"
        )
        ?.value ||
      0
    );

  const currency =
    document
      .getElementById(
        "currency"
      )
      ?.value ||
    "CAD";


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
    (
      typeof findCPU ===
      "function"
        ? findCPU(
            cpuText
          )
        : null
    ) ||
    (
      typeof detectCPUFromText ===
      "function"
        ? detectCPUFromText(
            cpuText
          )
        : null
    );


  const gpu =
    (
      typeof findGPU ===
      "function"
        ? findGPU(
            gpuText
          )
        : null
    ) ||
    (
      typeof detectGPUFromText ===
      "function"
        ? detectGPUFromText(
            gpuText
          )
        : null
    );


  if (
    !cpu ||
    !gpu
  ) {
    alert(
      "PCDeal could not identify the CPU or GPU."
    );

    return;
  }


  const cpuValue =
    Number(
      cpu.value ||
      0
    );

  const gpuValue =
    Number(
      gpu.value ||
      0
    );

  const ramValue =
    getRamValue(
      ram,
      ramType
    );

  const storageValue =
    getDetectedStorageValue();

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
    Math.max(
      1,
      Math.round(
        rawValue *
        getConditionMultiplier(
          condition
        )
      )
    );


  const lowEstimate =
    Math.round(
      estimatedValue *
      0.9
    );

  const highEstimate =
    Math.round(
      estimatedValue *
      1.1
    );


  const priceRatio =
    askingPrice /
    estimatedValue;


  let dealScore =
    35;

  if (
    priceRatio <= 0.70
  ) {
    dealScore = 95;
  }

  else if (
    priceRatio <= 0.80
  ) {
    dealScore = 90;
  }

  else if (
    priceRatio <= 0.90
  ) {
    dealScore = 85;
  }

  else if (
    priceRatio <= 1.00
  ) {
    dealScore = 78;
  }

  else if (
    priceRatio <= 1.10
  ) {
    dealScore = 68;
  }

  else if (
    priceRatio <= 1.20
  ) {
    dealScore = 55;
  }


  const verdict =
    getDealVerdict(
      dealScore
    );


  const suggestedOffer =
    Math.min(
      askingPrice,
      Math.round(
        (
          estimatedValue *
          0.85
        ) /
        10
      ) *
      10
    );


  let confidencePoints =
    2;

  if (ram) {
    confidencePoints++;
  }

  if (ramType) {
    confidencePoints++;
  }

  if (
    document
      .getElementById(
        "storageType"
      )
      ?.value &&
    document
      .getElementById(
        "storageSize"
      )
      ?.value
  ) {
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
      (
        confidencePoints /
        9
      ) *
      100
    );


  const confidenceLabel =
    confidencePercent >= 80
      ? "High"
      : confidencePercent >= 55
        ? "Medium"
        : "Low";


  let platformLines =
    "";


  const socket =
    cpu.socket ||
    cpu.platform ||
    "";


  if (socket) {
    platformLines +=
      `<br><br>🔧 <strong>CPU socket:</strong> ${socket}`;
  }


  if (
    typeof getCPUMemoryTypes ===
    "function"
  ) {
    const memory =
      getCPUMemoryTypes(
        cpu
      ) || [];

    if (
      memory.length
    ) {
      platformLines +=
        `<br>🧠 <strong>Compatible RAM:</strong> ${memory.join(" / ")}`;
    }
  }


  const chipset =
    detectChipsetFromText(
      motherboard
    );


  if (chipset) {
    platformLines +=
      `<br>🧩 <strong>Detected chipset:</strong> ${chipset}`;
  }


  if (
    typeof checkFullPlatformCompatibility ===
    "function"
  ) {
    const check =
      checkFullPlatformCompatibility(
        cpu,
        motherboard,
        ramType
      );


    if (
      check?.issues
        ?.length
    ) {
      platformLines +=
        `<br><br>⚠️ <strong>Compatibility issue:</strong> ${check.issues.join(" • ")}`;
    }

    else if (
      check?.warnings
        ?.length
    ) {
      platformLines +=
        `<br><br>⚠️ <strong>Compatibility note:</strong> ${check.warnings.join(" • ")}`;
    }
  }


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

  const result =
    document.getElementById(
      "result"
    );


  if (scoreElement) {
    scoreElement.textContent =
      `${dealScore}/100`;
  }


  if (verdictElement) {
    verdictElement.textContent =
      `${verdict.emoji} ${verdict.text}`;
  }


  if (resultText) {
    resultText.innerHTML = `

      <strong>
        ${cpu.name || cpuText}
        +
        ${gpu.name || gpuText}
      </strong>

      <br><br>

      Asking price:
      <strong>
        ${formatMoney(
          askingPrice,
          currency
        )}
      </strong>

      <br>

      Estimated system value:
      <strong>
        ${formatMoney(
          lowEstimate,
          currency
        )}
        –
        ${formatMoney(
          highEstimate,
          currency
        )}
      </strong>

      <br><br>

      📊
      <strong>
        Estimate confidence:
      </strong>
      ${confidenceLabel}
      (${confidencePercent}%)

      <br><br>

      🎮
      <strong>
        Gaming:
      </strong>
      ${getGamingDescription(
        gpu
      )}

      ${platformLines}

      <br><br>

      🧠
      <strong>
        CPU value:
      </strong>
      ${formatMoney(
        cpuValue,
        currency
      )}

      <br>

      🎨
      <strong>
        GPU value:
      </strong>
      ${formatMoney(
        gpuValue,
        currency
      )}

      <br>

      🧩
      <strong>
        Motherboard estimate:
      </strong>
      ${formatMoney(
        motherboardValue,
        currency
      )}

      <br>

      💾
      <strong>
        Storage estimate:
      </strong>
      ${formatMoney(
        storageValue,
        currency
      )}

      <br>

      ⚡
      <strong>
        PSU estimate:
      </strong>
      ${formatMoney(
        psuValue,
        currency
      )}

      <br><br>

      ${getBalanceDescription(
        cpu,
        gpu
      )}

      <br><br>

      💬
      <strong>
        Suggested starting offer:
      </strong>
      ${formatMoney(
        suggestedOffer,
        currency
      )}

    `;
  }


  if (result) {
    result.style.display =
      "block";

    result.scrollIntoView({
      behavior:
        "smooth",

      block:
        "nearest"
    });
  }
}


// ============================================================
// PSU DETECTION
// ============================================================

function detectPSU(
  text
) {
  const lines =
    String(text || "")
      .split(
        /\n|•|\|/
      )
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);


  for (
    const line
    of lines
  ) {
    if (
      /\b(?:psu|power\s*supply)\b/i
        .test(line)
      ||
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

function detectCooler(
  text
) {
  const t =
    String(text || "");


  if (
    /\b360\s*mm\b.*\b(?:aio|liquid|water)/i
      .test(t)
    ||
    /\b360\s*mm\s*aio\b/i
      .test(t)
  ) {
    return "360mm AIO";
  }


  if (
    /\b280\s*mm\b.*\b(?:aio|liquid|water)/i
      .test(t)
    ||
    /\b280\s*mm\s*aio\b/i
      .test(t)
  ) {
    return "280mm AIO";
  }


  if (
    /\b240\s*mm\b.*\b(?:aio|liquid|water)/i
      .test(t)
    ||
    /\b240\s*mm\s*aio\b/i
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

function detectCondition(
  text
) {
  const t =
    String(text || "");


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

function detectPrice(
  text
) {
  const listing =
    String(text || "");


  const lines =
    listing
      .split(
        /\n|•|\|/
      )
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);


  const trigger =
    /\b(?:asking|asking price|price|priced at|selling for|sell for|firm|obo|or best offer|want|take)\b/i;


  for (
    const line
    of lines
  ) {
    if (
      !trigger.test(
        line
      )
    ) {
      continue;
    }


    let match =
      line.match(
        /\$\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)/i
      );


    if (match) {
      const value =
        Number(
          match[1]
        );

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
        Number(
          match[1]
        );

      if (
        value >= 20 &&
        value <= 20000
      ) {
        return value;
      }
    }
  }


  const currencyPrices =
    [
      ...listing.matchAll(
        /\$?\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)\s*(?:cad|cdn|usd)\b/gi
      )
    ]
      .map(
        match =>
          Number(
            match[1]
          )
      )
      .filter(
        value =>
          value >= 20 &&
          value <= 20000
      );


  if (
    currencyPrices.length
  ) {
    return currencyPrices[
      currencyPrices.length -
      1
    ];
  }


  const dollarPrices =
    [
      ...listing.matchAll(
        /\$\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)/g
      )
    ]
      .map(
        match =>
          Number(
            match[1]
          )
      )
      .filter(
        value =>
          value >= 20 &&
          value <= 20000
      );


  if (
    dollarPrices.length
  ) {
    return dollarPrices[
      dollarPrices.length -
      1
    ];
  }


  return null;
}


// ============================================================
// CURRENCY DETECTION
// ============================================================

function detectCurrency(
  text
) {
  return (
    /\busd\b|us\s*dollars?/i
      .test(
        String(
          text ||
          ""
        )
      )
  )
    ? "USD"
    : "CAD";
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
      .split(
        /\n|•|\|/
      )
      .map(
        line =>
          line.trim()
      )
      .filter(Boolean);


  if (chipset) {
    const match =
      lines.find(
        line =>
          line
            .toLowerCase()
            .includes(
              String(chipset)
                .toLowerCase()
            )
      );


    if (match) {
      return match;
    }
  }


  const boardLine =
    lines.find(
      line =>
        /\b(?:motherboard|mobo|mainboard|board)\b/i
          .test(line)
    );


  return (
    boardLine ||
    chipset ||
    ""
  );
}


// ============================================================
// PARSE LISTING
// ============================================================

function parseListing() {
  const listing =
    document
      .getElementById(
        "listingText"
      )
      ?.value ||
    "";


  const message =
    document.getElementById(
      "parseMessage"
    );


  if (
    !listing.trim()
  ) {
    if (message) {
      message.textContent =
        "Paste a PC listing first.";
    }

    return;
  }


  const detected =
    [];


  // ==========================================================
  // CPU
  // ==========================================================

  const cpu =
    typeof detectCPUFromText ===
    "function"
      ? detectCPUFromText(
          listing
        )
      : null;


  if (cpu) {
    const field =
      document.getElementById(
        "cpu"
      );

    if (field) {
      field.value =
        cpu.name ||
        "";
    }

    detected.push(
      `CPU: ${cpu.name}`
    );
  }


  // ==========================================================
  // GPU
  // ==========================================================

  const gpu =
    typeof detectGPUFromText ===
    "function"
      ? detectGPUFromText(
          listing
        )
      : null;


  if (gpu) {
    const field =
      document.getElementById(
        "gpu"
      );

    if (field) {
      field.value =
        gpu.name ||
        "";
    }

    detected.push(
      `GPU: ${gpu.name}`
    );
  }


  // ==========================================================
  // MOTHERBOARD
  // ==========================================================

  const chipset =
    detectChipsetFromText(
      listing
    );


  const motherboard =
    detectMotherboardLine(
      listing,
      chipset
    );


  if (motherboard) {
    const field =
      document.getElementById(
        "motherboard"
      );

    if (field) {
      field.value =
        motherboard;
    }

    detected.push(
      `Motherboard: ${safeText(motherboard)}`
    );
  }


  // ==========================================================
  // RAM CAPACITY
  // ==========================================================

  const ram =
    detectRamCapacity(
      listing
    );


  if (
    ram &&
    setSelectValue(
      "ram",
      ram
    )
  ) {
    detected.push(
      `RAM: ${safeText(ram)}`
    );
  }


  // ==========================================================
  // RAM TYPE
  // ==========================================================

  updateMemoryCompatibility();


  const listedRamType =
    detectRamType(
      listing
    );


  if (
    listedRamType
  ) {
    const select =
      document.getElementById(
        "ramType"
      );


    if (
      select &&
      !select.disabled &&
      setSelectValue(
        "ramType",
        listedRamType
      )
    ) {
      detected.push(
        `RAM Type: ${listedRamType}`
      );
    }

    else if (
      select?.value
    ) {
      detected.push(
        `RAM Type: ${select.value}`
      );
    }
  }

  else {
    const selectedRam =
      document
        .getElementById(
          "ramType"
        )
        ?.value ||
      "";


    if (selectedRam) {
      detected.push(
        `RAM Type: ${selectedRam}`
      );
    }
  }


  // ==========================================================
  // STORAGE
  // ==========================================================

  detectedStorageDrives =
    detectStorageDetails(
      listing
    );


  if (
    detectedStorageDrives
      .length
  ) {
    const mainDrive =
      detectedStorageDrives[
        0
      ];


    setStorageDropdowns(
      mainDrive
    );


    detected.push(
      `Storage: ${mainDrive.size}${
        mainDrive.type
          ? ` ${mainDrive.type}`
          : " type unknown"
      }`
    );
  }


  // ==========================================================
  // PSU
  // ==========================================================

  const psu =
    detectPSU(
      listing
    );


  if (psu) {
    const field =
      document.getElementById(
        "psu"
      );


    if (field) {
      field.value =
        psu;
    }


    detected.push(
      `PSU: ${safeText(psu)}`
    );
  }


  // ==========================================================
  // COOLER
  // ==========================================================

  const cooler =
    detectCooler(
      listing
    );


  if (
    cooler &&
    setSelectValue(
      "cooler",
      cooler
    )
  ) {
    detected.push(
      `Cooler: ${safeText(cooler)}`
    );
  }


  // ==========================================================
  // CASE
  // ==========================================================

  const detectedCase =
    typeof detectCaseQuality ===
    "function"
      ? detectCaseQuality(
          listing
        )
      : "";


  if (
    detectedCase &&
    setSelectValue(
      "caseQuality",
      detectedCase
    )
  ) {
    detected.push(
      `Case: ${
        detectedCase === "premium"
          ? "Premium"
          : detectedCase === "mid"
            ? "Mid-range"
            : "Basic"
      }`
    );
  }


  // ==========================================================
  // CONDITION
  // ==========================================================

  const condition =
    detectCondition(
      listing
    );


  setSelectValue(
    "condition",
    condition
  );


  // ==========================================================
  // PRICE
  // ==========================================================

  const price =
    detectPrice(
      listing
    );


  if (
    price !== null
  ) {
    const field =
      document.getElementById(
        "price"
      );


    if (field) {
      field.value =
        price;
    }


    detected.push(
      `Price: ${price}`
    );
  }


  // ==========================================================
  // CURRENCY
  // ==========================================================

  const currency =
    detectCurrency(
      listing
    );


  setSelectValue(
    "currency",
    currency
  );


  // ==========================================================
  // MESSAGE
  // ==========================================================

  if (message) {
    message.textContent =
      detected.length
        ? `Detected: ${detected.join(" • ")}`
        : "No supported hardware detected.";
  }
}
