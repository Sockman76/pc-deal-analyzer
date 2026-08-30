// ========================================
// PC DEAL ANALYZER  HARDWARE DATABASE
// ========================================
//
// Prices are estimated USED values in CAD.
// These are starting estimates and will be
// improved as the website develops.
//

const gpuDatabase = {

  // NVIDIA RTX 40 SERIES

  "rtx 4090": {
    name: "RTX 4090",
    value: 2200,
    performance: 100
  },

  "rtx 4080 super": {
    name: "RTX 4080 Super",
    value: 1300,
    performance: 88
  },

  "rtx 4080": {
    name: "RTX 4080",
    value: 1150,
    performance: 85
  },

  "rtx 4070 ti super": {
    name: "RTX 4070 Ti Super",
    value: 950,
    performance: 78
  },

  "rtx 4070 ti": {
    name: "RTX 4070 Ti",
    value: 800,
    performance: 73
  },

  "rtx 4070 super": {
    name: "RTX 4070 Super",
    value: 700,
    performance: 68
  },

  "rtx 4070": {
    name: "RTX 4070",
    value: 600,
    performance: 63
  },

  "rtx 4060 ti": {
    name: "RTX 4060 Ti",
    value: 400,
    performance: 48
  },

  "rtx 4060": {
    name: "RTX 4060",
    value: 300,
    performance: 40
  },


  // NVIDIA RTX 30 SERIES

  "rtx 3090": {
    name: "RTX 3090",
    value: 750,
    performance: 70
  },

  "rtx 3080 ti": {
    name: "RTX 3080 Ti",
    value: 600,
    performance: 65
  },

  "rtx 3080": {
    name: "RTX 3080",
    value: 500,
    performance: 60
  },

  "rtx 3070 ti": {
    name: "RTX 3070 Ti",
    value: 400,
    performance: 52
  },

  "rtx 3070": {
    name: "RTX 3070",
    value: 350,
    performance: 48
  },

  "rtx 3060 ti": {
    name: "RTX 3060 Ti",
    value: 300,
    performance: 43
  },

  "rtx 3060": {
    name: "RTX 3060",
    value: 250,
    performance: 36
  },


  // AMD

  "rx 7900 xtx": {
    name: "RX 7900 XTX",
    value: 1000,
    performance: 82
  },

  "rx 7900 xt": {
    name: "RX 7900 XT",
    value: 800,
    performance: 74
  },

  "rx 7800 xt": {
    name: "RX 7800 XT",
    value: 600,
    performance: 62
  },

  "rx 7700 xt": {
    name: "RX 7700 XT",
    value: 450,
    performance: 53
  },

  "rx 6800 xt": {
    name: "RX 6800 XT",
    value: 450,
    performance: 57
  },

  "rx 6700 xt": {
    name: "RX 6700 XT",
    value: 300,
    performance: 43
  }

};


// ========================================
// CPU DATABASE
// ========================================

const cpuDatabase = {

  // AMD AM4

  "ryzen 5 3600": {
    name: "Ryzen 5 3600",
    value: 70,
    performance: 35,
    platform: "AM4"
  },

  "ryzen 5 5600": {
    name: "Ryzen 5 5600",
    value: 100,
    performance: 48,
    platform: "AM4"
  },

  "ryzen 5 5600x": {
    name: "Ryzen 5 5600X",
    value: 110,
    performance: 50,
    platform: "AM4"
  },

  "ryzen 7 5700x": {
    name: "Ryzen 7 5700X",
    value: 140,
    performance: 55,
    platform: "AM4"
  },

  "ryzen 7 5800x": {
    name: "Ryzen 7 5800X",
    value: 150,
    performance: 57,
    platform: "AM4"
  },

  "ryzen 7 5800x3d": {
    name: "Ryzen 7 5800X3D",
    value: 280,
    performance: 70,
    platform: "AM4"
  },


  // AMD AM5

  "ryzen 5 7600": {
    name: "Ryzen 5 7600",
    value: 190,
    performance: 68,
    platform: "AM5"
  },

  "ryzen 5 7600x": {
    name: "Ryzen 5 7600X",
    value: 200,
    performance: 70,
    platform: "AM5"
  },

  "ryzen 7 7700": {
    name: "Ryzen 7 7700",
    value: 250,
    performance: 74,
    platform: "AM5"
  },

  "ryzen 7 7800x3d": {
    name: "Ryzen 7 7800X3D",
    value: 400,
    performance: 92,
    platform: "AM5"
  },


  // INTEL

  "i5-10400f": {
    name: "Core i5-10400F",
    value: 70,
    performance: 37,
    platform: "LGA1200"
  },

  "i5-12400f": {
    name: "Core i5-12400F",
    value: 120,
    performance: 55,
    platform: "LGA1700"
  },

  "i5-12600k": {
    name: "Core i5-12600K",
    value: 160,
    performance: 65,
    platform: "LGA1700"
  },

  "i7-12700k": {
    name: "Core i7-12700K",
    value: 220,
    performance: 72,
    platform: "LGA1700"
  },

  "i5-13600k": {
    name: "Core i5-13600K",
    value: 230,
    performance: 78,
    platform: "LGA1700"
  },

  "i5-14600k": {
    name: "Core i5-14600K",
    value: 260,
    performance: 82,
    platform: "LGA1700"
  }

};


// ========================================
// LOOKUP FUNCTIONS
// ========================================

function normalizePartName(name) {

  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

}


function findGPU(name) {

  const search =
    normalizePartName(name);

  return gpuDatabase[search] || null;

}


function findCPU(name) {

  let search =
    normalizePartName(name);

  // Allow users to type:
  // "Intel Core i7-12700K"
  // instead of just "i7-12700k"

  search = search
    .replace("intel core ", "")
    .replace("intel ", "")
    .trim();

  return cpuDatabase[search] || null;

}
