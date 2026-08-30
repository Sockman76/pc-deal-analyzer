// ========================================
// PC DEAL ANALYZER - HARDWARE DATABASE V2
// ========================================
//
// IMPORTANT:
// These are manually maintained USED-value
// estimates in CAD for now.
// We can later replace these with live pricing.
//
// performance = relative gaming/performance tier
// value = estimated used-market value in CAD
//
// ========================================


// ========================================
// GPU DATABASE
// ========================================

const gpuDatabase = {

  // -------------------------
  // NVIDIA RTX 50 SERIES
  // -------------------------

  "rtx 5090": {
    name: "RTX 5090",
    value: 3200,
    performance: 100,
    vram: 32,
    tier: "enthusiast"
  },

  "rtx 5080": {
    name: "RTX 5080",
    value: 1700,
    performance: 90,
    vram: 16,
    tier: "high-end"
  },

  "rtx 5070 ti": {
    name: "RTX 5070 Ti",
    value: 1100,
    performance: 78,
    vram: 16,
    tier: "high-end"
  },

  "rtx 5070": {
    name: "RTX 5070",
    value: 850,
    performance: 69,
    vram: 12,
    tier: "upper-midrange"
  },


  // -------------------------
  // NVIDIA RTX 40 SERIES
  // -------------------------

  "rtx 4090": {
    name: "RTX 4090",
    value: 2200,
    performance: 96,
    vram: 24,
    tier: "enthusiast"
  },

  "rtx 4080 super": {
    name: "RTX 4080 Super",
    value: 1300,
    performance: 86,
    vram: 16,
    tier: "high-end"
  },

  "rtx 4080": {
    name: "RTX 4080",
    value: 1150,
    performance: 83,
    vram: 16,
    tier: "high-end"
  },

  "rtx 4070 ti super": {
    name: "RTX 4070 Ti Super",
    value: 950,
    performance: 76,
    vram: 16,
    tier: "high-end"
  },

  "rtx 4070 ti": {
    name: "RTX 4070 Ti",
    value: 800,
    performance: 71,
    vram: 12,
    tier: "upper-midrange"
  },

  "rtx 4070 super": {
    name: "RTX 4070 Super",
    value: 700,
    performance: 67,
    vram: 12,
    tier: "upper-midrange"
  },

  "rtx 4070": {
    name: "RTX 4070",
    value: 600,
    performance: 62,
    vram: 12,
    tier: "upper-midrange"
  },

  "rtx 4060 ti": {
    name: "RTX 4060 Ti",
    value: 400,
    performance: 48,
    vram: 8,
    tier: "midrange"
  },

  "rtx 4060 ti 16gb": {
    name: "RTX 4060 Ti 16GB",
    value: 450,
    performance: 49,
    vram: 16,
    tier: "midrange"
  },

  "rtx 4060": {
    name: "RTX 4060",
    value: 300,
    performance: 40,
    vram: 8,
    tier: "midrange"
  },


  // -------------------------
  // NVIDIA RTX 30 SERIES
  // -------------------------

  "rtx 3090 ti": {
    name: "RTX 3090 Ti",
    value: 850,
    performance: 72,
    vram: 24,
    tier: "high-end"
  },

  "rtx 3090": {
    name: "RTX 3090",
    value: 750,
    performance: 69,
    vram: 24,
    tier: "high-end"
  },

  "rtx 3080 ti": {
    name: "RTX 3080 Ti",
    value: 600,
    performance: 64,
    vram: 12,
    tier: "upper-midrange"
  },

  "rtx 3080 12gb": {
    name: "RTX 3080 12GB",
    value: 540,
    performance: 62,
    vram: 12,
    tier: "upper-midrange"
  },

  "rtx 3080": {
    name: "RTX 3080",
    value: 500,
    performance: 60,
    vram: 10,
    tier: "upper-midrange"
  },

  "rtx 3070 ti": {
    name: "RTX 3070 Ti",
    value: 400,
    performance: 52,
    vram: 8,
    tier: "midrange"
  },

  "rtx 3070": {
    name: "RTX 3070",
    value: 350,
    performance: 48,
    vram: 8,
    tier: "midrange"
  },

  "rtx 3060 ti": {
    name: "RTX 3060 Ti",
    value: 300,
    performance: 43,
    vram: 8,
    tier: "midrange"
  },

  "rtx 3060 12gb": {
    name: "RTX 3060 12GB",
    value: 250,
    performance: 36,
    vram: 12,
    tier: "midrange"
  },

  "rtx 3060": {
    name: "RTX 3060",
    value: 240,
    performance: 35,
    vram: 12,
    tier: "midrange"
  },

  "rtx 3050": {
    name: "RTX 3050",
    value: 170,
    performance: 27,
    vram: 8,
    tier: "entry"
  },


  // -------------------------
  // NVIDIA RTX 20 SERIES
  // -------------------------

  "rtx 2080 ti": {
    name: "RTX 2080 Ti",
    value: 320,
    performance: 45,
    vram: 11,
    tier: "midrange"
  },

  "rtx 2080 super": {
    name: "RTX 2080 Super",
    value: 250,
    performance: 39,
    vram: 8,
    tier: "midrange"
  },

  "rtx 2080": {
    name: "RTX 2080",
    value: 220,
    performance: 37,
    vram: 8,
    tier: "midrange"
  },

  "rtx 2070 super": {
    name: "RTX 2070 Super",
    value: 200,
    performance: 34,
    vram: 8,
    tier: "midrange"
  },

  "rtx 2070": {
    name: "RTX 2070",
    value: 170,
    performance: 31,
    vram: 8,
    tier: "entry"
  },

  "rtx 2060 super": {
    name: "RTX 2060 Super",
    value: 160,
    performance: 29,
    vram: 8,
    tier: "entry"
  },

  "rtx 2060": {
    name: "RTX 2060",
    value: 140,
    performance: 26,
    vram: 6,
    tier: "entry"
  },


  // -------------------------
  // NVIDIA GTX
  // -------------------------

  "gtx 1080 ti": {
    name: "GTX 1080 Ti",
    value: 220,
    performance: 32,
    vram: 11,
    tier: "entry"
  },

  "gtx 1080": {
    name: "GTX 1080",
    value: 150,
    performance: 27,
    vram: 8,
    tier: "entry"
  },

  "gtx 1070 ti": {
    name: "GTX 1070 Ti",
    value: 130,
    performance: 24,
    vram: 8,
    tier: "entry"
  },

  "gtx 1070": {
    name: "GTX 1070",
    value: 110,
    performance: 22,
    vram: 8,
    tier: "entry"
  },

  "gtx 1660 super": {
    name: "GTX 1660 Super",
    value: 120,
    performance: 23,
    vram: 6,
    tier: "entry"
  },

  "gtx 1660 ti": {
    name: "GTX 1660 Ti",
    value: 115,
    performance: 22,
    vram: 6,
    tier: "entry"
  },

  "gtx 1660": {
    name: "GTX 1660",
    value: 100,
    performance: 20,
    vram: 6,
    tier: "entry"
  },

  "gtx 1650 super": {
    name: "GTX 1650 Super",
    value: 90,
    performance: 18,
    vram: 4,
    tier: "entry"
  },

  "gtx 1650": {
    name: "GTX 1650",
    value: 70,
    performance: 14,
    vram: 4,
    tier: "entry"
  },


  // -------------------------
  // AMD RX 9000
  // -------------------------

  "rx 9070 xt": {
    name: "RX 9070 XT",
    value: 900,
    performance: 76,
    vram: 16,
    tier: "high-end"
  },

  "rx 9070": {
    name: "RX 9070",
    value: 750,
    performance: 69,
    vram: 16,
    tier: "upper-midrange"
  },


  // -------------------------
  // AMD RX 7000
  // -------------------------

  "rx 7900 xtx": {
    name: "RX 7900 XTX",
    value: 1000,
    performance: 80,
    vram: 24,
    tier: "high-end"
  },

  "rx 7900 xt": {
    name: "RX 7900 XT",
    value: 800,
    performance: 73,
    vram: 20,
    tier: "high-end"
  },

  "rx 7900 gre": {
    name: "RX 7900 GRE",
    value: 620,
    performance: 64,
    vram: 16,
    tier: "upper-midrange"
  },

  "rx 7800 xt": {
    name: "RX 7800 XT",
    value: 600,
    performance: 61,
    vram: 16,
    tier: "upper-midrange"
  },

  "rx 7700 xt": {
    name: "RX 7700 XT",
    value: 450,
    performance: 52,
    vram: 12,
    tier: "midrange"
  },

  "rx 7600 xt": {
    name: "RX 7600 XT",
    value: 350,
    performance: 42,
    vram: 16,
    tier: "midrange"
  },

  "rx 7600": {
    name: "RX 7600",
    value: 280,
    performance: 37,
    vram: 8,
    tier: "midrange"
  },


  // -------------------------
  // AMD RX 6000
  // -------------------------

  "rx 6950 xt": {
    name: "RX 6950 XT",
    value: 500,
    performance: 61,
    vram: 16,
    tier: "upper-midrange"
  },

  "rx 6900 xt": {
    name: "RX 6900 XT",
    value: 470,
    performance: 58,
    vram: 16,
    tier: "upper-midrange"
  },

  "rx 6800 xt": {
    name: "RX 6800 XT",
    value: 450,
    performance: 56,
    vram: 16,
    tier: "upper-midrange"
  },

  "rx 6800": {
    name: "RX 6800",
    value: 390,
    performance: 50,
    vram: 16,
    tier: "midrange"
  },

  "rx 6750 xt": {
    name: "RX 6750 XT",
    value: 320,
    performance: 45,
    vram: 12,
    tier: "midrange"
  },

  "rx 6700 xt": {
    name: "RX 6700 XT",
    value: 300,
    performance: 43,
    vram: 12,
    tier: "midrange"
  },

  "rx 6650 xt": {
    name: "RX 6650 XT",
    value: 220,
    performance: 35,
    vram: 8,
    tier: "midrange"
  },

  "rx 6600 xt": {
    name: "RX 6600 XT",
    value: 200,
    performance: 33,
    vram: 8,
    tier: "entry"
  },

  "rx 6600": {
    name: "RX 6600",
    value: 170,
    performance: 30,
    vram: 8,
    tier: "entry"
  },

  "rx 6500 xt": {
    name: "RX 6500 XT",
    value: 100,
    performance: 18,
    vram: 4,
    tier: "entry"
  },


  // -------------------------
  // INTEL ARC
  // -------------------------

  "arc b580": {
    name: "Intel Arc B580",
    value: 350,
    performance: 44,
    vram: 12,
    tier: "midrange"
  },

  "arc a770": {
    name: "Intel Arc A770",
    value: 250,
    performance: 38,
    vram: 16,
    tier: "midrange"
  },

  "arc a750": {
    name: "Intel Arc A750",
    value: 200,
    performance: 34,
    vram: 8,
    tier: "entry"
  }

};


// ========================================
// CPU DATABASE
// ========================================

const cpuDatabase = {

  // -------------------------
  // AMD AM5 X3D
  // -------------------------

  "ryzen 9 9950x3d": {
    name: "Ryzen 9 9950X3D",
    value: 850,
    performance: 100,
    platform: "AM5",
    generation: "Zen 5"
  },

  "ryzen 9 9900x3d": {
    name: "Ryzen 9 9900X3D",
    value: 700,
    performance: 96,
    platform: "AM5",
    generation: "Zen 5"
  },

  "ryzen 7 9800x3d": {
    name: "Ryzen 7 9800X3D",
    value: 650,
    performance: 98,
    platform: "AM5",
    generation: "Zen 5"
  },

  "ryzen 9 7950x3d": {
    name: "Ryzen 9 7950X3D",
    value: 600,
    performance: 94,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 9 7900x3d": {
    name: "Ryzen 9 7900X3D",
    value: 470,
    performance: 88,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 7 7800x3d": {
    name: "Ryzen 7 7800X3D",
    value: 400,
    performance: 92,
    platform: "AM5",
    generation: "Zen 4"
  },


  // -------------------------
  // AMD AM5
  // -------------------------

  "ryzen 9 9950x": {
    name: "Ryzen 9 9950X",
    value: 700,
    performance: 90,
    platform: "AM5",
    generation: "Zen 5"
  },

  "ryzen 9 9900x": {
    name: "Ryzen 9 9900X",
    value: 550,
    performance: 86,
    platform: "AM5",
    generation: "Zen 5"
  },

  "ryzen 7 9700x": {
    name: "Ryzen 7 9700X",
    value: 400,
    performance: 82,
    platform: "AM5",
    generation: "Zen 5"
  },

  "ryzen 5 9600x": {
    name: "Ryzen 5 9600X",
    value: 280,
    performance: 76,
    platform: "AM5",
    generation: "Zen 5"
  },

  "ryzen 9 7950x": {
    name: "Ryzen 9 7950X",
    value: 500,
    performance: 87,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 9 7900x": {
    name: "Ryzen 9 7900X",
    value: 380,
    performance: 82,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 9 7900": {
    name: "Ryzen 9 7900",
    value: 350,
    performance: 80,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 7 7700x": {
    name: "Ryzen 7 7700X",
    value: 270,
    performance: 75,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 7 7700": {
    name: "Ryzen 7 7700",
    value: 250,
    performance: 74,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 5 7600x": {
    name: "Ryzen 5 7600X",
    value: 200,
    performance: 70,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 5 7600": {
    name: "Ryzen 5 7600",
    value: 190,
    performance: 68,
    platform: "AM5",
    generation: "Zen 4"
  },

  "ryzen 5 7500f": {
    name: "Ryzen 5 7500F",
    value: 160,
    performance: 65,
    platform: "AM5",
    generation: "Zen 4"
  },


  // -------------------------
  // AMD AM4 X3D
  // -------------------------

  "ryzen 7 5800x3d": {
    name: "Ryzen 7 5800X3D",
    value: 280,
    performance: 70,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 7 5700x3d": {
    name: "Ryzen 7 5700X3D",
    value: 220,
    performance: 67,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 5 5600x3d": {
    name: "Ryzen 5 5600X3D",
    value: 200,
    performance: 64,
    platform: "AM4",
    generation: "Zen 3"
  },


  // -------------------------
  // AMD AM4
  // -------------------------

  "ryzen 9 5950x": {
    name: "Ryzen 9 5950X",
    value: 280,
    performance: 68,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 9 5900x": {
    name: "Ryzen 9 5900X",
    value: 220,
    performance: 64,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 7 5800x": {
    name: "Ryzen 7 5800X",
    value: 150,
    performance: 57,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 7 5700x": {
    name: "Ryzen 7 5700X",
    value: 140,
    performance: 55,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 7 5700g": {
    name: "Ryzen 7 5700G",
    value: 130,
    performance: 50,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 5 5600x": {
    name: "Ryzen 5 5600X",
    value: 110,
    performance: 50,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 5 5600": {
    name: "Ryzen 5 5600",
    value: 100,
    performance: 48,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 5 5600g": {
    name: "Ryzen 5 5600G",
    value: 90,
    performance: 44,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 5 5500": {
    name: "Ryzen 5 5500",
    value: 80,
    performance: 41,
    platform: "AM4",
    generation: "Zen 3"
  },

  "ryzen 7 3700x": {
    name: "Ryzen 7 3700X",
    value: 90,
    performance: 41,
    platform: "AM4",
    generation: "Zen 2"
  },

  "ryzen 5 3600x": {
    name: "Ryzen 5 3600X",
    value: 75,
    performance: 36,
    platform: "AM4",
    generation: "Zen 2"
  },

  "ryzen 5 3600": {
    name: "Ryzen 5 3600",
    value: 70,
    performance: 35,
    platform: "AM4",
    generation: "Zen 2"
  },

  "ryzen 5 2600": {
    name: "Ryzen 5 2600",
    value: 45,
    performance: 27,
    platform: "AM4",
    generation: "Zen+"
  },

  "ryzen 5 1600": {
    name: "Ryzen 5 1600",
    value: 35,
    performance: 22,
    platform: "AM4",
    generation: "Zen"
  },


  // -------------------------
  // INTEL 14TH GEN
  // -------------------------

  "i9-14900k": {
    name: "Core i9-14900K",
    value: 500,
    performance: 90,
    platform: "LGA1700",
    generation: "14th Gen"
  },

  "i9-14900kf": {
    name: "Core i9-14900KF",
    value: 470,
    performance: 90,
    platform: "LGA1700",
    generation: "14th Gen"
  },

  "i7-14700k": {
    name: "Core i7-14700K",
    value: 380,
    performance: 86,
    platform: "LGA1700",
    generation: "14th Gen"
  },

  "i7-14700kf": {
    name: "Core i7-14700KF",
    value: 350,
    performance: 85,
    platform: "LGA1700",
    generation: "14th Gen"
  },

  "i5-14600k": {
    name: "Core i5-14600K",
    value: 260,
    performance: 82,
    platform: "LGA1700",
    generation: "14th Gen"
  },

  "i5-14600kf": {
    name: "Core i5-14600KF",
    value: 240,
    performance: 81,
    platform: "LGA1700",
    generation: "14th Gen"
  },

  "i5-14400f": {
    name: "Core i5-14400F",
    value: 180,
    performance: 68,
    platform: "LGA1700",
    generation: "14th Gen"
  },


  // -------------------------
  // INTEL 13TH GEN
  // -------------------------

  "i9-13900k": {
    name: "Core i9-13900K",
    value: 420,
    performance: 87,
    platform: "LGA1700",
    generation: "13th Gen"
  },

  "i7-13700k": {
    name: "Core i7-13700K",
    value: 300,
    performance: 82,
    platform: "LGA1700",
    generation: "13th Gen"
  },

  "i5-13600k": {
    name: "Core i5-13600K",
    value: 230,
    performance: 78,
    platform: "LGA1700",
    generation: "13th Gen"
  },

  "i5-13400f": {
    name: "Core i5-13400F",
    value: 150,
    performance: 64,
    platform: "LGA1700",
    generation: "13th Gen"
  },


  // -------------------------
  // INTEL 12TH GEN
  // -------------------------

  "i9-12900k": {
    name: "Core i9-12900K",
    value: 300,
    performance: 77,
    platform: "LGA1700",
    generation: "12th Gen"
  },

  "i7-12700k": {
    name: "Core i7-12700K",
    value: 220,
    performance: 72,
    platform: "LGA1700",
    generation: "12th Gen"
  },

  "i7-12700f": {
    name: "Core i7-12700F",
    value: 190,
    performance: 69,
    platform: "LGA1700",
    generation: "12th Gen"
  },

  "i5-12600k": {
    name: "Core i5-12600K",
    value: 160,
    performance: 65,
    platform: "LGA1700",
    generation: "12th Gen"
  },

  "i5-12400f": {
    name: "Core i5-12400F",
    value: 120,
    performance: 55,
    platform: "LGA1700",
    generation: "12th Gen"
  },

  "i3-12100f": {
    name: "Core i3-12100F",
    value: 70,
    performance: 45,
    platform: "LGA1700",
    generation: "12th Gen"
  },


  // -------------------------
  // INTEL 11TH GEN
  // -------------------------

  "i9-11900k": {
    name: "Core i9-11900K",
    value: 170,
    performance: 55,
    platform: "LGA1200",
    generation: "11th Gen"
  },

  "i7-11700k": {
    name: "Core i7-11700K",
    value: 140,
    performance: 52,
    platform: "LGA1200",
    generation: "11th Gen"
  },

  "i5-11600k": {
    name: "Core i5-11600K",
    value: 100,
    performance: 47,
    platform: "LGA1200",
    generation: "11th Gen"
  },

  "i5-11400f": {
    name: "Core i5-11400F",
    value: 80,
    performance: 42,
    platform: "LGA1200",
    generation: "11th Gen"
  },


  // -------------------------
  // INTEL 10TH GEN
  // -------------------------

  "i9-10900k": {
    name: "Core i9-10900K",
    value: 160,
    performance: 52,
    platform: "LGA1200",
    generation: "10th Gen"
  },

  "i7-10700k": {
    name: "Core i7-10700K",
    value: 120,
    performance: 48,
    platform: "LGA1200",
    generation: "10th Gen"
  },

  "i5-10600k": {
    name: "Core i5-10600K",
    value: 90,
    performance: 42,
    platform: "LGA1200",
    generation: "10th Gen"
  },

  "i5-10400f": {
    name: "Core i5-10400F",
    value: 70,
    performance: 37,
    platform: "LGA1200",
    generation: "10th Gen"
  },


  // -------------------------
  // INTEL OLDER
  // -------------------------

  "i7-9700k": {
    name: "Core i7-9700K",
    value: 100,
    performance: 40,
    platform: "LGA1151",
    generation: "9th Gen"
  },

  "i7-8700k": {
    name: "Core i7-8700K",
    value: 85,
    performance: 37,
    platform: "LGA1151",
    generation: "8th Gen"
  },

  "i7-7700k": {
    name: "Core i7-7700K",
    value: 65,
    performance: 30,
    platform: "LGA1151",
    generation: "7th Gen"
  },

  "i7-4790k": {
    name: "Core i7-4790K",
    value: 40,
    performance: 22,
    platform: "LGA1150",
    generation: "4th Gen"
  }

};


// ========================================
// GPU ALIASES
// ========================================

const gpuAliases = {

  "geforce rtx 4090": "rtx 4090",
  "geforce rtx 4080": "rtx 4080",
  "geforce rtx 4070": "rtx 4070",
  "geforce rtx 4060": "rtx 4060",

  "geforce rtx 3090": "rtx 3090",
  "geforce rtx 3080": "rtx 3080",
  "geforce rtx 3070": "rtx 3070",
  "geforce rtx 3060": "rtx 3060",

  "geforce gtx 1080 ti": "gtx 1080 ti",
  "geforce gtx 1080": "gtx 1080",
  "geforce gtx 1070": "gtx 1070",

  "radeon rx 7900 xtx": "rx 7900 xtx",
  "radeon rx 7800 xt": "rx 7800 xt",
  "radeon rx 6800 xt": "rx 6800 xt",
  "radeon rx 6700 xt": "rx 6700 xt",

  "intel arc a770": "arc a770",
  "intel arc a750": "arc a750",
  "intel arc b580": "arc b580"

};


// ========================================
// CPU ALIASES
// ========================================

const cpuAliases = {

  "amd ryzen 7 5800x3d": "ryzen 7 5800x3d",
  "amd ryzen 7 5700x3d": "ryzen 7 5700x3d",
  "amd ryzen 7 7800x3d": "ryzen 7 7800x3d",
  "amd ryzen 7 9800x3d": "ryzen 7 9800x3d",

  "amd ryzen 5 5600x": "ryzen 5 5600x",
  "amd ryzen 5 5600": "ryzen 5 5600",
  "amd ryzen 5 7600": "ryzen 5 7600",

  "intel core i9-14900k": "i9-14900k",
  "intel core i7-14700k": "i7-14700k",
  "intel core i5-14600k": "i5-14600k",

  "intel core i9-13900k": "i9-13900k",
  "intel core i7-13700k": "i7-13700k",
  "intel core i5-13600k": "i5-13600k",

  "intel core i9-12900k": "i9-12900k",
  "intel core i7-12700k": "i7-12700k",
  "intel core i5-12600k": "i5-12600k",
  "intel core i5-12400f": "i5-12400f"

};


// ========================================
// NORMALIZE PART NAME
// ========================================

function normalizePartName(name) {

  return name
    .toLowerCase()
    .trim()

    // Normalize common punctuation
    .replace(/[(),]/g, " ")

    // Normalize extra spaces
    .replace(/\s+/g, " ")

    .trim();

}


// ========================================
// FIND GPU
// ========================================

function findGPU(name) {

  let search =
    normalizePartName(name);


  // Direct match
  if (gpuDatabase[search]) {

    return gpuDatabase[search];

  }


  // Alias match
  if (gpuAliases[search]) {

    const alias =
      gpuAliases[search];

    return gpuDatabase[alias];

  }


  // Try stripping manufacturer words
  search = search
    .replace("nvidia ", "")
    .replace("geforce ", "")
    .replace("amd ", "")
    .replace("radeon ", "")
    .replace("intel ", "")
    .trim();


  if (gpuDatabase[search]) {

    return gpuDatabase[search];

  }


  return null;

}


// ========================================
// FIND CPU
// ========================================

function findCPU(name) {

  let search =
    normalizePartName(name);


  // Direct match
  if (cpuDatabase[search]) {

    return cpuDatabase[search];

  }


  // Alias match
  if (cpuAliases[search]) {

    const alias =
      cpuAliases[search];

    return cpuDatabase[alias];

  }


  // Strip common manufacturer naming
  search = search
    .replace("amd ", "")
    .replace("intel core ", "")
    .replace("intel ", "")
    .trim();


  if (cpuDatabase[search]) {

    return cpuDatabase[search];

  }


  return null;

}


// ========================================
// HELPER: GET ALL CPU NAMES
// ========================================

function getAllCPUNames() {

  return Object
    .values(cpuDatabase)
    .map(
      cpu => cpu.name
    );

}


// ========================================
// HELPER: GET ALL GPU NAMES
// ========================================

function getAllGPUNames() {

  return Object
    .values(gpuDatabase)
    .map(
      gpu => gpu.name
    );

}


// ========================================
// HELPER: DATABASE STATS
// ========================================

function getDatabaseStats() {

  return {

    cpuCount:
      Object.keys(cpuDatabase).length,

    gpuCount:
      Object.keys(gpuDatabase).length

  };

}
