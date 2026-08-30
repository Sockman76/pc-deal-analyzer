// ============================================================
// PCDEAL V3 FEATURE LAYER
// ROADMAP 1-11
// ============================================================

const PCDEAL_V3 = {
  version: "3.0.0",

  caseDatabase: [
    { pattern: /corsair\s+4000d|corsair\s+5000d|corsair\s+7000d/i, tier: "premium" },
    { pattern: /nzxt\s+h5|nzxt\s+h7|nzxt\s+h9/i, tier: "premium" },
    { pattern: /lian\s*li\s+o11|o11\s+dynamic/i, tier: "premium" },
    { pattern: /fractal\s+north|fractal\s+meshify/i, tier: "premium" },
    { pattern: /deepcool\s+ch560/i, tier: "premium" },
    { pattern: /phanteks\s+p400|phanteks\s+xt/i, tier: "mid" },
    { pattern: /montech\s+air\s*100|montech\s+x3/i, tier: "mid" },
    { pattern: /deepcool\s+matrexx/i, tier: "mid" },
    { pattern: /nzxt\s+h510/i, tier: "mid" }
  ],

  psuDatabase: [
    { pattern: /corsair\s+(rmx?|rme|hx|ax)/i, tier: "A", label: "High quality" },
    { pattern: /seasonic\s+(focus|prime|vertex)/i, tier: "A", label: "High quality" },
    { pattern: /super\s*flower\s+(leadex|legion)/i, tier: "A", label: "High quality" },
    { pattern: /be\s*quiet!?\s+(straight power|dark power|pure power)/i, tier: "A", label: "High quality" },
    { pattern: /msi\s+(a|mpg).*gf|msi\s+mag.*gl/i, tier: "B", label: "Good quality" },
    { pattern: /cooler\s+master\s+(mwe|v\d|gx)/i, tier: "B", label: "Good quality" },
    { pattern: /thermaltake\s+(toughpower|smart)/i, tier: "B", label: "Model-dependent" },
    { pattern: /evga\s+(g\d|p\d|supernova)/i, tier: "B", label: "Good quality" }
  ]
};

function byId(id) {
  return document.getElementById(id);
}

function fieldValue(id) {
  return byId(id)?.value?.trim?.() || byId(id)?.value || "";
}

function normalizeV3Text(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

// ============================================================
// #8 BETTER CASE DATABASE + DETECTION
// ============================================================

function detectCaseQuality(text) {
  const raw = String(text || "");
  const t = normalizeV3Text(raw);

  for (const entry of PCDEAL_V3.caseDatabase) {
    if (entry.pattern.test(raw)) {
      return entry.tier;
    }
  }

  const caseLine = raw
    .split(/\n|•|\|/)
    .find(line => /\bcase\b|chassis|tower/i.test(line));

  const source = normalizeV3Text(caseLine || t);

  if (/premium|high[- ]?end|enthusiast|tempered glass.*airflow|dual chamber/i.test(source)) {
    return "premium";
  }

  if (/mid[- ]?range|mid tower|gaming case|airflow case|mesh case/i.test(source)) {
    return "mid";
  }

  if (/basic|office case|office tower|generic case|budget case/i.test(source)) {
    return "basic";
  }

  return "";
}

// ============================================================
// #9 PSU QUALITY DATABASE
// ============================================================

function getPSUQuality(psuText) {
  const psu = String(psuText || "");
  if (!psu.trim()) {
    return { tier: "?", label: "PSU model not provided", confidence: 0 };
  }

  for (const entry of PCDEAL_V3.psuDatabase) {
    if (entry.pattern.test(psu)) {
      return { tier: entry.tier, label: entry.label, confidence: 90 };
    }
  }

  if (/80\s*plus\s*(gold|platinum|titanium)|\bgold\b|\bplatinum\b|\btitanium\b/i.test(psu)) {
    return { tier: "B", label: "Promising specs; verify exact model", confidence: 55 };
  }

  if (/80\s*plus\s*(bronze|white)|\bbronze\b/i.test(psu)) {
    return { tier: "C", label: "Entry/mid-tier; exact model matters", confidence: 50 };
  }

  return { tier: "?", label: "Unknown PSU quality — verify exact model", confidence: 25 };
}

// ============================================================
// #1 ANIMATED HARDWARE ICONS
// ============================================================

function activateHardwareIcons() {
  document.querySelectorAll(".hardware-icon").forEach((icon, index) => {
    icon.classList.remove("active");
    setTimeout(() => icon.classList.add("active"), index * 80);
  });
}

// ============================================================
// #2 LIVE PRICE METER
// ============================================================

function getCurrentEstimatedSystemValue() {
  const cpuText = fieldValue("cpu");
  const gpuText = fieldValue("gpu");

  const cpu = typeof findCPU === "function" ? findCPU(cpuText) : null;
  const gpu = typeof findGPU === "function" ? findGPU(gpuText) : null;

  if (!cpu || !gpu) return 0;

  const ramValue = typeof getRamValue === "function"
    ? getRamValue(fieldValue("ram"), fieldValue("ramType"))
    : 0;

  const storageValue = typeof getDetectedStorageValue === "function"
    ? getDetectedStorageValue()
    : 0;

  const motherboardValue = typeof getMotherboardValue === "function"
    ? getMotherboardValue(fieldValue("motherboard"), cpu)
    : 0;

  const psuValue = typeof getPSUValue === "function"
    ? getPSUValue(fieldValue("psu"))
    : 0;

  const coolerValue = typeof getCoolerValue === "function"
    ? getCoolerValue(fieldValue("cooler"))
    : 0;

  const caseValue = typeof getCaseValue === "function"
    ? getCaseValue(fieldValue("caseQuality"))
    : 0;

  const conditionMultiplier = typeof getConditionMultiplier === "function"
    ? getConditionMultiplier(fieldValue("condition") || "good")
    : 1;

  return Math.max(0, Math.round((Number(cpu.value || 0) + Number(gpu.value || 0) + ramValue + storageValue + motherboardValue + psuValue + coolerValue + caseValue) * conditionMultiplier));
}

function updateLivePriceMeter() {
  const meter = byId("livePriceMeter");
  const fill = byId("livePriceFill");
  const label = byId("livePriceLabel");
  if (!meter || !fill || !label) return;

  const asking = Number(fieldValue("price") || 0);
  const estimate = getCurrentEstimatedSystemValue();

  if (!asking || !estimate) {
    label.textContent = "Add CPU, GPU and price to compare";
    fill.style.width = "0%";
    meter.dataset.state = "unknown";
    return;
  }

  const ratio = asking / estimate;
  const percent = Math.max(5, Math.min(100, Math.round(ratio * 75)));
  fill.style.width = `${percent}%`;

  if (ratio <= 0.85) {
    label.textContent = `Strong value — asking is about ${Math.round((1 - ratio) * 100)}% below estimate`;
    meter.dataset.state = "good";
  } else if (ratio <= 1.05) {
    label.textContent = "Near estimated market value";
    meter.dataset.state = "fair";
  } else {
    label.textContent = `High asking price — about ${Math.round((ratio - 1) * 100)}% above estimate`;
    meter.dataset.state = "high";
  }
}

// ============================================================
// #3 FPS ESTIMATOR
// ============================================================

function estimateFPS() {
  const cpu = typeof findCPU === "function" ? findCPU(fieldValue("cpu")) : null;
  const gpu = typeof findGPU === "function" ? findGPU(fieldValue("gpu")) : null;

  if (!cpu || !gpu) {
    return null;
  }

  const gpuPerf = Number(gpu.performance || 0);
  const cpuPerf = Number(cpu.performance || 0);
  const balance = Math.max(0.55, Math.min(1, cpuPerf / Math.max(gpuPerf, 1)));
  const base = Math.max(25, gpuPerf * 2.15 * balance);

  return {
    p1080: Math.round(base),
    p1440: Math.round(base * 0.72),
    note: "Heuristic estimate for modern games at high settings; actual FPS varies by game and settings."
  };
}

function renderFPS() {
  const fps = estimateFPS();
  const a = byId("fps1080");
  const b = byId("fps1440");
  const note = byId("fpsNote");
  if (!a || !b || !note) return;

  if (!fps) {
    a.textContent = "—";
    b.textContent = "—";
    note.textContent = "Detect a CPU and GPU first.";
    return;
  }

  a.textContent = `~${fps.p1080} FPS`;
  b.textContent = `~${fps.p1440} FPS`;
  note.textContent = fps.note;
}

// ============================================================
// #4 ANALYSIS CONFIDENCE SCORE
// ============================================================

function calculateV3Confidence() {
  const fields = ["cpu", "gpu", "ram", "ramType", "storageSize", "motherboard", "psu", "cooler", "caseQuality", "price"];
  let points = 0;

  for (const id of fields) {
    if (fieldValue(id)) points += 8;
  }

  if (fieldValue("storageType")) points += 5;
  if (typeof findCPU === "function" && findCPU(fieldValue("cpu"))) points += 5;
  if (typeof findGPU === "function" && findGPU(fieldValue("gpu"))) points += 5;
  if (fieldValue("motherboard") && typeof detectChipsetFromText === "function" && detectChipsetFromText(fieldValue("motherboard"))) points += 3;
  if (fieldValue("psu").match(/\d{3,4}\s*w/i)) points += 2;

  return Math.min(100, points);
}

function renderConfidence() {
  const score = calculateV3Confidence();
  const value = byId("confidenceValue");
  const bar = byId("confidenceFill");
  if (!value || !bar) return;

  value.textContent = `${score}%`;
  bar.style.width = `${score}%`;
}

// ============================================================
// #7 COMPONENT RARITY INDICATOR
// ============================================================

function componentRarity(name) {
  const t = normalizeV3Text(name);
  if (!t) return "Unknown";

  if (/threadripper|xeon w|rtx 5090|rtx 4090|rx 7900 xtx|titan|arc pro/i.test(t)) return "Rare";
  if (/x3d|rtx 4080|rtx 3090|rtx 3080 ti|rx 7900 xt|i9[- ]?14|ryzen 9/i.test(t)) return "Less common";
  return "Common";
}

function renderRarity() {
  const cpu = byId("cpuRarity");
  const gpu = byId("gpuRarity");
  if (cpu) cpu.textContent = componentRarity(fieldValue("cpu"));
  if (gpu) gpu.textContent = componentRarity(fieldValue("gpu"));
}

// ============================================================
// #10 STORAGE HEALTH ESTIMATOR
// ============================================================

function estimateStorageHealth() {
  const listing = String(byId("listingText")?.value || "");
  const type = fieldValue("storageType");
  const t = normalizeV3Text(listing);

  const percent = t.match(/(?:health|smart)\s*[:\-]?\s*(\d{2,3})\s*%/i);
  if (percent) {
    const value = Math.min(100, Number(percent[1]));
    return { label: `${value}% reported`, detail: "Seller-provided health figure — verify it yourself." };
  }

  if (/new (?:ssd|nvme|drive)|brand new (?:ssd|nvme|drive)/i.test(t)) {
    return { label: "Likely new", detail: "Listing claims the drive is new; verify with SMART data." };
  }

  if (/bad sector|failing drive|smart warning|drive error/i.test(t)) {
    return { label: "Warning", detail: "Listing contains a storage-health warning." };
  }

  if (!type) {
    return { label: "Unknown", detail: "Storage type was not identified." };
  }

  return { label: "Unknown", detail: "No SMART/health data in the listing. Ask for a CrystalDiskInfo screenshot." };
}

function renderStorageHealth() {
  const result = estimateStorageHealth();
  const value = byId("storageHealthValue");
  const detail = byId("storageHealthDetail");
  if (value) value.textContent = result.label;
  if (detail) detail.textContent = result.detail;
}

// ============================================================
// #11 SELLER RED-FLAG DETECTOR
// ============================================================

function getSellerRedFlags() {
  const text = normalizeV3Text(byId("listingText")?.value || "");
  const flags = [];

  if (!text) return flags;

  if (/no test|can't test|cannot test|untested|sold as is/i.test(text)) flags.push("Seller says the PC is untested or cannot be tested.");
  if (/cash only.*today|must sell today|need gone today|urgent sale/i.test(text)) flags.push("High-pressure / urgent-sale wording.");
  if (/no returns|final sale/i.test(text)) flags.push("Seller emphasizes no returns.");
  if (/don't know specs|not sure specs|i know nothing about computers/i.test(text)) flags.push("Important specs may be inaccurate or incomplete.");
  if (/random crash|sometimes crashes|blue screen|bsod|artifact|overheat|overheating/i.test(text)) flags.push("Listing mentions instability, overheating, or graphical issues.");
  if (/mining|mined on|crypto mining/i.test(text)) flags.push("GPU may have been used for crypto mining; test it thoroughly.");
  if (/password locked|icloud locked|activation locked|bios password/i.test(text)) flags.push("Device-lock wording needs to be resolved before buying.");
  if (/deposit|e-transfer first|etransfer first|ship only|shipping only/i.test(text)) flags.push("Payment/shipping wording deserves extra caution for a local used-PC deal.");

  return flags;
}

function renderRedFlags() {
  const list = byId("redFlagList");
  const count = byId("redFlagCount");
  if (!list || !count) return;

  const flags = getSellerRedFlags();
  count.textContent = flags.length ? `${flags.length} found` : "None detected";

  list.innerHTML = flags.length
    ? flags.map(flag => `<li>${escapeHTML(flag)}</li>`).join("")
    : "<li>No obvious text-based red flags detected. Still test the PC in person.</li>";
}

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ============================================================
// #5 MARKETPLACE COPY BUTTON
// ============================================================

function buildMarketplaceSummary() {
  const fps = estimateFPS();
  const flags = getSellerRedFlags();
  const psu = getPSUQuality(fieldValue("psu"));

  return [
    "PCDeal Analysis",
    `CPU: ${fieldValue("cpu") || "Unknown"}`,
    `GPU: ${fieldValue("gpu") || "Unknown"}`,
    `RAM: ${fieldValue("ram") || "Unknown"} ${fieldValue("ramType") || ""}`.trim(),
    `Storage: ${fieldValue("storageSize") || "Unknown"} ${fieldValue("storageType") || ""}`.trim(),
    `Motherboard: ${fieldValue("motherboard") || "Unknown"}`,
    `PSU: ${fieldValue("psu") || "Unknown"} (${psu.label})`,
    `Asking: ${fieldValue("currency") || "CAD"} $${fieldValue("price") || "?"}`,
    fps ? `Estimated gaming: ~${fps.p1080} FPS 1080p / ~${fps.p1440} FPS 1440p` : "Estimated gaming: unavailable",
    `Confidence: ${calculateV3Confidence()}%`,
    `Listing red flags: ${flags.length}`
  ].join("\n");
}

async function copyMarketplaceSummary() {
  const button = byId("copySummaryButton");
  const text = buildMarketplaceSummary();

  try {
    await navigator.clipboard.writeText(text);
    if (button) {
      const old = button.textContent;
      button.textContent = "Copied ✓";
      setTimeout(() => button.textContent = old, 1500);
    }
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
}

// ============================================================
// #6 MOBILE-FIRST ENHANCEMENTS + FEATURE REFRESH
// ============================================================

function renderPSUQuality() {
  const result = getPSUQuality(fieldValue("psu"));
  const tier = byId("psuTier");
  const text = byId("psuQualityText");
  if (tier) tier.textContent = result.tier;
  if (text) text.textContent = result.label;
}

function refreshV3() {
  updateLivePriceMeter();
  renderFPS();
  renderConfidence();
  renderRarity();
  renderPSUQuality();
  renderStorageHealth();
  renderRedFlags();
}

function wrapExistingFunctions() {
  if (typeof window.parseListing === "function" && !window.parseListing.__pcdealV3Wrapped) {
    const originalParse = window.parseListing;
    const wrappedParse = function(...args) {
      const result = originalParse.apply(this, args);
      setTimeout(() => {
        activateHardwareIcons();
        refreshV3();
      }, 30);
      return result;
    };
    wrappedParse.__pcdealV3Wrapped = true;
    window.parseListing = wrappedParse;
  }

  if (typeof window.analyzeDeal === "function" && !window.analyzeDeal.__pcdealV3Wrapped) {
    const originalAnalyze = window.analyzeDeal;
    const wrappedAnalyze = function(...args) {
      const result = originalAnalyze.apply(this, args);
      setTimeout(() => {
        refreshV3();
        byId("v3Insights")?.classList.add("show");
      }, 30);
      return result;
    };
    wrappedAnalyze.__pcdealV3Wrapped = true;
    window.analyzeDeal = wrappedAnalyze;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  wrapExistingFunctions();

  [
    "cpu", "gpu", "ram", "ramType", "storageType", "storageSize",
    "motherboard", "psu", "cooler", "caseQuality", "condition", "price", "currency"
  ].forEach(id => {
    const el = byId(id);
    if (!el) return;
    el.addEventListener("input", refreshV3);
    el.addEventListener("change", refreshV3);
  });

  byId("listingText")?.addEventListener("input", () => {
    renderStorageHealth();
    renderRedFlags();
  });

  byId("copySummaryButton")?.addEventListener("click", copyMarketplaceSummary);

  refreshV3();
});

// ============================================================
// PCDEAL V3.1 - COOLING DATABASE + PRECISE ICON ACTIVATION
// ============================================================

PCDEAL_V3.version = "3.1.0";

PCDEAL_V3.coolerDatabase = [
  // Premium / dual-tower air
  { pattern: /noctua\s+nh[- ]?d15|nh[- ]?d15s/i, type: "Premium air cooler", value: 100, class: "premium-air" },
  { pattern: /be\s*quiet!?\s+dark\s+rock\s+(pro\s+4|pro\s+5|elite)/i, type: "Premium air cooler", value: 95, class: "premium-air" },
  { pattern: /deepcool\s+assassin\s+(iii|iv|4)/i, type: "Premium air cooler", value: 90, class: "premium-air" },
  { pattern: /thermalright\s+(phantom\s+spirit|peerless\s+assassin)/i, type: "Dual-tower air cooler", value: 65, class: "dual-tower" },
  { pattern: /deepcool\s+ak620/i, type: "Dual-tower air cooler", value: 70, class: "dual-tower" },
  { pattern: /scythe\s+fuma/i, type: "Dual-tower air cooler", value: 65, class: "dual-tower" },

  // Single-tower / mainstream air
  { pattern: /cooler\s+master\s+hyper\s*212|\bhyper\s*212\b/i, type: "Single-tower air cooler", value: 35, class: "single-tower" },
  { pattern: /deepcool\s+ak400|\bak400\b/i, type: "Single-tower air cooler", value: 40, class: "single-tower" },
  { pattern: /thermalright\s+assassin\s+(x|king)|arctic\s+freezer\s+36/i, type: "Single-tower air cooler", value: 40, class: "single-tower" },

  // Low profile
  { pattern: /noctua\s+nh[- ]?l9|thermalright\s+axp|be\s*quiet!?\s+shadow\s+rock\s+lp/i, type: "Low-profile air cooler", value: 40, class: "low-profile" },

  // Named AIO families; radiator size is resolved separately when present
  { pattern: /arctic\s+liquid\s+freezer|corsair\s+(h100|h115|h150|h170)|nzxt\s+kraken|lian\s*li\s+galahad|deepcool\s+(ls|lt)\s*\d|cooler\s+master\s+masterliquid|thermaltake\s+th\d|asus\s+rog\s+ryujin/i, type: "AIO", value: 85, class: "aio" },

  // Stock coolers
  { pattern: /wraith\s+(stealth|spire|prism)|intel\s+(stock|laminar)|stock\s+(cpu\s+)?cooler|oem\s+cooler/i, type: "Stock cooler", value: 10, class: "stock" }
];

function detectCooler(text) {
  const raw = String(text || "");

  // Custom loops are deliberately detected before generic water-cooling terms.
  if (/custom\s+(water|liquid)\s*(cooling|loop)|custom\s+loop|water\s*block.*(?:pump|reservoir)|reservoir.*(?:water|liquid)/i.test(raw)) {
    return "Custom loop";
  }

  // Radiator size is the strongest AIO classification signal.
  const aioSize = raw.match(/\b(120|240|280|360|420)\s*mm\b[^\n]{0,45}\b(?:aio|liquid|water\s*cool(?:er|ing)?|radiator)\b|\b(?:aio|liquid|water\s*cool(?:er|ing)?|radiator)\b[^\n]{0,45}\b(120|240|280|360|420)\s*mm\b/i);
  if (aioSize) {
    const size = aioSize[1] || aioSize[2];
    return `${size}mm AIO`;
  }

  for (const entry of PCDEAL_V3.coolerDatabase) {
    if (!entry.pattern.test(raw)) continue;
    if (entry.type !== "AIO") return entry.type;

    // Known AIO but listing omitted radiator size: avoid inventing one.
    return "";
  }

  if (/\bdual[- ]?tower\b|two\s+tower\s+air\s+cooler/i.test(raw)) return "Dual-tower air cooler";
  if (/\b(single[- ]?tower|tower\s+air\s+cooler|aftermarket\s+air\s+cooler)\b/i.test(raw)) return "Single-tower air cooler";
  if (/\blow[- ]?profile\s+(?:cpu\s+)?cooler\b/i.test(raw)) return "Low-profile air cooler";
  if (/\bpremium\s+air\s+cooler\b/i.test(raw)) return "Premium air cooler";
  if (/\bair\s+cooler\b/i.test(raw)) return "Single-tower air cooler";
  if (/\b(?:stock cooler|stock cpu cooler|oem cooler)\b/i.test(raw)) return "Stock cooler";

  return "";
}

function getCoolerValue(cooler) {
  const values = {
    "Stock cooler": 10,
    "Low-profile air cooler": 35,
    "Single-tower air cooler": 40,
    "Dual-tower air cooler": 65,
    "Premium air cooler": 95,
    "120mm AIO": 35,
    "240mm AIO": 60,
    "280mm AIO": 75,
    "360mm AIO": 90,
    "420mm AIO": 110,
    "Custom loop": 150,
    // Backward compatibility with older saved/manual selections.
    "Air cooler": 40
  };
  return values[cooler] ?? 0;
}

function getCoolerDatabaseMatch(text) {
  const raw = String(text || "");
  for (const entry of PCDEAL_V3.coolerDatabase) {
    if (entry.pattern.test(raw)) return entry;
  }
  return null;
}

// Only animate icons for components that actually have a detected/manual value.
// RAM uses the capacity field; storage uses size; motherboard and PSU stay dark
// when the listing did not provide them.
function activateHardwareIcons() {
  document.querySelectorAll(".hardware-icon").forEach(icon => {
    icon.classList.remove("active");
  });

  const activeIcons = [...document.querySelectorAll(".hardware-icon")].filter(icon => {
    const field = icon.dataset.field;
    return field && Boolean(fieldValue(field));
  });

  activeIcons.forEach((icon, index) => {
    setTimeout(() => icon.classList.add("active"), index * 80);
  });
}
