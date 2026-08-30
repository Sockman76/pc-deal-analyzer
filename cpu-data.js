// ============================================================
// PCDEAL - CPU DATABASE
// VERSION 1
// ============================================================
//
// Notes:
// - Values are rough USED CAD estimates.
// - performance is a relative CPU performance score.
// - socket is used by platform.js for compatibility.
// - family is mainly for display/debugging.
//
// ============================================================

const cpuDatabase = {

  // ==========================================================
  // AMD RYZEN 9000 / ZEN 5 - AM5
  // ==========================================================

  "Ryzen 9 9950X3D": {
    name: "Ryzen 9 9950X3D",
    value: 850,
    performance: 100,
    socket: "AM5",
    family: "Zen 5"
  },

  "Ryzen 9 9900X3D": {
    name: "Ryzen 9 9900X3D",
    value: 700,
    performance: 96,
    socket: "AM5",
    family: "Zen 5"
  },

  "Ryzen 7 9800X3D": {
    name: "Ryzen 7 9800X3D",
    value: 650,
    performance: 98,
    socket: "AM5",
    family: "Zen 5"
  },

  "Ryzen 9 9950X": {
    name: "Ryzen 9 9950X",
    value: 700,
    performance: 90,
    socket: "AM5",
    family: "Zen 5"
  },

  "Ryzen 9 9900X": {
    name: "Ryzen 9 9900X",
    value: 550,
    performance: 86,
    socket: "AM5",
    family: "Zen 5"
  },

  "Ryzen 7 9700X": {
    name: "Ryzen 7 9700X",
    value: 400,
    performance: 82,
    socket: "AM5",
    family: "Zen 5"
  },

  "Ryzen 5 9600X": {
    name: "Ryzen 5 9600X",
    value: 280,
    performance: 76,
    socket: "AM5",
    family: "Zen 5"
  },

  // ==========================================================
  // AMD RYZEN 8000G - AM5
  // ==========================================================

  "Ryzen 7 8700G": {
    name: "Ryzen 7 8700G",
    value: 300,
    performance: 72,
    socket: "AM5",
    family: "Zen 4 APU"
  },

  "Ryzen 5 8600G": {
    name: "Ryzen 5 8600G",
    value: 220,
    performance: 64,
    socket: "AM5",
    family: "Zen 4 APU"
  },

  "Ryzen 5 8500G": {
    name: "Ryzen 5 8500G",
    value: 160,
    performance: 55,
    socket: "AM5",
    family: "Zen 4 APU"
  },

  // ==========================================================
  // AMD RYZEN 7000 - AM5
  // ==========================================================

  "Ryzen 9 7950X3D": {
    name: "Ryzen 9 7950X3D",
    value: 600,
    performance: 94,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 9 7900X3D": {
    name: "Ryzen 9 7900X3D",
    value: 470,
    performance: 88,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 7 7800X3D": {
    name: "Ryzen 7 7800X3D",
    value: 400,
    performance: 92,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 9 7950X": {
    name: "Ryzen 9 7950X",
    value: 500,
    performance: 87,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 9 7900X": {
    name: "Ryzen 9 7900X",
    value: 380,
    performance: 82,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 9 7900": {
    name: "Ryzen 9 7900",
    value: 350,
    performance: 80,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 7 7700X": {
    name: "Ryzen 7 7700X",
    value: 270,
    performance: 75,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 7 7700": {
    name: "Ryzen 7 7700",
    value: 250,
    performance: 74,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 5 7600X": {
    name: "Ryzen 5 7600X",
    value: 200,
    performance: 70,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 5 7600": {
    name: "Ryzen 5 7600",
    value: 190,
    performance: 68,
    socket: "AM5",
    family: "Zen 4"
  },

  "Ryzen 5 7500F": {
    name: "Ryzen 5 7500F",
    value: 160,
    performance: 65,
    socket: "AM5",
    family: "Zen 4"
  },

  // ==========================================================
  // AMD RYZEN 5000 - AM4
  // ==========================================================

  "Ryzen 9 5950X": {
    name: "Ryzen 9 5950X",
    value: 280,
    performance: 68,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 9 5900XT": {
    name: "Ryzen 9 5900XT",
    value: 250,
    performance: 65,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 9 5900X": {
    name: "Ryzen 9 5900X",
    value: 220,
    performance: 64,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 7 5800X3D": {
    name: "Ryzen 7 5800X3D",
    value: 280,
    performance: 70,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 7 5800XT": {
    name: "Ryzen 7 5800XT",
    value: 180,
    performance: 59,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 7 5800X": {
    name: "Ryzen 7 5800X",
    value: 150,
    performance: 57,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 7 5700X3D": {
    name: "Ryzen 7 5700X3D",
    value: 220,
    performance: 67,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 7 5700X": {
    name: "Ryzen 7 5700X",
    value: 140,
    performance: 55,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 7 5700G": {
    name: "Ryzen 7 5700G",
    value: 130,
    performance: 50,
    socket: "AM4",
    family: "Zen 3 APU"
  },

  "Ryzen 5 5600X3D": {
    name: "Ryzen 5 5600X3D",
    value: 200,
    performance: 64,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 5 5600XT": {
    name: "Ryzen 5 5600XT",
    value: 120,
    performance: 51,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 5 5600X": {
    name: "Ryzen 5 5600X",
    value: 110,
    performance: 50,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 5 5600": {
    name: "Ryzen 5 5600",
    value: 100,
    performance: 48,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 5 5600G": {
    name: "Ryzen 5 5600G",
    value: 90,
    performance: 44,
    socket: "AM4",
    family: "Zen 3 APU"
  },

  "Ryzen 5 5500": {
    name: "Ryzen 5 5500",
    value: 80,
    performance: 41,
    socket: "AM4",
    family: "Zen 3"
  },

  "Ryzen 5 5500GT": {
    name: "Ryzen 5 5500GT",
    value: 85,
    performance: 42,
    socket: "AM4",
    family: "Zen 3 APU"
  },

  "Ryzen 5 5600GT": {
    name: "Ryzen 5 5600GT",
    value: 100,
    performance: 46,
    socket: "AM4",
    family: "Zen 3 APU"
  },

  "Ryzen 3 5300G": {
    name: "Ryzen 3 5300G",
    value: 60,
    performance: 33,
    socket: "AM4",
    family: "Zen 3 APU"
  },

  // ==========================================================
  // AMD RYZEN 4000G / OEM - AM4
  // ==========================================================

  "Ryzen 7 4700G": {
    name: "Ryzen 7 4700G",
    value: 90,
    performance: 40,
    socket: "AM4",
    family: "Zen 2 APU"
  },

  "Ryzen 5 4600G": {
    name: "Ryzen 5 4600G",
    value: 70,
    performance: 35,
    socket: "AM4",
    family: "Zen 2 APU"
  },

  "Ryzen 3 4300G": {
    name: "Ryzen 3 4300G",
    value: 50,
    performance: 28,
    socket: "AM4",
    family: "Zen 2 APU"
  },

  // ==========================================================
  // AMD RYZEN 3000 - AM4
  // ==========================================================

  "Ryzen 9 3950X": {
    name: "Ryzen 9 3950X",
    value: 170,
    performance: 55,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 9 3900XT": {
    name: "Ryzen 9 3900XT",
    value: 135,
    performance: 50,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 9 3900X": {
    name: "Ryzen 9 3900X",
    value: 125,
    performance: 48,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 7 3800XT": {
    name: "Ryzen 7 3800XT",
    value: 100,
    performance: 43,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 7 3800X": {
    name: "Ryzen 7 3800X",
    value: 95,
    performance: 42,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 7 3700X": {
    name: "Ryzen 7 3700X",
    value: 90,
    performance: 41,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 5 3600XT": {
    name: "Ryzen 5 3600XT",
    value: 80,
    performance: 38,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 5 3600X": {
    name: "Ryzen 5 3600X",
    value: 75,
    performance: 36,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 5 3600": {
    name: "Ryzen 5 3600",
    value: 70,
    performance: 35,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 5 3500X": {
    name: "Ryzen 5 3500X",
    value: 55,
    performance: 30,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 5 3500": {
    name: "Ryzen 5 3500",
    value: 50,
    performance: 28,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 3 3300X": {
    name: "Ryzen 3 3300X",
    value: 55,
    performance: 31,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 3 3100": {
    name: "Ryzen 3 3100",
    value: 40,
    performance: 26,
    socket: "AM4",
    family: "Zen 2"
  },

  "Ryzen 5 3400G": {
    name: "Ryzen 5 3400G",
    value: 55,
    performance: 27,
    socket: "AM4",
    family: "Zen+ APU"
  },

  "Ryzen 3 3200G": {
    name: "Ryzen 3 3200G",
    value: 40,
    performance: 22,
    socket: "AM4",
    family: "Zen+ APU"
  },

  // ==========================================================
  // AMD RYZEN 2000 - AM4
  // ==========================================================

  "Ryzen 7 2700X": {
    name: "Ryzen 7 2700X",
    value: 60,
    performance: 31,
    socket: "AM4",
    family: "Zen+"
  },

  "Ryzen 7 2700": {
    name: "Ryzen 7 2700",
    value: 55,
    performance: 29,
    socket: "AM4",
    family: "Zen+"
  },

  "Ryzen 5 2600X": {
    name: "Ryzen 5 2600X",
    value: 50,
    performance: 28,
    socket: "AM4",
    family: "Zen+"
  },

  "Ryzen 5 2600": {
    name: "Ryzen 5 2600",
    value: 45,
    performance: 27,
    socket: "AM4",
    family: "Zen+"
  },

  "Ryzen 5 2500X": {
    name: "Ryzen 5 2500X",
    value: 35,
    performance: 23,
    socket: "AM4",
    family: "Zen+"
  },

  "Ryzen 3 2300X": {
    name: "Ryzen 3 2300X",
    value: 30,
    performance: 20,
    socket: "AM4",
    family: "Zen+"
  },

  "Ryzen 5 2400G": {
    name: "Ryzen 5 2400G",
    value: 40,
    performance: 22,
    socket: "AM4",
    family: "Zen APU"
  },

  "Ryzen 3 2200G": {
    name: "Ryzen 3 2200G",
    value: 30,
    performance: 18,
    socket: "AM4",
    family: "Zen APU"
  },

  // ==========================================================
  // AMD RYZEN 1000 - AM4
  // ==========================================================

  "Ryzen 7 1800X": {
    name: "Ryzen 7 1800X",
    value: 55,
    performance: 27,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 7 1700X": {
    name: "Ryzen 7 1700X",
    value: 45,
    performance: 25,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 7 1700": {
    name: "Ryzen 7 1700",
    value: 40,
    performance: 24,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 5 1600X": {
    name: "Ryzen 5 1600X",
    value: 40,
    performance: 23,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 5 1600": {
    name: "Ryzen 5 1600",
    value: 35,
    performance: 22,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 5 1500X": {
    name: "Ryzen 5 1500X",
    value: 30,
    performance: 20,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 5 1400": {
    name: "Ryzen 5 1400",
    value: 25,
    performance: 18,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 3 1300X": {
    name: "Ryzen 3 1300X",
    value: 20,
    performance: 16,
    socket: "AM4",
    family: "Zen"
  },

  "Ryzen 3 1200": {
    name: "Ryzen 3 1200",
    value: 15,
    performance: 14,
    socket: "AM4",
    family: "Zen"
  },

  // ==========================================================
  // AMD FX - AM3+
  // ==========================================================

  "FX-9590": {
    name: "FX-9590",
    value: 45,
    performance: 18,
    socket: "AM3+",
    family: "Vishera"
  },

  "FX-9370": {
    name: "FX-9370",
    value: 35,
    performance: 17,
    socket: "AM3+",
    family: "Vishera"
  },

  "FX-8370": {
    name: "FX-8370",
    value: 35,
    performance: 17,
    socket: "AM3+",
    family: "Vishera"
  },

  "FX-8350": {
    name: "FX-8350",
    value: 30,
    performance: 16,
    socket: "AM3+",
    family: "Vishera"
  },

  "FX-8320": {
    name: "FX-8320",
    value: 25,
    performance: 15,
    socket: "AM3+",
    family: "Vishera"
  },

  "FX-8150": {
    name: "FX-8150",
    value: 20,
    performance: 14,
    socket: "AM3+",
    family: "Bulldozer"
  },

  "FX-6300": {
    name: "FX-6300",
    value: 20,
    performance: 12,
    socket: "AM3+",
    family: "Vishera"
  },

  "FX-6100": {
    name: "FX-6100",
    value: 15,
    performance: 11,
    socket: "AM3+",
    family: "Bulldozer"
  },

  "FX-4350": {
    name: "FX-4350",
    value: 15,
    performance: 10,
    socket: "AM3+",
    family: "Vishera"
  },

  "FX-4300": {
    name: "FX-4300",
    value: 12,
    performance: 9,
    socket: "AM3+",
    family: "Vishera"
  },

  // ==========================================================
  // AMD PHENOM II / ATHLON II
  // ==========================================================

  "Phenom II X6 1100T": {
    name: "Phenom II X6 1100T",
    value: 25,
    performance: 10,
    socket: "AM3",
    family: "Thuban"
  },

  "Phenom II X6 1090T": {
    name: "Phenom II X6 1090T",
    value: 20,
    performance: 10,
    socket: "AM3",
    family: "Thuban"
  },

  "Phenom II X6 1055T": {
    name: "Phenom II X6 1055T",
    value: 15,
    performance: 9,
    socket: "AM3",
    family: "Thuban"
  },

  "Phenom II X4 980": {
    name: "Phenom II X4 980",
    value: 15,
    performance: 8,
    socket: "AM3",
    family: "Deneb"
  },

  "Phenom II X4 965": {
    name: "Phenom II X4 965",
    value: 12,
    performance: 8,
    socket: "AM3",
    family: "Deneb"
  },

  "Phenom II X4 955": {
    name: "Phenom II X4 955",
    value: 10,
    performance: 7,
    socket: "AM3",
    family: "Deneb"
  },

  "Athlon II X4 640": {
    name: "Athlon II X4 640",
    value: 8,
    performance: 6,
    socket: "AM3",
    family: "Propus"
  },

  // ==========================================================
  // INTEL CORE ULTRA DESKTOP - LGA1851
  // ==========================================================

  "Core Ultra 9 285K": {
    name: "Core Ultra 9 285K",
    value: 650,
    performance: 90,
    socket: "LGA1851",
    family: "Arrow Lake"
  },

  "Core Ultra 7 265K": {
    name: "Core Ultra 7 265K",
    value: 450,
    performance: 84,
    socket: "LGA1851",
    family: "Arrow Lake"
  },

  "Core Ultra 7 265KF": {
    name: "Core Ultra 7 265KF",
    value: 420,
    performance: 83,
    socket: "LGA1851",
    family: "Arrow Lake"
  },

  "Core Ultra 5 245K": {
    name: "Core Ultra 5 245K",
    value: 320,
    performance: 77,
    socket: "LGA1851",
    family: "Arrow Lake"
  },

  "Core Ultra 5 245KF": {
    name: "Core Ultra 5 245KF",
    value: 300,
    performance: 76,
    socket: "LGA1851",
    family: "Arrow Lake"
  },

  // ==========================================================
  // INTEL 14TH GEN - LGA1700
  // ==========================================================

  "Core i9-14900KS": {
    name: "Core i9-14900KS",
    value: 600,
    performance: 93,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i9-14900K": {
    name: "Core i9-14900K",
    value: 500,
    performance: 90,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i9-14900KF": {
    name: "Core i9-14900KF",
    value: 470,
    performance: 90,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i9-14900": {
    name: "Core i9-14900",
    value: 440,
    performance: 86,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i7-14700K": {
    name: "Core i7-14700K",
    value: 380,
    performance: 86,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i7-14700KF": {
    name: "Core i7-14700KF",
    value: 350,
    performance: 85,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i7-14700": {
    name: "Core i7-14700",
    value: 320,
    performance: 80,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i7-14700F": {
    name: "Core i7-14700F",
    value: 300,
    performance: 79,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i5-14600K": {
    name: "Core i5-14600K",
    value: 260,
    performance: 82,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i5-14600KF": {
    name: "Core i5-14600KF",
    value: 240,
    performance: 81,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i5-14500": {
    name: "Core i5-14500",
    value: 200,
    performance: 72,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i5-14400F": {
    name: "Core i5-14400F",
    value: 180,
    performance: 68,
    socket: "LGA1700",
    family: "14th Gen"
  },

  "Core i3-14100F": {
    name: "Core i3-14100F",
    value: 95,
    performance: 50,
    socket: "LGA1700",
    family: "14th Gen"
  },

  // ==========================================================
  // INTEL 13TH GEN - LGA1700
  // ==========================================================

  "Core i9-13900KS": {
    name: "Core i9-13900KS",
    value: 470,
    performance: 90,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i9-13900K": {
    name: "Core i9-13900K",
    value: 420,
    performance: 87,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i9-13900KF": {
    name: "Core i9-13900KF",
    value: 400,
    performance: 86,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i9-13900": {
    name: "Core i9-13900",
    value: 370,
    performance: 82,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i7-13700K": {
    name: "Core i7-13700K",
    value: 300,
    performance: 82,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i7-13700KF": {
    name: "Core i7-13700KF",
    value: 280,
    performance: 81,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i7-13700": {
    name: "Core i7-13700",
    value: 260,
    performance: 77,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i5-13600K": {
    name: "Core i5-13600K",
    value: 230,
    performance: 78,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i5-13600KF": {
    name: "Core i5-13600KF",
    value: 215,
    performance: 77,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i5-13500": {
    name: "Core i5-13500",
    value: 180,
    performance: 70,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i5-13400F": {
    name: "Core i5-13400F",
    value: 150,
    performance: 64,
    socket: "LGA1700",
    family: "13th Gen"
  },

  "Core i3-13100F": {
    name: "Core i3-13100F",
    value: 80,
    performance: 47,
    socket: "LGA1700",
    family: "13th Gen"
  },

  // ==========================================================
  // INTEL 12TH GEN - LGA1700
  // ==========================================================

  "Core i9-12900KS": {
    name: "Core i9-12900KS",
    value: 330,
    performance: 80,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i9-12900K": {
    name: "Core i9-12900K",
    value: 300,
    performance: 77,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i9-12900KF": {
    name: "Core i9-12900KF",
    value: 280,
    performance: 76,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i9-12900": {
    name: "Core i9-12900",
    value: 260,
    performance: 73,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i7-12700K": {
    name: "Core i7-12700K",
    value: 220,
    performance: 72,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i7-12700KF": {
    name: "Core i7-12700KF",
    value: 205,
    performance: 71,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i7-12700F": {
    name: "Core i7-12700F",
    value: 190,
    performance: 69,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i5-12600K": {
    name: "Core i5-12600K",
    value: 160,
    performance: 65,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i5-12600KF": {
    name: "Core i5-12600KF",
    value: 150,
    performance: 64,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i5-12500": {
    name: "Core i5-12500",
    value: 130,
    performance: 58,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i5-12400F": {
    name: "Core i5-12400F",
    value: 120,
    performance: 55,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i3-12300": {
    name: "Core i3-12300",
    value: 85,
    performance: 48,
    socket: "LGA1700",
    family: "12th Gen"
  },

  "Core i3-12100F": {
    name: "Core i3-12100F",
    value: 70,
    performance: 45,
    socket: "LGA1700",
    family: "12th Gen"
  },

  // ==========================================================
  // INTEL 11TH GEN - LGA1200
  // ==========================================================

  "Core i9-11900K": {
    name: "Core i9-11900K",
    value: 170,
    performance: 55,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i9-11900KF": {
    name: "Core i9-11900KF",
    value: 160,
    performance: 54,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i9-11900": {
    name: "Core i9-11900",
    value: 145,
    performance: 51,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i7-11700K": {
    name: "Core i7-11700K",
    value: 140,
    performance: 52,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i7-11700F": {
    name: "Core i7-11700F",
    value: 115,
    performance: 48,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i5-11600K": {
    name: "Core i5-11600K",
    value: 100,
    performance: 47,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i5-11500": {
    name: "Core i5-11500",
    value: 85,
    performance: 43,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i5-11400F": {
    name: "Core i5-11400F",
    value: 80,
    performance: 42,
    socket: "LGA1200",
    family: "11th Gen"
  },

  "Core i3-11100": {
    name: "Core i3-11100",
    value: 55,
    performance: 34,
    socket: "LGA1200",
    family: "11th Gen"
  },

  // ==========================================================
  // INTEL 10TH GEN - LGA1200
  // ==========================================================

  "Core i9-10900K": {
    name: "Core i9-10900K",
    value: 160,
    performance: 52,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i9-10900KF": {
    name: "Core i9-10900KF",
    value: 150,
    performance: 51,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i9-10900": {
    name: "Core i9-10900",
    value: 135,
    performance: 49,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i7-10700K": {
    name: "Core i7-10700K",
    value: 120,
    performance: 48,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i7-10700F": {
    name: "Core i7-10700F",
    value: 100,
    performance: 44,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i5-10600K": {
    name: "Core i5-10600K",
    value: 90,
    performance: 42,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i5-10500": {
    name: "Core i5-10500",
    value: 75,
    performance: 39,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i5-10400F": {
    name: "Core i5-10400F",
    value: 70,
    performance: 37,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i3-10300": {
    name: "Core i3-10300",
    value: 50,
    performance: 31,
    socket: "LGA1200",
    family: "10th Gen"
  },

  "Core i3-10100F": {
    name: "Core i3-10100F",
    value: 40,
    performance: 28,
    socket: "LGA1200",
    family: "10th Gen"
  },

  // ==========================================================
  // INTEL 9TH GEN - LGA1151-300
  // ==========================================================

  "Core i9-9900KS": {
    name: "Core i9-9900KS",
    value: 180,
    performance: 51,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i9-9900K": {
    name: "Core i9-9900K",
    value: 150,
    performance: 48,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i9-9900KF": {
    name: "Core i9-9900KF",
    value: 140,
    performance: 47,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i7-9700K": {
    name: "Core i7-9700K",
    value: 100,
    performance: 40,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i7-9700F": {
    name: "Core i7-9700F",
    value: 85,
    performance: 37,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i5-9600K": {
    name: "Core i5-9600K",
    value: 75,
    performance: 34,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i5-9500": {
    name: "Core i5-9500",
    value: 60,
    performance: 31,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i5-9400F": {
    name: "Core i5-9400F",
    value: 55,
    performance: 29,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i3-9350KF": {
    name: "Core i3-9350KF",
    value: 45,
    performance: 25,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  "Core i3-9100F": {
    name: "Core i3-9100F",
    value: 30,
    performance: 20,
    socket: "LGA1151-300",
    family: "9th Gen"
  },

  // ==========================================================
  // INTEL 8TH GEN - LGA1151-300
  // ==========================================================

  "Core i7-8700K": {
    name: "Core i7-8700K",
    value: 85,
    performance: 37,
    socket: "LGA1151-300",
    family: "8th Gen"
  },

  "Core i7-8700": {
    name: "Core i7-8700",
    value: 75,
    performance: 35,
    socket: "LGA1151-300",
    family: "8th Gen"
  },

  "Core i5-8600K": {
    name: "Core i5-8600K",
    value: 65,
    performance: 31,
    socket: "LGA1151-300",
    family: "8th Gen"
  },

  "Core i5-8500": {
    name: "Core i5-8500",
    value: 50,
    performance: 27,
    socket: "LGA1151-300",
    family: "8th Gen"
  },

  "Core i5-8400": {
    name: "Core i5-8400",
    value: 45,
    performance: 26,
    socket: "LGA1151-300",
    family: "8th Gen"
  },

  "Core i3-8350K": {
    name: "Core i3-8350K",
    value: 35,
    performance: 22,
    socket: "LGA1151-300",
    family: "8th Gen"
  },

  "Core i3-8100": {
    name: "Core i3-8100",
    value: 25,
    performance: 18,
    socket: "LGA1151-300",
    family: "8th Gen"
  },

  // ==========================================================
  // INTEL 7TH GEN - LGA1151-100-200
  // ==========================================================

  "Core i7-7700K": {
    name: "Core i7-7700K",
    value: 65,
    performance: 30,
    socket: "LGA1151-100-200",
    family: "7th Gen"
  },

  "Core i7-7700": {
    name: "Core i7-7700",
    value: 55,
    performance: 27,
    socket: "LGA1151-100-200",
    family: "7th Gen"
  },

  "Core i5-7600K": {
    name: "Core i5-7600K",
    value: 45,
    performance: 23,
    socket: "LGA1151-100-200",
    family: "7th Gen"
  },

  "Core i5-7500": {
    name: "Core i5-7500",
    value: 35,
    performance: 20,
    socket: "LGA1151-100-200",
    family: "7th Gen"
  },

  "Core i5-7400": {
    name: "Core i5-7400",
    value: 30,
    performance: 18,
    socket: "LGA1151-100-200",
    family: "7th Gen"
  },

  "Core i3-7350K": {
    name: "Core i3-7350K",
    value: 25,
    performance: 16,
    socket: "LGA1151-100-200",
    family: "7th Gen"
  },

  "Core i3-7100": {
    name: "Core i3-7100",
    value: 18,
    performance: 13,
    socket: "LGA1151-100-200",
    family: "7th Gen"
  },

  // ==========================================================
  // INTEL 6TH GEN - LGA1151-100-200
  // ==========================================================

  "Core i7-6700K": {
    name: "Core i7-6700K",
    value: 55,
    performance: 27,
    socket: "LGA1151-100-200",
    family: "6th Gen"
  },

  "Core i7-6700": {
    name: "Core i7-6700",
    value: 45,
    performance: 24,
    socket: "LGA1151-100-200",
    family: "6th Gen"
  },

  "Core i5-6600K": {
    name: "Core i5-6600K",
    value: 35,
    performance: 21,
    socket: "LGA1151-100-200",
    family: "6th Gen"
  },

  "Core i5-6500": {
    name: "Core i5-6500",
    value: 28,
    performance: 18,
    socket: "LGA1151-100-200",
    family: "6th Gen"
  },

  "Core i5-6400": {
    name: "Core i5-6400",
    value: 25,
    performance: 17,
    socket: "LGA1151-100-200",
    family: "6th Gen"
  },

  "Core i3-6320": {
    name: "Core i3-6320",
    value: 18,
    performance: 13,
    socket: "LGA1151-100-200",
    family: "6th Gen"
  },

  "Core i3-6100": {
    name: "Core i3-6100",
    value: 15,
    performance: 12,
    socket: "LGA1151-100-200",
    family: "6th Gen"
  },

  // ==========================================================
  // INTEL 5TH GEN - LGA1150
  // ==========================================================

  "Core i7-5775C": {
    name: "Core i7-5775C",
    value: 70,
    performance: 25,
    socket: "LGA1150",
    family: "5th Gen"
  },

  "Core i5-5675C": {
    name: "Core i5-5675C",
    value: 50,
    performance: 20,
    socket: "LGA1150",
    family: "5th Gen"
  },

  // ==========================================================
  // INTEL 4TH GEN - LGA1150
  // ==========================================================

  "Core i7-4790K": {
    name: "Core i7-4790K",
    value: 40,
    performance: 22,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i7-4790": {
    name: "Core i7-4790",
    value: 35,
    performance: 20,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i7-4770K": {
    name: "Core i7-4770K",
    value: 35,
    performance: 20,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i7-4770": {
    name: "Core i7-4770",
    value: 30,
    performance: 19,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4690K": {
    name: "Core i5-4690K",
    value: 25,
    performance: 16,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4690": {
    name: "Core i5-4690",
    value: 20,
    performance: 15,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4670K": {
    name: "Core i5-4670K",
    value: 20,
    performance: 15,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4670": {
    name: "Core i5-4670",
    value: 18,
    performance: 14,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4590": {
    name: "Core i5-4590",
    value: 18,
    performance: 14,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4570": {
    name: "Core i5-4570",
    value: 15,
    performance: 13,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4460": {
    name: "Core i5-4460",
    value: 15,
    performance: 12,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i5-4440": {
    name: "Core i5-4440",
    value: 12,
    performance: 11,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i3-4370": {
    name: "Core i3-4370",
    value: 12,
    performance: 10,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i3-4170": {
    name: "Core i3-4170",
    value: 10,
    performance: 8,
    socket: "LGA1150",
    family: "4th Gen"
  },

  "Core i3-4130": {
    name: "Core i3-4130",
    value: 8,
    performance: 7,
    socket: "LGA1150",
    family: "4th Gen"
  },

  // ==========================================================
  // INTEL 3RD GEN - LGA1155
  // ==========================================================

  "Core i7-3770K": {
    name: "Core i7-3770K",
    value: 30,
    performance: 18,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  "Core i7-3770": {
    name: "Core i7-3770",
    value: 25,
    performance: 17,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  "Core i5-3570K": {
    name: "Core i5-3570K",
    value: 15,
    performance: 13,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  "Core i5-3570": {
    name: "Core i5-3570",
    value: 12,
    performance: 12,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  "Core i5-3470": {
    name: "Core i5-3470",
    value: 10,
    performance: 10,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  "Core i5-3330": {
    name: "Core i5-3330",
    value: 8,
    performance: 9,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  "Core i3-3240": {
    name: "Core i3-3240",
    value: 6,
    performance: 6,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  "Core i3-3220": {
    name: "Core i3-3220",
    value: 5,
    performance: 5,
    socket: "LGA1155",
    family: "3rd Gen"
  },

  // ==========================================================
  // INTEL 2ND GEN - LGA1155
  // ==========================================================

  "Core i7-2700K": {
    name: "Core i7-2700K",
    value: 25,
    performance: 16,
    socket: "LGA1155",
    family: "2nd Gen"
  },

  "Core i7-2600K": {
    name: "Core i7-2600K",
    value: 25,
    performance: 15,
    socket: "LGA1155",
    family: "2nd Gen"
  },

  "Core i7-2600": {
    name: "Core i7-2600",
    value: 20,
    performance: 14,
    socket: "LGA1155",
    family: "2nd Gen"
  },

  "Core i5-2500K": {
    name: "Core i5-2500K",
    value: 15,
    performance: 12,
    socket: "LGA1155",
    family: "2nd Gen"
  },

  "Core i5-2500": {
    name: "Core i5-2500",
    value: 10,
    performance: 10,
    socket: "LGA1155",
    family: "2nd Gen"
  },

  "Core i5-2400": {
    name: "Core i5-2400",
    value: 8,
    performance: 9,
    socket: "LGA1155",
    family: "2nd Gen"
  },

  "Core i3-2120": {
    name: "Core i3-2120",
    value: 5,
    performance: 5,
    socket: "LGA1155",
    family: "2nd Gen"
  },

  // ==========================================================
  // INTEL 1ST GEN - LGA1156
  // ==========================================================

  "Core i7-880": {
    name: "Core i7-880",
    value: 18,
    performance: 11,
    socket: "LGA1156",
    family: "1st Gen"
  },

  "Core i7-870": {
    name: "Core i7-870",
    value: 15,
    performance: 10,
    socket: "LGA1156",
    family: "1st Gen"
  },

  "Core i7-860": {
    name: "Core i7-860",
    value: 12,
    performance: 9,
    socket: "LGA1156",
    family: "1st Gen"
  },

  "Core i5-760": {
    name: "Core i5-760",
    value: 10,
    performance: 8,
    socket: "LGA1156",
    family: "1st Gen"
  },

  "Core i5-750": {
    name: "Core i5-750",
    value: 8,
    performance: 7,
    socket: "LGA1156",
    family: "1st Gen"
  },

  // ==========================================================
  // INTEL HEDT - LGA2066
  // ==========================================================

  "Core i9-10980XE": {
    name: "Core i9-10980XE",
    value: 250,
    performance: 56,
    socket: "LGA2066",
    family: "Cascade Lake-X"
  },

  "Core i9-9980XE": {
    name: "Core i9-9980XE",
    value: 220,
    performance: 52,
    socket: "LGA2066",
    family: "Skylake-X Refresh"
  },

  "Core i9-9960X": {
    name: "Core i9-9960X",
    value: 180,
    performance: 48,
    socket: "LGA2066",
    family: "Skylake-X Refresh"
  },

  "Core i9-9940X": {
    name: "Core i9-9940X",
    value: 160,
    performance: 45,
    socket: "LGA2066",
    family: "Skylake-X Refresh"
  },

  "Core i9-9920X": {
    name: "Core i9-9920X",
    value: 140,
    performance: 42,
    socket: "LGA2066",
    family: "Skylake-X Refresh"
  },

  "Core i9-9900X": {
    name: "Core i9-9900X",
    value: 120,
    performance: 39,
    socket: "LGA2066",
    family: "Skylake-X Refresh"
  },

  "Core i9-7980XE": {
    name: "Core i9-7980XE",
    value: 180,
    performance: 48,
    socket: "LGA2066",
    family: "Skylake-X"
  },

  "Core i9-7960X": {
    name: "Core i9-7960X",
    value: 160,
    performance: 45,
    socket: "LGA2066",
    family: "Skylake-X"
  },

  "Core i9-7940X": {
    name: "Core i9-7940X",
    value: 135,
    performance: 41,
    socket: "LGA2066",
    family: "Skylake-X"
  },

  "Core i9-7920X": {
    name: "Core i9-7920X",
    value: 120,
    performance: 38,
    socket: "LGA2066",
    family: "Skylake-X"
  },

  "Core i9-7900X": {
    name: "Core i9-7900X",
    value: 100,
    performance: 35,
    socket: "LGA2066",
    family: "Skylake-X"
  },

  "Core i7-7820X": {
    name: "Core i7-7820X",
    value: 80,
    performance: 31,
    socket: "LGA2066",
    family: "Skylake-X"
  },

  "Core i7-7800X": {
    name: "Core i7-7800X",
    value: 65,
    performance: 28,
    socket: "LGA2066",
    family: "Skylake-X"
  },

  // ==========================================================
  // INTEL HEDT - LGA2011-3
  // ==========================================================

  "Core i7-6950X": {
    name: "Core i7-6950X",
    value: 90,
    performance: 31,
    socket: "LGA2011-3",
    family: "Broadwell-E"
  },

  "Core i7-6900K": {
    name: "Core i7-6900K",
    value: 70,
    performance: 28,
    socket: "LGA2011-3",
    family: "Broadwell-E"
  },

  "Core i7-6850K": {
    name: "Core i7-6850K",
    value: 55,
    performance: 24,
    socket: "LGA2011-3",
    family: "Broadwell-E"
  },

  "Core i7-6800K": {
    name: "Core i7-6800K",
    value: 45,
    performance: 22,
    socket: "LGA2011-3",
    family: "Broadwell-E"
  },

  "Core i7-5960X": {
    name: "Core i7-5960X",
    value: 70,
    performance: 27,
    socket: "LGA2011-3",
    family: "Haswell-E"
  },

  "Core i7-5930K": {
    name: "Core i7-5930K",
    value: 45,
    performance: 22,
    socket: "LGA2011-3",
    family: "Haswell-E"
  },

  "Core i7-5820K": {
    name: "Core i7-5820K",
    value: 35,
    performance: 20,
    socket: "LGA2011-3",
    family: "Haswell-E"
  },

  // ==========================================================
  // INTEL HEDT - LGA2011
  // ==========================================================

  "Core i7-4960X": {
    name: "Core i7-4960X",
    value: 50,
    performance: 21,
    socket: "LGA2011",
    family: "Ivy Bridge-E"
  },

  "Core i7-4930K": {
    name: "Core i7-4930K",
    value: 40,
    performance: 20,
    socket: "LGA2011",
    family: "Ivy Bridge-E"
  },

  "Core i7-4820K": {
    name: "Core i7-4820K",
    value: 30,
    performance: 17,
    socket: "LGA2011",
    family: "Ivy Bridge-E"
  },

  "Core i7-3970X": {
    name: "Core i7-3970X",
    value: 45,
    performance: 19,
    socket: "LGA2011",
    family: "Sandy Bridge-E"
  },

  "Core i7-3960X": {
    name: "Core i7-3960X",
    value: 40,
    performance: 18,
    socket: "LGA2011",
    family: "Sandy Bridge-E"
  },

  "Core i7-3930K": {
    name: "Core i7-3930K",
    value: 30,
    performance: 17,
    socket: "LGA2011",
    family: "Sandy Bridge-E"
  },

  "Core i7-3820": {
    name: "Core i7-3820",
    value: 20,
    performance: 14,
    socket: "LGA2011",
    family: "Sandy Bridge-E"
  },

  // ==========================================================
  // INTEL HEDT - LGA1366
  // ==========================================================

  "Core i7-990X": {
    name: "Core i7-990X",
    value: 35,
    performance: 14,
    socket: "LGA1366",
    family: "Gulftown"
  },

  "Core i7-980X": {
    name: "Core i7-980X",
    value: 30,
    performance: 13,
    socket: "LGA1366",
    family: "Gulftown"
  },

  "Core i7-970": {
    name: "Core i7-970",
    value: 22,
    performance: 12,
    socket: "LGA1366",
    family: "Gulftown"
  },

  "Core i7-960": {
    name: "Core i7-960",
    value: 15,
    performance: 9,
    socket: "LGA1366",
    family: "Bloomfield"
  },

  "Core i7-950": {
    name: "Core i7-950",
    value: 12,
    performance: 8,
    socket: "LGA1366",
    family: "Bloomfield"
  },

  "Core i7-920": {
    name: "Core i7-920",
    value: 8,
    performance: 7,
    socket: "LGA1366",
    family: "Bloomfield"
  }

};
