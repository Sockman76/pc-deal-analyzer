// ============================================================
// PCDEAL PARTS ENGINE
// VERSION 5
// ============================================================
//
// Requires:
// cpu-data.js
// gpu-data.js
// platform.js
//
// IMPORTANT:
// This file DOES NOT create cpuDatabase, gpuDatabase,
// or platformDatabase.
//
// Those are loaded from the other files.
//
// V5 improvements:
// - Better Marketplace/Kijiji shorthand
// - Ryzen shorthand: r7 5800x3d
// - Intel shorthand: i7 12700k / i712700k
// - NVIDIA shorthand: 3080ti / rtx3080ti / 4070s
// - AMD shorthand: 6800xt / rx6800xt
// - Better spacing/hyphen tolerance
// - Better aliases
// - Generic fallback detection
// - Does NOT invent prices for unknown parts
//
// ============================================================


// ============================================================
// CPU ALIASES
// ============================================================

const cpuAliases = {

  // ----------------------------------------------------------
  // INTEL OLDER
  // ----------------------------------------------------------

  "i7 4790k": "Core i7-4790K",
  "i74790k": "Core i7-4790K",
  "4790k": "Core i7-4790K",

  "i7 4770k": "Core i7-4770K",
  "i74770k": "Core i7-4770K",
  "4770k": "Core i7-4770K",

  "i7 3770k": "Core i7-3770K",
  "i73770k": "Core i7-3770K",
  "3770k": "Core i7-3770K",

  "i7 2600k": "Core i7-2600K",
  "i72600k": "Core i7-2600K",

  // ----------------------------------------------------------
  // INTEL 6TH / 7TH
  // ----------------------------------------------------------

  "i7 6700k": "Core i7-6700K",
  "i76700k": "Core i7-6700K",

  "i7 7700k": "Core i7-7700K",
  "i77700k": "Core i7-7700K",

  "i5 6600k": "Core i5-6600K",
  "i56600k": "Core i5-6600K",

  "i5 7600k": "Core i5-7600K",
  "i57600k": "Core i5-7600K",

  // ----------------------------------------------------------
  // INTEL 8TH / 9TH
  // ----------------------------------------------------------

  "i7 8700k": "Core i7-8700K",
  "i78700k": "Core i7-8700K",

  "i7 9700k": "Core i7-9700K",
  "i79700k": "Core i7-9700K",

  "i9 9900k": "Core i9-9900K",
  "i99900k": "Core i9-9900K",

  "i5 8400": "Core i5-8400",
  "i58400": "Core i5-8400",

  "i5 9400f": "Core i5-9400F",
  "i59400f": "Core i5-9400F",

  "i5 9600k": "Core i5-9600K",
  "i59600k": "Core i5-9600K",

  // ----------------------------------------------------------
  // INTEL 10TH
  // ----------------------------------------------------------

  "i5 10400": "Core i5-10400",
  "i510400": "Core i5-10400",

  "i5 10400f": "Core i5-10400F",
  "i510400f": "Core i5-10400F",

  "i5 10600k": "Core i5-10600K",
  "i510600k": "Core i5-10600K",

  "i7 10700k": "Core i7-10700K",
  "i710700k": "Core i7-10700K",

  "i9 10900k": "Core i9-10900K",
  "i910900k": "Core i9-10900K",

  // ----------------------------------------------------------
  // INTEL 11TH
  // ----------------------------------------------------------

  "i5 11400": "Core i5-11400",
  "i511400": "Core i5-11400",

  "i5 11400f": "Core i5-11400F",
  "i511400f": "Core i5-11400F",

  "i5 11600k": "Core i5-11600K",
  "i511600k": "Core i5-11600K",

  "i7 11700k": "Core i7-11700K",
  "i711700k": "Core i7-11700K",

  "i9 11900k": "Core i9-11900K",
  "i911900k": "Core i9-11900K",

  // ----------------------------------------------------------
  // INTEL 12TH
  // ----------------------------------------------------------

  "i3 12100": "Core i3-12100",
  "i312100": "Core i3-12100",

  "i3 12100f": "Core i3-12100F",
  "i312100f": "Core i3-12100F",

  "i5 12400": "Core i5-12400",
  "i512400": "Core i5-12400",

  "i5 12400f": "Core i5-12400F",
  "i512400f": "Core i5-12400F",

  "i5 12600k": "Core i5-12600K",
  "i512600k": "Core i5-12600K",

  "i5 12600kf": "Core i5-12600KF",
  "i512600kf": "Core i5-12600KF",

  "i7 12700": "Core i7-12700",
  "i712700": "Core i7-12700",

  "i7 12700f": "Core i7-12700F",
  "i712700f": "Core i7-12700F",

  "i7 12700k": "Core i7-12700K",
  "i712700k": "Core i7-12700K",

  "i7 12700kf": "Core i7-12700KF",
  "i712700kf": "Core i7-12700KF",

  "i9 12900k": "Core i9-12900K",
  "i912900k": "Core i9-12900K",

  // ----------------------------------------------------------
  // INTEL 13TH
  // ----------------------------------------------------------

  "i3 13100": "Core i3-13100",
  "i313100": "Core i3-13100",

  "i3 13100f": "Core i3-13100F",
  "i313100f": "Core i3-13100F",

  "i5 13400": "Core i5-13400",
  "i513400": "Core i5-13400",

  "i5 13400f": "Core i5-13400F",
  "i513400f": "Core i5-13400F",

  "i5 13600k": "Core i5-13600K",
  "i513600k": "Core i5-13600K",

  "i5 13600kf": "Core i5-13600KF",
  "i513600kf": "Core i5-13600KF",

  "i7 13700k": "Core i7-13700K",
  "i713700k": "Core i7-13700K",

  "i7 13700kf": "Core i7-13700KF",
  "i713700kf": "Core i7-13700KF",

  "i9 13900k": "Core i9-13900K",
  "i913900k": "Core i9-13900K",

  // ----------------------------------------------------------
  // INTEL 14TH
  // ----------------------------------------------------------

  "i5 14400": "Core i5-14400",
  "i514400": "Core i5-14400",

  "i5 14400f": "Core i5-14400F",
  "i514400f": "Core i5-14400F",

  "i5 14600k": "Core i5-14600K",
  "i514600k": "Core i5-14600K",

  "i5 14600kf": "Core i5-14600KF",
  "i514600kf": "Core i5-14600KF",

  "i7 14700k": "Core i7-14700K",
  "i714700k": "Core i7-14700K",

  "i7 14700kf": "Core i7-14700KF",
  "i714700kf": "Core i7-14700KF",

  "i9 14900k": "Core i9-14900K",
  "i914900k": "Core i9-14900K",

  // ----------------------------------------------------------
  // AMD RYZEN 1000 / 2000 / 3000
  // ----------------------------------------------------------

  "r5 1600": "Ryzen 5 1600",
  "r51600": "Ryzen 5 1600",

  "r7 1700": "Ryzen 7 1700",
  "r71700": "Ryzen 7 1700",

  "r5 2600": "Ryzen 5 2600",
  "r52600": "Ryzen 5 2600",

  "r5 2600x": "Ryzen 5 2600X",
  "r52600x": "Ryzen 5 2600X",

  "r7 2700x": "Ryzen 7 2700X",
  "r72700x": "Ryzen 7 2700X",

  "r5 3600": "Ryzen 5 3600",
  "r53600": "Ryzen 5 3600",

  "r5 3600x": "Ryzen 5 3600X",
  "r53600x": "Ryzen 5 3600X",

  "r7 3700x": "Ryzen 7 3700X",
  "r73700x": "Ryzen 7 3700X",

  "r7 3800x": "Ryzen 7 3800X",
  "r73800x": "Ryzen 7 3800X",

  "r9 3900x": "Ryzen 9 3900X",
  "r93900x": "Ryzen 9 3900X",

  "r9 3950x": "Ryzen 9 3950X",
  "r93950x": "Ryzen 9 3950X",

  // ----------------------------------------------------------
  // AMD RYZEN 5000
  // ----------------------------------------------------------

  "r5 5500": "Ryzen 5 5500",
  "r55500": "Ryzen 5 5500",

  "r5 5600": "Ryzen 5 5600",
  "r55600": "Ryzen 5 5600",

  "r5 5600x": "Ryzen 5 5600X",
  "r55600x": "Ryzen 5 5600X",

  "r7 5700x": "Ryzen 7 5700X",
  "r75700x": "Ryzen 7 5700X",

  "r7 5700x3d": "Ryzen 7 5700X3D",
  "r75700x3d": "Ryzen 7 5700X3D",
  "5700x3d": "Ryzen 7 5700X3D",

  "r7 5800x": "Ryzen 7 5800X",
  "r75800x": "Ryzen 7 5800X",

  "r7 5800x3d": "Ryzen 7 5800X3D",
  "r75800x3d": "Ryzen 7 5800X3D",
  "5800x3d": "Ryzen 7 5800X3D",

  "r9 5900x": "Ryzen 9 5900X",
  "r95900x": "Ryzen 9 5900X",

  "r9 5950x": "Ryzen 9 5950X",
  "r95950x": "Ryzen 9 5950X",

  // ----------------------------------------------------------
  // AMD RYZEN 7000
  // ----------------------------------------------------------

  "r5 7500f": "Ryzen 5 7500F",
  "r57500f": "Ryzen 5 7500F",

  "r5 7600": "Ryzen 5 7600",
  "r57600": "Ryzen 5 7600",

  "r5 7600x": "Ryzen 5 7600X",
  "r57600x": "Ryzen 5 7600X",

  "r7 7700": "Ryzen 7 7700",
  "r77700": "Ryzen 7 7700",

  "r7 7700x": "Ryzen 7 7700X",
  "r77700x": "Ryzen 7 7700X",

  "r7 7800x3d": "Ryzen 7 7800X3D",
  "r77800x3d": "Ryzen 7 7800X3D",
  "7800x3d": "Ryzen 7 7800X3D",

  "r9 7900": "Ryzen 9 7900",
  "r97900": "Ryzen 9 7900",

  "r9 7900x": "Ryzen 9 7900X",
  "r97900x": "Ryzen 9 7900X",

  "r9 7900x3d": "Ryzen 9 7900X3D",
  "r97900x3d": "Ryzen 9 7900X3D",

  "r9 7950x": "Ryzen 9 7950X",
  "r97950x": "Ryzen 9 7950X",

  "r9 7950x3d": "Ryzen 9 7950X3D",
  "r97950x3d": "Ryzen 9 7950X3D",

  // ----------------------------------------------------------
  // AMD RYZEN 8000G
  // ----------------------------------------------------------

  "r5 8500g": "Ryzen 5 8500G",
  "r58500g": "Ryzen 5 8500G",

  "r5 8600g": "Ryzen 5 8600G",
  "r58600g": "Ryzen 5 8600G",

  "r7 8700g": "Ryzen 7 8700G",
  "r78700g": "Ryzen 7 8700G",

  // ----------------------------------------------------------
  // AMD RYZEN 9000
  // ----------------------------------------------------------

  "r5 9600x": "Ryzen 5 9600X",
  "r59600x": "Ryzen 5 9600X",

  "r7 9700x": "Ryzen 7 9700X",
  "r79700x": "Ryzen 7 9700X",

  "r7 9800x3d": "Ryzen 7 9800X3D",
  "r79800x3d": "Ryzen 7 9800X3D",
  "9800x3d": "Ryzen 7 9800X3D",

  "r9 9900x": "Ryzen 9 9900X",
  "r99900x": "Ryzen 9 9900X",

  "r9 9950x": "Ryzen 9 9950X",
  "r99950x": "Ryzen 9 9950X"
};


// ============================================================
// GPU ALIASES
// ============================================================

const gpuAliases = {

  // ----------------------------------------------------------
  // NVIDIA GTX
  // ----------------------------------------------------------

  "1050": "GTX 1050",
  "1050ti": "GTX 1050 Ti",
  "1050 ti": "GTX 1050 Ti",

  "1060": "GTX 1060",
  "10603gb": "GTX 1060 3GB",
  "10606gb": "GTX 1060 6GB",

  "1070": "GTX 1070",
  "1070ti": "GTX 1070 Ti",
  "1070 ti": "GTX 1070 Ti",

  "1080": "GTX 1080",
  "1080ti": "GTX 1080 Ti",
  "1080 ti": "GTX 1080 Ti",

  "1650": "GTX 1650",
  "1650s": "GTX 1650 Super",
  "1650 super": "GTX 1650 Super",

  "1660": "GTX 1660",
  "1660s": "GTX 1660 Super",
  "1660 super": "GTX 1660 Super",
  "1660ti": "GTX 1660 Ti",
  "1660 ti": "GTX 1660 Ti",

  // ----------------------------------------------------------
  // RTX 20
  // ----------------------------------------------------------

  "2060": "RTX 2060",
  "2060s": "RTX 2060 Super",
  "2060 super": "RTX 2060 Super",

  "2070": "RTX 2070",
  "2070s": "RTX 2070 Super",
  "2070 super": "RTX 2070 Super",

  "2080": "RTX 2080",
  "2080s": "RTX 2080 Super",
  "2080 super": "RTX 2080 Super",
  "2080ti": "RTX 2080 Ti",
  "2080 ti": "RTX 2080 Ti",

  // ----------------------------------------------------------
  // RTX 30
  // ----------------------------------------------------------

  "3050": "RTX 3050",

  "3060": "RTX 3060",
  "3060ti": "RTX 3060 Ti",
  "3060 ti": "RTX 3060 Ti",

  "3070": "RTX 3070",
  "3070ti": "RTX 3070 Ti",
  "3070 ti": "RTX 3070 Ti",

  "3080": "RTX 3080",
  "3080ti": "RTX 3080 Ti",
  "3080 ti": "RTX 3080 Ti",

  "3090": "RTX 3090",
  "3090ti": "RTX 3090 Ti",
  "3090 ti": "RTX 3090 Ti",

  // ----------------------------------------------------------
  // RTX 40
  // ----------------------------------------------------------

  "4060": "RTX 4060",
  "4060ti": "RTX 4060 Ti",
  "4060 ti": "RTX 4060 Ti",

  "4070": "RTX 4070",
  "4070s": "RTX 4070 Super",
  "4070 super": "RTX 4070 Super",
  "4070ti": "RTX 4070 Ti",
  "4070 ti": "RTX 4070 Ti",
  "4070tis": "RTX 4070 Ti Super",
  "4070 ti super": "RTX 4070 Ti Super",

  "4080": "RTX 4080",
  "4080s": "RTX 4080 Super",
  "4080 super": "RTX 4080 Super",

  "4090": "RTX 4090",

  // ----------------------------------------------------------
  // RTX 50
  // ----------------------------------------------------------

  "5060": "RTX 5060",
  "5060ti": "RTX 5060 Ti",

  "5070": "RTX 5070",
  "5070ti": "RTX 5070 Ti",

  "5080": "RTX 5080",
  "5090": "RTX 5090",

  // ----------------------------------------------------------
  // AMD RX 500
  // ----------------------------------------------------------

  "rx570": "RX 570",
  "rx 570": "RX 570",

  "rx580": "RX 580",
  "rx 580": "RX 580",

  "rx590": "RX 590",
  "rx 590": "RX 590",

  // ----------------------------------------------------------
  // RX 5000
  // ----------------------------------------------------------

  "5500xt": "RX 5500 XT",
  "rx5500xt": "RX 5500 XT",

  "5600xt": "RX 5600 XT",
  "rx5600xt": "RX 5600 XT",

  "5700": "RX 5700",
  "rx5700": "RX 5700",

  "5700xt": "RX 5700 XT",
  "rx5700xt": "RX 5700 XT",

  // ----------------------------------------------------------
  // RX 6000
  // ----------------------------------------------------------

  "6600": "RX 6600",
  "rx6600": "RX 6600",

  "6600xt": "RX 6600 XT",
  "rx6600xt": "RX 6600 XT",

  "6650xt": "RX 6650 XT",
  "rx6650xt": "RX 6650 XT",

  "6700": "RX 6700",
  "rx6700": "RX 6700",

  "6700xt": "RX 6700 XT",
  "rx6700xt": "RX 6700 XT",

  "6750xt": "RX 6750 XT",
  "rx6750xt": "RX 6750 XT",

  "6800": "RX 6800",
  "rx6800": "RX 6800",

  "6800xt": "RX 6800 XT",
  "rx6800xt": "RX 6800 XT",

  "6900xt": "RX 6900 XT",
  "rx6900xt": "RX 6900 XT",

  "6950xt": "RX 6950 XT",
  "rx6950xt": "RX 6950 XT",

  // ----------------------------------------------------------
  // RX 7000
  // ----------------------------------------------------------

  "7600": "RX 7600",
  "rx7600": "RX 7600",

  "7600xt": "RX 7600 XT",
  "rx7600xt": "RX 7600 XT",

  "7700xt": "RX 7700 XT",
  "rx7700xt": "RX 7700 XT",

  "7800xt": "RX 7800 XT",
  "rx7800xt": "RX 7800 XT",

  "7900gre": "RX 7900 GRE",
  "rx7900gre": "RX 7900 GRE",

  "7900xt": "RX 7900 XT",
  "rx7900xt": "RX 7900 XT",

  "7900xtx": "RX 7900 XTX",
  "rx7900xtx": "RX 7900 XTX",

  // ----------------------------------------------------------
  // INTEL ARC
  // ----------------------------------------------------------

  "a380": "Arc A380",
  "arca380": "Arc A380",

  "a580": "Arc A580",
  "arca580": "Arc A580",

  "a750": "Arc A750",
  "arca750": "Arc A750",

  "a770": "Arc A770",
  "arca770": "Arc A770",

  "b570": "Arc B570",
  "arcb570": "Arc B570",

  "b580": "Arc B580",
  "arcb580": "Arc B580"
};


// ============================================================
// NORMALIZATION
// ============================================================

function normalizePartName(text) {

  return String(text || "")
    .toLowerCase()

    // vendor names
    .replace(/\bintel\b/g, "")
    .replace(/\bamd\b/g, "")
    .replace(/\bnvidia\b/g, "")
    .replace(/\bgeforce\b/g, "")
    .replace(/\bradeon\b/g, "")

    // CPU brand words
    .replace(/\bprocessor\b/g, "")
    .replace(/\bcpu\b/g, "")

    // punctuation
    .replace(/[™®]/g, "")
    .replace(/[_/(),:]/g, " ")
    .replace(/-/g, " ")

    .replace(/\s+/g, " ")
    .trim();
}


function normalizePartForDetection(text) {

  return String(text || "")
    .toLowerCase()
    .replace(/[™®]/g, "")
    .replace(/[-_/(),:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function compactPartText(text) {

  return normalizePartName(text)
    .replace(/\s+/g, "");
}


// ============================================================
// DATABASE HELPERS
// ============================================================

function getCPUEntries() {

  if (
    typeof cpuDatabase === "undefined" ||
    !cpuDatabase
  ) {
    return [];
  }

  return Object.entries(cpuDatabase);
}


function getGPUEntries() {

  if (
    typeof gpuDatabase === "undefined" ||
    !gpuDatabase
  ) {
    return [];
  }

  return Object.entries(gpuDatabase);
}


function clonePart(part, fallbackName = "") {

  if (!part) {
    return null;
  }

  return {
    ...part,
    name:
      part.name ||
      fallbackName
  };
}


// ============================================================
// EXACT CPU LOOKUP
// ============================================================

function findCPU(input) {

  if (!input) {
    return null;
  }

  const normal =
    normalizePartName(input);

  const compact =
    compactPartText(input);


  // ----------------------------------------------------------
  // DATABASE FIRST
  // ----------------------------------------------------------

  for (
    const [key, cpu]
    of getCPUEntries()
  ) {

    const names = [
      key,
      cpu?.name || ""
    ];


    for (const name of names) {

      if (!name) {
        continue;
      }

      const dbNormal =
        normalizePartName(name);

      const dbCompact =
        compactPartText(name);


      if (
        normal === dbNormal ||
        compact === dbCompact
      ) {

        return clonePart(
          cpu,
          cpu?.name || key
        );
      }
    }
  }


  // ----------------------------------------------------------
  // ALIAS
  // ----------------------------------------------------------

  for (
    const [alias, canonical]
    of Object.entries(cpuAliases)
  ) {

    if (
      normal === normalizePartName(alias) ||
      compact === compactPartText(alias)
    ) {

      return findCPUByCanonicalName(
        canonical
      );
    }
  }


  return null;
}


function findCPUByCanonicalName(name) {

  const targetNormal =
    normalizePartName(name);

  const targetCompact =
    compactPartText(name);


  for (
    const [key, cpu]
    of getCPUEntries()
  ) {

    const names = [
      key,
      cpu?.name || ""
    ];


    for (const candidate of names) {

      if (!candidate) {
        continue;
      }

      if (
        normalizePartName(candidate) ===
          targetNormal ||
        compactPartText(candidate) ===
          targetCompact
      ) {

        return clonePart(
          cpu,
          cpu?.name || key
        );
      }
    }
  }


  return null;
}


// ============================================================
// EXACT GPU LOOKUP
// ============================================================

function findGPU(input) {

  if (!input) {
    return null;
  }


  const normal =
    normalizePartName(input);

  const compact =
    compactPartText(input);


  // ----------------------------------------------------------
  // DATABASE
  // ----------------------------------------------------------

  for (
    const [key, gpu]
    of getGPUEntries()
  ) {

    const names = [
      key,
      gpu?.name || ""
    ];


    for (const name of names) {

      if (!name) {
        continue;
      }


      if (
        normal ===
          normalizePartName(name) ||
        compact ===
          compactPartText(name)
      ) {

        return clonePart(
          gpu,
          gpu?.name || key
        );
      }
    }
  }


  // ----------------------------------------------------------
  // ALIASES
  // ----------------------------------------------------------

  for (
    const [alias, canonical]
    of Object.entries(gpuAliases)
  ) {

    if (
      normal === normalizePartName(alias) ||
      compact === compactPartText(alias)
    ) {

      return findGPUByCanonicalName(
        canonical
      );
    }
  }


  return null;
}


function findGPUByCanonicalName(name) {

  const targetNormal =
    normalizePartName(name);

  const targetCompact =
    compactPartText(name);


  for (
    const [key, gpu]
    of getGPUEntries()
  ) {

    const names = [
      key,
      gpu?.name || ""
    ];


    for (const candidate of names) {

      if (!candidate) {
        continue;
      }


      if (
        normalizePartName(candidate) ===
          targetNormal ||
        compactPartText(candidate) ===
          targetCompact
      ) {

        return clonePart(
          gpu,
          gpu?.name || key
        );
      }
    }
  }


  return null;
}


// ============================================================
// CPU PLATFORM HELPERS
// ============================================================

function getCPUPlatform(cpu) {

  if (!cpu) {
    return null;
  }


  const platformName =
    cpu.platform ||
    cpu.socket ||
    "";


  if (
    typeof getPlatform === "function"
  ) {

    return getPlatform(
      platformName
    );
  }


  return null;
}


function getCPUMemoryTypes(cpu) {

  if (!cpu) {
    return [];
  }


  const platformName =
    cpu.platform ||
    cpu.socket ||
    "";


  if (
    typeof getPlatformMemory === "function"
  ) {

    return getPlatformMemory(
      platformName
    ) || [];
  }


  if (
    Array.isArray(cpu.memory)
  ) {

    return cpu.memory;
  }


  return [];
}


function getCPUChipsets(cpu) {

  if (!cpu) {
    return [];
  }


  const platformName =
    cpu.platform ||
    cpu.socket ||
    "";


  if (
    typeof getCompatibleChipsets ===
      "function"
  ) {

    return getCompatibleChipsets(
      platformName
    ) || [];
  }


  return [];
}


function getCPUCompatibility(cpu) {

  if (!cpu) {
    return null;
  }


  return {

    socket:
      cpu.socket ||
      cpu.platform ||
      "Unknown",

    platform:
      cpu.platform ||
      cpu.socket ||
      "Unknown",

    memory:
      getCPUMemoryTypes(cpu),

    chipsets:
      getCPUChipsets(cpu)

  };
}


function checkCPUChipsetCompatibility(
  cpu,
  chipset
) {

  if (
    !cpu ||
    !chipset
  ) {

    return null;
  }


  const platform =
    cpu.platform ||
    cpu.socket;


  if (
    typeof isChipsetCompatible ===
      "function"
  ) {

    return isChipsetCompatible(
      platform,
      chipset
    );
  }


  return null;
}


function checkCPUMemoryCompatibility(
  cpu,
  memoryType
) {

  if (
    !cpu ||
    !memoryType
  ) {

    return null;
  }


  const platform =
    cpu.platform ||
    cpu.socket;


  if (
    typeof isMemoryCompatible ===
      "function"
  ) {

    return isMemoryCompatible(
      platform,
      memoryType
    );
  }


  return null;
}


// ============================================================
// CANDIDATE BUILDERS
// ============================================================

function buildCPUCandidates() {

  const candidates = [];


  for (
    const [key, cpu]
    of getCPUEntries()
  ) {

    const names =
      new Set([
        key,
        cpu?.name || ""
      ]);


    for (const name of names) {

      if (!name) {
        continue;
      }


      candidates.push({

        search:
          compactPartText(name),

        normal:
          normalizePartName(name),

        cpu:
          clonePart(
            cpu,
            cpu?.name || key
          )

      });
    }
  }


  for (
    const [alias, canonical]
    of Object.entries(cpuAliases)
  ) {

    const cpu =
      findCPUByCanonicalName(
        canonical
      );


    if (cpu) {

      candidates.push({

        search:
          compactPartText(alias),

        normal:
          normalizePartName(alias),

        cpu

      });
    }
  }


  return candidates;
}


function buildGPUCandidates() {

  const candidates = [];


  for (
    const [key, gpu]
    of getGPUEntries()
  ) {

    const names =
      new Set([
        key,
        gpu?.name || ""
      ]);


    for (const name of names) {

      if (!name) {
        continue;
      }


      candidates.push({

        search:
          compactPartText(name),

        normal:
          normalizePartName(name),

        gpu:
          clonePart(
            gpu,
            gpu?.name || key
          )

      });
    }
  }


  for (
    const [alias, canonical]
    of Object.entries(gpuAliases)
  ) {

    const gpu =
      findGPUByCanonicalName(
        canonical
      );


    if (gpu) {

      candidates.push({

        search:
          compactPartText(alias),

        normal:
          normalizePartName(alias),

        gpu

      });
    }
  }


  return candidates;
}


// ============================================================
// CPU DETECTION FROM LISTING
// ============================================================

function detectCPUFromText(text) {

  if (!text) {
    return null;
  }


  const normalized =
    normalizePartForDetection(
      text
    );


  const compact =
    String(text)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");


  // ----------------------------------------------------------
  // EXACT DATABASE / ALIAS CANDIDATES
  // longest first prevents 5800X matching before 5800X3D
  // ----------------------------------------------------------

  const candidates =
    buildCPUCandidates()
      .sort(
        (a, b) =>
          b.search.length -
          a.search.length
      );


  for (
    const candidate
    of candidates
  ) {

    if (
      candidate.search.length >= 4 &&
      compact.includes(
        candidate.search
      )
    ) {

      return candidate.cpu;
    }
  }


  // ----------------------------------------------------------
  // INTEL CORE
  //
  // Examples:
  // i7-12700k
  // i7 12700k
  // i712700k
  // Intel Core i5 14600KF
  // ----------------------------------------------------------

  const intelMatch =
    normalized.match(
      /\b(?:intel\s+)?(?:core\s+)?i(3|5|7|9)\s*[- ]?\s*(\d{4,5})\s*(kf|ks|f|k|t|s)?\b/i
    ) ||
    compact.match(
      /i(3|5|7|9)(\d{4,5})(kf|ks|f|k|t|s)?/i
    );


  if (intelMatch) {

    const tier =
      intelMatch[1];

    const model =
      intelMatch[2];

    const suffix =
      (
        intelMatch[3] || ""
      ).toUpperCase();


    const canonical =
      `Core i${tier}-${model}${suffix}`;


    const exact =
      findCPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return createIntelFallbackCPU(
      tier,
      model,
      suffix
    );
  }


  // ----------------------------------------------------------
  // RYZEN
  //
  // Examples:
  // Ryzen 7 5800X3D
  // R7 5800X3D
  // r75800x3d
  // 5800x3d
  // ----------------------------------------------------------

  let ryzenMatch =
    normalized.match(
      /\b(?:amd\s+)?(?:ryzen\s*)?(?:r\s*)?(3|5|7|9)\s*[- ]?\s*(\d{4})\s*(x3d|xt|x|g|ge|f)?\b/i
    );


  if (!ryzenMatch) {

    ryzenMatch =
      compact.match(
        /r(3|5|7|9)(\d{4})(x3d|xt|x|g|ge|f)?/i
      );
  }


  if (ryzenMatch) {

    const tier =
      ryzenMatch[1];

    const model =
      ryzenMatch[2];

    const suffix =
      (
        ryzenMatch[3] || ""
      ).toUpperCase();


    const canonical =
      `Ryzen ${tier} ${model}${suffix}`;


    const exact =
      findCPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return createRyzenFallbackCPU(
      tier,
      model,
      suffix
    );
  }


  // ----------------------------------------------------------
  // X3D WITHOUT R7/R9
  //
  // Example:
  // 5800x3d
  // 7800x3d
  // 9800x3d
  // ----------------------------------------------------------

  const x3dMatch =
    normalized.match(
      /\b(5[789]00|7[789]00|9[89]00)\s*x3d\b/i
    );


  if (x3dMatch) {

    const model =
      x3dMatch[1];


    let tier =
      "7";


    if (
      /^59/.test(model) ||
      /^79/.test(model) ||
      /^99/.test(model)
    ) {

      tier =
        "9";
    }


    const canonical =
      `Ryzen ${tier} ${model}X3D`;


    const exact =
      findCPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return createRyzenFallbackCPU(
      tier,
      model,
      "X3D"
    );
  }


  // ----------------------------------------------------------
  // AMD FX
  // ----------------------------------------------------------

  const fxMatch =
    normalized.match(
      /\bfx\s*[- ]?\s*(\d{4})\b/i
    );


  if (fxMatch) {

    return {

      name:
        `AMD FX-${fxMatch[1]}`,

      socket:
        "AM3+",

      platform:
        "AM3+",

      value:
        0,

      performance:
        8,

      fallback:
        true,

      exactMarketValue:
        false

    };
  }


  return null;
}


// ============================================================
// INTEL FALLBACK CPU
// ============================================================

function createIntelFallbackCPU(
  tier,
  model,
  suffix = ""
) {

  const number =
    Number(model);


  let generation = 0;


  if (
    number >= 10000
  ) {

    generation =
      Math.floor(
        number / 1000
      );

  } else {

    generation =
      Math.floor(
        number / 1000
      );
  }


  let socket =
    "Unknown";


  if (
    generation >= 12 &&
    generation <= 14
  ) {

    socket =
      "LGA1700";

  } else if (
    generation >= 10 &&
    generation <= 11
  ) {

    socket =
      "LGA1200";

  } else if (
    generation >= 8 &&
    generation <= 9
  ) {

    socket =
      "LGA1151-300";

  } else if (
    generation >= 6 &&
    generation <= 7
  ) {

    socket =
      "LGA1151-100-200";

  } else if (
    generation >= 4 &&
    generation <= 5
  ) {

    socket =
      "LGA1150";

  } else if (
    generation >= 2 &&
    generation <= 3
  ) {

    socket =
      "LGA1155";

  } else if (
    generation === 1
  ) {

    socket =
      "LGA1156";
  }


  let performance =
    20;


  if (generation >= 14) {
    performance = 70;
  } else if (generation >= 13) {
    performance = 65;
  } else if (generation >= 12) {
    performance = 58;
  } else if (generation >= 10) {
    performance = 45;
  } else if (generation >= 8) {
    performance = 35;
  } else if (generation >= 6) {
    performance = 25;
  } else if (generation >= 4) {
    performance = 18;
  }


  if (tier === "9") {
    performance += 12;
  } else if (tier === "7") {
    performance += 8;
  } else if (tier === "5") {
    performance += 4;
  }


  return {

    name:
      `Core i${tier}-${model}${suffix}`,

    socket,

    platform:
      socket,

    value:
      0,

    performance,

    fallback:
      true,

    exactMarketValue:
      false

  };
}


// ============================================================
// RYZEN FALLBACK CPU
// ============================================================

function createRyzenFallbackCPU(
  tier,
  model,
  suffix = ""
) {

  const firstDigit =
    Number(
      String(model)[0]
    );


  let socket =
    "AM4";


  // Current broad desktop-family inference.
  // Exact database entries always override this.

  if (
    firstDigit >= 7
  ) {

    socket =
      "AM5";
  }


  let performance =
    30;


  if (firstDigit >= 9) {
    performance = 70;
  } else if (firstDigit >= 7) {
    performance = 60;
  } else if (firstDigit >= 5) {
    performance = 48;
  } else if (firstDigit >= 3) {
    performance = 35;
  } else if (firstDigit >= 2) {
    performance = 25;
  }


  if (tier === "9") {
    performance += 10;
  } else if (tier === "7") {
    performance += 7;
  } else if (tier === "5") {
    performance += 3;
  }


  if (
    suffix === "X3D"
  ) {

    performance += 12;
  }


  return {

    name:
      `Ryzen ${tier} ${model}${suffix}`,

    socket,

    platform:
      socket,

    value:
      0,

    performance,

    fallback:
      true,

    exactMarketValue:
      false

  };
}


// ============================================================
// GPU DETECTION
// ============================================================

function detectGPUFromText(text) {

  if (!text) {
    return null;
  }


  const normalized =
    normalizePartForDetection(
      text
    );


  const compact =
    String(text)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");


  // ----------------------------------------------------------
  // DATABASE / ALIASES
  // Longest first:
  // RTX 3080 Ti before RTX 3080
  // ----------------------------------------------------------

  const candidates =
    buildGPUCandidates()
      .sort(
        (a, b) =>
          b.search.length -
          a.search.length
      );


  for (
    const candidate
    of candidates
  ) {

    if (
      candidate.search.length >= 4 &&
      compact.includes(
        candidate.search
      )
    ) {

      return candidate.gpu;
    }
  }


  // ----------------------------------------------------------
  // NVIDIA FULL FORM
  // ----------------------------------------------------------

  let nvidiaMatch =
    normalized.match(
      /\b(rtx|gtx|gt)\s*[- ]?\s*(\d{3,4})\s*(ti\s*super|super|ti)?\b/i
    );


  if (!nvidiaMatch) {

    nvidiaMatch =
      compact.match(
        /(rtx|gtx|gt)(\d{3,4})(tisuper|super|ti|s)?/i
      );
  }


  if (nvidiaMatch) {

    const family =
      nvidiaMatch[1]
        .toUpperCase();

    const model =
      nvidiaMatch[2];

    const suffix =
      formatGPUSuffix(
        nvidiaMatch[3] || ""
      );


    const canonical =
      `${family} ${model}${suffix}`;


    const exact =
      findGPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return {

      name:
        canonical,

      value:
        0,

      performance:
        estimateUnknownGPUPerformance(
          family,
          model,
          suffix
        ),

      fallback:
        true,

      exactMarketValue:
        false

    };
  }


  // ----------------------------------------------------------
  // NVIDIA SHORTHAND
  //
  // 3080ti
  // 4070s
  // 4070tis
  //
  // ----------------------------------------------------------

  const shortNvidia =
    normalized.match(
      /\b(20[678]0|30[56789]0|40[6789]0|50[6789]0)\s*(ti\s*super|tis|ti|super|s)?\b/i
    );


  if (shortNvidia) {

    const model =
      shortNvidia[1];


    let rawSuffix =
      shortNvidia[2] || "";


    if (
      /^s$/i.test(rawSuffix)
    ) {

      rawSuffix =
        "super";
    }


    if (
      /^tis$/i.test(rawSuffix)
    ) {

      rawSuffix =
        "ti super";
    }


    const suffix =
      formatGPUSuffix(
        rawSuffix
      );


    let family =
      "RTX";


    const canonical =
      `${family} ${model}${suffix}`;


    const exact =
      findGPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return {

      name:
        canonical,

      value:
        0,

      performance:
        estimateUnknownGPUPerformance(
          family,
          model,
          suffix
        ),

      fallback:
        true,

      exactMarketValue:
        false

    };
  }


  // ----------------------------------------------------------
  // AMD RX
  // ----------------------------------------------------------

  let amdMatch =
    normalized.match(
      /\b(?:amd\s+)?(?:radeon\s+)?rx\s*[- ]?\s*(\d{3,4})\s*(xtx|xt|gre)?\b/i
    );


  if (!amdMatch) {

    amdMatch =
      compact.match(
        /rx(\d{3,4})(xtx|xt|gre)?/i
      );
  }


  if (amdMatch) {

    const model =
      amdMatch[1];

    const suffix =
      (
        amdMatch[2] || ""
      ).toUpperCase();


    const canonical =
      `RX ${model}${
        suffix
          ? ` ${suffix}`
          : ""
      }`;


    const exact =
      findGPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return {

      name:
        canonical,

      value:
        0,

      performance:
        estimateUnknownAMDPerformance(
          model,
          suffix
        ),

      fallback:
        true,

      exactMarketValue:
        false

    };
  }


  // ----------------------------------------------------------
  // AMD SHORTHAND
  //
  // 6800xt
  // 7900xtx
  //
  // ----------------------------------------------------------

  const shortAMD =
    normalized.match(
      /\b(5[567]00|6[56789]00|7[6789]00)\s*(xtx|xt|gre)\b/i
    );


  if (shortAMD) {

    const model =
      shortAMD[1];

    const suffix =
      shortAMD[2]
        .toUpperCase();


    const canonical =
      `RX ${model} ${suffix}`;


    const exact =
      findGPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return {

      name:
        canonical,

      value:
        0,

      performance:
        estimateUnknownAMDPerformance(
          model,
          suffix
        ),

      fallback:
        true,

      exactMarketValue:
        false

    };
  }


  // ----------------------------------------------------------
  // INTEL ARC
  // ----------------------------------------------------------

  const arcMatch =
    normalized.match(
      /\b(?:intel\s+)?arc\s+([ab]\s*\d{3})\b/i
    );


  if (arcMatch) {

    const model =
      arcMatch[1]
        .replace(/\s+/g, "")
        .toUpperCase();


    const canonical =
      `Arc ${model}`;


    const exact =
      findGPUByCanonicalName(
        canonical
      );


    if (exact) {
      return exact;
    }


    return {

      name:
        canonical,

      value:
        0,

      performance:
        30,

      fallback:
        true,

      exactMarketValue:
        false

    };
  }


  return null;
}


// ============================================================
// GPU SUFFIX FORMATTER
// ============================================================

function formatGPUSuffix(
  suffix
) {

  const s =
    String(suffix || "")
      .toLowerCase()
      .replace(/\s+/g, "");


  if (
    s === "tisuper"
  ) {

    return " Ti Super";
  }


  if (
    s === "ti"
  ) {

    return " Ti";
  }


  if (
    s === "super" ||
    s === "s"
  ) {

    return " Super";
  }


  return "";
}


// ============================================================
// NVIDIA PERFORMANCE FALLBACK
// ============================================================

function estimateUnknownGPUPerformance(
  family,
  model,
  suffix
) {

  const number =
    Number(model);


  let score =
    15;


  if (
    family === "RTX"
  ) {

    const generation =
      Math.floor(
        number / 1000
      );


    const tier =
      number % 1000;


    if (generation >= 5) {

      score =
        50;

    } else if (
      generation >= 4
    ) {

      score =
        45;

    } else if (
      generation >= 3
    ) {

      score =
        35;

    } else if (
      generation >= 2
    ) {

      score =
        25;
    }


    if (tier >= 90) {
      score += 35;
    } else if (tier >= 80) {
      score += 27;
    } else if (tier >= 70) {
      score += 18;
    } else if (tier >= 60) {
      score += 10;
    } else if (tier >= 50) {
      score += 4;
    }

  } else if (
    family === "GTX"
  ) {

    if (
      number >= 1600
    ) {

      score =
        25;

    } else if (
      number >= 1000
    ) {

      score =
        20;

    } else {

      score =
        10;
    }
  }


  if (
    /Ti Super/i.test(suffix)
  ) {

    score += 8;

  } else if (
    /Ti/i.test(suffix)
  ) {

    score += 5;

  } else if (
    /Super/i.test(suffix)
  ) {

    score += 4;
  }


  return score;
}


// ============================================================
// AMD PERFORMANCE FALLBACK
// ============================================================

function estimateUnknownAMDPerformance(
  model,
  suffix
) {

  const number =
    Number(model);


  let score =
    20;


  if (
    number >= 7000
  ) {

    score =
      45;

  } else if (
    number >= 6000
  ) {

    score =
      35;

  } else if (
    number >= 5000
  ) {

    score =
      25;
  }


  const tier =
    number % 1000;


  if (tier >= 900) {
    score += 30;
  } else if (tier >= 800) {
    score += 23;
  } else if (tier >= 700) {
    score += 16;
  } else if (tier >= 600) {
    score += 10;
  } else if (tier >= 500) {
    score += 5;
  }


  if (
    suffix === "XTX"
  ) {

    score += 9;

  } else if (
    suffix === "XT"
  ) {

    score += 5;

  } else if (
    suffix === "GRE"
  ) {

    score += 4;
  }


  return score;
}


// ============================================================
// DATABASE STATS
// ============================================================

function getDatabaseStats() {

  return {

    cpus:
      getCPUEntries().length,

    gpus:
      getGPUEntries().length,

    cpuAliases:
      Object.keys(
        cpuAliases
      ).length,

    gpuAliases:
      Object.keys(
        gpuAliases
      ).length

  };
}
