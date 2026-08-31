
// PCDeal V7 — Platform / motherboard intelligence
(() => {
  "use strict";

  const PLATFORM_RULES = [
    { platform:"AM5", socket:"AM5", memory:["DDR5"], chipsets:["A620","B650","B650E","X670","X670E","B840","B850","X870","X870E"], cpu:/\b(?:ryzen\s+[3579]\s+(?:7[5-9]\d{2}|8[3-7]\d{2}g|9[6-9]\d{2})(?:x3d|x|f|g|ge|xt)?)\b/i },
    { platform:"AM4", socket:"AM4", memory:["DDR4"], chipsets:["A320","A520","B350","B450","B550","X370","X470","X570"], cpu:/\b(?:ryzen\s+[3579]\s+(?:1\d{3}|2\d{3}|3\d{3}|4\d{3}[g]?|5\d{3})(?:x3d|x|g|ge|gt|xt|f)?)\b/i },
    { platform:"LGA1851", socket:"LGA1851", memory:["DDR5"], chipsets:["H810","B860","Z890"], cpu:/\bcore\s+ultra\s+[579]\s+2\d{2}[a-z]{0,2}\b/i },
    { platform:"LGA1700", socket:"LGA1700", memory:["DDR4","DDR5"], chipsets:["H610","B660","H670","Z690","B760","H770","Z790"], cpu:/\b(?:core\s+)?i[3579][-\s]?(?:12|13|14)\d{3}[a-z]{0,3}\b/i },
    { platform:"LGA1200", socket:"LGA1200", memory:["DDR4"], chipsets:["H410","B460","H470","Z490","H510","B560","H570","Z590"], cpu:/\b(?:core\s+)?i[3579][-\s]?(?:10|11)\d{3}[a-z]{0,3}\b/i },
    { platform:"LGA1151-v2", socket:"LGA1151", memory:["DDR4"], chipsets:["H310","B360","B365","H370","Z370","Z390"], cpu:/\b(?:core\s+)?i[3579][-\s]?(?:8|9)\d{3}[a-z]{0,3}\b/i },
    { platform:"LGA1151", socket:"LGA1151", memory:["DDR4"], chipsets:["H110","B150","H170","Z170","B250","H270","Z270"], cpu:/\b(?:core\s+)?i[3579][-\s]?(?:6|7)\d{3}[a-z]{0,3}\b/i },
    { platform:"LGA1150", socket:"LGA1150", memory:["DDR3"], chipsets:["H81","B85","H87","Z87","H97","Z97"], cpu:/\b(?:core\s+)?i[357][-\s]?4\d{3}[a-z]{0,3}\b/i },
    { platform:"LGA1155", socket:"LGA1155", memory:["DDR3"], chipsets:["H61","B75","H67","P67","Z68","H77","Z75","Z77"], cpu:/\b(?:core\s+)?i[357][-\s]?[23]\d{3}[a-z]{0,3}\b/i },
    { platform:"AM3+", socket:"AM3+", memory:["DDR3"], chipsets:["760G","970","990X","990FX"], cpu:/\bfx[-\s]?(?:4|6|8|9)\d{3}\b/i }
  ];

  const CHIPSET_TO_PLATFORM = {};
  for (const r of PLATFORM_RULES) for (const c of r.chipsets) CHIPSET_TO_PLATFORM[c] = r;

  const BOARD_BRANDS = [
    ["ASUS",/\basus\b|\bro[g|g]?\b/i],
    ["MSI",/\bmsi\b/i],
    ["Gigabyte",/\bgigabyte\b|\baorus\b/i],
    ["ASRock",/\basrock\b/i],
    ["EVGA",/\bevga\b/i],
    ["Biostar",/\bbiostar\b/i]
  ];

  function normalizeHardwareText(v){
    return String(v||"").replace(/[–—]/g,"-").replace(/\s+/g," ").trim();
  }

  function detectChipset(text){
    const t = normalizeHardwareText(text).toUpperCase();
    const all = Object.keys(CHIPSET_TO_PLATFORM).sort((a,b)=>b.length-a.length);
    return all.find(c => new RegExp(`\\b${c.replace("+","\\+")}\\b`,"i").test(t)) || "";
  }

  function detectMotherboardFromText(text){
    const raw = String(text||"");
    const lines = raw.split(/\n|•|\|/).map(x=>x.trim()).filter(Boolean);
    const chipset = detectChipset(raw);
    const brand = (BOARD_BRANDS.find(x=>x[1].test(raw))||[])[0] || "";
    let line = lines.find(l => /motherboard|mobo/i.test(l));
    if (!line && chipset) line = lines.find(l => new RegExp(`\\b${chipset}\\b`,"i").test(l));
    if (!line) return null;
    return {
      name: line.replace(/^(?:motherboard|mobo)\s*[:\-]\s*/i,"").trim(),
      brand,
      chipset,
      platform: chipset && CHIPSET_TO_PLATFORM[chipset] ? CHIPSET_TO_PLATFORM[chipset].platform : "",
      socket: chipset && CHIPSET_TO_PLATFORM[chipset] ? CHIPSET_TO_PLATFORM[chipset].socket : "",
      memoryTypes: chipset && CHIPSET_TO_PLATFORM[chipset] ? CHIPSET_TO_PLATFORM[chipset].memory : []
    };
  }

  function platformForCPU(cpu){
    const name = typeof cpu === "string" ? cpu : (cpu?.name||"");
    return PLATFORM_RULES.find(r=>r.cpu.test(name)) || null;
  }

  function getBestMemorySelection(cpu, motherboardText){
    const fromBoard = detectMotherboardFromText(motherboardText);
    const rule = fromBoard?.chipset ? CHIPSET_TO_PLATFORM[fromBoard.chipset] : platformForCPU(cpu);
    if (!rule && !fromBoard) return null;
    const memoryTypes = fromBoard?.memoryTypes?.length ? fromBoard.memoryTypes : rule.memory;
    return { memoryTypes, allowedMemory:memoryTypes, selectedMemory: memoryTypes.length===1 ? memoryTypes[0] : "" };
  }

  function motherboardCompatibility(cpu, motherboardText, ramType){
    const board = detectMotherboardFromText(motherboardText);
    const cpuRule = platformForCPU(cpu);
    const issues = [];
    if (cpuRule && board?.platform && cpuRule.platform !== board.platform) issues.push(`CPU platform ${cpuRule.platform} does not match motherboard platform ${board.platform}.`);
    if (board?.memoryTypes?.length && ramType && !board.memoryTypes.includes(ramType)) issues.push(`${board.chipset} does not use ${ramType}; expected ${board.memoryTypes.join(" / ")}.`);
    return { ok:issues.length===0, issues, board, cpuPlatform:cpuRule?.platform||"" };
  }

  window.PCDEAL_PLATFORM_RULES = PLATFORM_RULES;
  window.detectChipset = detectChipset;
  window.detectMotherboardFromText = detectMotherboardFromText;
  window.getBestMemorySelection = getBestMemorySelection;
  window.motherboardCompatibility = motherboardCompatibility;
})();
