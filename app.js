// ========================================
// PC DEAL ANALYZER - ANALYSIS ENGINE V3
// Includes advanced valuation + listing parser
// ========================================


// ========================================
// MAIN DEAL ANALYZER
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

    alert("Please enter the CPU, GPU and asking price.");

    return;
  }


  // ----------------------------------------
  // LOOK UP CPU + GPU
  // ----------------------------------------

  const cpu = findCPU(cpuInput);
  const gpu = findGPU(gpuInput);


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


  if (
    board.includes("a320") ||
    board.includes("a520") ||
    board.includes("h410") ||
    board.includes("h510") ||
    board.includes("h610")
  ) {

    motherboardValue = 60;
  }


  if (
    board.includes("b450") ||
    board.includes("b550") ||
    board.includes("b650") ||
    board.includes("b660") ||
    board.includes("b760")
  ) {

    motherboardValue = 110;
  }


  if (
    board.includes("x570") ||
    board.includes("x670") ||
    board.includes("x870") ||
    board.includes("z690") ||
    board.includes("z790") ||
    board.includes("z890")
  ) {

    motherboardValue = 170;
  }


  if (!motherboardInput) {

    if (cpu.platform === "AM5") {

      motherboardValue = 130;

    } else if (cpu.platform === "LGA1700") {

      motherboardValue = 110;

    } else {

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

  } else if (psu.includes("850w")) {

    psuValue += 20;

  } else if (psu.includes("750w")) {

    psuValue += 10;
  }


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
  // CONDITION
  // ========================================

  let conditionMultiplier = 1;

  if (condition === "excellent") {
    conditionMultiplier = 1.05;
  }

  if (condition === "good") {
    conditionMultiplier = 1;
  }

  if (condition === "fair") {
    conditionMultiplier = 0.90;
  }

  if (condition === "poor") {
    conditionMultiplier = 0.75;
  }


  estimatedValue =
    Math.round(
      estimatedValue * conditionMultiplier
    );


  // ========================================
  // VALUE RANGE
  // ========================================

  const lowEstimate =
    Math.round(estimatedValue * 0.90);

  const highEstimate =
    Math.round(estimatedValue * 1.10);


  // ========================================
  // DEAL SCORE
  // ========================================

  const priceRatio =
    askingPrice / estimatedValue;

  let dealScore;


  if (priceRatio <= 0.70) {

    dealScore = 95;

  } else if (priceRatio <= 0.80) {

    dealScore = 90;

  } else if (priceRatio <= 0.90) {

    dealScore = 85;

  } else if (priceRatio <= 1.00) {

    dealScore = 78;

  } else if (priceRatio <= 1.10) {

    dealScore = 68;

  } else if (priceRatio <= 1.20) {

    dealScore = 55;

  } else {

    dealScore = 35;
  }


  // ========================================
  // VERDICT
  // ========================================

  let verdict;


  if (dealScore >= 90) {

    verdict = "🔥 Excellent deal";

  } else if (dealScore >= 80) {

    verdict = "🟢 Good deal";

  } else if (dealScore >= 65) {

    verdict = "🟡 Fair price";

  } else if (dealScore >= 50) {

    verdict = "🟠 Slightly overpriced";

  } else {

    verdict = "🔴 Overpriced";
  }


  // ========================================
  // GAMING PERFORMANCE
  // ========================================

  let gamingTier;


  if (gpu.performance >= 80) {

    gamingTier =
      "Excellent high-end 1440p / 4K gaming";

  } else if (gpu.performance >= 60) {

    gamingTier =
      "Excellent 1440p gaming";

  } else if (gpu.performance >= 45) {

    gamingTier =
      "Excellent 1080p / strong 1440p gaming";

  } else {

    gamingTier =
      "Good 1080p gaming";
  }


  // ========================================
  // CPU / GPU BALANCE
  // ========================================

  const performanceDifference =
    gpu.performance - cpu.performance;

  let balanceMessage;


  if (performanceDifference > 30) {

    balanceMessage =
      "⚠️ GPU is considerably stronger than the CPU. CPU-heavy games may be limited.";

  } else if (performanceDifference < -30) {

    balanceMessage =
      "⚠️ This system has much more CPU performance than GPU performance.";

  } else {

    balanceMessage =
      "✅ CPU and GPU performance are reasonably balanced.";
  }


  // ========================================
  // CONFIDENCE
  // ========================================

  let confidencePoints = 2;

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


  const totalPossible = 9;

  const confidencePercent =
    Math.round(
      (confidencePoints / totalPossible) * 100
    );


  let confidenceLabel;


  if (confidencePercent >= 80) {

    confidenceLabel = "High";

  } else if (confidencePercent >= 55) {

    confidenceLabel = "Medium";

  } else {

    confidenceLabel = "Low";
  }


  // ========================================
  // MISSING INFORMATION
  // ========================================

  let missingItems = [];


  if (!motherboardInput) {
    missingItems.push("motherboard model");
  }

  if (!psuInput) {
    missingItems.push("power supply model");
  }

  if (!ramType) {
    missingItems.push("RAM type");
  }

  if (!cooler) {
    missingItems.push("CPU cooler");
  }

  if (!caseQuality) {
    missingItems.push("case quality");
  }


  // ========================================
  // SUGGESTED OFFER
  // ========================================

  let suggestedOffer =
    Math.round(
      estimatedValue * 0.85 / 10
    ) * 10;


  suggestedOffer =
    Math.min(
      suggestedOffer,
      askingPrice
    );


  // ========================================
  // DISPLAY
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

  } else {

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


  result.style.display = "block";


  result.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

}



// ========================================
// PASTE-A-LISTING PARSER
// ========================================

function parseListing() {

  const listingBox =
    document.getElementById("listingText");

  const message =
    document.getElementById("parseMessage");


  if (!listingBox || !message) {

    alert(
      "Paste-a-listing interface is not installed correctly."
    );

    return;
  }


  const originalListing =
    listingBox.value.trim();

  const listing =
    originalListing.toLowerCase();


  if (!listing) {

    message.innerHTML =
      "Paste a PC listing first.";

    return;
  }


  let found = [];



  // ========================================
  // CPU DETECTION
  // ========================================

  let detectedCPU = null;


  // Sort longest names first.
  // This helps prevent something like
  // 5600 matching before 5600X.

  const cpuKeys =
    Object.keys(cpuDatabase)
      .sort(
        (a, b) =>
          b.length - a.length
      );


  for (const key of cpuKeys) {

    if (listing.includes(key)) {

      detectedCPU =
        cpuDatabase[key];

      document
        .getElementById("cpu")
        .value =
        detectedCPU.name;

      found.push(
        "CPU: " +
        detectedCPU.name
      );

      break;
    }
  }



  // ========================================
  // GPU DETECTION
  // ========================================

  let detectedGPU = null;


  const gpuKeys =
    Object.keys(gpuDatabase)
      .sort(
        (a, b) =>
          b.length - a.length
      );


  for (const key of gpuKeys) {

    if (listing.includes(key)) {

      detectedGPU =
        gpuDatabase[key];

      document
        .getElementById("gpu")
        .value =
        detectedGPU.name;

      found.push(
        "GPU: " +
        detectedGPU.name
      );

      break;
    }
  }



  // ========================================
  // RAM CAPACITY
  // ========================================

  if (
    /\b(64)\s?gb\b/.test(listing)
  ) {

    document
      .getElementById("ram")
      .value = "64GB+";

    found.push("RAM: 64GB+");

  }

  else if (
    /\b(32)\s?gb\b/.test(listing)
  ) {

    document
      .getElementById("ram")
      .value = "32GB";

    found.push("RAM: 32GB");

  }

  else if (
    /\b(16)\s?gb\b/.test(listing)
  ) {

    document
      .getElementById("ram")
      .value = "16GB";

    found.push("RAM: 16GB");

  }

  else if (
    /\b(8)\s?gb\b/.test(listing)
  ) {

    document
      .getElementById("ram")
      .value = "8GB";

    found.push("RAM: 8GB");
  }



  // ========================================
  // RAM TYPE
  // ========================================

  if (listing.includes("ddr5")) {

    document
      .getElementById("ramType")
      .value = "DDR5";

    found.push("RAM Type: DDR5");

  }

  else if (listing.includes("ddr4")) {

    document
      .getElementById("ramType")
      .value = "DDR4";

    found.push("RAM Type: DDR4");
  }



  // ========================================
  // STORAGE
  // ========================================

  if (
    /\b2\s?tb\b/.test(listing) &&
    (
      listing.includes("ssd") ||
      listing.includes("nvme")
    )
  ) {

    document
      .getElementById("storage")
      .value = "2TB SSD";

    found.push("Storage: 2TB SSD");

  }

  else if (
    /\b1\s?tb\b/.test(listing) &&
    (
      listing.includes("ssd") ||
      listing.includes("nvme")
    )
  ) {

    document
      .getElementById("storage")
      .value = "1TB SSD";

    found.push("Storage: 1TB SSD");

  }

  else if (
    (
      listing.includes("500gb") ||
      listing.includes("512gb")
    ) &&
    (
      listing.includes("ssd") ||
      listing.includes("nvme")
    )
  ) {

    document
      .getElementById("storage")
      .value = "500GB SSD";

    found.push("Storage: 500GB SSD");

  }

  else if (
    listing.includes("256gb") &&
    (
      listing.includes("ssd") ||
      listing.includes("nvme")
    )
  ) {

    document
      .getElementById("storage")
      .value = "256GB SSD";

    found.push("Storage: 256GB SSD");
  }



  // ========================================
  // MOTHERBOARD
  // ========================================

  const boardPatterns = [

    "x870",
    "x670",
    "x570",

    "b650",
    "b550",
    "b450",

    "a520",
    "a320",

    "z890",
    "z790",
    "z690",

    "b760",
    "b660",

    "h610",
    "h510",
    "h410"

  ];


  let detectedBoard = null;


  for (const boardName of boardPatterns) {

    if (listing.includes(boardName)) {

      detectedBoard =
        boardName.toUpperCase();

      break;
    }
  }


  if (detectedBoard) {

    // Try to preserve a little more information
    // around the board name if possible.

    const boardRegex =
      new RegExp(
        "([a-z0-9-]+\\s+){0,2}" +
        detectedBoard.toLowerCase() +
        "([a-z0-9-]+\\s*){0,2}",
        "i"
      );


    const boardMatch =
      originalListing.match(
        boardRegex
      );


    let boardDisplay =
      detectedBoard;


    if (boardMatch) {

      boardDisplay =
        boardMatch[0]
          .replace(/[,.]/g, "")
          .trim();

    }


    document
      .getElementById("motherboard")
      .value =
      boardDisplay;


    found.push(
      "Motherboard: " +
      boardDisplay
    );
  }



  // ========================================
  // PSU DETECTION
  // ========================================

  const wattMatch =
    listing.match(
      /\b(450|500|550|600|650|700|750|800|850|900|1000|1200|1300)\s?w\b/
    );


  if (wattMatch) {

    const wattage =
      wattMatch[1] + "W";


    let psuDisplay =
      wattage + " PSU";


    // Recognize some common PSU names.

    if (
      listing.includes("rm750x")
    ) {

      psuDisplay =
        "Corsair RM750x 750W";

    }

    else if (
      listing.includes("rm850x")
    ) {

      psuDisplay =
        "Corsair RM850x 850W";

    }

    else if (
      listing.includes("seasonic")
    ) {

      psuDisplay =
        "Seasonic " +
        wattage;

    }

    else if (
      listing.includes("supernova")
    ) {

      psuDisplay =
        "EVGA SuperNOVA " +
        wattage;

    }


    document
      .getElementById("psu")
      .value =
      psuDisplay;


    found.push(
      "PSU: " +
      psuDisplay
    );
  }



  // ========================================
  // COOLER DETECTION
  // ========================================

  if (
    listing.includes("360mm aio") ||
    listing.includes("360 aio")
  ) {

    document
      .getElementById("cooler")
      .value =
      "aio360";

    found.push(
      "Cooler: 360mm AIO"
    );

  }

  else if (
    listing.includes("280mm aio") ||
    listing.includes("280 aio")
  ) {

    document
      .getElementById("cooler")
      .value =
      "aio280";

    found.push(
      "Cooler: 280mm AIO"
    );

  }

  else if (
    listing.includes("240mm aio") ||
    listing.includes("240 aio")
  ) {

    document
      .getElementById("cooler")
      .value =
      "aio240";

    found.push(
      "Cooler: 240mm AIO"
    );
  }



  // ========================================
  // CONDITION DETECTION
  // ========================================

  if (
    listing.includes("like new") ||
    listing.includes("mint condition") ||
    listing.includes("excellent condition")
  ) {

    document
      .getElementById("condition")
      .value =
      "excellent";

    found.push(
      "Condition: Excellent"
    );

  }

  else if (
    listing.includes("fair condition")
  ) {

    document
      .getElementById("condition")
      .value =
      "fair";

    found.push(
      "Condition: Fair"
    );

  }

  else if (
    listing.includes("poor condition")
  ) {

    document
      .getElementById("condition")
      .value =
      "poor";

    found.push(
      "Condition: Poor"
    );
  }



  // ========================================
  // PRICE DETECTION
  // ========================================

  let detectedPrice = null;


  // First look for phrases such as:
  // asking $1000
  // price: $850
  // $1,200 CAD

  const askingMatch =
    listing.match(
      /(?:asking|price|priced at|selling for)\s*:?\s*\$?\s*([0-9]{2,5}(?:,[0-9]{3})?)/i
    );


  if (askingMatch) {

    detectedPrice =
      askingMatch[1];

  }

  else {

    const dollarMatches =
      listing.match(
        /\$\s?[0-9]{2,5}(?:,[0-9]{3})?/g
      );


    if (dollarMatches) {

      detectedPrice =
        dollarMatches[
          dollarMatches.length - 1
        ];
    }
  }


  if (detectedPrice) {

    const cleanPrice =
      detectedPrice
        .replace("$", "")
        .replace(/,/g, "")
        .trim();


    document
      .getElementById("price")
      .value =
      cleanPrice;


    found.push(
      "Price: $" +
      Number(cleanPrice)
        .toLocaleString()
    );
  }



  // ========================================
  // CURRENCY
  // ========================================

  if (
    listing.includes("cad") ||
    listing.includes("canadian")
  ) {

    document
      .getElementById("currency")
      .value =
      "CAD";

    found.push(
      "Currency: CAD"
    );

  }

  else if (
    listing.includes("usd")
  ) {

    document
      .getElementById("currency")
      .value =
      "USD";

    found.push(
      "Currency: USD"
    );
  }



  // ========================================
  // SHOW RESULTS
  // ========================================

  if (found.length === 0) {

    message.innerHTML = `

      ❌ <strong>No supported hardware detected.</strong>

      <br><br>

      Try including exact component names such as
      Ryzen 7 5700X, RTX 3080, 32GB DDR4,
      1TB NVMe, and the asking price.

    `;

    return;
  }


  message.innerHTML = `

    <strong>Detected ${found.length} details:</strong>

    <br><br>

    ${found.join("<br>")}

    <br><br>

    <strong>
      Review the detected information below before analyzing.
    </strong>

  `;


  document
    .getElementById("cpu")
    .scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

}
