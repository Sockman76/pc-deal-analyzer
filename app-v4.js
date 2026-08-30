// ============================================================
// STORAGE
// ============================================================

detectedStorageDrives =
  detectStorageDetails(
    listing
  );

if (
  detectedStorageDrives.length > 0
) {
  const mainDrive =
    detectedStorageDrives[0];

  setStorageDropdowns(
    mainDrive
  );

  detected.push(
    `Storage: ${mainDrive.size} ${
      mainDrive.type === "Unknown"
        ? "type unknown"
        : mainDrive.type
    }`
  );
}
