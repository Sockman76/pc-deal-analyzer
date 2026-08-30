// ============================================================
// PCDEAL STORAGE ENGINE
// SEPARATE TYPE + SIZE VERSION
// ============================================================

let detectedStorageDrives = [];


// ============================================================
// STORAGE CAPACITY
// ============================================================

function storageCapacityToGB(number, unit) {
  const amount = Number(number);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  if (
    String(unit || "")
      .toLowerCase() === "tb"
  ) {
    return amount * 1000;
  }

  return amount;
}


// ============================================================
// NORMALIZE STORAGE SIZE
// ============================================================

function normalizeStorageSize(number, unit) {
  const gb =
    storageCapacityToGB(
      number,
      unit
    );

  if (gb >= 7900) {
    return "8TB";
  }

  if (gb >= 5900) {
    return "6TB";
  }

  if (gb >= 3900) {
    return "4TB";
  }

  if (gb >= 2900) {
    return "3TB";
  }

  if (gb >= 1900) {
    return "2TB";
  }

  if (
    gb >= 1400 &&
    gb < 1900
  ) {
    return "1.5TB";
  }

  if (gb >= 900) {
    return "1TB";
  }

  if (gb >= 506) {
    return "512GB";
  }

  if (gb >= 490) {
    return "500GB";
  }

  if (gb >= 470) {
    return "480GB";
  }

  if (gb >= 255) {
    return "256GB";
  }

  if (gb >= 245) {
    return "250GB";
  }

  if (gb >= 235) {
    return "240GB";
  }

  if (gb >= 126) {
    return "128GB";
  }

  if (gb >= 118) {
    return "120GB";
  }

  return "";
}


// ============================================================
// DRIVE TYPE DETECTION
// ============================================================

function detectStorageType(text) {
  const t =
    String(text || "")
      .toLowerCase();


  // NVMe takes priority over generic M.2

  if (
    /\bnvme\b/i.test(t)
  ) {
    return "NVMe SSD";
  }


  // Explicit M.2 SATA

  if (
    /\bm\.?\s*2\b/i.test(t) &&
    /\bsata\b/i.test(t)
  ) {
    return "M.2 SATA SSD";
  }


  // SATA SSD

  if (
    /\bsata\b/i.test(t) &&
    /\bssd\b/i.test(t)
  ) {
    return "SATA SSD";
  }


  // Generic M.2 SSD.
  // M.2 itself does NOT guarantee NVMe.

  if (
    /\bm\.?\s*2\b/i.test(t) &&
    /\bssd\b/i.test(t)
  ) {
    return "SSD";
  }


  // Generic SSD

  if (
    /\bssd\b/i.test(t) ||
    /\bsolid\s*state\b/i.test(t)
  ) {
    return "SSD";
  }


  // HDD

  if (
    /\bhdd\b/i.test(t) ||
    /\bhard\s*drive\b/i.test(t) ||
    /\bhard\s*disk\b/i.test(t)
  ) {
    return "HDD";
  }


  // Generic "storage"

  if (
    /\bstorage\b/i.test(t)
  ) {
    return "Unknown";
  }


  return "";
}


// ============================================================
// DETECT STORAGE DRIVES
// ============================================================

function detectStorageDetails(text) {
  const listing =
    String(text || "")
      .replace(/×/g, "x");

  const drives = [];


  // Split listing so nearby RAM/GPU numbers don't interfere
  // with storage detection.

  const sections =
    listing
      .split(/\n|•|\||;/)
      .map(
        section =>
          section.trim()
      )
      .filter(Boolean);


  for (const section of sections) {

    const storageWords =
      /\b(?:ssd|nvme|m\.?\s*2|hdd|storage|hard\s*drive|hard\s*disk|sata)\b/i;


    if (
      !storageWords.test(section)
    ) {
      continue;
    }


    const capacityRegex =
      /(\d+(?:\.\d+)?)\s*(tb|gb)\b/gi;


    let match;


    while (
      (
        match =
          capacityRegex.exec(section)
      ) !== null
    ) {

      const number =
        Number(match[1]);

      const unit =
        String(match[2])
          .toUpperCase();


      const capacityGB =
        storageCapacityToGB(
          number,
          unit
        );


      // Storage smaller than 64GB is unlikely for the PCs
      // we're analyzing and avoids VRAM/RAM confusion.

      if (
        capacityGB < 64
      ) {
        continue;
      }


      // Look closely around THIS specific capacity.
      // This is important for:
      //
      // 128GB SSD + 500GB HDD
      //
      // so each drive gets its own type.

      const start =
        Math.max(
          0,
          match.index - 8
        );


      const end =
        Math.min(
          section.length,
          capacityRegex.lastIndex + 18
        );


      const localText =
        section.slice(
          start,
          end
        );


      let type =
        detectStorageType(
          localText
        );


      // If local detection fails, use the section.

      if (!type) {
        type =
          detectStorageType(
            section
          );
      }


      if (!type) {
        type =
          "Unknown";
      }


      const size =
        normalizeStorageSize(
          number,
          unit
        );


      if (!size) {
        continue;
      }


      const duplicate =
        drives.some(
          drive =>
            drive.size === size &&
            drive.type === type
        );


      if (!duplicate) {
        drives.push({
          size,
          type,
          capacityGB,
          raw:
            match[0]
        });
      }
    }
  }


  return drives;
}


// ============================================================
// SET DRIVE DROPDOWNS
// ============================================================

function setStorageDropdowns(drive) {
  if (!drive) {
    return;
  }


  setSelectValue(
    "storageType",
    drive.type
  );


  setSelectValue(
    "storageSize",
    drive.size
  );
}


// ============================================================
// SHOW DETECTED DRIVES
// ============================================================

function renderDetectedStorage(drives) {
  const container =
    document.getElementById(
      "detectedStorageList"
    );


  if (!container) {
    return;
  }


  if (
    !Array.isArray(drives) ||
    drives.length === 0
  ) {
    container.innerHTML = "";
    return;
  }


  const totalGB =
    drives.reduce(
      (total, drive) =>
        total +
        Number(
          drive.capacityGB || 0
        ),
      0
    );


  let totalDisplay;


  if (totalGB >= 1000) {
    const totalTB =
      totalGB / 1000;

    totalDisplay =
      Number.isInteger(totalTB)
        ? `${totalTB}TB`
        : `${totalTB.toFixed(2)}TB`;
  } else {
    totalDisplay =
      `${totalGB}GB`;
  }


  const driveLines =
    drives
      .map(
        (drive, index) => {

          const typeText =
            drive.type === "Unknown"
              ? "type unknown"
              : drive.type;


          return `
            <div>
              <strong>Drive ${index + 1}:</strong>
              ${drive.size} ${typeText}
            </div>
          `;
        }
      )
      .join("");


  container.innerHTML = `
    <div style="
      margin-top: 8px;
      padding: 10px 12px;
      border: 1px solid #343b48;
      border-radius: 8px;
      line-height: 1.6;
    ">
      ${driveLines}

      ${
        drives.length > 1
          ? `
            <div style="margin-top:6px;">
              <strong>Total storage:</strong>
              ${totalDisplay}
            </div>
          `
          : ""
      }
    </div>
  `;
}


// ============================================================
// SIZE -> GB
// ============================================================

function storageSizeStringToGB(size) {
  const match =
    String(size || "")
      .match(
        /^(\d+(?:\.\d+)?)(TB|GB)$/i
      );


  if (!match) {
    return 0;
  }


  return storageCapacityToGB(
    Number(match[1]),
    match[2]
  );
}


// ============================================================
// STORAGE VALUE
// ============================================================

function getSingleDriveValue(drive) {
  if (!drive) {
    return 0;
  }


  const gb =
    drive.capacityGB ||
    storageSizeStringToGB(
      drive.size
    );


  const type =
    drive.type;


  // ----------------------------------------------------------
  // HDD
  // ----------------------------------------------------------

  if (
    type === "HDD"
  ) {

    if (gb >= 8000) return 100;
    if (gb >= 6000) return 80;
    if (gb >= 4000) return 60;
    if (gb >= 3000) return 50;
    if (gb >= 2000) return 35;
    if (gb >= 1000) return 20;
    if (gb >= 500) return 10;

    return 5;
  }


  // ----------------------------------------------------------
  // NVME
  // ----------------------------------------------------------

  if (
    type === "NVMe SSD"
  ) {

    if (gb >= 8000) return 450;
    if (gb >= 4000) return 220;
    if (gb >= 2000) return 100;
    if (gb >= 1000) return 60;
    if (gb >= 500) return 35;
    if (gb >= 250) return 20;

    return 12;
  }


  // ----------------------------------------------------------
  // SSD
  // ----------------------------------------------------------

  if (
    type === "SATA SSD" ||
    type === "M.2 SATA SSD" ||
    type === "SSD"
  ) {

    if (gb >= 4000) return 180;
    if (gb >= 2000) return 90;
    if (gb >= 1000) return 50;
    if (gb >= 500) return 25;
    if (gb >= 250) return 15;

    return 10;
  }


  // ----------------------------------------------------------
  // UNKNOWN
  // ----------------------------------------------------------

  if (gb >= 4000) return 100;
  if (gb >= 2000) return 60;
  if (gb >= 1000) return 35;
  if (gb >= 500) return 20;

  return 10;
}


// ============================================================
// VALUE ALL DETECTED DRIVES
// ============================================================

function getDetectedStorageValue() {

  // Listing parser detected one or more drives.

  if (
    Array.isArray(
      detectedStorageDrives
    ) &&
    detectedStorageDrives.length > 0
  ) {

    return detectedStorageDrives.reduce(
      (total, drive) =>
        total +
        getSingleDriveValue(
          drive
        ),
      0
    );
  }


  // Manual user selection.

  const type =
    document.getElementById(
      "storageType"
    )?.value || "";


  const size =
    document.getElementById(
      "storageSize"
    )?.value || "";


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

function formatMoney(amount, currency = "CAD") {
  const value = Number(amount || 0);

  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: currency || "CAD",
    maximumFractionDigits: 0
  }).format(value);
}


function setSelectValue(id, value) {
  const select = document.getElementById(id);

  if (!select || !value) {
    return false;
  }

  const exists = Array.from(select.options).some(
    option => option.value === value
  );

  if (!exists) {
    return false;
  }

  select.value = value;
  return true;
}


// ============================================================
// RAM TYPE
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

  const validTypes = Array.isArray(memoryTypes)
    ? memoryTypes.filter(Boolean)
    : [];

  if (validTypes.length === 0) {
    restoreRamTypeDropdown();
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

      if (options.length > 0) {
        setRamOptions(
          options,
          memory.automatic === true || options.length === 1,
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
    const total =
      Number(kit[1]) *
      Number(kit[2]);

    if (total >= 64) return "64GB+";
    if (total >= 32) return "32GB";
    if (total >= 16) return "16GB";
    if (total >= 8) return "8GB";
  }

  const direct =
    t.match(
      /\b(8|16|32|64|96|128)\s*(?:gb|gigs?|gigabytes?)\b/i
    );

  if (direct) {
    const total =
      Number(direct[1]);

    if (total >= 64) return "64GB+";
    if (total >= 32) return "32GB";
    if (total >= 16) return "16GB";
    if (total >= 8) return "8GB";
  }

  return "";
}


function detectRamType(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (/\bddr\s*5\b|\bd5\b/i.test(t)) {
    return "DDR5";
  }

  if (/\bddr\s*4\b|\bd4\b/i.test(t)) {
    return "DDR4";
  }

  if (/\bddr\s*3\b|\bd3\b/i.test(t)) {
    return "DDR3";
  }

  if (/\bddr\s*2\b/i.test(t)) {
    return "DDR2";
  }

  return "";
}


// ============================================================
// STORAGE CAPACITY HELPERS
// ============================================================

function storageCapacityToGB(number, unit) {
  const value = Number(number);

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


function normalizeStorageCapacity(amount, unit) {
  const gb =
    storageCapacityToGB(
      amount,
      unit
    );

  if (gb >= 7500) return "8TB";
  if (gb >= 5500) return "6TB";
  if (gb >= 3500) return "4TB";
  if (gb >= 2500) return "3TB";
  if (gb >= 1500) return "2TB";
  if (gb >= 750) return "1TB";

  if (gb >= 500 && gb < 750) {
    if (gb >= 506) {
      return "512GB";
    }

    return "500GB";
  }

  if (gb >= 470) {
    return "480GB";
  }

  if (gb >= 255) {
    return "256GB";
  }

  if (gb >= 245) {
    return "250GB";
  }

  if (gb >= 235) {
    return "240GB";
  }

  if (gb >= 126) {
    return "128GB";
  }

  if (gb >= 118) {
    return "120GB";
  }

  return `${Math.round(gb)}GB`;
}


// ============================================================
// STORAGE TYPE DETECTION
// ============================================================

function detectStorageType(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (
    /\bm\.?2\b/i.test(t) &&
    /\bnvme\b/i.test(t)
  ) {
    return "NVMe SSD";
  }

  if (
    /\bnvme\b/i.test(t)
  ) {
    return "NVMe SSD";
  }

  if (
    /\bm\.?2\b/i.test(t) &&
    /\bsata\b/i.test(t)
  ) {
    return "M.2 SATA SSD";
  }

  if (
    /\bm\.?2\b/i.test(t) &&
    /\bssd\b/i.test(t)
  ) {
    return "M.2 SSD";
  }

  if (
    /\bsata\b/i.test(t) &&
    /\bssd\b/i.test(t)
  ) {
    return "SATA SSD";
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

  if (
    /\bstorage\b/i.test(t)
  ) {
    return "Storage";
  }

  return "Unknown";
}


// ============================================================
// DETECT MULTIPLE STORAGE DRIVES
// ============================================================

function detectStorageDetails(text) {
  const listing =
    String(text || "")
      .replace(/×/g, "x");

  const drives = [];

  const regex =
    /\b(\d+(?:\.\d+)?)\s*(tb|gb)\b/gi;

  let match;

  while (
    (
      match =
        regex.exec(listing)
    ) !== null
  ) {
    const amount =
      Number(match[1]);

    const unit =
      String(match[2]).toUpperCase();

    const capacityGB =
      storageCapacityToGB(
        amount,
        unit
      );

    if (capacityGB < 64) {
      continue;
    }

    const start =
      Math.max(
        0,
        match.index - 40
      );

    const end =
      Math.min(
        listing.length,
        regex.lastIndex + 50
      );

    const nearby =
      listing.slice(
        start,
        end
      );

    const nearbyLower =
      nearby.toLowerCase();

    const looksLikeRam =
      /\b(?:ram|memory|ddr2|ddr3|ddr4|ddr5)\b/i
        .test(nearbyLower);

    const looksLikeGPU =
      /\b(?:rtx|gtx|radeon|rx|arc)\b/i
        .test(nearbyLower);

    const looksLikeStorage =
      /\b(?:ssd|nvme|m\.?2|hdd|storage|hard drive|hard disk|sata)\b/i
        .test(nearbyLower);

    if (
      !looksLikeStorage &&
      (
        looksLikeRam ||
        looksLikeGPU
      )
    ) {
      continue;
    }

    let type =
      detectStorageType(
        nearby
      );

    if (
      type === "Unknown" &&
      !looksLikeStorage
    ) {
      continue;
    }

    const capacity =
      normalizeStorageCapacity(
        amount,
        unit
      );

    if (
      type === "M.2 SSD"
    ) {
      type = "SSD";
    }

    const duplicate =
      drives.some(
        drive =>
          drive.capacity === capacity &&
          drive.type === type
      );

    if (!duplicate) {
      drives.push({
        capacity,
        capacityGB,
        type,
        raw: match[0]
      });
    }
  }

  return drives;
}


// ============================================================
// STORAGE DROPDOWN VALUE
// ============================================================

function storageDriveToOption(drive) {
  if (!drive) {
    return "";
  }

  const capacity =
    drive.capacity;

  let type =
    drive.type;

  if (type === "NVMe SSD") {
    return `${capacity} NVMe SSD`;
  }

  if (type === "M.2 SATA SSD") {
    return `${capacity} M.2 SATA SSD`;
  }

  if (type === "SATA SSD") {
    return `${capacity} SATA SSD`;
  }

  if (type === "SSD") {
    return `${capacity} SSD`;
  }

  if (type === "HDD") {
    return `${capacity} HDD`;
  }

  if (
    type === "Storage" ||
    type === "Unknown"
  ) {
    return `${capacity} Storage`;
  }

  return "";
}


// ============================================================
// STORAGE DISPLAY
// ============================================================

function renderDetectedStorage(drives) {
  const container =
    document.getElementById(
      "detectedStorageList"
    );

  if (!container) {
    return;
  }

  if (
    !Array.isArray(drives) ||
    drives.length === 0
  ) {
    container.innerHTML = "";
    return;
  }

  let totalGB = 0;

  for (const drive of drives) {
    totalGB +=
      Number(
        drive.capacityGB || 0
      );
  }

  const totalDisplay =
    totalGB >= 1000
      ? `${(totalGB / 1000)
          .toFixed(
            totalGB % 1000 === 0
              ? 0
              : 1
          )}TB`
      : `${totalGB}GB`;

  container.innerHTML = `
    <div style="
      padding: 10px;
      border: 1px solid #333;
      border-radius: 8px;
      font-size: 14px;
      line-height: 1.6;
    ">
      <strong>Detected drives:</strong><br>

      ${drives
        .map(
          (drive, index) =>
            `Drive ${index + 1}: ${drive.capacity} ${
              drive.type === "Storage"
                ? "type unknown"
                : drive.type
            }`
        )
        .join("<br>")}

      <br>
      <strong>Total storage:</strong> ${totalDisplay}
    </div>
  `;
}


// ============================================================
// STORAGE VALUE
// ============================================================

function getSingleDriveValue(drive) {
  if (!drive) {
    return 0;
  }

  const gb =
    Number(
      drive.capacityGB || 0
    );

  let value = 0;

  // HDD
  if (drive.type === "HDD") {
    if (gb >= 8000) value = 100;
    else if (gb >= 6000) value = 80;
    else if (gb >= 4000) value = 60;
    else if (gb >= 3000) value = 50;
    else if (gb >= 2000) value = 35;
    else if (gb >= 1000) value = 20;
    else if (gb >= 500) value = 10;
    else value = 5;

    return value;
  }

  // NVMe
  if (drive.type === "NVMe SSD") {
    if (gb >= 8000) value = 450;
    else if (gb >= 4000) value = 220;
    else if (gb >= 2000) value = 100;
    else if (gb >= 1000) value = 60;
    else if (gb >= 500) value = 35;
    else if (gb >= 250) value = 20;
    else value = 12;

    return value;
  }

  // SATA / generic SSD
  if (
    drive.type === "SATA SSD" ||
    drive.type === "M.2 SATA SSD" ||
    drive.type === "SSD"
  ) {
    if (gb >= 4000) value = 180;
    else if (gb >= 2000) value = 90;
    else if (gb >= 1000) value = 50;
    else if (gb >= 500) value = 25;
    else if (gb >= 250) value = 15;
    else value = 10;

    return value;
  }

  // unknown type
  if (
    drive.type === "Storage" ||
    drive.type === "Unknown"
  ) {
    if (gb >= 4000) value = 100;
    else if (gb >= 2000) value = 60;
    else if (gb >= 1000) value = 35;
    else if (gb >= 500) value = 20;
    else value = 10;
  }

  return value;
}


function getDetectedStorageValue() {
  if (
    !Array.isArray(
      detectedStorageDrives
    ) ||
    detectedStorageDrives.length === 0
  ) {
    const selected =
      document.getElementById(
        "storage"
      )?.value || "";

    if (!selected) {
      return 0;
    }

    const temp =
      detectStorageDetails(
        selected
      );

    if (
      temp.length > 0
    ) {
      return getSingleDriveValue(
        temp[0]
      );
    }

    return 0;
  }

  return detectedStorageDrives.reduce(
    (total, drive) =>
      total +
      getSingleDriveValue(
        drive
      ),
    0
  );
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

  return Math.max(
    value,
    0
  );
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

  if (
    /(1000|1200|1300)\s*w/i
      .test(text)
  ) {
    value += 30;
  } else if (
    /850\s*w/i.test(text)
  ) {
    value += 20;
  } else if (
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
    Number(
      gpu?.performance || 0
    );

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
// BALANCE
// ============================================================

function getBalanceDescription(cpu, gpu) {
  const cpuScore =
    Number(
      cpu?.performance || 0
    );

  const gpuScore =
    Number(
      gpu?.performance || 0
    );

  const difference =
    cpuScore - gpuScore;

  if (
    Math.abs(difference) <= 20
  ) {
    return "CPU and GPU are reasonably balanced.";
  }

  if (difference > 20) {
    return "CPU is stronger relative to the GPU.";
  }

  return "GPU is stronger relative to the CPU.";
}


// ============================================================
// VERDICT
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
      /\b(?:psu|power supply)\b/i
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
    /\b360\s*mm\s*(?:aio|liquid|water)?\b/i
      .test(t)
  ) {
    return "360mm AIO";
  }

  if (
    /\b280\s*mm\s*(?:aio|liquid|water)?\b/i
      .test(t)
  ) {
    return "280mm AIO";
  }

  if (
    /\b240\s*mm\s*(?:aio|liquid|water)?\b/i
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
// CONDITION
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
// PRICE
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

    const dollar =
      line.match(
        /\$\s*([0-9]{2,5}(?:\.[0-9]{1,2})?)/i
      );

    if (dollar) {
      const value =
        Number(dollar[1]);

      if (
        value >= 20 &&
        value <= 20000
      ) {
        return value;
      }
    }

    const currency =
      line.match(
        /\b([0-9]{2,5}(?:\.[0-9]{1,2})?)\s*(?:cad|cdn|usd)\b/i
      );

    if (currency) {
      const value =
        Number(currency[1]);

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
          Number(match[1])
      )
      .filter(
        value =>
          value >= 20 &&
          value <= 20000
      );

  if (
    currencyPrices.length > 0
  ) {
    return currencyPrices[
      currencyPrices.length - 1
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
          Number(match[1])
      )
      .filter(
        value =>
          value >= 20 &&
          value <= 20000
      );

  if (
    dollarPrices.length > 0
  ) {
    return dollarPrices[
      dollarPrices.length - 1
    ];
  }

  return null;
}


function detectCurrency(text) {
  const t =
    String(text || "")
      .toLowerCase();

  if (/\busd\b/i.test(t)) {
    return "USD";
  }

  return "CAD";
}


// ============================================================
// MOTHERBOARD
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
    findCPU(cpuText) ||
    detectCPUFromText(cpuText);

  const gpu =
    findGPU(gpuText) ||
    detectGPUFromText(gpuText);

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
    getDetectedStorageValue();

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
    getConditionMultiplier(
      condition
    );

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

  const verdict =
    getDealVerdict(
      score
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

      <p>
        <strong>Asking price:</strong>
        ${formatMoney(askingPrice, currency)}
      </p>

      <p>
        <strong>Estimated system value:</strong>
        ${formatMoney(lowEstimate, currency)}
        –
        ${formatMoney(highEstimate, currency)}
      </p>

      <p>
        <strong>Suggested offer:</strong>
        ${formatMoney(suggestedOffer, currency)}
      </p>

      <p>
        <strong>Storage value:</strong>
        ${formatMoney(storageValue, currency)}
      </p>

      <p>
        <strong>Gaming:</strong>
        ${getGamingDescription(gpu)}
      </p>

      <p>
        <strong>System balance:</strong>
        ${getBalanceDescription(cpu, gpu)}
      </p>
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
// PARSE LISTING
// ============================================================

function parseListing() {
  const listing =
    document.getElementById(
      "listingText"
    )?.value || "";

  const message =
    document.getElementById(
      "parseMessage"
    );

  if (!listing.trim()) {
    if (message) {
      message.textContent =
        "Paste a PC listing first.";
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
      input.value =
        cpu.name || "";
    }

    detected.push(
      `CPU: ${cpu.name}`
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
      input.value =
        gpu.name || "";
    }

    detected.push(
      `GPU: ${gpu.name}`
    );
  }

  // Motherboard
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
    const input =
      document.getElementById(
        "motherboard"
      );

    if (input) {
      input.value =
        motherboard;
    }

    detected.push(
      `Motherboard: ${motherboard}`
    );
  }

  // RAM
  const ram =
    detectRamCapacity(
      listing
    );

  if (ram) {
    setSelectValue(
      "ram",
      ram
    );

    detected.push(
      `RAM: ${ram}`
    );
  }

  const ramType =
    detectRamType(
      listing
    );

  updateMemoryCompatibility();

  if (ramType) {
    const select =
      document.getElementById(
        "ramType"
      );

    if (
      select &&
      Array.from(
        select.options
      ).some(
        option =>
          option.value === ramType
      )
    ) {
      select.value =
        ramType;
    }
  }

  // STORAGE
  detectedStorageDrives =
    detectStorageDetails(
      listing
    );

  renderDetectedStorage(
    detectedStorageDrives
  );

  if (
    detectedStorageDrives.length > 0
  ) {
    const primary =
      detectedStorageDrives[0];

    const option =
      storageDriveToOption(
        primary
      );

    setSelectValue(
      "storage",
      option
    );

    detected.push(
      `Storage: ${
        detectedStorageDrives
          .map(
            drive =>
              `${drive.capacity} ${drive.type}`
          )
          .join(" + ")
      }`
    );
  }

  // PSU
  const psu =
    detectPSU(
      listing
    );

  if (psu) {
    const input =
      document.getElementById("psu");

    if (input) {
      input.value =
        psu;
    }

    detected.push(
      `PSU: ${psu}`
    );
  }

  // Cooler
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

  // Condition
  const condition =
    detectCondition(
      listing
    );

  setSelectValue(
    "condition",
    condition
  );

  // Price
  const price =
    detectPrice(
      listing
    );

  if (price !== null) {
    const input =
      document.getElementById("price");

    if (input) {
      input.value =
        price;
    }

    detected.push(
      `Price: ${price}`
    );
  }

  const currency =
    detectCurrency(
      listing
    );

  setSelectValue(
    "currency",
    currency
  );

  if (message) {
    let output =
      detected.length > 0
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
}
