// ============================================================
// PCDEAL - PARTS DATABASE
// VERSION 3
// ============================================================
//
// IMPORTANT:
//
// platform.js MUST load before this file.
//
// Correct index.html order:
//
// <script src="platform.js"></script>
// <script src="parts.js"></script>
// <script src="app.js"></script>
//
// CPU entries use:
//
// socket: "AM4"
// socket: "AM5"
// socket: "LGA1150"
// etc.
//
// RAM compatibility comes from platform.js automatically.
//
// Used values are rough CAD estimates for now.
// They are NOT live market prices.
// ============================================================



// ============================================================
// GPU DATABASE
// ============================================================

const gpuDatabase = {

  // ==========================================================
  // NVIDIA RTX 50 SERIES
  // ==========================================================

  "rtx 5090": {
    name: "RTX 5090",
    value: 3200,
    performance: 100,
    vram: 32,
    manufacturer: "NVIDIA",
    generation: "RTX 50"
  },

  "rtx 5080": {
    name: "RTX 5080",
    value: 1700,
    performance: 90,
    vram: 16,
    manufacturer: "NVIDIA",
    generation: "RTX 50"
  },

  "rtx 5070 ti": {
    name: "RTX 5070 Ti",
    value: 1100,
    performance: 78,
    vram: 16,
    manufacturer: "NVIDIA",
    generation: "RTX 50"
  },

  "rtx 5070": {
    name: "RTX 5070",
    value: 850,
    performance: 69,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 50"
  },


  // ==========================================================
  // NVIDIA RTX 40 SERIES
  // ==========================================================

  "rtx 4090": {
    name: "RTX 4090",
    value: 2200,
    performance: 96,
    vram: 24,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4080 super": {
    name: "RTX 4080 Super",
    value: 1300,
    performance: 86,
    vram: 16,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4080": {
    name: "RTX 4080",
    value: 1150,
    performance: 83,
    vram: 16,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4070 ti super": {
    name: "RTX 4070 Ti Super",
    value: 950,
    performance: 76,
    vram: 16,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4070 ti": {
    name: "RTX 4070 Ti",
    value: 800,
    performance: 71,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4070 super": {
    name: "RTX 4070 Super",
    value: 700,
    performance: 67,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4070": {
    name: "RTX 4070",
    value: 600,
    performance: 62,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4060 ti 16gb": {
    name: "RTX 4060 Ti 16GB",
    value: 450,
    performance: 49,
    vram: 16,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4060 ti": {
    name: "RTX 4060 Ti",
    value: 400,
    performance: 48,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },

  "rtx 4060": {
    name: "RTX 4060",
    value: 300,
    performance: 40,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 40"
  },


  // ==========================================================
  // NVIDIA RTX 30 SERIES
  // ==========================================================

  "rtx 3090 ti": {
    name: "RTX 3090 Ti",
    value: 850,
    performance: 72,
    vram: 24,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3090": {
    name: "RTX 3090",
    value: 750,
    performance: 69,
    vram: 24,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3080 ti": {
    name: "RTX 3080 Ti",
    value: 600,
    performance: 64,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3080 12gb": {
    name: "RTX 3080 12GB",
    value: 540,
    performance: 62,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3080": {
    name: "RTX 3080",
    value: 500,
    performance: 60,
    vram: 10,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3070 ti": {
    name: "RTX 3070 Ti",
    value: 400,
    performance: 52,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3070": {
    name: "RTX 3070",
    value: 350,
    performance: 48,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3060 ti": {
    name: "RTX 3060 Ti",
    value: 300,
    performance: 43,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3060 12gb": {
    name: "RTX 3060 12GB",
    value: 250,
    performance: 36,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3060": {
    name: "RTX 3060",
    value: 240,
    performance: 35,
    vram: 12,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },

  "rtx 3050": {
    name: "RTX 3050",
    value: 170,
    performance: 27,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 30"
  },


  // ==========================================================
  // NVIDIA RTX 20 SERIES
  // ==========================================================

  "rtx 2080 ti": {
    name: "RTX 2080 Ti",
    value: 320,
    performance: 45,
    vram: 11,
    manufacturer: "NVIDIA",
    generation: "RTX 20"
  },

  "rtx 2080 super": {
    name: "RTX 2080 Super",
    value: 250,
    performance: 39,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 20"
  },

  "rtx 2080": {
    name: "RTX 2080",
    value: 220,
    performance: 37,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 20"
  },

  "rtx 2070 super": {
    name: "RTX 2070 Super",
    value: 200,
    performance: 34,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 20"
  },

  "rtx 2070": {
    name: "RTX 2070",
    value: 170,
    performance: 31,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 20"
  },

  "rtx 2060 super": {
    name: "RTX 2060 Super",
    value: 160,
    performance: 29,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "RTX 20"
  },

  "rtx 2060": {
    name: "RTX 2060",
    value: 140,
    performance: 26,
    vram: 6,
    manufacturer: "NVIDIA",
    generation: "RTX 20"
  },


  // ==========================================================
  // NVIDIA GTX 10 / 16 SERIES
  // ==========================================================

  "gtx 1080 ti": {
    name: "GTX 1080 Ti",
    value: 220,
    performance: 32,
    vram: 11,
    manufacturer: "NVIDIA",
    generation: "GTX 10"
  },

  "gtx 1080": {
    name: "GTX 1080",
    value: 150,
    performance: 27,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "GTX 10"
  },

  "gtx 1070 ti": {
    name: "GTX 1070 Ti",
    value: 130,
    performance: 24,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "GTX 10"
  },

  "gtx 1070": {
    name: "GTX 1070",
    value: 110,
    performance: 22,
    vram: 8,
    manufacturer: "NVIDIA",
    generation: "GTX 10"
  },

  "gtx 1060 6gb": {
    name: "GTX 1060 6GB",
    value: 80,
    performance: 17,
    vram: 6,
    manufacturer: "NVIDIA",
    generation: "GTX 10"
  },

  "gtx 1060 3gb": {
    name: "GTX 1060 3GB",
    value: 60,
    performance: 14,
    vram: 3,
    manufacturer: "NVIDIA",
    generation: "GTX 10"
  },

  "gtx 1660 super": {
    name: "GTX 1660 Super",
    value: 120,
    performance: 23,
    vram: 6,
    manufacturer: "NVIDIA",
    generation: "GTX 16"
  },

  "gtx 1660 ti": {
    name: "GTX 1660 Ti",
    value: 115,
    performance: 22,
    vram: 6,
    manufacturer: "NVIDIA",
    generation: "GTX 16"
  },

  "gtx 1660": {
    name: "GTX 1660",
    value: 100,
    performance: 20,
    vram: 6,
    manufacturer: "NVIDIA",
    generation: "GTX 16"
  },

  "gtx 1650 super": {
    name: "GTX 1650 Super",
    value: 90,
    performance: 18,
    vram: 4,
    manufacturer: "NVIDIA",
    generation: "GTX 16"
  },

  "gtx 1650": {
    name: "GTX 1650",
    value: 70,
    performance: 14,
    vram: 4,
    manufacturer: "NVIDIA",
    generation: "GTX 16"
  },


  // ==========================================================
  // AMD RX 9000 SERIES
  // ==========================================================

  "rx 9070 xt": {
    name: "RX 9070 XT",
    value: 900,
    performance: 76,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 9000"
  },

  "rx 9070": {
    name: "RX 9070",
    value: 750,
    performance: 69,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 9000"
  },


  // ==========================================================
  // AMD RX 7000 SERIES
  // ==========================================================

  "rx 7900 xtx": {
    name: "RX 7900 XTX",
    value: 1000,
    performance: 80,
    vram: 24,
    manufacturer: "AMD",
    generation: "RX 7000"
  },

  "rx 7900 xt": {
    name: "RX 7900 XT",
    value: 800,
    performance: 73,
    vram: 20,
    manufacturer: "AMD",
    generation: "RX 7000"
  },

  "rx 7900 gre": {
    name: "RX 7900 GRE",
    value: 620,
    performance: 64,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 7000"
  },

  "rx 7800 xt": {
    name: "RX 7800 XT",
    value: 600,
    performance: 61,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 7000"
  },

  "rx 7700 xt": {
    name: "RX 7700 XT",
    value: 450,
    performance: 52,
    vram: 12,
    manufacturer: "AMD",
    generation: "RX 7000"
  },

  "rx 7600 xt": {
    name: "RX 7600 XT",
    value: 350,
    performance: 42,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 7000"
  },

  "rx 7600": {
    name: "RX 7600",
    value: 280,
    performance: 37,
    vram: 8,
    manufacturer: "AMD",
    generation: "RX 7000"
  },


  // ==========================================================
  // AMD RX 6000 SERIES
  // ==========================================================

  "rx 6950 xt": {
    name: "RX 6950 XT",
    value: 500,
    performance: 61,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6900 xt": {
    name: "RX 6900 XT",
    value: 470,
    performance: 58,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6800 xt": {
    name: "RX 6800 XT",
    value: 450,
    performance: 56,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6800": {
    name: "RX 6800",
    value: 390,
    performance: 50,
    vram: 16,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6750 xt": {
    name: "RX 6750 XT",
    value: 320,
    performance: 45,
    vram: 12,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6700 xt": {
    name: "RX 6700 XT",
    value: 300,
    performance: 43,
    vram: 12,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6650 xt": {
    name: "RX 6650 XT",
    value: 220,
    performance: 35,
    vram: 8,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6600 xt": {
    name: "RX 6600 XT",
    value: 200,
    performance: 33,
    vram: 8,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6600": {
    name: "RX 6600",
    value: 170,
    performance: 30,
    vram: 8,
    manufacturer: "AMD",
    generation: "RX 6000"
  },

  "rx 6500 xt": {
    name: "RX 6500 XT",
    value: 100,
    performance: 18,
    vram: 4,
    manufacturer: "AMD",
    generation: "RX 6000"
  },


  // ==========================================================
  // INTEL ARC
  // ==========================================================

  "arc b580": {
    name: "Intel Arc B580",
    value: 350,
    performance: 44,
    vram: 12,
    manufacturer: "Intel",
    generation: "Battlemage"
  },

  "arc a770": {
    name: "Intel Arc A770",
    value: 250,
    performance: 38,
    vram: 16,
    manufacturer: "Intel",
    generation: "Alchemist"
  },

  "arc a750": {
    name: "Intel Arc A750",
    value: 200,
    performance: 34,
    vram: 8,
    manufacturer: "Intel",
    generation: "Alchemist"
  }

};



// ============================================================
// CPU DATABASE
// ============================================================

const cpuDatabase = {

  // ==========================================================
  // AMD AM5 - ZEN 5 X3D
  // ==========================================================

  "ryzen 9 9950x3d": {
    name: "Ryzen 9 9950X3D",
    value: 850,
    performance: 100,
    socket: "AM5",
    generation: "Zen 5",
    manufacturer: "AMD"
  },

  "ryzen 9 9900x3d": {
    name: "Ryzen 9 9900X3D",
    value: 700,
    performance: 96,
    socket: "AM5",
    generation: "Zen 5",
    manufacturer: "AMD"
  },

  "ryzen 7 9800x3d": {
    name: "Ryzen 7 9800X3D",
    value: 650,
    performance: 98,
    socket: "AM5",
    generation: "Zen 5",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM5 - ZEN 5
  // ==========================================================

  "ryzen 9 9950x": {
    name: "Ryzen 9 9950X",
    value: 700,
    performance: 90,
    socket: "AM5",
    generation: "Zen 5",
    manufacturer: "AMD"
  },

  "ryzen 9 9900x": {
    name: "Ryzen 9 9900X",
    value: 550,
    performance: 86,
    socket: "AM5",
    generation: "Zen 5",
    manufacturer: "AMD"
  },

  "ryzen 7 9700x": {
    name: "Ryzen 7 9700X",
    value: 400,
    performance: 82,
    socket: "AM5",
    generation: "Zen 5",
    manufacturer: "AMD"
  },

  "ryzen 5 9600x": {
    name: "Ryzen 5 9600X",
    value: 280,
    performance: 76,
    socket: "AM5",
    generation: "Zen 5",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM5 - ZEN 4 X3D
  // ==========================================================

  "ryzen 9 7950x3d": {
    name: "Ryzen 9 7950X3D",
    value: 600,
    performance: 94,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 9 7900x3d": {
    name: "Ryzen 9 7900X3D",
    value: 470,
    performance: 88,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 7 7800x3d": {
    name: "Ryzen 7 7800X3D",
    value: 400,
    performance: 92,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM5 - ZEN 4
  // ==========================================================

  "ryzen 9 7950x": {
    name: "Ryzen 9 7950X",
    value: 500,
    performance: 87,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 9 7900x": {
    name: "Ryzen 9 7900X",
    value: 380,
    performance: 82,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 9 7900": {
    name: "Ryzen 9 7900",
    value: 350,
    performance: 80,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 7 7700x": {
    name: "Ryzen 7 7700X",
    value: 270,
    performance: 75,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 7 7700": {
    name: "Ryzen 7 7700",
    value: 250,
    performance: 74,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 5 7600x": {
    name: "Ryzen 5 7600X",
    value: 200,
    performance: 70,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 5 7600": {
    name: "Ryzen 5 7600",
    value: 190,
    performance: 68,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },

  "ryzen 5 7500f": {
    name: "Ryzen 5 7500F",
    value: 160,
    performance: 65,
    socket: "AM5",
    generation: "Zen 4",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM4 - X3D
  // ==========================================================

  "ryzen 7 5800x3d": {
    name: "Ryzen 7 5800X3D",
    value: 280,
    performance: 70,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 7 5700x3d": {
    name: "Ryzen 7 5700X3D",
    value: 220,
    performance: 67,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 5 5600x3d": {
    name: "Ryzen 5 5600X3D",
    value: 200,
    performance: 64,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM4 - ZEN 3
  // ==========================================================

  "ryzen 9 5950x": {
    name: "Ryzen 9 5950X",
    value: 280,
    performance: 68,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 9 5900x": {
    name: "Ryzen 9 5900X",
    value: 220,
    performance: 64,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 7 5800x": {
    name: "Ryzen 7 5800X",
    value: 150,
    performance: 57,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 7 5700x": {
    name: "Ryzen 7 5700X",
    value: 140,
    performance: 55,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 7 5700g": {
    name: "Ryzen 7 5700G",
    value: 130,
    performance: 50,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 5 5600x": {
    name: "Ryzen 5 5600X",
    value: 110,
    performance: 50,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 5 5600": {
    name: "Ryzen 5 5600",
    value: 100,
    performance: 48,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 5 5600g": {
    name: "Ryzen 5 5600G",
    value: 90,
    performance: 44,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },

  "ryzen 5 5500": {
    name: "Ryzen 5 5500",
    value: 80,
    performance: 41,
    socket: "AM4",
    generation: "Zen 3",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM4 - ZEN 2
  // ==========================================================

  "ryzen 7 3700x": {
    name: "Ryzen 7 3700X",
    value: 90,
    performance: 41,
    socket: "AM4",
    generation: "Zen 2",
    manufacturer: "AMD"
  },

  "ryzen 5 3600x": {
    name: "Ryzen 5 3600X",
    value: 75,
    performance: 36,
    socket: "AM4",
    generation: "Zen 2",
    manufacturer: "AMD"
  },

  "ryzen 5 3600": {
    name: "Ryzen 5 3600",
    value: 70,
    performance: 35,
    socket: "AM4",
    generation: "Zen 2",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM4 - ZEN+
  // ==========================================================

  "ryzen 5 2600": {
    name: "Ryzen 5 2600",
    value: 45,
    performance: 27,
    socket: "AM4",
    generation: "Zen+",
    manufacturer: "AMD"
  },


  // ==========================================================
  // AMD AM4 - ZEN 1
  // ==========================================================

  "ryzen 5 1600": {
    name: "Ryzen 5 1600",
    value: 35,
    performance: 22,
    socket: "AM4",
    generation: "Zen",
    manufacturer: "AMD"
  },


  // ==========================================================
  // INTEL LGA1851
  // ==========================================================

  "ultra 9 285k": {
    name: "Core Ultra 9 285K",
    value: 650,
    performance: 90,
    socket: "LGA1851",
    generation: "Arrow Lake",
    manufacturer: "Intel"
  },

  "ultra 7 265k": {
    name: "Core Ultra 7 265K",
    value: 450,
    performance: 84,
    socket: "LGA1851",
    generation: "Arrow Lake",
    manufacturer: "Intel"
  },

  "ultra 5 245k": {
    name: "Core Ultra 5 245K",
    value: 320,
    performance: 77,
    socket: "LGA1851",
    generation: "Arrow Lake",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 14TH GEN - LGA1700
  // ==========================================================

  "i9-14900k": {
    name: "Core i9-14900K",
    value: 500,
    performance: 90,
    socket: "LGA1700",
    generation: "14th Gen",
    manufacturer: "Intel"
  },

  "i9-14900kf": {
    name: "Core i9-14900KF",
    value: 470,
    performance: 90,
    socket: "LGA1700",
    generation: "14th Gen",
    manufacturer: "Intel"
  },

  "i7-14700k": {
    name: "Core i7-14700K",
    value: 380,
    performance: 86,
    socket: "LGA1700",
    generation: "14th Gen",
    manufacturer: "Intel"
  },

  "i7-14700kf": {
    name: "Core i7-14700KF",
    value: 350,
    performance: 85,
    socket: "LGA1700",
    generation: "14th Gen",
    manufacturer: "Intel"
  },

  "i5-14600k": {
    name: "Core i5-14600K",
    value: 260,
    performance: 82,
    socket: "LGA1700",
    generation: "14th Gen",
    manufacturer: "Intel"
  },

  "i5-14600kf": {
    name: "Core i5-14600KF",
    value: 240,
    performance: 81,
    socket: "LGA1700",
    generation: "14th Gen",
    manufacturer: "Intel"
  },

  "i5-14400f": {
    name: "Core i5-14400F",
    value: 180,
    performance: 68,
    socket: "LGA1700",
    generation: "14th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 13TH GEN - LGA1700
  // ==========================================================

  "i9-13900k": {
    name: "Core i9-13900K",
    value: 420,
    performance: 87,
    socket: "LGA1700",
    generation: "13th Gen",
    manufacturer: "Intel"
  },

  "i7-13700k": {
    name: "Core i7-13700K",
    value: 300,
    performance: 82,
    socket: "LGA1700",
    generation: "13th Gen",
    manufacturer: "Intel"
  },

  "i5-13600k": {
    name: "Core i5-13600K",
    value: 230,
    performance: 78,
    socket: "LGA1700",
    generation: "13th Gen",
    manufacturer: "Intel"
  },

  "i5-13400f": {
    name: "Core i5-13400F",
    value: 150,
    performance: 64,
    socket: "LGA1700",
    generation: "13th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 12TH GEN - LGA1700
  // ==========================================================

  "i9-12900k": {
    name: "Core i9-12900K",
    value: 300,
    performance: 77,
    socket: "LGA1700",
    generation: "12th Gen",
    manufacturer: "Intel"
  },

  "i7-12700k": {
    name: "Core i7-12700K",
    value: 220,
    performance: 72,
    socket: "LGA1700",
    generation: "12th Gen",
    manufacturer: "Intel"
  },

  "i7-12700f": {
    name: "Core i7-12700F",
    value: 190,
    performance: 69,
    socket: "LGA1700",
    generation: "12th Gen",
    manufacturer: "Intel"
  },

  "i5-12600k": {
    name: "Core i5-12600K",
    value: 160,
    performance: 65,
    socket: "LGA1700",
    generation: "12th Gen",
    manufacturer: "Intel"
  },

  "i5-12400f": {
    name: "Core i5-12400F",
    value: 120,
    performance: 55,
    socket: "LGA1700",
    generation: "12th Gen",
    manufacturer: "Intel"
  },

  "i3-12100f": {
    name: "Core i3-12100F",
    value: 70,
    performance: 45,
    socket: "LGA1700",
    generation: "12th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 11TH GEN - LGA1200
  // ==========================================================

  "i9-11900k": {
    name: "Core i9-11900K",
    value: 170,
    performance: 55,
    socket: "LGA1200",
    generation: "11th Gen",
    manufacturer: "Intel"
  },

  "i7-11700k": {
    name: "Core i7-11700K",
    value: 140,
    performance: 52,
    socket: "LGA1200",
    generation: "11th Gen",
    manufacturer: "Intel"
  },

  "i5-11600k": {
    name: "Core i5-11600K",
    value: 100,
    performance: 47,
    socket: "LGA1200",
    generation: "11th Gen",
    manufacturer: "Intel"
  },

  "i5-11400f": {
    name: "Core i5-11400F",
    value: 80,
    performance: 42,
    socket: "LGA1200",
    generation: "11th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 10TH GEN - LGA1200
  // ==========================================================

  "i9-10900k": {
    name: "Core i9-10900K",
    value: 160,
    performance: 52,
    socket: "LGA1200",
    generation: "10th Gen",
    manufacturer: "Intel"
  },

  "i7-10700k": {
    name: "Core i7-10700K",
    value: 120,
    performance: 48,
    socket: "LGA1200",
    generation: "10th Gen",
    manufacturer: "Intel"
  },

  "i5-10600k": {
    name: "Core i5-10600K",
    value: 90,
    performance: 42,
    socket: "LGA1200",
    generation: "10th Gen",
    manufacturer: "Intel"
  },

  "i5-10400f": {
    name: "Core i5-10400F",
    value: 70,
    performance: 37,
    socket: "LGA1200",
    generation: "10th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 9TH GEN - LGA1151 300 SERIES
  // ==========================================================

  "i9-9900k": {
    name: "Core i9-9900K",
    value: 150,
    performance: 48,
    socket: "LGA1151-300",
    generation: "9th Gen",
    manufacturer: "Intel"
  },

  "i7-9700k": {
    name: "Core i7-9700K",
    value: 100,
    performance: 40,
    socket: "LGA1151-300",
    generation: "9th Gen",
    manufacturer: "Intel"
  },

  "i5-9600k": {
    name: "Core i5-9600K",
    value: 75,
    performance: 34,
    socket: "LGA1151-300",
    generation: "9th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 8TH GEN - LGA1151 300 SERIES
  // ==========================================================

  "i7-8700k": {
    name: "Core i7-8700K",
    value: 85,
    performance: 37,
    socket: "LGA1151-300",
    generation: "8th Gen",
    manufacturer: "Intel"
  },

  "i5-8600k": {
    name: "Core i5-8600K",
    value: 65,
    performance: 31,
    socket: "LGA1151-300",
    generation: "8th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 7TH GEN - LGA1151 100/200 SERIES
  // ==========================================================

  "i7-7700k": {
    name: "Core i7-7700K",
    value: 65,
    performance: 30,
    socket: "LGA1151-100-200",
    generation: "7th Gen",
    manufacturer: "Intel"
  },

  "i7-7700": {
    name: "Core i7-7700",
    value: 55,
    performance: 27,
    socket: "LGA1151-100-200",
    generation: "7th Gen",
    manufacturer: "Intel"
  },

  "i5-7600k": {
    name: "Core i5-7600K",
    value: 45,
    performance: 23,
    socket: "LGA1151-100-200",
    generation: "7th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 6TH GEN - LGA1151 100/200 SERIES
  // ==========================================================

  "i7-6700k": {
    name: "Core i7-6700K",
    value: 55,
    performance: 27,
    socket: "LGA1151-100-200",
    generation: "6th Gen",
    manufacturer: "Intel"
  },

  "i7-6700": {
    name: "Core i7-6700",
    value: 45,
    performance: 24,
    socket: "LGA1151-100-200",
    generation: "6th Gen",
    manufacturer: "Intel"
  },

  "i5-6600k": {
    name: "Core i5-6600K",
    value: 35,
    performance: 21,
    socket: "LGA1151-100-200",
    generation: "6th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 4TH GEN HASWELL - LGA1150
  // ==========================================================

  "i7-4790k": {
    name: "Core i7-4790K",
    value: 40,
    performance: 22,
    socket: "LGA1150",
    generation: "4th Gen",
    manufacturer: "Intel"
  },

  "i7-4790": {
    name: "Core i7-4790",
    value: 35,
    performance: 20,
    socket: "LGA1150",
    generation: "4th Gen",
    manufacturer: "Intel"
  },

  "i7-4770k": {
    name: "Core i7-4770K",
    value: 35,
    performance: 20,
    socket: "LGA1150",
    generation: "4th Gen",
    manufacturer: "Intel"
  },

  "i7-4770": {
    name: "Core i7-4770",
    value: 30,
    performance: 19,
    socket: "LGA1150",
    generation: "4th Gen",
    manufacturer: "Intel"
  },

  "i5-4690k": {
    name: "Core i5-4690K",
    value: 25,
    performance: 16,
    socket: "LGA1150",
    generation: "4th Gen",
    manufacturer: "Intel"
  },

  "i5-4670k": {
    name: "Core i5-4670K",
    value: 20,
    performance: 15,
    socket: "LGA1150",
    generation: "4th Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 3RD GEN IVY BRIDGE - LGA1155
  // ==========================================================

  "i7-3770k": {
    name: "Core i7-3770K",
    value: 30,
    performance: 18,
    socket: "LGA1155",
    generation: "3rd Gen",
    manufacturer: "Intel"
  },

  "i7-3770": {
    name: "Core i7-3770",
    value: 25,
    performance: 17,
    socket: "LGA1155",
    generation: "3rd Gen",
    manufacturer: "Intel"
  },

  "i5-3570k": {
    name: "Core i5-3570K",
    value: 15,
    performance: 13,
    socket: "LGA1155",
    generation: "3rd Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 2ND GEN SANDY BRIDGE - LGA1155
  // ==========================================================

  "i7-2700k": {
    name: "Core i7-2700K",
    value: 25,
    performance: 16,
    socket: "LGA1155",
    generation: "2nd Gen",
    manufacturer: "Intel"
  },

  "i7-2600k": {
    name: "Core i7-2600K",
    value: 25,
    performance: 15,
    socket: "LGA1155",
    generation: "2nd Gen",
    manufacturer: "Intel"
  },

  "i7-2600": {
    name: "Core i7-2600",
    value: 20,
    performance: 14,
    socket: "LGA1155",
    generation: "2nd Gen",
    manufacturer: "Intel"
  },

  "i5-2500k": {
    name: "Core i5-2500K",
    value: 15,
    performance: 12,
    socket: "LGA1155",
    generation: "2nd Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL 1ST GEN - LGA1156
  // ==========================================================

  "i7-870": {
    name: "Core i7-870",
    value: 15,
    performance: 10,
    socket: "LGA1156",
    generation: "1st Gen",
    manufacturer: "Intel"
  },

  "i7-860": {
    name: "Core i7-860",
    value: 12,
    performance: 9,
    socket: "LGA1156",
    generation: "1st Gen",
    manufacturer: "Intel"
  },

  "i5-750": {
    name: "Core i5-750",
    value: 8,
    performance: 7,
    socket: "LGA1156",
    generation: "1st Gen",
    manufacturer: "Intel"
  },


  // ==========================================================
  // INTEL HEDT
  // ==========================================================

  "i7-980x": {
    name: "Core i7-980X",
    value: 35,
    performance: 13,
    socket: "LGA1366",
    generation: "Gulftown",
    manufacturer: "Intel"
  },

  "i7-5960x": {
    name: "Core i7-5960X",
    value: 55,
    performance: 24,
    socket: "LGA2011-3",
    generation: "Haswell-E",
    manufacturer: "Intel"
  },

  "i7-6950x": {
    name: "Core i7-6950X",
    value: 80,
    performance: 30,
    socket: "LGA2011-3",
    generation: "Broadwell-E",
    manufacturer: "Intel"
  },

  "i9-7900x": {
    name: "Core i9-7900X",
    value: 100,
    performance: 38,
    socket: "LGA2066",
    generation: "Skylake-X",
    manufacturer: "Intel"
  },

  "i9-10980xe": {
    name: "Core i9-10980XE",
    value: 180,
    performance: 48,
    socket: "LGA2066",
    generation: "Cascade Lake-X",
    manufacturer: "Intel"
  }

};



// ============================================================
// GPU ALIASES
// ============================================================

const gpuAliases = {

  // NVIDIA

  "geforce rtx 5090": "rtx 5090",
  "geforce rtx 5080": "rtx 5080",
  "geforce rtx 5070 ti": "rtx 5070 ti",
  "geforce rtx 5070": "rtx 5070",

  "geforce rtx 4090": "rtx 4090",
  "geforce rtx 4080 super": "rtx 4080 super",
  "geforce rtx 4080": "rtx 4080",
  "geforce rtx 4070 ti super": "rtx 4070 ti super",
  "geforce rtx 4070 ti": "rtx 4070 ti",
  "geforce rtx 4070 super": "rtx 4070 super",
  "geforce rtx 4070": "rtx 4070",
  "geforce rtx 4060 ti": "rtx 4060 ti",
  "geforce rtx 4060": "rtx 4060",

  "geforce rtx 3090 ti": "rtx 3090 ti",
  "geforce rtx 3090": "rtx 3090",
  "geforce rtx 3080 ti": "rtx 3080 ti",
  "geforce rtx 3080": "rtx 3080",
  "geforce rtx 3070 ti": "rtx 3070 ti",
  "geforce rtx 3070": "rtx 3070",
  "geforce rtx 3060 ti": "rtx 3060 ti",
  "geforce rtx 3060": "rtx 3060",
  "geforce rtx 3050": "rtx 3050",

  "geforce rtx 2080 ti": "rtx 2080 ti",
  "geforce rtx 2080 super": "rtx 2080 super",
  "geforce rtx 2080": "rtx 2080",
  "geforce rtx 2070 super": "rtx 2070 super",
  "geforce rtx 2070": "rtx 2070",
  "geforce rtx 2060 super": "rtx 2060 super",
  "geforce rtx 2060": "rtx 2060",

  "geforce gtx 1080 ti": "gtx 1080 ti",
  "geforce gtx 1080": "gtx 1080",
  "geforce gtx 1070 ti": "gtx 1070 ti",
  "geforce gtx 1070": "gtx 1070",
  "geforce gtx 1060 6gb": "gtx 1060 6gb",
  "geforce gtx 1060 3gb": "gtx 1060 3gb",

  "geforce gtx 1660 super": "gtx 1660 super",
  "geforce gtx 1660 ti": "gtx 1660 ti",
  "geforce gtx 1660": "gtx 1660",
  "geforce gtx 1650 super": "gtx 1650 super",
  "geforce gtx 1650": "gtx 1650",

  // AMD

  "radeon rx 9070 xt": "rx 9070 xt",
  "radeon rx 9070": "rx 9070",

  "radeon rx 7900 xtx": "rx 7900 xtx",
  "radeon rx 7900 xt": "rx 7900 xt",
  "radeon rx 7900 gre": "rx 7900 gre",
  "radeon rx 7800 xt": "rx 7800 xt",
  "radeon rx 7700 xt": "rx 7700 xt",
  "radeon rx 7600 xt": "rx 7600 xt",
  "radeon rx 7600": "rx 7600",

  "radeon rx 6950 xt": "rx 6950 xt",
  "radeon rx 6900 xt": "rx 6900 xt",
  "radeon rx 6800 xt": "rx 6800 xt",
  "radeon rx 6800": "rx 6800",
  "radeon rx 6750 xt": "rx 6750 xt",
  "radeon rx 6700 xt": "rx 6700 xt",
  "radeon rx 6650 xt": "rx 6650 xt",
  "radeon rx 6600 xt": "rx 6600 xt",
  "radeon rx 6600": "rx 6600",
  "radeon rx 6500 xt": "rx 6500 xt",

  // Intel

  "intel arc b580": "arc b580",
  "intel arc a770": "arc a770",
  "intel arc a750": "arc a750"

};



// ============================================================
// CPU ALIASES
// ============================================================

const cpuAliases = {

  // AMD prefixes

  "amd ryzen 9 9950x3d": "ryzen 9 9950x3d",
  "amd ryzen 9 9900x3d": "ryzen 9 9900x3d",
  "amd ryzen 7 9800x3d": "ryzen 7 9800x3d",

  "amd ryzen 9 7950x3d": "ryzen 9 7950x3d",
  "amd ryzen 9 7900x3d": "ryzen 9 7900x3d",
  "amd ryzen 7 7800x3d": "ryzen 7 7800x3d",

  "amd ryzen 7 5800x3d": "ryzen 7 5800x3d",
  "amd ryzen 7 5700x3d": "ryzen 7 5700x3d",
  "amd ryzen 5 5600x3d": "ryzen 5 5600x3d",

  "amd ryzen 7 5700x": "ryzen 7 5700x",
  "amd ryzen 5 5600x": "ryzen 5 5600x",
  "amd ryzen 5 5600": "ryzen 5 5600",

  // Intel Core

  "intel core i9 14900k": "i9-14900k",
  "intel core i9-14900k": "i9-14900k",

  "intel core i7 14700k": "i7-14700k",
  "intel core i7-14700k": "i7-14700k",

  "intel core i5 14600k": "i5-14600k",
  "intel core i5-14600k": "i5-14600k",

  "intel core i9 13900k": "i9-13900k",
  "intel core i9-13900k": "i9-13900k",

  "intel core i7 13700k": "i7-13700k",
  "intel core i7-13700k": "i7-13700k",

  "intel core i5 13600k": "i5-13600k",
  "intel core i5-13600k": "i5-13600k",

  "intel core i9 12900k": "i9-12900k",
  "intel core i9-12900k": "i9-12900k",

  "intel core i7 12700k": "i7-12700k",
  "intel core i7-12700k": "i7-12700k",

  "intel core i5 12600k": "i5-12600k",
  "intel core i5-12600k": "i5-12600k",

  "intel core i7 4790k": "i7-4790k",
  "intel core i7-4790k": "i7-4790k",

  "core i7 4790k": "i7-4790k",
  "core i7-4790k": "i7-4790k",

  "i7 4790k": "i7-4790k",

  "intel core i7 3770k": "i7-3770k",
  "intel core i7-3770k": "i7-3770k",

  "intel core i7 2600k": "i7-2600k",
  "intel core i7-2600k": "i7-2600k",

  // Core Ultra

  "intel core ultra 9 285k": "ultra 9 285k",
  "core ultra 9 285k": "ultra 9 285k",

  "intel core ultra 7 265k": "ultra 7 265k",
  "core ultra 7 265k": "ultra 7 265k",

  "intel core ultra 5 245k": "ultra 5 245k",
  "core ultra 5 245k": "ultra 5 245k"

};



// ============================================================
// NORMALIZATION
// ============================================================

function normalizePartName(name) {

  if (!name) {
    return "";
  }

  return name
    .toLowerCase()
    .trim()
    .replace(/[(),]/g, "")
    .replace(/\s+/g, " ");
}



// ============================================================
// MORE AGGRESSIVE NORMALIZATION FOR DETECTION
// ============================================================
//
// Makes:
//
// i7-4790K
// i7 4790K
// Intel Core i7-4790K
//
// easier for app.js to detect.
//
// ============================================================

function normalizePartForDetection(name) {

  if (!name) {
    return "";
  }

  return name
    .toLowerCase()
    .replace(/[-_/(),]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}



// ============================================================
// FIND GPU
// ============================================================

function findGPU(name) {

  if (!name) {
    return null;
  }

  const normalized =
    normalizePartName(name);

  // Direct database hit

  if (gpuDatabase[normalized]) {
    return gpuDatabase[normalized];
  }


  // Alias hit

  if (
    gpuAliases[normalized] &&
    gpuDatabase[gpuAliases[normalized]]
  ) {

    return gpuDatabase[
      gpuAliases[normalized]
    ];
  }


  // Remove common manufacturer words

  const cleaned = normalized
    .replace("nvidia ", "")
    .replace("geforce ", "")
    .replace("amd ", "")
    .replace("radeon ", "")
    .replace("intel ", "")
    .trim();


  if (gpuDatabase[cleaned]) {
    return gpuDatabase[cleaned];
  }


  return null;
}



// ============================================================
// FIND CPU
// ============================================================

function findCPU(name) {

  if (!name) {
    return null;
  }

  const normalized =
    normalizePartName(name);


  // Direct hit

  if (cpuDatabase[normalized]) {
    return cpuDatabase[normalized];
  }


  // Alias hit

  if (
    cpuAliases[normalized] &&
    cpuDatabase[cpuAliases[normalized]]
  ) {

    return cpuDatabase[
      cpuAliases[normalized]
    ];
  }


  // Remove common prefixes

  let cleaned = normalized
    .replace(/^amd /, "")
    .replace(/^intel core /, "")
    .replace(/^intel /, "")
    .replace(/^core /, "")
    .trim();


  if (cpuDatabase[cleaned]) {
    return cpuDatabase[cleaned];
  }


  // Handle Intel spacing:
  //
  // i7 4790k
  // becomes
  // i7-4790k

  cleaned = cleaned.replace(
    /^(i[3579])\s+(\d+[a-z]*)$/,
    "$1-$2"
  );


  if (cpuDatabase[cleaned]) {
    return cpuDatabase[cleaned];
  }


  return null;
}



// ============================================================
// CPU PLATFORM INFORMATION
// ============================================================

function getCPUPlatform(cpu) {

  if (!cpu || !cpu.socket) {
    return null;
  }

  if (
    typeof getPlatform !== "function"
  ) {

    console.warn(
      "platform.js has not loaded before parts.js."
    );

    return null;
  }

  return getPlatform(cpu.socket);
}



// ============================================================
// GET CPU MEMORY TYPES
// ============================================================

function getCPUMemoryTypes(cpu) {

  if (!cpu || !cpu.socket) {
    return [];
  }

  if (
    typeof getPlatformMemory !== "function"
  ) {
    return [];
  }

  return getPlatformMemory(
    cpu.socket
  );
}



// ============================================================
// GET CPU COMPATIBLE CHIPSETS
// ============================================================

function getCPUChipsets(cpu) {

  if (!cpu || !cpu.socket) {
    return [];
  }

  if (
    typeof getCompatibleChipsets !== "function"
  ) {
    return [];
  }

  return getCompatibleChipsets(
    cpu.socket
  );
}



// ============================================================
// GET FULL CPU COMPATIBILITY DATA
// ============================================================

function getCPUCompatibility(cpu) {

  if (!cpu) {
    return null;
  }

  const platform =
    getCPUPlatform(cpu);

  if (!platform) {

    return {
      cpu: cpu.name,
      socket: cpu.socket || null,
      memory: [],
      chipsets: [],
      automaticMemory: false
    };

  }


  const memory =
    platform.memory || [];

  return {

    cpu:
      cpu.name,

    socket:
      cpu.socket,

    manufacturer:
      platform.manufacturer,

    memory:
      memory,

    chipsets:
      platform.chipsets || [],

    category:
      platform.category || null,

    automaticMemory:
      memory.length === 1,

    automaticMemoryType:
      memory.length === 1
        ? memory[0]
        : null,

    memoryNote:
      platform.memoryNote || null

  };

}



// ============================================================
// CPU + CHIPSET COMPATIBILITY CHECK
// ============================================================

function checkCPUChipsetCompatibility(
  cpu,
  chipset
) {

  if (
    !cpu ||
    !cpu.socket ||
    !chipset
  ) {

    return {
      compatible: null,
      reason:
        "Not enough information."
    };
  }


  const normalizedChipset =
    chipset
      .toUpperCase()
      .trim();


  const chipsets =
    getCPUChipsets(cpu);


  if (
    chipsets.includes(
      normalizedChipset
    )
  ) {

    return {
      compatible: true,

      reason:
        `${cpu.name} uses ${cpu.socket}, and ${normalizedChipset} is listed for that platform.`
    };
  }


  return {
    compatible: false,

    reason:
      `${cpu.name} uses ${cpu.socket}, but ${normalizedChipset} is not listed as a compatible chipset.`
  };

}



// ============================================================
// CPU + RAM COMPATIBILITY CHECK
// ============================================================

function checkCPUMemoryCompatibility(
  cpu,
  memoryType
) {

  if (
    !cpu ||
    !memoryType
  ) {

    return {
      compatible: null,
      reason:
        "Not enough information."
    };
  }


  const supportedMemory =
    getCPUMemoryTypes(cpu);


  const normalizedMemory =
    memoryType
      .toUpperCase()
      .trim();


  if (
    supportedMemory.includes(
      normalizedMemory
    )
  ) {

    return {
      compatible: true,

      reason:
        `${cpu.name} supports ${normalizedMemory} on the ${cpu.socket} platform.`
    };
  }


  return {
    compatible: false,

    reason:
      `${cpu.name} uses ${cpu.socket}, which supports ${supportedMemory.join(" / ")}.`
  };

}



// ============================================================
// DETECT CPU FROM TEXT
// ============================================================
//
// This is much more reliable than exact key matching.
//
// ============================================================

function detectCPUFromText(text) {

  if (!text) {
    return null;
  }


  const listing =
    normalizePartForDetection(text);


  const candidates = [];


  for (
    const [key, cpu]
    of Object.entries(cpuDatabase)
  ) {

    candidates.push({
      cpu,
      text:
        normalizePartForDetection(key)
    });


    candidates.push({
      cpu,
      text:
        normalizePartForDetection(
          cpu.name
        )
    });


    for (
      const [alias, target]
      of Object.entries(cpuAliases)
    ) {

      if (target === key) {

        candidates.push({
          cpu,
          text:
            normalizePartForDetection(
              alias
            )
        });

      }

    }

  }


  candidates.sort(
    (a, b) =>
      b.text.length -
      a.text.length
  );


  const seen =
    new Set();


  for (
    const candidate
    of candidates
  ) {

    if (!candidate.text) {
      continue;
    }


    const id =
      candidate.cpu.name +
      "|" +
      candidate.text;


    if (seen.has(id)) {
      continue;
    }


    seen.add(id);


    if (
      listing.includes(
        candidate.text
      )
    ) {

      return candidate.cpu;

    }

  }


  return null;
}



// ============================================================
// DETECT GPU FROM TEXT
// ============================================================

function detectGPUFromText(text) {

  if (!text) {
    return null;
  }


  const listing =
    normalizePartForDetection(text);


  const candidates = [];


  for (
    const [key, gpu]
    of Object.entries(gpuDatabase)
  ) {

    candidates.push({
      gpu,
      text:
        normalizePartForDetection(key)
    });


    candidates.push({
      gpu,
      text:
        normalizePartForDetection(
          gpu.name
        )
    });


    for (
      const [alias, target]
      of Object.entries(gpuAliases)
    ) {

      if (target === key) {

        candidates.push({
          gpu,
          text:
            normalizePartForDetection(
              alias
            )
        });

      }

    }

  }


  // Longest names first.
  //
  // This prevents:
  //
  // RTX 3080
  //
  // being selected before:
  //
  // RTX 3080 12GB

  candidates.sort(
    (a, b) =>
      b.text.length -
      a.text.length
  );


  const seen =
    new Set();


  for (
    const candidate
    of candidates
  ) {

    if (!candidate.text) {
      continue;
    }


    const id =
      candidate.gpu.name +
      "|" +
      candidate.text;


    if (seen.has(id)) {
      continue;
    }


    seen.add(id);


    if (
      listing.includes(
        candidate.text
      )
    ) {

      return candidate.gpu;

    }

  }


  return null;
}



// ============================================================
// ALL CPU NAMES
// ============================================================

function getAllCPUNames() {

  return Object.values(
    cpuDatabase
  )
    .map(cpu => cpu.name)
    .sort();
}



// ============================================================
// ALL GPU NAMES
// ============================================================

function getAllGPUNames() {

  return Object.values(
    gpuDatabase
  )
    .map(gpu => gpu.name)
    .sort();
}



// ============================================================
// CPU DATABASE STATS
// ============================================================

function getCPUCount() {

  return Object.keys(
    cpuDatabase
  ).length;
}



// ============================================================
// GPU DATABASE STATS
// ============================================================

function getGPUCount() {

  return Object.keys(
    gpuDatabase
  ).length;
}



// ============================================================
// COMPLETE DATABASE STATS
// ============================================================

function getDatabaseStats() {

  return {

    cpus:
      getCPUCount(),

    gpus:
      getGPUCount(),

    totalParts:
      getCPUCount() +
      getGPUCount(),

    platforms:
      typeof platformDatabase !==
      "undefined"
        ? Object.keys(
            platformDatabase
          ).length
        : 0,

    chipsets:
      typeof chipsetDatabase !==
      "undefined"
        ? Object.keys(
            chipsetDatabase
          ).length
        : 0

  };

}



// ============================================================
// DEBUG CHECK
// ============================================================
//
// You can type:
//
// getDatabaseStats()
//
// into the browser console.
//
// Example:
//
// {
//   cpus: ...
//   gpus: ...
//   totalParts: ...
//   platforms: ...
//   chipsets: ...
// }
//
// ============================================================
