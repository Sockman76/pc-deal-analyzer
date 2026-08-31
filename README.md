# PCDeal V7.1 — Full Replacement Package

This ZIP is designed to be a **complete GitHub Pages replacement package**. It contains the HTML, CSS, Firebase client, PWA files, V3/V5/V6/V7 feature layers, and the previously external hardware database files:

- `platform.js`
- `cpu-data.js`
- `gpu-data.js`
- `parts.js`

## V7 major changes

### Universal CPU/GPU recognition
PCDeal now combines a large static consumer-desktop catalog with generic family recognizers.

The static catalog covers major Intel Core generations from 2nd-gen through 14th-gen + Core Ultra desktop, AMD FX and Ryzen generations from Ryzen 1000 through Ryzen 9000/X3D, NVIDIA GeForce GTX/RTX generations, AMD Radeon HD/R7/R9/RX generations, and Intel Arc.

The **fallback recognizer** also recognizes correctly formatted CPU/GPU model names that are not explicitly present in the static catalog. Those fallback matches are marked internally as heuristic and should not be treated as benchmark-quality data.

This is intentionally more robust than pretending a finite file can literally contain every CPU/GPU ever manufactured, including OEM/mobile/server/embedded variants.

### RAM recognition
Detects:
- total capacity
- kit layouts such as `2x16GB` and `4x8GB`
- DDR3 / DDR4 / DDR5
- MHz / MT/s
- CL timing when written
- ECC wording
- SO-DIMM wording
- RAM-generation inference from an unambiguous CPU/motherboard platform

### Motherboard recognition
Recognizes major AMD and Intel desktop chipsets and maps them to:
- socket/platform
- supported RAM generation
- compatibility warnings

### PSU recognition
Extracts:
- brand
- wattage
- 80 Plus wording
- modular wording
- a conservative known-family quality tier

### Storage
Storage remains intentionally normalized to only:
- `NVME M.2`
- `SSD`
- `HDD`

Multiple drives can still be detected separately.

## Retail pricing

V7 adds `retail.html`.

PCDeal separates:
1. **Used-market internal value** — used by the deal analyzer.
2. **Launch MSRP / catalog reference** — shown when the hardware catalog has one.
3. **Live retailer pricing** — optional and clearly labeled.

The package supports an optional **Best Buy Developer API key** stored in the user's browser. The key is not hard-coded into the repository. Live Best Buy results are USD.

Older hardware is frequently discontinued, so PCDeal does not invent a current retail price when there is no reliable new listing.

## Installation

Because this is a complete package, you can replace the website files in your GitHub repository with the contents of this ZIP.

Your Firebase project configuration and Firestore rules are included.

After uploading:
1. Wait for GitHub Pages deployment.
2. Hard refresh with `Ctrl + Shift + R`.
3. Test Analyzer.
4. Test Account sign-in.
5. Test Retail.
6. Test Compare, Performance, Hardware and Inspector.

## Important accuracy notes

- PCDeal values and FPS estimates remain heuristic unless explicitly sourced from a live provider.
- Generic CPU/GPU fallback matches are recognition aids, not authoritative benchmark entries.
- Best Buy live pricing requires a Best Buy developer API key.
- Retail pricing is kept separate from used-PC valuation.


## V7.1 — Data Quality Upgrade

V7.1 adds a benchmark calibration layer and a secure used-market provider architecture.

### Benchmark calibration
Selected modern CPUs and GPUs are calibrated against current Tom's Hardware 2026 hierarchy snapshots. PCDeal labels calibrated hardware as **Source-backed** and all other hardware as **Heuristic**.

The GPU calibration stores native aggregate 1080p / 1440p / 4K hierarchy indexes and aggregate FPS for selected cards. The CPU calibration stores 1080p gaming hierarchy indexes for selected current CPUs.

This calibration anchors PCDeal's internal performance score but does **not** turn the per-game FPS estimator into a measured benchmark for every game.

### Used-market data
eBay's Browse API requires an Application access token obtained through client credentials. Client secrets must not be exposed in GitHub Pages JavaScript.

V7.1 therefore includes:
- `functions/index.js`
- `functions/package.json`
- `firebase.json`
- `.firebaserc`

The optional Firebase Function `ebayUsedSearch` keeps eBay credentials server-side and returns a small set of current used, fixed-price listings.

Active marketplace listings are **asking prices**, not completed-sale prices.

### Data Lab
`data.html` shows:
- benchmark source dates/methodology
- whether the current CPU/GPU is source-backed or heuristic
- eBay backend configuration
- data label definitions
