// ============================================================
// PCDEAL - PARTS ENGINE
// VERSION 4
// ============================================================
//
// Requires:
//
// cpu-data.js
// gpu-data.js
// platform.js
//
// Handles:
//
// - CPU exact lookup
// - GPU exact lookup
// - Alias lookup
// - Flexible text normalization
// - Listing CPU detection
// - Listing GPU detection
// - Basic CPU family fallback
// - Compatibility helpers
// - Database stats
//
// ============================================================



// ============================================================
// CPU ALIASES
// ============================================================

const cpuAliases = {

  // Intel common shorthand

  "i9 14900ks": "Core i9-14900KS",
  "i9 14900k": "Core i9-14900K",
  "i9 14900kf": "Core i9-14900KF",
  "i9 14900": "Core i9-14900",

  "i7 14700k": "Core i7-14700K",
  "i7 14700kf": "Core i7-14700KF",
  "i7 14700": "Core i7-14700",
  "i7 14700f": "Core i7-14700F",

  "i5 14600k": "Core i5-14600K",
  "i5 14600kf": "Core i5-14600KF",
  "i5 14500": "Core i5-14500",
  "i5 14400f": "Core i5-14400F",

  "i3 14100f": "Core i3-14100F",

  "i9 13900ks": "Core i9-13900KS",
  "i9 13900k": "Core i9-13900K",
  "i9 13900kf": "Core i9-13900KF",
  "i9 13900": "Core i9-13900",

  "i7 13700k": "Core i7-13700K",
  "i7 13700kf": "Core i7-13700KF",
  "i7 13700": "Core i7-13700",

  "i5 13600k": "Core i5-13600K",
  "i5 13600kf": "Core i5-13600KF",
  "i5 13500": "Core i5-13500",
  "i5 13400f": "Core i5-13400F",

  "i3 13100f": "Core i3-13100F",

  "i9 12900ks": "Core i9-12900KS",
  "i9 12900k": "Core i9-12900K",
  "i9 12900kf": "Core i9-12900KF",
  "i9 12900": "Core i9-12900",

  "i7 12700k": "Core i7-12700K",
  "i7 12700kf": "Core i7-12700KF",
  "i7 12700f": "Core i7-12700F",

  "i5 12600k": "Core i5-12600K",
  "i5 12600kf": "Core i5-12600KF",
  "i5 12500": "Core i5-12500",
  "i5 12400f": "Core i5-12400F",

  "i3 12300": "Core i3-12300",
  "i3 12100f": "Core i3-12100F",

  "i9 11900k": "Core i9-11900K",
  "i9 11900kf": "Core i9-11900KF",
  "i9 11900": "Core i9-11900",

  "i7 11700k": "Core i7-11700K",
  "i7 11700f": "Core i7-11700F",

  "i5 11600k": "Core i5-11600K",
  "i5 11500": "Core i5-11500",
  "i5 11400f": "Core i5-11400F",

  "i9 10900k": "Core i9-10900K",
  "i9 10900kf": "Core i9-10900KF",
  "i9 10900": "Core i9-10900",

  "i7 10700k": "Core i7-10700K",
  "i7 10700f": "Core i7-10700F",

  "i5 10600k": "Core i5-10600K",
  "i5 10500": "Core i5-10500",
  "i5 10400f": "Core i5-10400F",

  "i3 10300": "Core i3-10300",
  "i3 10100f": "Core i3-10100F",

  "i9 9900ks": "Core i9-9900KS",
  "i9 9900k": "Core i9-9900K",
  "i9 9900kf": "Core i9-9900KF",

  "i7 9700k": "Core i7-9700K",
  "i7 9700f": "Core i7-9700F",

  "i5 9600k": "Core i5-9600K",
  "i5 9500": "Core i5-9500",
  "i5 9400f": "Core i5-9400F",

  "i7 8700k": "Core i7-8700K",
  "i7 8700": "Core i7-8700",

  "i5 8600k": "Core i5-8600K",
  "i5 8500": "Core i5-8500",
  "i5 8400": "Core i5-8400",

  "i7 7700k": "Core i7-7700K",
  "i7 7700": "Core i7-7700",

  "i5 7600k": "Core i5-7600K",
  "i5 7500": "Core i5-7500",
  "i5 7400": "Core i5-7400",

  "i7 6700k": "Core i7-6700K",
  "i7 6700": "Core i7-6700",

  "i5 6600k": "Core i5-6600K",
  "i5 6500": "Core i5-6500",
  "i5 6400": "Core i5-6400",

  "i7 5775c": "Core i7-5775C",
  "i5 5675c": "Core i5-5675C",

  "i7 4790k": "Core i7-4790K",
  "i7 4790": "Core i7-4790",
  "i7 4770k": "Core i7-4770K",
  "i7 4770": "Core i7-4770",

  "i5 4690k": "Core i5-4690K",
  "i5 4690": "Core i5-4690",
  "i5 4670k": "Core i5-4670K",
  "i5 4670": "Core i5-4670",
  "i5 4590": "Core i5-4590",
  "i5 4570": "Core i5-4570",
  "i5 4460": "Core i5-4460",
  "i5 4440": "Core i5-4440",

  "i7 3770k": "Core i7-3770K",
  "i7 3770": "Core i7-3770",
  "i5 3570k": "Core i5-3570K",
  "i5 3570": "Core i5-3570",
  "i5 3470": "Core i5-3470",

  "i7 2700k": "Core i7-2700K",
  "i7 2600k": "Core i7-2600K",
  "i7 2600": "Core i7-2600",
  "i5 2500k": "Core i5-2500K",
  "i5 2500": "Core i5-2500",
  "i5 2400": "Core i5-2400",

  "i7 880": "Core i7-880",
  "i7 870": "Core i7-870",
  "i7 860": "Core i7-860",
  "i5 760": "Core i5-760",
  "i5 750": "Core i5-750",

  // Core Ultra shorthand

  "ultra 9 285k": "Core Ultra 9 285K",
  "ultra 7 265k": "Core Ultra 7 265K",
  "ultra 7 265kf": "Core Ultra 7 265KF",
  "ultra 5 245k": "Core Ultra 5 245K",
  "ultra 5 245kf": "Core Ultra 5 245KF",

  // AMD shorthand

  "9950x3d": "Ryzen 9 9950X3D",
  "9900x3d": "Ryzen 9 9900X3D",
  "9800x3d": "Ryzen 7 9800X3D",
  "9950x": "Ryzen 9 9950X",
  "9900x": "Ryzen 9 9900X",
  "9700x": "Ryzen 7 9700X",
  "9600x": "Ryzen 5 9600X",

  "8700g": "Ryzen 7 8700G",
  "8600g": "Ryzen 5 8600G",
  "8500g": "Ryzen 5 8500G",

  "7950x3d": "Ryzen 9 7950X3D",
  "7900x3d": "Ryzen 9 7900X3D",
  "7800x3d": "Ryzen 7 7800X3D",
  "7950x": "Ryzen 9 7950X",
  "7900x": "Ryzen 9 7900X",
  "7900": "Ryzen 9 7900",
  "7700x": "Ryzen 7 7700X",
  "7700": "Ryzen 7 7700",
  "7600x": "Ryzen 5 7600X",
  "7600": "Ryzen 5 7600",
  "7500f": "Ryzen 5 7500F",

  "5950x": "Ryzen 9 5950X",
  "5900xt": "Ryzen 9 5900XT",
  "5900x": "Ryzen 9 5900X",

  "5800x3d": "Ryzen 7 5800X3D",
  "5800xt": "Ryzen 7 5800XT",
  "5800x": "Ryzen 7 5800X",
  "5700x3d": "Ryzen 7 5700X3D",
  "5700x": "Ryzen 7 5700X",
  "5700g": "Ryzen 7 5700G",

  "5600x3d": "Ryzen 5 5600X3D",
  "5600xt": "Ryzen 5 5600XT",
  "5600x": "Ryzen 5 5600X",
  "5600": "Ryzen 5 5600",
  "5600g": "Ryzen 5 5600G",
  "5600gt": "Ryzen 5 5600GT",
  "5500gt": "Ryzen 5 5500GT",
  "5500": "Ryzen 5 5500",

  "3950x": "Ryzen 9 3950X",
  "3900xt": "Ryzen 9 3900XT",
  "3900x": "Ryzen 9 3900X",
  "3800xt": "Ryzen 7 3800XT",
  "3800x": "Ryzen 7 3800X",
  "3700x": "Ryzen 7 3700X",
  "3600xt": "Ryzen 5 3600XT",
  "3600x": "Ryzen 5 3600X",
  "3600": "Ryzen 5 3600",
  "3500x": "Ryzen 5 3500X",
  "3500": "Ryzen 5 3500",
  "3300x": "Ryzen 3 3300X",
  "3100": "Ryzen 3 3100",

  "2700x": "Ryzen 7 2700X",
  "2700": "Ryzen 7 2700",
  "2600x": "Ryzen 5 2600X",
  "2600": "Ryzen 5 2600",
  "2500x": "Ryzen 5 2500X",
  "2300x": "Ryzen 3 2300X",

  "1800x": "Ryzen 7 1800X",
  "1700x": "Ryzen 7 1700X",
  "1700": "Ryzen 7 1700",
  "1600x": "Ryzen 5 1600X",
  "1600": "Ryzen 5 1600",
  "1500x": "Ryzen 5 1500X",
  "1400": "Ryzen 5 1400",
  "1300x": "Ryzen 3 1300X",
  "1200": "Ryzen 3 1200",

  // FX

  "fx 9590": "FX-9590",
  "fx 9370": "FX-9370",
  "fx 8370": "FX-8370",
  "fx 8350": "FX-8350",
  "fx 8320": "FX-8320",
  "fx 8150": "FX-8150",
  "fx 6300": "FX-6300",
  "fx 6100": "FX-6100",
  "fx 4350": "FX-4350",
  "fx 4300": "FX-4300"

};



// ============================================================
// GPU ALIASES
// ============================================================

const gpuAliases = {

  // NVIDIA

  "5090": "RTX 5090",
  "5080": "RTX 5080",
  "5070 ti": "RTX 5070 Ti",
  "5070ti": "RTX 5070 Ti",
  "5070": "RTX 5070",

  "4090": "RTX 4090",
  "4080 super": "RTX 4080 Super",
  "4080s": "RTX 4080 Super",
  "4080": "RTX 4080",

  "4070 ti super": "RTX 4070 Ti Super",
  "4070tis": "RTX 4070 Ti Super",
  "4070 ti": "RTX 4070 Ti",
  "4070ti": "RTX 4070 Ti",
  "4070 super": "RTX 4070 Super",
  "4070s": "RTX 4070 Super",
  "4070": "RTX 4070",

  "4060 ti 16gb": "RTX 4060 Ti 16GB",
  "4060ti 16gb": "RTX 4060 Ti 16GB",
  "4060 ti 8gb": "RTX 4060 Ti 8GB",
  "4060ti 8gb": "RTX 4060 Ti 8GB",
  "4060 ti": "RTX 4060 Ti",
  "4060ti": "RTX 4060 Ti",
  "4060": "RTX 4060",

  "3090 ti": "RTX 3090 Ti",
  "3090ti": "RTX 3090 Ti",
  "3090": "RTX 3090",

  "3080 ti": "RTX 3080 Ti",
  "3080ti": "RTX 3080 Ti",
  "3080 12gb": "RTX 3080 12GB",
  "3080 10gb": "RTX 3080 10GB",
  "3080": "RTX 3080",

  "3070 ti": "RTX 3070 Ti",
  "3070ti": "RTX 3070 Ti",
  "3070": "RTX 3070",

  "3060 ti": "RTX 3060 Ti",
  "3060ti": "RTX 3060 Ti",
  "3060 12gb": "RTX 3060 12GB",
  "3060 8gb": "RTX 3060 8GB",
  "3060": "RTX 3060",

  "3050 8gb": "RTX 3050 8GB",
  "3050 6gb": "RTX 3050 6GB",
  "3050": "RTX 3050",

  "2080 ti": "RTX 2080 Ti",
  "2080ti": "RTX 2080 Ti",
  "2080 super": "RTX 2080 Super",
  "2080s": "RTX 2080 Super",
  "2080": "RTX 2080",

  "2070 super": "RTX 2070 Super",
  "2070s": "RTX 2070 Super",
  "2070": "RTX 2070",

  "2060 super": "RTX 2060 Super",
  "2060s": "RTX 2060 Super",
  "2060 12gb": "RTX 2060 12GB",
  "2060": "RTX 2060",

  "1660 ti": "GTX 1660 Ti",
  "1660ti": "GTX 1660 Ti",
  "1660 super": "GTX 1660 Super",
  "1660s": "GTX 1660 Super",
  "1660": "GTX 1660",

  "1650 super": "GTX 1650 Super",
  "1650s": "GTX 1650 Super",
  "1650": "GTX 1650",

  "1080 ti": "GTX 1080 Ti",
  "1080ti": "GTX 1080 Ti",
  "1080": "GTX 1080",

  "1070 ti": "GTX 1070 Ti",
  "1070ti": "GTX 1070 Ti",
  "1070": "GTX 1070",

  "1060 6gb": "GTX 1060 6GB",
  "1060 5gb": "GTX 1060 5GB",
  "1060 3gb": "GTX 1060 3GB",

  "1050 ti": "GTX 1050 Ti",
  "1050ti": "GTX 1050 Ti",
  "1050": "GTX 1050",

  "980 ti": "GTX 980 Ti",
  "980ti": "GTX 980 Ti",
  "980": "GTX 980",
  "970": "GTX 970",

  "960 4gb": "GTX 960 4GB",
  "960 2gb": "GTX 960 2GB",
  "950": "GTX 950",

  "780 ti": "GTX 780 Ti",
  "780ti": "GTX 780 Ti",
  "780": "GTX 780",
  "770": "GTX 770",
  "760": "GTX 760",
  "750 ti": "GTX 750 Ti",
  "750ti": "GTX 750 Ti",
  "750": "GTX 750",

  // AMD

  "9070 xt": "RX 9070 XT",
  "9070xt": "RX 9070 XT",
  "9070": "RX 9070",

  "7900 xtx": "RX 7900 XTX",
  "7900xtx": "RX 7900 XTX",
  "7900 xt": "RX 7900 XT",
  "7900xt": "RX 7900 XT",
  "7900 gre": "RX 7900 GRE",
  "7900gre": "RX 7900 GRE",

  "7800 xt": "RX 7800 XT",
  "7800xt": "RX 7800 XT",
  "7700 xt": "RX 7700 XT",
  "7700xt": "RX 7700 XT",
  "7600 xt": "RX 7600 XT",
  "7600xt": "RX 7600 XT",
  "7600": "RX 7600",

  "6950 xt": "RX 6950 XT",
  "6950xt": "RX 6950 XT",
  "6900 xt": "RX 6900 XT",
  "6900xt": "RX 6900 XT",
  "6800 xt": "RX 6800 XT",
  "6800xt": "RX 6800 XT",
  "6800": "RX 6800",
  "6750 xt": "RX 6750 XT",
  "6750xt": "RX 6750 XT",
  "6700 xt": "RX 6700 XT",
  "6700xt": "RX 6700 XT",
  "6650 xt": "RX 6650 XT",
  "6650xt": "RX 6650 XT",
  "6600 xt": "RX 6600 XT",
  "6600xt": "RX 6600 XT",
  "6600": "RX 6600",
  "6500 xt": "RX 6500 XT",
  "6500xt": "RX 6500 XT",
  "6400": "RX 6400",

  "5700 xt": "RX 5700 XT",
  "5700xt": "RX 5700 XT",
  "5700": "RX 5700",
  "5600 xt": "RX 5600 XT",
  "5600xt": "RX 5600 XT",

  "590": "RX 590",
  "580 8gb": "RX 580 8GB",
  "580 4gb": "RX 580 4GB",
  "580": "RX 580",
  "570 8gb": "RX 570 8GB",
  "570 4gb": "RX 570 4GB",
  "570": "RX 570",
  "560": "RX 560",
  "550": "RX 550",

  "vega 64": "RX Vega 64",
  "vega64": "RX Vega 64",
  "vega 56": "RX Vega 56",
  "vega56": "RX Vega 56",

  // Intel

  "b580": "Arc B580",
  "b570": "Arc B570",
  "a770 16gb": "Arc A770 16GB",
  "a770 8gb": "Arc A770 8GB",
  "a750": "Arc A750",
  "a580": "Arc A580",
  "a380": "Arc A380",
  "a310": "Arc A310"

};



// ============================================================
// NORMALIZE PART NAME
// ============================================================

function normalizePartName(text) {

  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .replace(/nvidia/g, "")
    .replace(/geforce/g, "")
    .replace(/amd\s+radeon/g, "")
    .replace(/radeon/g, "")
    .replace(/intel\s+core/g, "core")
    .replace(/®|™/g, "")
    .replace(/[-_/(),.:]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

}



// ============================================================
// AGGRESSIVE DETECTION NORMALIZER
// ============================================================

function normalizePartForDetection(text) {

  if (!text) {
    return "";
  }

  return text
    .toLowerCase()
    .replace(/®|™/g, "")
    .replace(/nvidia/g, "")
    .replace(/geforce/g, "")
    .replace(/amd\s+radeon/g, "")
    .replace(/radeon/g, "")
    .replace(/intel\s+core/g, "core")
    .replace(/[-_/(),.:]/g, " ")
    .replace(/\bgb\b/g, " gb ")
    .replace(/\s+/g, " ")
    .trim();

}



// ============================================================
// COMPACT NORMALIZER
// ============================================================
//
// Useful for:
//
// GTX1080Ti
// RTX4070Super
// i74790K
// Ryzen75800X3D
//
// ============================================================

function compactPartText(text) {

  return normalizePartForDetection(text)
    .replace(/\s+/g, "");

}



// ============================================================
// FIND CPU EXACT / ALIAS
// ============================================================

function findCPU(input) {

  if (!input) {
    return null;
  }


  const normalizedInput =
    normalizePartForDetection(input);


  const compactInput =
    compactPartText(input);


  // ----------------------------------------------------------
  // EXACT DATABASE MATCH
  // ----------------------------------------------------------

  for (
    const [key, cpu]
    of Object.entries(cpuDatabase)
  ) {

    const normalizedKey =
      normalizePartForDetection(key);

    const normalizedName =
      normalizePartForDetection(cpu.name);


    if (
      normalizedInput === normalizedKey ||
      normalizedInput === normalizedName
    ) {

      return cpu;

    }


    if (
      compactInput ===
        compactPartText(key) ||
      compactInput ===
        compactPartText(cpu.name)
    ) {

      return cpu;

    }

  }


  // ----------------------------------------------------------
  // ALIAS MATCH
  // ----------------------------------------------------------

  for (
    const [alias, canonical]
    of Object.entries(cpuAliases)
  ) {

    if (
      normalizedInput ===
        normalizePartForDetection(alias) ||
      compactInput ===
        compactPartText(alias)
    ) {

      return (
        cpuDatabase[canonical] ||
        null
      );

    }

  }


  return null;

}



// ============================================================
// FIND GPU EXACT / ALIAS
// ============================================================

function findGPU(input) {

  if (!input) {
    return null;
  }


  const normalizedInput =
    normalizePartForDetection(input);


  const compactInput =
    compactPartText(input);


  // ----------------------------------------------------------
  // EXACT DATABASE MATCH
  // ----------------------------------------------------------

  for (
    const [key, gpu]
    of Object.entries(gpuDatabase)
  ) {

    if (
      normalizedInput ===
        normalizePartForDetection(key) ||
      normalizedInput ===
        normalizePartForDetection(gpu.name) ||
      compactInput ===
        compactPartText(key) ||
      compactInput ===
        compactPartText(gpu.name)
    ) {

      return gpu;

    }

  }


  // ----------------------------------------------------------
  // ALIAS MATCH
  // ----------------------------------------------------------

  for (
    const [alias, canonical]
    of Object.entries(gpuAliases)
  ) {

    if (
      normalizedInput ===
        normalizePartForDetection(alias) ||
      compactInput ===
        compactPartText(alias)
    ) {

      return (
        gpuDatabase[canonical] ||
        null
      );

    }

  }


  return null;

}



// ============================================================
// CPU PLATFORM HELPERS
// ============================================================

function getCPUPlatform(cpu) {

  if (
    !cpu ||
    !cpu.socket
  ) {

    return null;

  }


  if (
    typeof getPlatform !==
    "function"
  ) {

    console.warn(
      "platform.js has not loaded before parts.js."
    );

    return null;

  }


  return getPlatform(
    cpu.socket
  );

}



function getCPUMemoryTypes(cpu) {

  if (
    !cpu ||
    !cpu.socket
  ) {

    return [];

  }


  if (
    typeof getPlatformMemory !==
    "function"
  ) {

    return [];

  }


  return getPlatformMemory(
    cpu.socket
  );

}



function getCPUChipsets(cpu) {

  if (
    !cpu ||
    !cpu.socket
  ) {

    return [];

  }


  if (
    typeof getCompatibleChipsets !==
    "function"
  ) {

    return [];

  }


  return getCompatibleChipsets(
    cpu.socket
  );

}



function getCPUCompatibility(cpu) {

  if (!cpu) {
    return null;
  }


  const platform =
    getCPUPlatform(cpu);


  if (!platform) {

    return {

      cpu:
        cpu.name,

      socket:
        cpu.socket || null,

      memory:
        [],

      chipsets:
        [],

      automaticMemory:
        false

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
// CPU + CHIPSET CHECK
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

    return null;

  }


  if (
    typeof isChipsetCompatible ===
    "function"
  ) {

    return isChipsetCompatible(
      cpu.socket,
      chipset
    );

  }


  const chipsets =
    getCPUChipsets(cpu);


  return chipsets.includes(
    chipset.toUpperCase()
  );

}



// ============================================================
// CPU + MEMORY CHECK
// ============================================================

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


  if (
    typeof isMemoryCompatible ===
    "function"
  ) {

    return isMemoryCompatible(
      cpu.socket,
      memoryType
    );

  }


  return getCPUMemoryTypes(cpu)
    .includes(
      memoryType.toUpperCase()
    );

}



// ============================================================
// BUILD CPU DETECTION CANDIDATES
// ============================================================

function buildCPUCandidates() {

  const candidates = [];


  for (
    const [key, cpu]
    of Object.entries(cpuDatabase)
  ) {

    candidates.push({

      text: key,
      cpu: cpu,
      weight: key.length

    });


    if (
      cpu.name &&
      cpu.name !== key
    ) {

      candidates.push({

        text: cpu.name,
        cpu: cpu,
        weight:
          cpu.name.length

      });

    }

  }


  for (
    const [alias, canonical]
    of Object.entries(cpuAliases)
  ) {

    const cpu =
      cpuDatabase[canonical];


    if (cpu) {

      candidates.push({

        text: alias,
        cpu: cpu,
        weight:
          alias.length

      });

    }

  }


  return candidates.sort(
    (a, b) =>
      b.weight -
      a.weight
  );

}



// ============================================================
// BUILD GPU DETECTION CANDIDATES
// ============================================================

function buildGPUCandidates() {

  const candidates = [];


  for (
    const [key, gpu]
    of Object.entries(gpuDatabase)
  ) {

    candidates.push({

      text: key,
      gpu: gpu,
      weight:
        key.length

    });


    if (
      gpu.name &&
      gpu.name !== key
    ) {

      candidates.push({

        text: gpu.name,
        gpu: gpu,
        weight:
          gpu.name.length

      });

    }

  }


  for (
    const [alias, canonical]
    of Object.entries(gpuAliases)
  ) {

    const gpu =
      gpuDatabase[canonical];


    if (gpu) {

      candidates.push({

        text: alias,
        gpu: gpu,
        weight:
          alias.length

      });

    }

  }


  return candidates.sort(
    (a, b) =>
      b.weight -
      a.weight
  );

}



// ============================================================
// DETECT CPU FROM LISTING
// ============================================================

function detectCPUFromText(text) {

  if (!text) {
    return null;
  }


  const normalizedListing =
    normalizePartForDetection(
      text
    );


  const compactListing =
    compactPartText(
      text
    );


  const candidates =
    buildCPUCandidates();


  // ----------------------------------------------------------
  // DATABASE / ALIAS SEARCH
  // ----------------------------------------------------------

  for (
    const candidate
    of candidates
  ) {

    const normalizedCandidate =
      normalizePartForDetection(
        candidate.text
      );


    const compactCandidate =
      compactPartText(
        candidate.text
      );


    if (
      normalizedListing.includes(
        normalizedCandidate
      )
    ) {

      return candidate.cpu;

    }


    if (
      compactCandidate.length >= 5 &&
      compactListing.includes(
        compactCandidate
      )
    ) {

      return candidate.cpu;

    }

  }


  // ----------------------------------------------------------
  // INTEL FALLBACK PATTERN
  // ----------------------------------------------------------
  //
  // Examples:
  //
  // i7-4790K
  // i5 13600KF
  // Intel Core i9 14900K
  //
  // ----------------------------------------------------------

  const intelMatch =
    text.match(
      /\b(?:intel\s+)?(?:core\s+)?i([3579])[\s-]*([0-9]{3,5})([a-z]{0,3})\b/i
    );


  if (intelMatch) {

    const tier =
      intelMatch[1];

    const model =
      intelMatch[2];

    const suffix =
      intelMatch[3]
        .toUpperCase();


    const guessedName =
      `Core i${tier}-${model}${suffix}`;


    const exact =
      findCPU(
        guessedName
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
  // AMD RYZEN FALLBACK
  // ----------------------------------------------------------

  const ryzenMatch =
    text.match(
      /\b(?:amd\s+)?ryzen\s*([3579])?\s*([0-9]{4})(x3d|xt|x|g|ge|f)?\b/i
    );


  if (ryzenMatch) {

    const tier =
      ryzenMatch[1] || "";

    const model =
      ryzenMatch[2];

    const suffix =
      (
        ryzenMatch[3] ||
        ""
      ).toUpperCase();


    const guessedName =
      tier
        ? `Ryzen ${tier} ${model}${suffix}`
        : `Ryzen ${model}${suffix}`;


    const exact =
      findCPU(
        guessedName
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
  // AMD FX FALLBACK
  // ----------------------------------------------------------

  const fxMatch =
    text.match(
      /\bfx[\s-]*([0-9]{4})\b/i
    );


  if (fxMatch) {

    const guessed =
      findCPU(
        `FX-${fxMatch[1]}`
      );


    if (guessed) {

      return guessed;

    }

  }


  return null;

}



// ============================================================
// INTEL FALLBACK CPU
// ============================================================
//
// This is not used for precise pricing.
//
// It is mainly so compatibility can still work for an Intel CPU
// missing from cpu-data.js.
//
// ============================================================

function createIntelFallbackCPU(
  tier,
  model,
  suffix = ""
) {

  const number =
    Number(model);


  let generation = null;
  let socket = null;
  let family = "Unknown Intel";
  let performance = 20;


  // ----------------------------------------------------------
  // GENERATION
  // ----------------------------------------------------------

  if (
    number >= 10000
  ) {

    generation =
      Number(
        model.slice(
          0,
          2
        )
      );

  }

  else if (
    number >= 2000
  ) {

    generation =
      Number(
        model.charAt(0)
      );

  }

  else {

    generation = 1;

  }


  // ----------------------------------------------------------
  // SOCKET
  // ----------------------------------------------------------

  if (
    generation >= 12 &&
    generation <= 14
  ) {

    socket =
      "LGA1700";

  }


  else if (
    generation === 10 ||
    generation === 11
  ) {

    socket =
      "LGA1200";

  }


  else if (
    generation === 8 ||
    generation === 9
  ) {

    socket =
      "LGA1151-300";

  }


  else if (
    generation === 6 ||
    generation === 7
  ) {

    socket =
      "LGA1151-100-200";

  }


  else if (
    generation === 4 ||
    generation === 5
  ) {

    socket =
      "LGA1150";

  }


  else if (
    generation === 2 ||
    generation === 3
  ) {

    socket =
      "LGA1155";

  }


  else if (
    generation === 1
  ) {

    socket =
      "LGA1156";

  }


  family =
    `${generation}${
      generation === 1
        ? "st"
        : generation === 2
        ? "nd"
        : generation === 3
        ? "rd"
        : "th"
    } Gen fallback`;


  // ----------------------------------------------------------
  // ROUGH PERFORMANCE
  // ----------------------------------------------------------

  const tierBase = {

    "3": 10,
    "5": 16,
    "7": 22,
    "9": 28

  };


  performance =
    (
      tierBase[tier] ||
      12
    ) +
    generation * 2;


  return {

    name:
      `Core i${tier}-${model}${suffix}`,

    value:
      0,

    performance:
      performance,

    socket:
      socket,

    family:
      family,

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
      model.charAt(0)
    );


  let socket = null;
  let family = "Ryzen fallback";


  // Ryzen desktop numbering broadly maps like this for our
  // used-PC purposes.

  if (
    firstDigit >= 7
  ) {

    socket = "AM5";

  }

  else if (
    firstDigit >= 1 &&
    firstDigit <= 5
  ) {

    socket = "AM4";

  }


  let performance =
    20;


  const tierBase = {

    "3": 18,
    "5": 28,
    "7": 38,
    "9": 48

  };


  performance =
    (
      tierBase[tier] ||
      25
    ) +
    firstDigit * 4;


  if (
    suffix === "X3D"
  ) {

    performance += 10;

  }


  return {

    name:
      tier
        ? `Ryzen ${tier} ${model}${suffix}`
        : `Ryzen ${model}${suffix}`,

    value:
      0,

    performance:
      performance,

    socket:
      socket,

    family:
      family,

    fallback:
      true,

    exactMarketValue:
      false

  };

}



// ============================================================
// DETECT GPU FROM LISTING
// ============================================================

function detectGPUFromText(text) {

  if (!text) {
    return null;
  }


  const normalizedListing =
    normalizePartForDetection(
      text
    );


  const compactListing =
    compactPartText(
      text
    );


  const candidates =
    buildGPUCandidates();


  // ----------------------------------------------------------
  // FULL DATABASE SEARCH
  // ----------------------------------------------------------

  for (
    const candidate
    of candidates
  ) {

    const normalizedCandidate =
      normalizePartForDetection(
        candidate.text
      );


    const compactCandidate =
      compactPartText(
        candidate.text
      );


    if (
      normalizedListing.includes(
        normalizedCandidate
      )
    ) {

      return candidate.gpu;

    }


    if (
      compactCandidate.length >= 4 &&
      compactListing.includes(
        compactCandidate
      )
    ) {

      return candidate.gpu;

    }

  }


  // ----------------------------------------------------------
  // NVIDIA FALLBACK
  // ----------------------------------------------------------

  const nvidiaMatch =
    text.match(
      /\b(?:nvidia\s+)?(?:geforce\s+)?(rtx|gtx|gt)\s*[- ]?\s*([0-9]{3,4})\s*(ti|super)?\b/i
    );


  if (nvidiaMatch) {

    const prefix =
      nvidiaMatch[1]
        .toUpperCase();

    const model =
      nvidiaMatch[2];

    const suffix =
      nvidiaMatch[3]
        ? " " +
          formatGPUSuffix(
            nvidiaMatch[3]
          )
        : "";


    const guessedName =
      `${prefix} ${model}${suffix}`;


    const exact =
      findGPU(
        guessedName
      );


    if (exact) {

      return exact;

    }


    return {

      name:
        guessedName,

      value:
        0,

      performance:
        estimateUnknownGPUPerformance(
          prefix,
          Number(model)
        ),

      vram:
        null,

      vendor:
        "NVIDIA",

      family:
        "Detected fallback",

      fallback:
        true,

      exactMarketValue:
        false

    };

  }


  // ----------------------------------------------------------
  // AMD RX FALLBACK
  // ----------------------------------------------------------

  const amdMatch =
    text.match(
      /\b(?:amd\s+)?(?:radeon\s+)?rx\s*[- ]?\s*([0-9]{3,4})\s*(xtx|xt|gre)?\b/i
    );


  if (amdMatch) {

    const model =
      amdMatch[1];

    const suffix =
      amdMatch[2]
        ? " " +
          amdMatch[2]
            .toUpperCase()
        : "";


    const guessedName =
      `RX ${model}${suffix}`;


    const exact =
      findGPU(
        guessedName
      );


    if (exact) {

      return exact;

    }


    return {

      name:
        guessedName,

      value:
        0,

      performance:
        estimateUnknownAMDPerformance(
          Number(model)
        ),

      vram:
        null,

      vendor:
        "AMD",

      family:
        "Detected fallback",

      fallback:
        true,

      exactMarketValue:
        false

    };

  }


  return null;

}



// ============================================================
// FORMAT GPU SUFFIX
// ============================================================

function formatGPUSuffix(
  suffix
) {

  const lower =
    suffix.toLowerCase();


  if (
    lower === "ti"
  ) {

    return "Ti";

  }


  if (
    lower === "super"
  ) {

    return "Super";

  }


  return suffix;

}



// ============================================================
// UNKNOWN NVIDIA PERFORMANCE
// ============================================================
//
// This is intentionally rough.
// It is only for fallback display / balance,
// not accurate pricing.
//
// ============================================================

function estimateUnknownGPUPerformance(
  prefix,
  model
) {

  let score = 10;


  if (
    prefix === "RTX"
  ) {

    const generation =
      Math.floor(
        model /
        1000
      );


    const tier =
      model %
      1000;


    score =
      generation * 10;


    if (tier >= 90) {
      score += 30;
    }

    else if (
      tier >= 80
    ) {
      score += 24;
    }

    else if (
      tier >= 70
    ) {
      score += 18;
    }

    else if (
      tier >= 60
    ) {
      score += 12;
    }

    else {
      score += 7;
    }

  }


  else if (
    prefix === "GTX"
  ) {

    if (model >= 1000) {
      score = 15;
    }

    else if (
      model >= 900
    ) {
      score = 12;
    }

    else if (
      model >= 700
    ) {
      score = 9;
    }

    else {
      score = 6;
    }

  }


  else {

    score = 3;

  }


  return score;

}



// ============================================================
// UNKNOWN AMD PERFORMANCE
// ============================================================

function estimateUnknownAMDPerformance(
  model
) {

  if (
    model >= 9000
  ) {

    return 65;

  }


  if (
    model >= 7000
  ) {

    return 50;

  }


  if (
    model >= 6000
  ) {

    return 38;

  }


  if (
    model >= 5000
  ) {

    return 25;

  }


  if (
    model >= 500
  ) {

    return 15;

  }


  return 8;

}



// ============================================================
// DATABASE STATS
// ============================================================

function getDatabaseStats() {

  return {

    cpuCount:
      Object.keys(
        cpuDatabase
      ).length,

    gpuCount:
      Object.keys(
        gpuDatabase
      ).length,

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
