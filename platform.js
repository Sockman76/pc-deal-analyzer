// ============================================================
// PCDEAL - PLATFORM & CHIPSET COMPATIBILITY DATABASE
// ============================================================
//
// Purpose:
// - Determine CPU socket/platform compatibility
// - Determine motherboard chipset compatibility
// - Automatically determine compatible RAM generation
// - Allow PCDeal to detect impossible CPU/RAM/motherboard combos
//
// IMPORTANT:
// CPU database entries will eventually point to a socket.
// Example:
// socket: "AM4"
// socket: "LGA1150"
//
// ============================================================


// ============================================================
// PLATFORM / SOCKET DATABASE
// ============================================================

const platformDatabase = {

  // ==========================================================
  // AMD - MODERN
  // ==========================================================

  "AM5": {
    manufacturer: "AMD",
    memory: ["DDR5"],
    category: "Mainstream Desktop",
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

  "AM4": {
    manufacturer: "AMD",
    memory: ["DDR4"],
    category: "Mainstream Desktop",
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
  // AMD - FM SERIES
  // ==========================================================

  "FM2+": {
    manufacturer: "AMD",
    memory: ["DDR3"],
    category: "Mainstream Desktop",
    chipsets: [
      "A58",
      "A68H",
      "A78",
      "A88X"
    ]
  },

  "FM2": {
    manufacturer: "AMD",
    memory: ["DDR3"],
    category: "Mainstream Desktop",
    chipsets: [
      "A55",
      "A75",
      "A85X"
    ]
  },

  "FM1": {
    manufacturer: "AMD",
    memory: ["DDR3"],
    category: "Mainstream Desktop",
    chipsets: [
      "A55",
      "A75"
    ]
  },


  // ==========================================================
  // AMD - AM3 / AM2 ERA
  // ==========================================================

  "AM3+": {
    manufacturer: "AMD",
    memory: ["DDR3"],
    category: "Mainstream Desktop",
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

  "AM3": {
    manufacturer: "AMD",
    memory: ["DDR3"],
    category: "Mainstream Desktop",
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

  "AM2+": {
    manufacturer: "AMD",
    memory: ["DDR2"],
    category: "Legacy Desktop",
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

  "AM2": {
    manufacturer: "AMD",
    memory: ["DDR2"],
    category: "Legacy Desktop",
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
  // INTEL - CURRENT / RECENT
  // ==========================================================

  "LGA1851": {
    manufacturer: "Intel",
    memory: ["DDR5"],
    category: "Mainstream Desktop",
    chipsets: [
      "H810",
      "B860",
      "Q870",
      "W880",
      "Z890"
    ]
  },

  "LGA1700": {
    manufacturer: "Intel",
    memory: ["DDR4", "DDR5"],
    category: "Mainstream Desktop",
    chipsets: [
      "H610",
      "B660",
      "H670",
      "Q670",
      "W680",
      "Z690",
      "B760",
      "H770",
      "Q670",
      "W680",
      "Z790"
    ],

    memoryNote:
      "DDR4 or DDR5 support depends on the specific motherboard."
  },

  "LGA1200": {
    manufacturer: "Intel",
    memory: ["DDR4"],
    category: "Mainstream Desktop",
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
  // INTEL - LGA1151
  // ==========================================================

  "LGA1151-300": {
    manufacturer: "Intel",
    memory: ["DDR4"],
    category: "Mainstream Desktop",
    chipsets: [
      "H310",
      "B360",
      "B365",
      "H370",
      "Q370",
      "Z370",
      "Z390"
    ],

    generationNote:
      "Used for Coffee Lake and Coffee Lake Refresh CPUs."
  },

  "LGA1151-100-200": {
    manufacturer: "Intel",
    memory: ["DDR4"],
    category: "Mainstream Desktop",
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
    ],

    generationNote:
      "Used primarily for Skylake and Kaby Lake CPUs."
  },


  // ==========================================================
  // INTEL - HASWELL
  // ==========================================================

  "LGA1150": {
    manufacturer: "Intel",
    memory: ["DDR3"],
    category: "Mainstream Desktop",
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
  // INTEL - IVY BRIDGE / SANDY BRIDGE
  // ==========================================================

  "LGA1155": {
    manufacturer: "Intel",
    memory: ["DDR3"],
    category: "Mainstream Desktop",
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
  // INTEL - FIRST GEN CORE
  // ==========================================================

  "LGA1156": {
    manufacturer: "Intel",
    memory: ["DDR3"],
    category: "Legacy Desktop",
    chipsets: [
      "H55",
      "H57",
      "P55",
      "Q57"
    ]
  },


  // ==========================================================
  // INTEL - CORE 2 ERA
  // ==========================================================

  "LGA775": {
    manufacturer: "Intel",

    // LGA775 existed across multiple memory generations.
    // The motherboard determines actual RAM support.
    memory: ["DDR2", "DDR3"],

    category: "Legacy Desktop",

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
      "RAM type depends on the specific motherboard."
  },


  // ==========================================================
  // INTEL HEDT
  // ==========================================================

  "LGA1366": {
    manufacturer: "Intel",
    memory: ["DDR3"],
    category: "HEDT",
    chipsets: [
      "X58"
    ]
  },

  "LGA2011": {
    manufacturer: "Intel",
    memory: ["DDR3"],
    category: "HEDT",
    chipsets: [
      "X79"
    ]
  },

  "LGA2011-3": {
    manufacturer: "Intel",
    memory: ["DDR4"],
    category: "HEDT",
    chipsets: [
      "X99"
    ]
  },

  "LGA2066": {
    manufacturer: "Intel",
    memory: ["DDR4"],
    category: "HEDT",
    chipsets: [
      "X299"
    ]
  }

};


// ============================================================
// CHIPSET LOOKUP DATABASE
// ============================================================
//
// This gets generated from platformDatabase automatically.
//
// Example:
// chipsetDatabase["B550"]
//
// returns possible platform information.
//
// We use arrays because some chipset names were reused across
// different AMD platforms.
// ============================================================

const chipsetDatabase = {};

for (const [platformName, platform] of Object.entries(platformDatabase)) {

  for (const chipset of platform.chipsets) {

    if (!chipsetDatabase[chipset]) {
      chipsetDatabase[chipset] = [];
    }

    chipsetDatabase[chipset].push({
      platform: platformName,
      manufacturer: platform.manufacturer,
      memory: platform.memory,
      category: platform.category
    });

  }

}


// ============================================================
// HELPER FUNCTIONS
// ============================================================


// Get platform information from socket/platform name.

function getPlatform(platformName) {

  if (!platformName) {
    return null;
  }

  return platformDatabase[platformName] || null;
}


// Get compatible memory types for a platform.

function getPlatformMemory(platformName) {

  const platform = getPlatform(platformName);

  if (!platform) {
    return [];
  }

  return platform.memory || [];
}


// Get compatible chipsets for a platform.

function getCompatibleChipsets(platformName) {

  const platform = getPlatform(platformName);

  if (!platform) {
    return [];
  }

  return platform.chipsets || [];
}


// Find possible platforms from a chipset.

function findPlatformsByChipset(chipset) {

  if (!chipset) {
    return [];
  }

  const normalizedChipset =
    chipset.toUpperCase().trim();

  return chipsetDatabase[normalizedChipset] || [];
}


// Check whether a RAM generation is supported by a platform.

function isMemoryCompatible(platformName, memoryType) {

  if (!platformName || !memoryType) {
    return null;
  }

  const supportedMemory =
    getPlatformMemory(platformName);

  return supportedMemory.includes(
    memoryType.toUpperCase()
  );
}


// Check whether a chipset belongs to a platform.

function isChipsetCompatible(platformName, chipset) {

  if (!platformName || !chipset) {
    return null;
  }

  const compatibleChipsets =
    getCompatibleChipsets(platformName);

  return compatibleChipsets.includes(
    chipset.toUpperCase()
  );
}


// ============================================================
// AUTOMATIC RAM TYPE LOGIC
// ============================================================
//
// Returns:
//
// {
//   automatic: true,
//   memory: "DDR4",
//   options: ["DDR4"]
// }
//
// OR:
//
// {
//   automatic: false,
//   memory: null,
//   options: ["DDR4", "DDR5"]
// }
//
// This allows app.js to decide whether the RAM field should
// automatically lock or allow the user to choose.
// ============================================================

function getAutomaticMemorySelection(platformName) {

  const memoryOptions =
    getPlatformMemory(platformName);

  if (memoryOptions.length === 0) {

    return {
      automatic: false,
      memory: null,
      options: []
    };

  }


  if (memoryOptions.length === 1) {

    return {
      automatic: true,
      memory: memoryOptions[0],
      options: memoryOptions
    };

  }


  return {
    automatic: false,
    memory: null,
    options: memoryOptions
  };

}


// ============================================================
// DATABASE STATS
// ============================================================

function getPlatformDatabaseStats() {

  return {
    platforms:
      Object.keys(platformDatabase).length,

    chipsets:
      Object.keys(chipsetDatabase).length
  };

}
