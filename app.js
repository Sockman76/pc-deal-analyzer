// ========================================
// PC DEAL ANALYZER - ANALYSIS ENGINE
// ========================================

function analyzeDeal() {

  // Get information entered by the user
  const cpuInput = document.getElementById("cpu").value.trim();
  const gpuInput = document.getElementById("gpu").value.trim();
  const ram = document.getElementById("ram").value;
  const storage = document.getElementById("storage").value;
  const askingPrice = Number(document.getElementById("price").value);
  const currency = document.getElementById("currency").value;

  const result = document.getElementById("result");
  const scoreElement = document.getElementById("score");
  const verdictElement = document.getElementById("verdict");
  const resultText = document.getElementById("resultText");


  // ----------------------------------------
  // BASIC VALIDATION
  // ----------------------------------------

  if (!cpuInput || !gpuInput || !askingPrice) {

    alert("Please enter the CPU, GPU and asking price.");

    return;
  }


  // ----------------------------------------
  // LOOK UP CPU AND GPU
  // ----------------------------------------

  const cpu = findCPU(cpuInput);
  const gpu = findGPU(gpuInput);


  if (!cpu) {

    alert(
      "CPU not found in our database yet.\n\n" +
      "Try something like:\nRyzen 5 5600X"
    );

    return;
  }


  if (!gpu) {

    alert(
      "GPU not found in our database yet.\n\n" +
      "Try something like:\nRTX 3070"
    );

    return;
  }


  // ----------------------------------------
  // ESTIMATE OTHER COMPONENT VALUES
  // ----------------------------------------

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


  // ----------------------------------------
  // REST OF PC VALUE
  // ----------------------------------------
  //
  // Represents approximate combined value
  // of motherboard, PSU, case and cooling.
  //

  let baseSystemValue = 180;


  // Newer platforms generally have more value.

  if (cpu.platform === "AM5") {
    baseSystemValue += 100;
  }

  if (cpu.platform === "LGA1700") {
    baseSystemValue += 60;
  }


  // ----------------------------------------
  // TOTAL ESTIMATED VALUE
  // ----------------------------------------

  const estimatedValue =
    cpu.value +
    gpu.value +
    ramValue +
    storageValue +
    baseSystemValue;


  // Create a reasonable value range.

  const lowEstimate =
    Math.round(estimatedValue * 0.90);

  const highEstimate =
    Math.round(estimatedValue * 1.10);


  // ----------------------------------------
  // DEAL SCORE
  // ----------------------------------------

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


  // ----------------------------------------
  // VERDICT
  // ----------------------------------------

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


  // ----------------------------------------
  // GAMING PERFORMANCE
  // ----------------------------------------

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


  // ----------------------------------------
  // CPU / GPU BALANCE
  // ----------------------------------------

  const performanceDifference =
    gpu.performance - cpu.performance;

  let balanceMessage;

  if (performanceDifference > 30) {

    balanceMessage =
      "⚠️ The GPU is considerably stronger than the CPU. CPU-heavy games may be limited.";

  } else if (performanceDifference < -30) {

    balanceMessage =
      "⚠️ This system has much more CPU performance than GPU performance.";

  } else {

    balanceMessage =
      "✅ CPU and GPU performance are reasonably balanced.";

  }


  // ----------------------------------------
  // SUGGESTED OFFER
  // ----------------------------------------

  let suggestedOffer =
    Math.round(estimatedValue * 0.85 / 10) * 10;

  // Don't suggest an offer ABOVE asking price.

  suggestedOffer =
    Math.min(suggestedOffer, askingPrice);


  // ----------------------------------------
  // DISPLAY RESULTS
  // ----------------------------------------

  scoreElement.innerHTML =
    dealScore + "/100";

  verdictElement.innerHTML =
    verdict;


  resultText.innerHTML = `

    <strong>${cpu.name} + ${gpu.name}</strong>

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

    🎮 <strong>Gaming:</strong>
    ${gamingTier}

    <br><br>

    🔧 <strong>Platform:</strong>
    ${cpu.platform}

    <br><br>

    ${balanceMessage}

    <br><br>

    💬 <strong>Suggested starting offer:</strong>
    $${suggestedOffer.toLocaleString()} ${currency}

  `;


  result.style.display = "block";


  result.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

}
