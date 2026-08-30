# PCDeal V3.1

**PCDeal** is a browser-based used-PC deal analyzer built to turn messy marketplace listings into a structured PC build, estimate the system's value and gaming performance, and highlight things a buyer should verify before purchasing.

The project is currently at **V3.1**.

## What PCDeal Does

Paste a used gaming-PC listing into PCDeal and press **Detect Specs**. PCDeal attempts to recognize the important hardware and listing details automatically.

It can currently work with:

- CPU
- GPU
- RAM capacity and generation
- Storage type and capacity
- Motherboard
- Power supply
- CPU cooler
- Case quality
- PC condition
- Asking price
- Currency

After detection, the user can correct or fill in anything the seller did not provide and then press **Analyze Deal**.

PCDeal uses the detected hardware to produce a deal score, verdict, estimated system value, suggested offer information, gaming-performance information, and additional V3 insights.

## V3 Feature Set

PCDeal V3 follows an 11-feature roadmap:

1. **Animated hardware icons** — detected components light up after parsing. Components that are not actually present in the listing stay inactive.
2. **Live price meter** — compares the asking price against PCDeal's estimated system value while the form changes.
3. **FPS estimator** — provides approximate 1080p and 1440p gaming-performance estimates.
4. **Analysis confidence** — estimates how complete the analysis is based on how many important components PCDeal recognized.
5. **Marketplace copy button** — creates a compact summary that can be copied for comparing or discussing a listing.
6. **Mobile-focused interface** — the interface adapts to smaller displays.
7. **Component rarity indicator** — identifies noteworthy CPU/GPU rarity or desirability using the available component data.
8. **Case database** — recognizes a growing set of cases and classifies them into basic, mid-range, or premium categories.
9. **PSU quality database** — attempts to classify recognized PSU families and warns when the exact model is unknown.
10. **Storage-health estimator** — looks for storage-health information or warning language in the listing.
11. **Seller red-flag detector** — scans listing text for wording that may deserve extra attention before buying.

These tools are intended as **buying guidance**, not proof that a used PC is healthy.

## V3.1 Cooling System

V3.1 expands CPU-cooler detection and valuation.

The current cooler dropdown separates cooling into:

### Air Cooling

- Stock / OEM cooler
- Low-profile air cooler
- Single-tower air cooler
- Dual-tower air cooler
- Premium air cooler

### Liquid Cooling

- 120mm AIO
- 240mm AIO
- 280mm AIO
- 360mm AIO
- 420mm AIO
- Custom water-cooling loop

The cooler detector also recognizes several named cooler families, including examples from Noctua, be quiet!, DeepCool, Thermalright, Scythe, Cooler Master, Arctic, Corsair, NZXT, Lian Li, Thermaltake, and ASUS.

PCDeal deliberately avoids inventing an AIO radiator size. If a listing names an AIO family but does not provide enough information to determine its size, the program can leave the cooler selection unknown instead of guessing.

## Storage Rules

PCDeal intentionally uses only three storage-type categories:

| PCDeal Type | Examples |
| --- | --- |
| **NVME M.2** | NVMe, M.2 NVMe, NVMe SSD |
| **SSD** | SATA SSD, M.2 SATA SSD, standard SSD |
| **HDD** | HDD, hard drive |

Capacity is stored separately from drive type.

For example:

`1TB M.2 NVMe SSD`

becomes:

`NVME M.2 + 1TB`

If a seller only writes something like `512GB storage`, PCDeal can detect the capacity while leaving the drive type unknown rather than assuming it is an SSD.

## Project Architecture

PCDeal is intentionally split into a stable core and a V3 feature layer.

```text
index.html
platform.js
cpu-data.js
gpu-data.js
parts.js
app-v4.js
pcdeal-v3.js
```

### `index.html`

Contains the PCDeal interface and loads the JavaScript files in the required order.

Current script order:

```html
<script src="platform.js?v=2"></script>
<script src="cpu-data.js?v=1"></script>
<script src="gpu-data.js?v=1"></script>
<script src="parts.js?v=5"></script>
<script src="app-v4.js?v=19"></script>
<script src="pcdeal-v3.js?v=2"></script>
```

### `platform.js`

Platform compatibility data and logic.

Its job is to connect concepts such as:

`CPU → socket/platform → chipset → RAM generation`

### `cpu-data.js`

CPU database used by the detection and analysis system.

### `gpu-data.js`

GPU database used by the detection, valuation, rarity, and performance systems.

### `parts.js`

Component lookup and listing-detection layer.

It handles CPU/GPU aliases and works with the platform databases to identify hardware from normal marketplace text.

### `app-v4.js`

The main PCDeal core.

It contains the primary listing parser and deal-analysis logic, including functions such as:

```js
parseListing()
analyzeDeal()
```

This file should remain relatively stable so new interface features do not repeatedly risk breaking the working parser.

### `pcdeal-v3.js`

The V3 feature layer.

New V3 features, interface enhancements, case/PSU/cooler databases, FPS estimation, confidence, rarity, storage-health analysis, red-flag detection, and related UI behavior are concentrated here.

This separation makes future development safer.

## How Listing Detection Works

At a high level:

```text
Marketplace listing
        ↓
Normalize listing text
        ↓
Detect CPU / GPU / RAM / storage / etc.
        ↓
Match recognized components against databases
        ↓
Populate PCDeal fields
        ↓
Run compatibility and feature-layer checks
        ↓
User reviews/corrects detected information
        ↓
Analyze Deal
        ↓
Value + score + verdict + insights
```

PCDeal should prefer **leaving a field unknown over confidently inventing a component that was not listed**.

That rule is especially important for motherboard, PSU, storage type, and AIO size.

## Example Test Listing

This listing is useful for testing most of the parser at once:

```text
Gaming PC for sale

CPU: Ryzen 7 5800X3D
GPU: RTX 3080 Ti 12GB
RAM: 2x16GB DDR4 3600MHz
Storage: 1TB M.2 NVMe SSD
Motherboard: MSI MAG B550 Tomahawk WiFi
Power Supply: Corsair RM850x 850W Gold
CPU Cooler: 240mm AIO liquid cooler
Case: premium airflow gaming case

Windows 11 installed
WiFi and Bluetooth
Everything works perfectly
Very clean
Mint condition
No issues
No repairs

Originally paid $2200 CAD
Asking $950 CAD
Price is firm
```

Expected important detections:

```text
CPU: Ryzen 7 5800X3D
GPU: RTX 3080 Ti
RAM: 32GB
RAM Type: DDR4
Storage Type: NVME M.2
Storage Size: 1TB
Motherboard: MSI MAG B550 Tomahawk WiFi
PSU: Corsair RM850x 850W Gold
Cooler: 240mm AIO
Case: Premium
Condition: Excellent
Asking Price: 950
Currency: CAD
```

A particularly important parser test is the price: PCDeal should use the **$950 asking price**, not the seller's statement that the computer originally cost $2200.

## Hardware Icon Behavior

Hardware icons are connected to their actual form fields.

An icon should activate only when PCDeal has a value for that component. For example, if a listing contains no motherboard or PSU, those icons should remain inactive after **Detect Specs**.

This avoids making the interface look as though PCDeal detected hardware that the seller never provided.

## PSU Quality

The PSU database currently recognizes selected product families from manufacturers such as Corsair, Seasonic, Super Flower, be quiet!, MSI, Cooler Master, Thermaltake, and EVGA.

PSU quality cannot safely be determined from wattage or an `80 Plus` efficiency label alone. PCDeal therefore gives lower confidence when it sees only generic specifications and encourages verification of the exact PSU model.

The PSU database should continue to become more model-specific over time.

## FPS Estimates

The 1080p and 1440p figures are **heuristic estimates**, not benchmark measurements.

Actual FPS can change significantly because of:

- the specific game
- graphics settings
- ray tracing
- upscaling
- CPU limitations
- RAM configuration
- drivers
- game updates
- thermals
- background software

The FPS feature is meant to give buyers a quick idea of the performance class of a PC, not promise an exact frame rate.

## Analysis Confidence

The confidence meter represents **how much useful listing information PCDeal recognized**.

It is not a probability that the seller is truthful and it is not a guarantee that PCDeal's valuation is correct.

A listing containing exact CPU, GPU, RAM, storage, motherboard, PSU, cooler, case, condition, and price information should naturally produce a stronger analysis than a listing that only says:

`Gaming PC, runs everything, $800.`

## Seller Red Flags

The red-flag system is text based.

It can identify suspicious or incomplete wording, but it cannot inspect the physical computer. A listing with zero detected text red flags can still describe a defective machine.

Before buying a used PC, important checks can include temperatures, GPU stability, storage health, physical condition, exact component models, and whether the machine behaves correctly under load.

## Running PCDeal

PCDeal does not require a backend.

For GitHub Pages, place all required files in the repository and make sure `index.html` uses the correct script names and versions.

When replacing a JavaScript file during development, incrementing its query-string version can help avoid an older cached copy being loaded.

Example:

```html
<script src="pcdeal-v3.js?v=3"></script>
```

After deploying an update, a hard refresh can also help during testing.

## Development Principles

When adding features to PCDeal:

- Preserve working CPU/GPU/RAM/platform detection.
- Do not guess missing components just to make the interface look complete.
- Keep component databases separate from presentation where practical.
- Prefer exact model detection over brand-only assumptions.
- Keep valuations explainable and easy to adjust.
- Treat FPS as an estimate rather than a benchmark.
- Treat PSU quality conservatively.
- Test parser changes against realistic marketplace listings.
- Keep the site usable on both desktop and mobile.
- Add new V3-style features to the feature layer when they do not need to modify the core parser.

## Current Limitations

PCDeal is still an evolving estimator.

Some important limitations are:

- Component databases are not exhaustive.
- Used-market prices change by region and over time.
- A seller can provide incorrect specifications.
- Unknown or unusually formatted component names may not be recognized.
- FPS is estimated rather than generated from per-game benchmark data.
- PSU quality depends heavily on the exact model and revision.
- Storage health cannot be known from capacity/type alone.
- PCDeal cannot physically test the machine.
- Case and cooler databases will need continued expansion.

Because of these limitations, the final verdict should be treated as one piece of information in a buying decision.

## Current Version

**PCDeal V3.1**

Major V3.1 changes:

- More detailed CPU-cooler categories
- Named cooler-family detection
- Cooler valuation improvements
- Better handling of unknown AIO sizes
- Hardware icons activate only for components that actually have detected/manual values
- Motherboard and PSU icons no longer light up merely because a detection pass occurred

---

**PCDeal — built to make used-PC listings easier to understand before you spend your money.**
