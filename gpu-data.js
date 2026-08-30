// ============================================================
// PCDEAL - GPU DATABASE
// VERSION 1
// ============================================================
//
// Notes:
// - Values are rough USED CAD estimates.
// - performance is a relative gaming-performance score.
// - vram is in GB.
// - vendor is used for display/debugging.
// - architecture/family is optional metadata.
//
// ============================================================

const gpuDatabase = {

  // ==========================================================
  // NVIDIA RTX 50 SERIES
  // ==========================================================

  "RTX 5090": {
    name: "RTX 5090",
    value: 3200,
    performance: 100,
    vram: 32,
    vendor: "NVIDIA",
    family: "RTX 50"
  },

  "RTX 5080": {
    name: "RTX 5080",
    value: 1700,
    performance: 90,
    vram: 16,
    vendor: "NVIDIA",
    family: "RTX 50"
  },

  "RTX 5070 Ti": {
    name: "RTX 5070 Ti",
    value: 1100,
    performance: 78,
    vram: 16,
    vendor: "NVIDIA",
    family: "RTX 50"
  },

  "RTX 5070": {
    name: "RTX 5070",
    value: 850,
    performance: 69,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 50"
  },

  "RTX 5060 Ti 16GB": {
    name: "RTX 5060 Ti 16GB",
    value: 650,
    performance: 60,
    vram: 16,
    vendor: "NVIDIA",
    family: "RTX 50"
  },

  "RTX 5060 Ti 8GB": {
    name: "RTX 5060 Ti 8GB",
    value: 550,
    performance: 58,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 50"
  },

  "RTX 5060": {
    name: "RTX 5060",
    value: 450,
    performance: 51,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 50"
  },

  // ==========================================================
  // NVIDIA RTX 40 SERIES
  // ==========================================================

  "RTX 4090": {
    name: "RTX 4090",
    value: 2200,
    performance: 96,
    vram: 24,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4080 Super": {
    name: "RTX 4080 Super",
    value: 1300,
    performance: 86,
    vram: 16,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4080": {
    name: "RTX 4080",
    value: 1150,
    performance: 83,
    vram: 16,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4070 Ti Super": {
    name: "RTX 4070 Ti Super",
    value: 950,
    performance: 76,
    vram: 16,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4070 Ti": {
    name: "RTX 4070 Ti",
    value: 800,
    performance: 71,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4070 Super": {
    name: "RTX 4070 Super",
    value: 700,
    performance: 67,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4070": {
    name: "RTX 4070",
    value: 600,
    performance: 62,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4060 Ti 16GB": {
    name: "RTX 4060 Ti 16GB",
    value: 450,
    performance: 49,
    vram: 16,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4060 Ti 8GB": {
    name: "RTX 4060 Ti 8GB",
    value: 400,
    performance: 48,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4060 Ti": {
    name: "RTX 4060 Ti",
    value: 400,
    performance: 48,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  "RTX 4060": {
    name: "RTX 4060",
    value: 300,
    performance: 40,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 40"
  },

  // ==========================================================
  // NVIDIA RTX 30 SERIES
  // ==========================================================

  "RTX 3090 Ti": {
    name: "RTX 3090 Ti",
    value: 850,
    performance: 72,
    vram: 24,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3090": {
    name: "RTX 3090",
    value: 750,
    performance: 69,
    vram: 24,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3080 Ti": {
    name: "RTX 3080 Ti",
    value: 600,
    performance: 64,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3080 12GB": {
    name: "RTX 3080 12GB",
    value: 540,
    performance: 62,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3080 10GB": {
    name: "RTX 3080 10GB",
    value: 500,
    performance: 60,
    vram: 10,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3080": {
    name: "RTX 3080",
    value: 500,
    performance: 60,
    vram: 10,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3070 Ti": {
    name: "RTX 3070 Ti",
    value: 400,
    performance: 52,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3070": {
    name: "RTX 3070",
    value: 350,
    performance: 48,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3060 Ti": {
    name: "RTX 3060 Ti",
    value: 300,
    performance: 43,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3060 12GB": {
    name: "RTX 3060 12GB",
    value: 250,
    performance: 36,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3060 8GB": {
    name: "RTX 3060 8GB",
    value: 210,
    performance: 32,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3060": {
    name: "RTX 3060",
    value: 240,
    performance: 35,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3050 8GB": {
    name: "RTX 3050 8GB",
    value: 170,
    performance: 27,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3050 6GB": {
    name: "RTX 3050 6GB",
    value: 140,
    performance: 23,
    vram: 6,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  "RTX 3050": {
    name: "RTX 3050",
    value: 170,
    performance: 27,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 30"
  },

  // ==========================================================
  // NVIDIA RTX 20 SERIES
  // ==========================================================

  "RTX 2080 Ti": {
    name: "RTX 2080 Ti",
    value: 320,
    performance: 45,
    vram: 11,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  "RTX 2080 Super": {
    name: "RTX 2080 Super",
    value: 250,
    performance: 39,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  "RTX 2080": {
    name: "RTX 2080",
    value: 220,
    performance: 37,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  "RTX 2070 Super": {
    name: "RTX 2070 Super",
    value: 200,
    performance: 34,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  "RTX 2070": {
    name: "RTX 2070",
    value: 170,
    performance: 31,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  "RTX 2060 Super": {
    name: "RTX 2060 Super",
    value: 160,
    performance: 29,
    vram: 8,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  "RTX 2060 12GB": {
    name: "RTX 2060 12GB",
    value: 155,
    performance: 27,
    vram: 12,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  "RTX 2060": {
    name: "RTX 2060",
    value: 140,
    performance: 26,
    vram: 6,
    vendor: "NVIDIA",
    family: "RTX 20"
  },

  // ==========================================================
  // NVIDIA GTX 16 SERIES
  // ==========================================================

  "GTX 1660 Ti": {
    name: "GTX 1660 Ti",
    value: 115,
    performance: 22,
    vram: 6,
    vendor: "NVIDIA",
    family: "GTX 16"
  },

  "GTX 1660 Super": {
    name: "GTX 1660 Super",
    value: 120,
    performance: 23,
    vram: 6,
    vendor: "NVIDIA",
    family: "GTX 16"
  },

  "GTX 1660": {
    name: "GTX 1660",
    value: 100,
    performance: 20,
    vram: 6,
    vendor: "NVIDIA",
    family: "GTX 16"
  },

  "GTX 1650 Super": {
    name: "GTX 1650 Super",
    value: 90,
    performance: 18,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 16"
  },

  "GTX 1650 GDDR6": {
    name: "GTX 1650 GDDR6",
    value: 75,
    performance: 15,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 16"
  },

  "GTX 1650": {
    name: "GTX 1650",
    value: 70,
    performance: 14,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 16"
  },

  "GTX 1630": {
    name: "GTX 1630",
    value: 55,
    performance: 9,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 16"
  },

  // ==========================================================
  // NVIDIA GTX 10 SERIES
  // ==========================================================

  "Titan Xp": {
    name: "Titan Xp",
    value: 250,
    performance: 35,
    vram: 12,
    vendor: "NVIDIA",
    family: "Pascal"
  },

  "Titan X Pascal": {
    name: "Titan X Pascal",
    value: 220,
    performance: 33,
    vram: 12,
    vendor: "NVIDIA",
    family: "Pascal"
  },

  "GTX 1080 Ti": {
    name: "GTX 1080 Ti",
    value: 220,
    performance: 32,
    vram: 11,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1080": {
    name: "GTX 1080",
    value: 150,
    performance: 27,
    vram: 8,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1070 Ti": {
    name: "GTX 1070 Ti",
    value: 130,
    performance: 24,
    vram: 8,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1070": {
    name: "GTX 1070",
    value: 110,
    performance: 22,
    vram: 8,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1060 6GB": {
    name: "GTX 1060 6GB",
    value: 80,
    performance: 17,
    vram: 6,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1060 5GB": {
    name: "GTX 1060 5GB",
    value: 70,
    performance: 16,
    vram: 5,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1060 3GB": {
    name: "GTX 1060 3GB",
    value: 60,
    performance: 14,
    vram: 3,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1050 Ti": {
    name: "GTX 1050 Ti",
    value: 60,
    performance: 11,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GTX 1050": {
    name: "GTX 1050",
    value: 45,
    performance: 9,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 10"
  },

  "GT 1030 GDDR5": {
    name: "GT 1030 GDDR5",
    value: 40,
    performance: 6,
    vram: 2,
    vendor: "NVIDIA",
    family: "GT 10"
  },

  "GT 1030 DDR4": {
    name: "GT 1030 DDR4",
    value: 25,
    performance: 3,
    vram: 2,
    vendor: "NVIDIA",
    family: "GT 10"
  },

  "GT 1030": {
    name: "GT 1030",
    value: 35,
    performance: 5,
    vram: 2,
    vendor: "NVIDIA",
    family: "GT 10"
  },

  // ==========================================================
  // NVIDIA GTX 900 SERIES
  // ==========================================================

  "Titan X Maxwell": {
    name: "Titan X Maxwell",
    value: 140,
    performance: 24,
    vram: 12,
    vendor: "NVIDIA",
    family: "Maxwell"
  },

  "GTX 980 Ti": {
    name: "GTX 980 Ti",
    value: 110,
    performance: 22,
    vram: 6,
    vendor: "NVIDIA",
    family: "GTX 900"
  },

  "GTX 980": {
    name: "GTX 980",
    value: 80,
    performance: 17,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 900"
  },

  "GTX 970": {
    name: "GTX 970",
    value: 60,
    performance: 14,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 900"
  },

  "GTX 960 4GB": {
    name: "GTX 960 4GB",
    value: 45,
    performance: 10,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 900"
  },

  "GTX 960 2GB": {
    name: "GTX 960 2GB",
    value: 35,
    performance: 9,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 900"
  },

  "GTX 950": {
    name: "GTX 950",
    value: 30,
    performance: 8,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 900"
  },

  // ==========================================================
  // NVIDIA GTX 700 SERIES
  // ==========================================================

  "GTX Titan Black": {
    name: "GTX Titan Black",
    value: 80,
    performance: 16,
    vram: 6,
    vendor: "NVIDIA",
    family: "Kepler"
  },

  "GTX Titan": {
    name: "GTX Titan",
    value: 70,
    performance: 15,
    vram: 6,
    vendor: "NVIDIA",
    family: "Kepler"
  },

  "GTX 780 Ti": {
    name: "GTX 780 Ti",
    value: 55,
    performance: 14,
    vram: 3,
    vendor: "NVIDIA",
    family: "GTX 700"
  },

  "GTX 780": {
    name: "GTX 780",
    value: 45,
    performance: 12,
    vram: 3,
    vendor: "NVIDIA",
    family: "GTX 700"
  },

  "GTX 770 4GB": {
    name: "GTX 770 4GB",
    value: 40,
    performance: 10,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 700"
  },

  "GTX 770": {
    name: "GTX 770",
    value: 35,
    performance: 10,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 700"
  },

  "GTX 760": {
    name: "GTX 760",
    value: 25,
    performance: 8,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 700"
  },

  "GTX 750 Ti": {
    name: "GTX 750 Ti",
    value: 30,
    performance: 7,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 700"
  },

  "GTX 750": {
    name: "GTX 750",
    value: 20,
    performance: 5,
    vram: 1,
    vendor: "NVIDIA",
    family: "GTX 700"
  },

  "GT 740": {
    name: "GT 740",
    value: 15,
    performance: 3,
    vram: 2,
    vendor: "NVIDIA",
    family: "GT 700"
  },

  "GT 730": {
    name: "GT 730",
    value: 15,
    performance: 2,
    vram: 2,
    vendor: "NVIDIA",
    family: "GT 700"
  },

  "GT 710": {
    name: "GT 710",
    value: 10,
    performance: 1,
    vram: 2,
    vendor: "NVIDIA",
    family: "GT 700"
  },

  // ==========================================================
  // NVIDIA GTX 600 SERIES
  // ==========================================================

  "GTX 690": {
    name: "GTX 690",
    value: 50,
    performance: 12,
    vram: 4,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  "GTX 680": {
    name: "GTX 680",
    value: 30,
    performance: 9,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  "GTX 670": {
    name: "GTX 670",
    value: 25,
    performance: 8,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  "GTX 660 Ti": {
    name: "GTX 660 Ti",
    value: 20,
    performance: 7,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  "GTX 660": {
    name: "GTX 660",
    value: 18,
    performance: 6,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  "GTX 650 Ti Boost": {
    name: "GTX 650 Ti Boost",
    value: 15,
    performance: 5,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  "GTX 650 Ti": {
    name: "GTX 650 Ti",
    value: 12,
    performance: 4,
    vram: 2,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  "GTX 650": {
    name: "GTX 650",
    value: 10,
    performance: 3,
    vram: 1,
    vendor: "NVIDIA",
    family: "GTX 600"
  },

  // ==========================================================
  // AMD RX 9000 SERIES
  // ==========================================================

  "RX 9070 XT": {
    name: "RX 9070 XT",
    value: 900,
    performance: 76,
    vram: 16,
    vendor: "AMD",
    family: "RX 9000"
  },

  "RX 9070": {
    name: "RX 9070",
    value: 750,
    performance: 69,
    vram: 16,
    vendor: "AMD",
    family: "RX 9000"
  },

  "RX 9060 XT 16GB": {
    name: "RX 9060 XT 16GB",
    value: 550,
    performance: 56,
    vram: 16,
    vendor: "AMD",
    family: "RX 9000"
  },

  "RX 9060 XT 8GB": {
    name: "RX 9060 XT 8GB",
    value: 450,
    performance: 53,
    vram: 8,
    vendor: "AMD",
    family: "RX 9000"
  },

  // ==========================================================
  // AMD RX 7000 SERIES
  // ==========================================================

  "RX 7900 XTX": {
    name: "RX 7900 XTX",
    value: 1000,
    performance: 80,
    vram: 24,
    vendor: "AMD",
    family: "RX 7000"
  },

  "RX 7900 XT": {
    name: "RX 7900 XT",
    value: 800,
    performance: 73,
    vram: 20,
    vendor: "AMD",
    family: "RX 7000"
  },

  "RX 7900 GRE": {
    name: "RX 7900 GRE",
    value: 620,
    performance: 64,
    vram: 16,
    vendor: "AMD",
    family: "RX 7000"
  },

  "RX 7800 XT": {
    name: "RX 7800 XT",
    value: 600,
    performance: 61,
    vram: 16,
    vendor: "AMD",
    family: "RX 7000"
  },

  "RX 7700 XT": {
    name: "RX 7700 XT",
    value: 450,
    performance: 52,
    vram: 12,
    vendor: "AMD",
    family: "RX 7000"
  },

  "RX 7600 XT": {
    name: "RX 7600 XT",
    value: 350,
    performance: 42,
    vram: 16,
    vendor: "AMD",
    family: "RX 7000"
  },

  "RX 7600": {
    name: "RX 7600",
    value: 280,
    performance: 37,
    vram: 8,
    vendor: "AMD",
    family: "RX 7000"
  },

  // ==========================================================
  // AMD RX 6000 SERIES
  // ==========================================================

  "RX 6950 XT": {
    name: "RX 6950 XT",
    value: 500,
    performance: 61,
    vram: 16,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6900 XT": {
    name: "RX 6900 XT",
    value: 470,
    performance: 58,
    vram: 16,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6800 XT": {
    name: "RX 6800 XT",
    value: 450,
    performance: 56,
    vram: 16,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6800": {
    name: "RX 6800",
    value: 390,
    performance: 50,
    vram: 16,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6750 XT": {
    name: "RX 6750 XT",
    value: 320,
    performance: 45,
    vram: 12,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6700 XT": {
    name: "RX 6700 XT",
    value: 300,
    performance: 43,
    vram: 12,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6700 10GB": {
    name: "RX 6700 10GB",
    value: 270,
    performance: 40,
    vram: 10,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6650 XT": {
    name: "RX 6650 XT",
    value: 220,
    performance: 35,
    vram: 8,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6600 XT": {
    name: "RX 6600 XT",
    value: 200,
    performance: 33,
    vram: 8,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6600": {
    name: "RX 6600",
    value: 170,
    performance: 30,
    vram: 8,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6500 XT": {
    name: "RX 6500 XT",
    value: 100,
    performance: 18,
    vram: 4,
    vendor: "AMD",
    family: "RX 6000"
  },

  "RX 6400": {
    name: "RX 6400",
    value: 90,
    performance: 14,
    vram: 4,
    vendor: "AMD",
    family: "RX 6000"
  },

  // ==========================================================
  // AMD RX 5000 SERIES
  // ==========================================================

  "RX 5700 XT": {
    name: "RX 5700 XT",
    value: 180,
    performance: 30,
    vram: 8,
    vendor: "AMD",
    family: "RX 5000"
  },

  "RX 5700": {
    name: "RX 5700",
    value: 150,
    performance: 27,
    vram: 8,
    vendor: "AMD",
    family: "RX 5000"
  },

  "RX 5600 XT": {
    name: "RX 5600 XT",
    value: 130,
    performance: 24,
    vram: 6,
    vendor: "AMD",
    family: "RX 5000"
  },

  "RX 5500 XT 8GB": {
    name: "RX 5500 XT 8GB",
    value: 100,
    performance: 20,
    vram: 8,
    vendor: "AMD",
    family: "RX 5000"
  },

  "RX 5500 XT 4GB": {
    name: "RX 5500 XT 4GB",
    value: 80,
    performance: 18,
    vram: 4,
    vendor: "AMD",
    family: "RX 5000"
  },

  "RX 5500": {
    name: "RX 5500",
    value: 75,
    performance: 17,
    vram: 4,
    vendor: "AMD",
    family: "RX 5000"
  },

  // ==========================================================
  // AMD RADEON VII / VEGA
  // ==========================================================

  "Radeon VII": {
    name: "Radeon VII",
    value: 220,
    performance: 32,
    vram: 16,
    vendor: "AMD",
    family: "Vega"
  },

  "RX Vega 64": {
    name: "RX Vega 64",
    value: 130,
    performance: 24,
    vram: 8,
    vendor: "AMD",
    family: "Vega"
  },

  "RX Vega 56": {
    name: "RX Vega 56",
    value: 110,
    performance: 22,
    vram: 8,
    vendor: "AMD",
    family: "Vega"
  },

  // ==========================================================
  // AMD RX 500 SERIES
  // ==========================================================

  "RX 590": {
    name: "RX 590",
    value: 90,
    performance: 18,
    vram: 8,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 580 8GB": {
    name: "RX 580 8GB",
    value: 80,
    performance: 17,
    vram: 8,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 580 4GB": {
    name: "RX 580 4GB",
    value: 60,
    performance: 15,
    vram: 4,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 580": {
    name: "RX 580",
    value: 75,
    performance: 17,
    vram: 8,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 570 8GB": {
    name: "RX 570 8GB",
    value: 60,
    performance: 14,
    vram: 8,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 570 4GB": {
    name: "RX 570 4GB",
    value: 45,
    performance: 13,
    vram: 4,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 570": {
    name: "RX 570",
    value: 50,
    performance: 13,
    vram: 4,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 560 4GB": {
    name: "RX 560 4GB",
    value: 40,
    performance: 9,
    vram: 4,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 560 2GB": {
    name: "RX 560 2GB",
    value: 30,
    performance: 8,
    vram: 2,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 550 4GB": {
    name: "RX 550 4GB",
    value: 30,
    performance: 6,
    vram: 4,
    vendor: "AMD",
    family: "RX 500"
  },

  "RX 550 2GB": {
    name: "RX 550 2GB",
    value: 25,
    performance: 5,
    vram: 2,
    vendor: "AMD",
    family: "RX 500"
  },

  // ==========================================================
  // AMD RX 400 SERIES
  // ==========================================================

  "RX 480 8GB": {
    name: "RX 480 8GB",
    value: 70,
    performance: 16,
    vram: 8,
    vendor: "AMD",
    family: "RX 400"
  },

  "RX 480 4GB": {
    name: "RX 480 4GB",
    value: 55,
    performance: 15,
    vram: 4,
    vendor: "AMD",
    family: "RX 400"
  },

  "RX 470 8GB": {
    name: "RX 470 8GB",
    value: 55,
    performance: 14,
    vram: 8,
    vendor: "AMD",
    family: "RX 400"
  },

  "RX 470 4GB": {
    name: "RX 470 4GB",
    value: 45,
    performance: 13,
    vram: 4,
    vendor: "AMD",
    family: "RX 400"
  },

  "RX 460 4GB": {
    name: "RX 460 4GB",
    value: 30,
    performance: 8,
    vram: 4,
    vendor: "AMD",
    family: "RX 400"
  },

  "RX 460 2GB": {
    name: "RX 460 2GB",
    value: 25,
    performance: 7,
    vram: 2,
    vendor: "AMD",
    family: "RX 400"
  },

  // ==========================================================
  // AMD R9 FURY / 300 SERIES
  // ==========================================================

  "R9 Fury X": {
    name: "R9 Fury X",
    value: 90,
    performance: 18,
    vram: 4,
    vendor: "AMD",
    family: "R9 Fury"
  },

  "R9 Fury": {
    name: "R9 Fury",
    value: 80,
    performance: 17,
    vram: 4,
    vendor: "AMD",
    family: "R9 Fury"
  },

  "R9 Nano": {
    name: "R9 Nano",
    value: 80,
    performance: 16,
    vram: 4,
    vendor: "AMD",
    family: "R9 Fury"
  },

  "R9 390X": {
    name: "R9 390X",
    value: 65,
    performance: 15,
    vram: 8,
    vendor: "AMD",
    family: "R9 300"
  },

  "R9 390": {
    name: "R9 390",
    value: 55,
    performance: 14,
    vram: 8,
    vendor: "AMD",
    family: "R9 300"
  },

  "R9 380X": {
    name: "R9 380X",
    value: 40,
    performance: 11,
    vram: 4,
    vendor: "AMD",
    family: "R9 300"
  },

  "R9 380 4GB": {
    name: "R9 380 4GB",
    value: 35,
    performance: 10,
    vram: 4,
    vendor: "AMD",
    family: "R9 300"
  },

  "R9 380 2GB": {
    name: "R9 380 2GB",
    value: 25,
    performance: 9,
    vram: 2,
    vendor: "AMD",
    family: "R9 300"
  },

  "R7 370": {
    name: "R7 370",
    value: 25,
    performance: 7,
    vram: 2,
    vendor: "AMD",
    family: "R7 300"
  },

  "R7 360": {
    name: "R7 360",
    value: 20,
    performance: 5,
    vram: 2,
    vendor: "AMD",
    family: "R7 300"
  },

  // ==========================================================
  // AMD R9 200 SERIES
  // ==========================================================

  "R9 295X2": {
    name: "R9 295X2",
    value: 100,
    performance: 20,
    vram: 8,
    vendor: "AMD",
    family: "R9 200"
  },

  "R9 290X": {
    name: "R9 290X",
    value: 50,
    performance: 13,
    vram: 4,
    vendor: "AMD",
    family: "R9 200"
  },

  "R9 290": {
    name: "R9 290",
    value: 45,
    performance: 12,
    vram: 4,
    vendor: "AMD",
    family: "R9 200"
  },

  "R9 285": {
    name: "R9 285",
    value: 30,
    performance: 9,
    vram: 2,
    vendor: "AMD",
    family: "R9 200"
  },

  "R9 280X": {
    name: "R9 280X",
    value: 30,
    performance: 9,
    vram: 3,
    vendor: "AMD",
    family: "R9 200"
  },

  "R9 280": {
    name: "R9 280",
    value: 25,
    performance: 8,
    vram: 3,
    vendor: "AMD",
    family: "R9 200"
  },

  "R9 270X": {
    name: "R9 270X",
    value: 20,
    performance: 7,
    vram: 2,
    vendor: "AMD",
    family: "R9 200"
  },

  "R9 270": {
    name: "R9 270",
    value: 18,
    performance: 6,
    vram: 2,
    vendor: "AMD",
    family: "R9 200"
  },

  "R7 265": {
    name: "R7 265",
    value: 15,
    performance: 5,
    vram: 2,
    vendor: "AMD",
    family: "R7 200"
  },

  "R7 260X": {
    name: "R7 260X",
    value: 15,
    performance: 4,
    vram: 2,
    vendor: "AMD",
    family: "R7 200"
  },

  "R7 250X": {
    name: "R7 250X",
    value: 12,
    performance: 3,
    vram: 1,
    vendor: "AMD",
    family: "R7 200"
  },

  "R7 250": {
    name: "R7 250",
    value: 10,
    performance: 2,
    vram: 2,
    vendor: "AMD",
    family: "R7 200"
  },

  "R5 240": {
    name: "R5 240",
    value: 8,
    performance: 1,
    vram: 1,
    vendor: "AMD",
    family: "R5 200"
  },

  // ==========================================================
  // AMD HD 7000 SERIES
  // ==========================================================

  "HD 7990": {
    name: "HD 7990",
    value: 55,
    performance: 12,
    vram: 6,
    vendor: "AMD",
    family: "HD 7000"
  },

  "HD 7970 GHz Edition": {
    name: "HD 7970 GHz Edition",
    value: 35,
    performance: 9,
    vram: 3,
    vendor: "AMD",
    family: "HD 7000"
  },

  "HD 7970": {
    name: "HD 7970",
    value: 30,
    performance: 8,
    vram: 3,
    vendor: "AMD",
    family: "HD 7000"
  },

  "HD 7950": {
    name: "HD 7950",
    value: 25,
    performance: 7,
    vram: 3,
    vendor: "AMD",
    family: "HD 7000"
  },

  "HD 7870": {
    name: "HD 7870",
    value: 20,
    performance: 6,
    vram: 2,
    vendor: "AMD",
    family: "HD 7000"
  },

  "HD 7850": {
    name: "HD 7850",
    value: 15,
    performance: 5,
    vram: 2,
    vendor: "AMD",
    family: "HD 7000"
  },

  "HD 7770": {
    name: "HD 7770",
    value: 12,
    performance: 3,
    vram: 1,
    vendor: "AMD",
    family: "HD 7000"
  },

  "HD 7750": {
    name: "HD 7750",
    value: 10,
    performance: 2,
    vram: 1,
    vendor: "AMD",
    family: "HD 7000"
  },

  // ==========================================================
  // AMD HD 6000 SERIES
  // ==========================================================

  "HD 6990": {
    name: "HD 6990",
    value: 40,
    performance: 8,
    vram: 4,
    vendor: "AMD",
    family: "HD 6000"
  },

  "HD 6970": {
    name: "HD 6970",
    value: 20,
    performance: 5,
    vram: 2,
    vendor: "AMD",
    family: "HD 6000"
  },

  "HD 6950": {
    name: "HD 6950",
    value: 15,
    performance: 4,
    vram: 2,
    vendor: "AMD",
    family: "HD 6000"
  },

  "HD 6870": {
    name: "HD 6870",
    value: 12,
    performance: 3,
    vram: 1,
    vendor: "AMD",
    family: "HD 6000"
  },

  "HD 6850": {
    name: "HD 6850",
    value: 10,
    performance: 3,
    vram: 1,
    vendor: "AMD",
    family: "HD 6000"
  },

  "HD 6770": {
    name: "HD 6770",
    value: 8,
    performance: 2,
    vram: 1,
    vendor: "AMD",
    family: "HD 6000"
  },

  "HD 6450": {
    name: "HD 6450",
    value: 8,
    performance: 1,
    vram: 1,
    vendor: "AMD",
    family: "HD 6000"
  },

  // ==========================================================
  // INTEL ARC B SERIES
  // ==========================================================

  "Arc B580": {
    name: "Arc B580",
    value: 350,
    performance: 44,
    vram: 12,
    vendor: "Intel",
    family: "Arc B"
  },

  "Arc B570": {
    name: "Arc B570",
    value: 280,
    performance: 39,
    vram: 10,
    vendor: "Intel",
    family: "Arc B"
  },

  // ==========================================================
  // INTEL ARC A SERIES
  // ==========================================================

  "Arc A770 16GB": {
    name: "Arc A770 16GB",
    value: 250,
    performance: 38,
    vram: 16,
    vendor: "Intel",
    family: "Arc A"
  },

  "Arc A770 8GB": {
    name: "Arc A770 8GB",
    value: 220,
    performance: 36,
    vram: 8,
    vendor: "Intel",
    family: "Arc A"
  },

  "Arc A750": {
    name: "Arc A750",
    value: 200,
    performance: 34,
    vram: 8,
    vendor: "Intel",
    family: "Arc A"
  },

  "Arc A580": {
    name: "Arc A580",
    value: 160,
    performance: 29,
    vram: 8,
    vendor: "Intel",
    family: "Arc A"
  },

  "Arc A380": {
    name: "Arc A380",
    value: 90,
    performance: 13,
    vram: 6,
    vendor: "Intel",
    family: "Arc A"
  },

  "Arc A310": {
    name: "Arc A310",
    value: 70,
    performance: 8,
    vram: 4,
    vendor: "Intel",
    family: "Arc A"
  }

};
