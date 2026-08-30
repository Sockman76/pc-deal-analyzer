// ========================================
// PC DEAL ANALYZER - ANALYSIS ENGINE V2
// ========================================

function analyzeDeal() {

  // ----------------------------------------
  // GET USER INPUT
  // ----------------------------------------

  const cpuInput =
    document.getElementById("cpu").value.trim();

  const gpuInput =
    document.getElementById("gpu").value.trim();

  const ram =
    document.getElementById("ram").value;

  const ramType =
    document.getElementById("ramType").value;

  const storage =
    document.getElementById("storage").value;

  const condition =
    document.getElementById("condition").value;

  const motherboardInput =
    document.getElementById("motherboard").value.trim();

  const psuInput =
    document.getElementById("psu").value.trim();

  const cooler =
    document.getElementById("cooler").value;

  const caseQuality =
    document.getElementById("caseQuality").value;

  const askingPrice =
    Number(document.getElementById("price").value);

  const currency =
    document.getElementById("currency").value;


  const result =
    document.getElementById("result");

  const scoreElement =
    document.getElementById("score");

  const verdictElement =
    document.getElementById("verdict");

  const resultText =
    document.getElementById("resultText");


  // ----------------------------------------
  // BASIC VALIDATION
  // ----------------------------------------

  if (!cpuInput || !gpuInput || !askingPrice) {

    alert(
      "Please enter the CPU, GPU and asking price."
    );

    return;
  }


  // ----------------------------------------
  // LOOK UP CPU + GPU
  // ----------------------------------------

  const cpu =
    findCPU(cpuInput);

  const gpu =
    findGPU(gpuInput);


  if (!cpu) {

    alert(
      "CPU not found in the database yet.\n\n" +
      "Example: Ryzen 7 5700X"
    );

    return;
  }


  if (!gpu) {

    alert(
      "GPU not found in the database yet.\n\n" +
      "Example: RTX 3080"
    );

    return;
  }


  // ========================================
  // RAM VALUE
  // ========================================

  let ramValue = 0;


  if (ram === "8GB") {
    ramValue = 20;
  }

  if (ram === "16GB") {
    ramValue = 40;
  }

  if (ram === "32GB") {
    ramValue = 70;
  }

  if (ram === "64GB+") {
    ramValue = 120;
  }


  // DDR5 usually carries somewhat more value.

  if (ramType === "DDR5") {

    ramValue += 25;

  }


  // ========================================
  // STORAGE VALUE
  // ========================================

  let storageValue = 0;


  if (storage === "256GB SSD") {
    storageValue = 15;
  }

  if (storage === "500GB SSD") {
    storageValue = 25;
  }

  if (storage === "1TB SSD") {
    storageValue = 50;
  }

  if (storage === "2TB SSD") {
    storageValue = 90;
  }

  if (storage === "HDD Only") {
    storageValue = 10;
  }


  // ========================================
  // MOTHERBOARD ESTIMATE
  // ========================================

  let motherboardValue = 80;

  const board =
    motherboardInput.toLowerCase();


  if (board.includes("a320") ||
      board.includes("a520") ||
      board.includes("h410") ||
      board.includes("h510") ||
      board.includes("h610")) {

    motherboardValue = 60;

  }


  if (board.includes("b450") ||
      board.includes("b550") ||
      board.includes("b650") ||
      board.includes("b760") ||
      board.includes("b660")) {

    motherboardValue = 110;

  }


  if (board.includes("x570") ||
      board.includes("x670") ||
      board.includes("x870") ||
      board.includes("z690") ||
      board.includes("z790") ||
      board.includes("z890")) {

    motherboardValue = 170;

  }


  // No motherboard entered

  if (!motherboardInput) {

    if (cpu.platform === "AM5") {
      motherboardValue = 130;
    }

    else if (cpu.platform === "LGA1700") {
      motherboardValue = 110;
    }

    else {
      motherboardValue = 80;
    }

  }


  // ========================================
  // PSU ESTIMATE
  // ========================================

  let psuValue = 50;

  const psu =
    psuInput.toLowerCase();


  if (
    psu.includes("rm") ||
    psu.includes("seasonic") ||
    psu.includes("supernova") ||
    psu.includes("focus") ||
    psu.includes("straight power") ||
    psu.includes("pure power") ||
    psu.includes("thor") ||
    psu.includes("msi mpg")
  ) {

    psuValue = 100;

  }


  if (
    psu.includes("1000w") ||
    psu.includes("1200w") ||
    psu.includes("1300w")
  ) {

    psuValue += 30;

  }

  else if (
    psu.includes("850w")
  ) {

    psuValue += 20;

  }

  else if (
    psu.includes("750w")
  ) {

    psuValue += 10;

  }


  // PSU unknown

  if (!psuInput) {

    psuValue = 50;

  }


  // ========================================
  // COOLER VALUE
  // ========================================

  let coolerValue = 20;


  if (cooler === "stock") {
    coolerValue = 10;
  }

  if (cooler === "air") {
    coolerValue = 40;
  }

  if (cooler === "aio240") {
    coolerValue = 60;
  }

  if (cooler === "aio280") {
    coolerValue = 75;
  }

  if (cooler === "aio360") {
    coolerValue = 90;
  }


  // ========================================
  // CASE VALUE
  // ========================================

  let caseValue = 50;


  if (caseQuality === "basic") {
    caseValue = 35;
  }

  if (caseQuality === "mid") {
    caseValue = 70;
  }

  if (caseQuality === "premium") {
    caseValue = 120;
  }


  // ========================================
  // RAW SYSTEM VALUE
  // ========================================

  let estimatedValue =

    cpu.value +
    gpu.value +
    ramValue +
    storageValue +
    motherboardValue +
    psuValue +
    coolerValue +
    caseValue;


  // ========================================
  // CONDITION ADJUSTMENT
  // ========================================

  let conditionMultiplier = 1;


  if (condition === "excellent") {
    conditionMultiplier = 1.05;
  }

  if (condition === "good") {
    conditionMultiplier = 1.00;
  }

  if (condition === "fair") {
    conditionMultiplier = 0.90;
  }

  if (condition === "poor") {
    conditionMultiplier = 0.75;
  }


  estimatedValue =
    Math.round(
      estimatedValue *
      conditionMultiplier
    );


  // ========================================
  // VALUE RANGE
  // ========================================

  const lowEstimate =
    Math.round(
      estimatedValue * 0.90
    );

  const highEstimate =
    Math.round(
      estimatedValue * 1.10
    );


  // ========================================
  // DEAL SCORE
  // ========================================

  const priceRatio =
    askingPrice / estimatedValue;


  let dealScore;


  if (priceRatio <= 0.70) {

    dealScore = 95;

  }

  else if (priceRatio <= 0.80) {

    dealScore = 90;

  }

  else if (priceRatio <= 0.90) {

    dealScore = 85;

  }

  else if (priceRatio <= 1.00) {

    dealScore = 78;

  }

  else if (priceRatio <= 1.10) {

    dealScore = 68;

  }

  else if (priceRatio <= 1.20) {

    dealScore = 55;

  }

  else {

    dealScore = 35;

  }


  // ========================================
  // VERDICT
  // ========================================

  let verdict;


  if (dealScore >= 90) {

    verdict =
      "🔥 Excellent deal";

  }

  else if (dealScore >= 80) {

    verdict =
      "🟢 Good deal";

  }

  else if (dealScore >= 65) {

    verdict =
      "🟡 Fair price";

  }

  else if (dealScore >= 50) {

    verdict =
      "🟠 Slightly overpriced";

  }

  else {

    verdict =
      "🔴 Overpriced";

  }


  // ========================================
  // GAMING PERFORMANCE
  // ========================================

  let gamingTier;


  if (gpu.performance >= 80) {

    gamingTier =
      "Excellent high-end 1440p / 4K gaming";

  }

  else if (gpu.performance >= 60) {

    gamingTier =
      "Excellent 1440p gaming";

  }

  else if (gpu.performance >= 45) {

    gamingTier =
      "Excellent 1080p / strong 1440p gaming";

  }

  else {

    gamingTier =
      "Good 1080p gaming";

  }


  // ========================================
  // CPU / GPU BALANCE
  // ========================================

  const performanceDifference =
    gpu.performance -
    cpu.performance;


  let balanceMessage;


  if (performanceDifference > 30) {

    balanceMessage =
      "⚠️ GPU is considerably stronger than the CPU. CPU-heavy games may be limited.";

  }

  else if (performanceDifference < -30) {

    balanceMessage =
      "⚠️ This system has much more CPU performance than GPU performance.";

  }

  else {

    balanceMessage =
      "✅ CPU and GPU performance are reasonably balanced.";

  }


  // ========================================
  // CONFIDENCE SCORE
  // ========================================

  let confidencePoints = 2;

  // CPU + GPU already known = 2 points

  if (ram) {
    confidencePoints++;
  }

  if (ramType) {
    confidencePoints++;
  }

  if (storage) {
    confidencePoints++;
  }

  if (motherboardInput) {
    confidencePoints++;
  }

  if (psuInput) {
    confidencePoints++;
  }

  if (cooler) {
    confidencePoints++;
  }

  if (caseQuality) {
    confidencePoints++;
  }


  const totalPossible =
    9;


  const confidencePercent =
    Math.round(
      (confidencePoints / totalPossible)
      * 100
    );


  let confidenceLabel;


  if (confidencePercent >= 80) {

    confidenceLabel =
      "High";

  }

  else if (confidencePercent >= 55) {

    confidenceLabel =
      "Medium";

  }

  else {

    confidenceLabel =
      "Low";

  }


  // ========================================
  // MISSING INFORMATION
  // ========================================

  let missingItems = [];


  if (!motherboardInput) {

    missingItems.push(
      "motherboard model"
    );

  }


  if (!psuInput) {

    missingItems.push(
      "power supply model"
    );

  }


  if (!ramType) {

    missingItems.push(
      "RAM type"
    );

  }


  if (!cooler) {

    missingItems.push(
      "CPU cooler"
    );

  }


  if (!caseQuality) {

    missingItems.push(
      "case quality"
    );

  }


  // ========================================
  // SUGGESTED OFFER
  // ========================================

  let suggestedOffer =

    Math.round(
      estimatedValue *
      0.85 / 10
    ) * 10;


  suggestedOffer =
    Math.min(
      suggestedOffer,
      askingPrice
    );


  // ========================================
  // DISPLAY RESULTS
  // ========================================

  scoreElement.innerHTML =
    dealScore + "/100";


  verdictElement.innerHTML =
    verdict;


  let missingText = "";


  if (missingItems.length > 0) {

    missingText = `

      <br><br>

      ⚠️ <strong>Missing information:</strong>

      ${missingItems.join(", ")}

    `;

  }

  else {

    missingText = `

      <br><br>

      ✅ <strong>Full component information provided.</strong>

    `;

  }


  resultText.innerHTML = `

    <strong>
      ${cpu.name} + ${gpu.name}
    </strong>

    <br><br>

    Asking price:

    <strong>
      $${askingPrice.toLocaleString()} ${currency}
    </strong>

    <br>

    Estimated system value:

    <strong>
      $${lowEstimate.toLocaleString()}
      –
      $${highEstimate.toLocaleString()} ${currency}
    </strong>

    <br><br>

    📊 <strong>Estimate confidence:</strong>
    ${confidenceLabel}
    (${confidencePercent}%)

    <br><br>

    🎮 <strong>Gaming:</strong>
    ${gamingTier}

    <br><br>

    🔧 <strong>Platform:</strong>
    ${cpu.platform}

    <br><br>

    🧠 <strong>CPU value:</strong>
    $${cpu.value}

    <br>

    🎨 <strong>GPU value:</strong>
    $${gpu.value}

    <br>

    🧩 <strong>Motherboard estimate:</strong>
    $${motherboardValue}

    <br>

    ⚡ <strong>PSU estimate:</strong>
    $${psuValue}

    <br><br>

    ${balanceMessage}

    <br><br>

    💬 <strong>Suggested starting offer:</strong>

    $${suggestedOffer.toLocaleString()} ${currency}

    ${missingText}

  `;


  result.style.display =
    "block";


  result.scrollIntoView({

    behavior: "smooth",
    block: "nearest"

  });

}
