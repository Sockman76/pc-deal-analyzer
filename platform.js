// ============================================================
// PCDEAL - PLATFORM DATABASE
// VERSION 2
// ============================================================
//
// Handles:
// - CPU socket/platform lookup
// - Compatible motherboard chipsets
// - RAM generation compatibility
// - Chipset → platform lookup
// - CPU + chipset checking
// - CPU + RAM checking
// - Motherboard RAM narrowing
//
// ============================================================



// ============================================================
// PLATFORM DATABASE
// ============================================================

const platformDatabase = {

  // ==========================================================
  // AMD AM5
  // ==========================================================

  "AM5": {
    manufacturer: "AMD",
    category: "Mainstream Desktop",
    memory: ["DDR5"],

    chipsets: [
      "A620",
      "B650",
      "B650E",
      "X670",
      "X670E",
      "B840",
      "B850",
      "X870",
      "X870E"
    ]
  },


  // ==========================================================
  // AMD AM4
  // ==========================================================

  "AM4": {
    manufacturer: "AMD",
    category: "Mainstream Desktop",
    memory: ["DDR4"],

    chipsets: [
      "A300",
      "A320",
      "B300",
      "B350",
      "X300",
      "X370",
      "B450",
      "X470",
      "A520",
      "B550",
      "X570"
    ]
  },


  // ==========================================================
  // AMD FM2+
  // ==========================================================

  "FM2+": {
    manufacturer: "AMD",
    category: "Legacy Desktop",
    memory: ["DDR3"],

    chipsets: [
      "A58",
      "A68H",
      "A78",
      "A88X"
    ]
  },


  // ==========================================================
  // AMD FM2
  // ==========================================================

  "FM2": {
    manufacturer: "AMD",
    category: "Legacy Desktop",
    memory: ["DDR3"],

    chipsets: [
      "A55",
      "A75",
      "A85X"
    ]
  },


  // ==========================================================
  // AMD FM1
  // ==========================================================

  "FM1": {
    manufacturer: "AMD",
    category: "Legacy Desktop",
    memory: ["DDR3"],

    chipsets: [
      "A55",
      "A75"
    ]
  },


  // ==========================================================
  // AMD AM3+
  // ==========================================================

  "AM3+": {
    manufacturer: "AMD",
    category: "Legacy Desktop",
    memory: ["DDR3"],

    chipsets: [
      "760G",
      "770",
      "870",
      "880G",
      "890GX",
      "890FX",
      "970",
      "990X",
      "990FX"
    ]
  },


  // ==========================================================
  // AMD AM3
  // ==========================================================

  "AM3": {
    manufacturer: "AMD",
    category: "Legacy Desktop",
    memory: ["DDR3"],

    chipsets: [
      "760G",
      "770",
      "780G",
      "785G",
      "790X",
      "790GX",
      "790FX",
      "870",
      "880G",
      "890GX",
      "890FX"
    ]
  },


  // ==========================================================
  // AMD AM2+
  // ==========================================================

  "AM2+": {
    manufacturer: "AMD",
    category: "Legacy Desktop",
    memory: ["DDR2"],

    chipsets: [
      "740G",
      "760G",
      "770",
      "780G",
      "780V",
      "790X",
      "790GX",
      "790FX"
    ]
  },


  // ==========================================================
  // AMD AM2
  // ==========================================================

  "AM2": {
    manufacturer: "AMD",
    category: "Legacy Desktop",
    memory: ["DDR2"],

    chipsets: [
      "480X",
      "570X",
      "580X",
      "690G",
      "690V",
      "740G"
    ]
  },


  // ==========================================================
  // INTEL LGA1851
  // ==========================================================

  "LGA1851": {
    manufacturer: "Intel",
    category: "Mainstream Desktop",
    memory: ["DDR5"],

    chipsets: [
      "H810",
      "B860",
      "Q870",
      "W880",
      "Z890"
    ]
  },


  // ==========================================================
  // INTEL LGA1700
  // ==========================================================

  "LGA1700": {
    manufacturer: "Intel",
    category: "Mainstream Desktop",

    memory: [
      "DDR4",
      "DDR5"
    ],

    chipsets: [
      "H610",
      "B660",
      "H670",
      "Q670",
      "W680",
      "Z690",

      "B760",
      "H770",
      "Z790"
    ],

    memoryNote:
      "DDR4 or DDR5 depends on the specific motherboard model."
  },


  // ==========================================================
  // INTEL LGA1200
  // ==========================================================

  "LGA1200": {
    manufacturer: "Intel",
    category: "Mainstream Desktop",
    memory: ["DDR4"],

    chipsets: [
      "H410",
      "B460",
      "H470",
      "Q470",
      "W480",
      "Z490",

      "H510",
      "B560",
      "H570",
      "Q570",
      "W580",
      "Z590"
    ]
  },


  // ==========================================================
  // INTEL LGA1151 - 300 SERIES
  // ==========================================================

  "LGA1151-300": {
    manufacturer: "Intel",
    category: "Mainstream Desktop",
    memory: ["DDR4"],

    chipsets: [
      "H310",
      "B360",
      "B365",
      "H370",
      "Q370",
      "Z370",
      "Z390"
    ]
  },


  // ==========================================================
  // INTEL LGA1151 - 100 / 200 SERIES
  // ==========================================================

  "LGA1151-100-200": {
    manufacturer: "Intel",
    category: "Mainstream Desktop",
    memory: ["DDR4"],

    chipsets: [
      "H110",
      "B150",
      "H170",
      "Q150",
      "Q170",
      "Z170",

      "B250",
      "H270",
      "Q250",
      "Q270",
      "Z270"
    ]
  },


  // ==========================================================
  // INTEL LGA1150
  // ==========================================================

  "LGA1150": {
    manufacturer: "Intel",
    category: "Mainstream Desktop",
    memory: ["DDR3"],

    chipsets: [
      "H81",
      "B85",
      "Q85",
      "Q87",
      "H87",
      "Z87",
      "H97",
      "Z97"
    ]
  },


  // ==========================================================
  // INTEL LGA1155
  // ==========================================================

  "LGA1155": {
    manufacturer: "Intel",
    category: "Mainstream Desktop",
    memory: ["DDR3"],

    chipsets: [
      "H61",
      "B65",
      "Q65",
      "Q67",
      "H67",
      "P67",
      "Z68",

      "B75",
      "Q75",
      "Q77",
      "H77",
      "Z75",
      "Z77"
    ]
  },


  // ==========================================================
  // INTEL LGA1156
  // ==========================================================

  "LGA1156": {
    manufacturer: "Intel",
    category: "Legacy Desktop",
    memory: ["DDR3"],

    chipsets: [
      "H55",
      "H57",
      "P55",
      "Q57"
    ]
  },


  // ==========================================================
  // INTEL LGA775
  // ==========================================================

  "LGA775": {
    manufacturer: "Intel",
    category: "Legacy Desktop",

    memory: [
      "DDR2",
      "DDR3"
    ],

    chipsets: [
      "945P",
      "945G",
      "946GZ",

      "P965",
      "G965",
      "Q965",

      "P31",
      "G31",
      "P35",
      "G33",
      "G35",
      "Q33",
      "Q35",

      "P43",
      "G43",
      "P45",
      "G45",
      "Q43",
      "Q45",

      "X38",
      "X48"
    ],

    memoryNote:
      "RAM type depends on the exact motherboard."
  },


  // ==========================================================
  // INTEL HEDT
  // ==========================================================

  "LGA1366": {
    manufacturer: "Intel",
    category: "HEDT",
    memory: ["DDR3"],

    chipsets: [
      "X58"
    ]
  },


  "LGA2011": {
    manufacturer: "Intel",
    category: "HEDT",
    memory: ["DDR3"],

    chipsets: [
      "X79"
    ]
  },


  "LGA2011-3": {
    manufacturer: "Intel",
    category: "HEDT",
    memory: ["DDR4"],

    chipsets: [
      "X99"
    ]
  },


  "LGA2066": {
    manufacturer: "Intel",
    category: "HEDT",
    memory: ["DDR4"],

    chipsets: [
      "X299"
    ]
  }

};



// ============================================================
// CHIPSET DATABASE
// ============================================================
//
// Generated automatically.
//
// Example:
//
// chipsetDatabase["Z97"]
//
// [
//   {
//     platform: "LGA1150",
//     memory: ["DDR3"]
//   }
// ]
//
// Arrays are used because some chipset names were reused.
//
// ============================================================

const chipsetDatabase = {};


for (
  const [platformName, platform]
  of Object.entries(platformDatabase)
) {

  for (
    const chipset
    of platform.chipsets
  ) {

    if (!chipsetDatabase[chipset]) {

      chipsetDatabase[chipset] = [];

    }


    chipsetDatabase[chipset].push({

      platform:
        platformName,

      manufacturer:
        platform.manufacturer,

      memory:
        [...platform.memory],

      category:
        platform.category

    });

  }

}



// ============================================================
// OPTIONAL MOTHERBOARD MEMORY OVERRIDES
// ============================================================
//
// This becomes important for platforms like LGA1700.
//
// A chipset alone cannot tell us DDR4 vs DDR5.
//
// Example boards:
//
// MSI PRO B760M-A WIFI DDR4
// ASUS TUF Z790-PLUS WIFI D4
//
// Later we can add exact board models here.
//
// ============================================================

const motherboardMemoryOverrides = {

  // Examples for testing / future expansion

  "msi pro b760m-a wifi ddr4": {
    memory: "DDR4"
  },

  "asus tuf gaming z790-plus wifi d4": {
    memory: "DDR4"
  },

  "asus prime z690-p d4": {
    memory: "DDR4"
  },

  "gigabyte z790 aorus elite ax": {
    memory: "DDR5"
  }

};



// ============================================================
// NORMALIZE PLATFORM TEXT
// ============================================================

function normalizePlatformText(text) {

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
// GET PLATFORM
// ============================================================

function getPlatform(platformName) {

  if (!platformName) {
    return null;
  }


  return (
    platformDatabase[
      platformName
    ] || null
  );
}



// ============================================================
// GET PLATFORM MEMORY
// ============================================================

function getPlatformMemory(
  platformName
) {

  const platform =
    getPlatform(
      platformName
    );


  if (!platform) {
    return [];
  }


  return (
    platform.memory || []
  );
}



// ============================================================
// GET COMPATIBLE CHIPSETS
// ============================================================

function getCompatibleChipsets(
  platformName
) {

  const platform =
    getPlatform(
      platformName
    );


  if (!platform) {
    return [];
  }


  return (
    platform.chipsets || []
  );
}



// ============================================================
// FIND PLATFORM(S) BY CHIPSET
// ============================================================

function findPlatformsByChipset(
  chipset
) {

  if (!chipset) {
    return [];
  }


  const normalizedChipset =
    chipset
      .toUpperCase()
      .trim();


  return (
    chipsetDatabase[
      normalizedChipset
    ] || []
  );
}



// ============================================================
// FIND CHIPSET FROM TEXT
// ============================================================

function findChipsetInText(text) {

  if (!text) {
    return null;
  }


  const normalized =
    normalizePlatformText(
      text
    );


  const chipsets =
    Object.keys(
      chipsetDatabase
    )
      .sort(
        (a, b) =>
          b.length - a.length
      );


  for (
    const chipset
    of chipsets
  ) {

    const normalizedChipset =
      normalizePlatformText(
        chipset
      );


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


    if (
      regex.test(
        normalized
      )
    ) {

      return chipset;

    }

  }


  return null;
}



// ============================================================
// BASIC MEMORY COMPATIBILITY
// ============================================================

function isMemoryCompatible(
  platformName,
  memoryType
) {

  if (
    !platformName ||
    !memoryType
  ) {

    return null;

  }


  const memory =
    getPlatformMemory(
      platformName
    );


  return memory.includes(
    memoryType
      .toUpperCase()
      .trim()
  );
}



// ============================================================
// BASIC CHIPSET COMPATIBILITY
// ============================================================

function isChipsetCompatible(
  platformName,
  chipset
) {

  if (
    !platformName ||
    !chipset
  ) {

    return null;

  }


  const compatible =
    getCompatibleChipsets(
      platformName
    );


  return compatible.includes(
    chipset
      .toUpperCase()
      .trim()
  );
}



// ============================================================
// AUTOMATIC MEMORY SELECTION
// ============================================================

function getAutomaticMemorySelection(
  platformName
) {

  const options =
    getPlatformMemory(
      platformName
    );


  if (
    options.length === 0
  ) {

    return {
      automatic: false,
      memory: null,
      options: []
    };

  }


  if (
    options.length === 1
  ) {

    return {
      automatic: true,
      memory: options[0],
      options: options
    };

  }


  return {
    automatic: false,
    memory: null,
    options: options
  };
}



// ============================================================
// FIND EXACT MOTHERBOARD MEMORY OVERRIDE
// ============================================================

function findMotherboardMemoryOverride(
  motherboardText
) {

  if (!motherboardText) {
    return null;
  }


  const normalized =
    normalizePlatformText(
      motherboardText
    );


  for (
    const [board, data]
    of Object.entries(
      motherboardMemoryOverrides
    )
  ) {

    const normalizedBoard =
      normalizePlatformText(
        board
      );


    if (
      normalized.includes(
        normalizedBoard
      )
    ) {

      return {
        board: board,
        memory: data.memory
      };

    }

  }


  return null;
}



// ============================================================
// DETECT DDR MARKERS FROM MOTHERBOARD NAME
// ============================================================
//
// Many LGA1700 boards expose memory type directly:
//
// D4
// DDR4
// DDR5
//
// ============================================================

function detectMotherboardMemoryMarker(
  motherboardText
) {

  if (!motherboardText) {
    return null;
  }


  const normalized =
    motherboardText
      .toLowerCase();


  if (
    /\bddr5\b/i.test(
      normalized
    )
  ) {

    return "DDR5";

  }


  if (
    /\bddr4\b/i.test(
      normalized
    )
  ) {

    return "DDR4";

  }


  if (
    /\bd4\b/i.test(
      normalized
    )
  ) {

    return "DDR4";

  }


  return null;
}



// ============================================================
// GET MOTHERBOARD MEMORY TYPE
// ============================================================
//
// Priority:
//
// 1. Exact motherboard override
// 2. DDR marker in board name
// 3. Platform only has one RAM generation
// 4. Multiple options → unknown until exact board known
//
// ============================================================

function getMotherboardMemoryType(
  motherboardText
) {

  if (!motherboardText) {
    return null;
  }


  // Exact model override

  const override =
    findMotherboardMemoryOverride(
      motherboardText
    );


  if (override) {

    return {
      memory:
        override.memory,

      confidence:
        "High",

      source:
        "Exact motherboard model"
    };

  }


  // D4 / DDR4 / DDR5 marker

  const marker =
    detectMotherboardMemoryMarker(
      motherboardText
    );


  if (marker) {

    return {
      memory:
        marker,

      confidence:
        "High",

      source:
        "Motherboard name"
    };

  }


  // Determine chipset

  const chipset =
    findChipsetInText(
      motherboardText
    );


  if (!chipset) {

    return null;

  }


  const possiblePlatforms =
    findPlatformsByChipset(
      chipset
    );


  if (
    possiblePlatforms.length === 1
  ) {

    const memory =
      possiblePlatforms[0]
        .memory;


    if (
      memory.length === 1
    ) {

      return {
        memory:
          memory[0],

        confidence:
          "High",

        source:
          `${chipset} platform`
      };

    }


    return {
      memory:
        null,

      options:
        memory,

      confidence:
        "Medium",

      source:
        `${chipset} chipset`
    };

  }


  return {
    memory: null,
    options: [],
    confidence: "Low",
    source:
      "Ambiguous chipset"
  };
}



// ============================================================
// CPU + MOTHERBOARD PLATFORM CHECK
// ============================================================
//
// Takes a CPU object from parts.js.
//
// ============================================================

function checkCPUAndMotherboard(
  cpu,
  motherboardText
) {

  if (
    !cpu ||
    !cpu.socket
  ) {

    return {
      compatible: null,
      reason:
        "CPU platform is unknown."
    };

  }


  if (!motherboardText) {

    return {
      compatible: null,
      reason:
        "Motherboard is unknown."
    };

  }


  const chipset =
    findChipsetInText(
      motherboardText
    );


  if (!chipset) {

    return {
      compatible: null,

      cpuSocket:
        cpu.socket,

      chipset:
        null,

      reason:
        "Motherboard chipset could not be detected."
    };

  }


  const compatible =
    isChipsetCompatible(
      cpu.socket,
      chipset
    );


  if (compatible) {

    return {
      compatible: true,

      cpuSocket:
        cpu.socket,

      chipset:
        chipset,

      reason:
        `${chipset} is compatible with ${cpu.socket}.`
    };

  }


  const platforms =
    findPlatformsByChipset(
      chipset
    );


  return {
    compatible: false,

    cpuSocket:
      cpu.socket,

    chipset:
      chipset,

    motherboardPlatforms:
      platforms.map(
        item =>
          item.platform
      ),

    reason:
      `${cpu.name} uses ${cpu.socket}, but ${chipset} belongs to a different platform.`
  };
}



// ============================================================
// CPU + MOTHERBOARD + RAM CHECK
// ============================================================

function checkFullPlatformCompatibility(
  cpu,
  motherboardText,
  ramType
) {

  const issues = [];
  const warnings = [];
  const passed = [];


  if (
    !cpu ||
    !cpu.socket
  ) {

    issues.push(
      "CPU socket is unknown."
    );


    return {
      compatible: false,
      issues,
      warnings,
      passed
    };

  }


  const platform =
    getPlatform(
      cpu.socket
    );


  if (!platform) {

    issues.push(
      `Platform ${cpu.socket} is missing from platformDatabase.`
    );


    return {
      compatible: false,
      issues,
      warnings,
      passed
    };

  }


  // ----------------------------------------------------------
  // CPU / motherboard
  // ----------------------------------------------------------

  if (motherboardText) {

    const boardCheck =
      checkCPUAndMotherboard(
        cpu,
        motherboardText
      );


    if (
      boardCheck.compatible ===
      true
    ) {

      passed.push(
        `CPU and ${boardCheck.chipset} motherboard are compatible.`
      );

    }


    else if (
      boardCheck.compatible ===
      false
    ) {

      issues.push(
        boardCheck.reason
      );

    }


    else {

      warnings.push(
        boardCheck.reason
      );

    }

  }


  // ----------------------------------------------------------
  // CPU / RAM
  // ----------------------------------------------------------

  if (ramType) {

    const ramCompatible =
      isMemoryCompatible(
        cpu.socket,
        ramType
      );


    if (
      ramCompatible === true
    ) {

      passed.push(
        `${ramType} is supported by ${cpu.socket}.`
      );

    }


    else if (
      ramCompatible === false
    ) {

      issues.push(
        `${cpu.name} uses ${cpu.socket}, which supports ${platform.memory.join(" / ")} rather than ${ramType}.`
      );

    }

  }


  // ----------------------------------------------------------
  // Motherboard specific RAM
  // ----------------------------------------------------------

  if (
    motherboardText &&
    ramType
  ) {

    const boardMemory =
      getMotherboardMemoryType(
        motherboardText
      );


    if (
      boardMemory &&
      boardMemory.memory
    ) {

      if (
        boardMemory.memory ===
        ramType
      ) {

        passed.push(
          `Motherboard requires ${boardMemory.memory}, matching the selected RAM.`
        );

      }

      else {

        issues.push(
          `Motherboard appears to require ${boardMemory.memory}, but the system lists ${ramType}.`
        );

      }

    }


    else if (
      boardMemory &&
      boardMemory.options &&
      boardMemory.options.length >
      1
    ) {

      warnings.push(
        `Exact motherboard RAM type is unknown. This platform may use ${boardMemory.options.join(" or ")} depending on the board.`
      );

    }

  }


  return {

    compatible:
      issues.length === 0,

    issues:
      issues,

    warnings:
      warnings,

    passed:
      passed

  };
}



// ============================================================
// GET BEST MEMORY OPTIONS FOR CPU + MOTHERBOARD
// ============================================================
//
// This is the function app.js will eventually use
// to automatically control the RAM dropdown.
//
// ============================================================

function getBestMemorySelection(
  cpu,
  motherboardText = ""
) {

  if (
    !cpu ||
    !cpu.socket
  ) {

    return {
      automatic: false,
      memory: null,
      options: []
    };

  }


  const platformMemory =
    getPlatformMemory(
      cpu.socket
    );


  // Single-memory platform:
  // automatic immediately.

  if (
    platformMemory.length === 1
  ) {

    return {
      automatic: true,
      memory:
        platformMemory[0],
      options:
        platformMemory,
      source:
        "CPU platform"
    };

  }


  // Multi-memory platform:
  // check motherboard.

  if (motherboardText) {

    const boardMemory =
      getMotherboardMemoryType(
        motherboardText
      );


    if (
      boardMemory &&
      boardMemory.memory &&
      platformMemory.includes(
        boardMemory.memory
      )
    ) {

      return {
        automatic: true,

        memory:
          boardMemory.memory,

        options: [
          boardMemory.memory
        ],

        source:
          boardMemory.source
      };

    }

  }


  return {

    automatic: false,

    memory:
      null,

    options:
      platformMemory,

    source:
      "CPU platform"
  };
}



// ============================================================
// DATABASE STATS
// ============================================================

function getPlatformDatabaseStats() {

  return {

    platforms:
      Object.keys(
        platformDatabase
      ).length,

    chipsets:
      Object.keys(
        chipsetDatabase
      ).length,

    motherboardOverrides:
      Object.keys(
        motherboardMemoryOverrides
      ).length

  };
}
