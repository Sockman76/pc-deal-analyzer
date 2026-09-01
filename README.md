# PCDeal V10.5 — Full Replacement Package

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


## V10.5 — Data Quality Upgrade

V10.5 adds a benchmark calibration layer and a secure used-market provider architecture.

### Benchmark calibration
Selected modern CPUs and GPUs are calibrated against current Tom's Hardware 2026 hierarchy snapshots. PCDeal labels calibrated hardware as **Source-backed** and all other hardware as **Heuristic**.

The GPU calibration stores native aggregate 1080p / 1440p / 4K hierarchy indexes and aggregate FPS for selected cards. The CPU calibration stores 1080p gaming hierarchy indexes for selected current CPUs.

This calibration anchors PCDeal's internal performance score but does **not** turn the per-game FPS estimator into a measured benchmark for every game.

### Used-market data
eBay's Browse API requires an Application access token obtained through client credentials. Client secrets must not be exposed in GitHub Pages JavaScript.

V10.5 therefore includes:
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


## V10.5 — Universal shorthand aliases
Pattern-driven shorthand recognition now canonicalizes CPU, GPU, motherboard, PSU, RAM, storage and cooler names. Examples: `r7 7800x3d` → `Ryzen 7 7800X3D`, `i5 14600kf` → `i5-14600KF`, `3080ti` → `RTX 3080 Ti`, `4070s` → `RTX 4070 Super`, `4070tis` → `RTX 4070 Ti Super`, `7900xtx` → `RX 7900 XTX`, `b580` → `Arc B580`.


## V10.5 — Profiled analysis redesign

- New first-visit account modal with Google, email-account and Guest choices.
- Account remains optional; guest analysis is supported.
- Upgrade Simulator removed.
- Analyzer has visible CPU/GPU/motherboard/PSU dropdowns plus custom exact-model fields.
- Primary-use selector changes recommendations for Gaming, Esports, Extreme Workstation, Video Editing, 3D Rendering, AI/ML, General and Mixed use.
- New workload suitability scoring so a system is not judged only as a gaming PC.
- Deeper FPS model with resolution, preset, ray tracing, upscaling, frame generation, target refresh, CPU/GPU ceilings, RAM-layout penalties, VRAM checks, 1% lows and confidence.
- Hardware page separates estimated used contribution from launch MSRP / new-build reference / live-retail paths.
- Detection confidence is evidence-weighted instead of giving nearly fixed percentages merely because a field is filled.
- Smart Insights now use V8 workload, compatibility, PSU and RAM checks.

### FPS accuracy statement
The FPS engine is a model, not a per-system laboratory benchmark. GPU hierarchy data is used as a calibration baseline when available, while game-specific, CPU, memory, ray tracing, upscaling and frame-generation effects remain modelled. PCDeal exposes a confidence score and source note rather than presenting estimates as guaranteed FPS.


## V10.5 account UI refinement
The persistent Create Account control no longer floats at the bottom of the website.
It now lives as a compact account control in the top navigation/header. On smaller
screens it collapses to a small icon to avoid taking over the interface.


## V10.5 account-navigation correction
- Removed the persistent floating Create Account control entirely.
- PCDeal now uses the existing Account navigation item as the only persistent account entry.
- Signed-in state is shown on that same nav item.
- Added horizontal nav scrolling instead of allowing controls to overlap.
- Removed legacy account-pill CSS and injected controls from prior versions.


## V10.5 — compact analyzer + benchmark-anchored FPS
- Manual detected-part editing is collapsed by default under Review / edit detected parts.
- The Performance page no longer asks what the PC is used for. Workload suitability remains on buying/system analysis pages only.
- FPS estimates now prefer per-game DropReference August 2026 average FPS and 1% low anchors for supported games.
- Supported source-backed game anchors currently include Apex Legends, Marvel Rivals, Red Dead Redemption 2, Grand Theft Auto V, ELDEN RING, DEATHLOOP and Control.
- For GPUs without a direct row, PCDeal interpolates between nearby GPUs using the existing calibrated GPU hierarchy.
- 1440p/4K scaling uses measured GPU hierarchy resolution ratios when available.
- Preset, ray tracing, upscaling and frame generation changes are still modelled and are explicitly described as such.


## V10.5 — Evidence-first pricing intelligence

The Hardware page now calculates pricing in layers:

1. PCDeal internal used-value contribution.
2. Current active used-listing evidence when the optional eBay backend is configured.
3. Launch MSRP or clearly-labelled new-build references.
4. Whole-PC bundle/liquidity adjustment.
5. Optional AI explanation using only the structured evidence above.

The optional AI pricing function uses Gemini server-side through Firebase Functions. The Gemini API key is stored in Firebase Secret Manager and is never shipped to GitHub Pages.

AI is explicitly instructed not to invent missing market prices. It explains evidence quality rather than acting as the price source.

### New pricing outputs
- Fair used range
- Fair midpoint
- Quick-sale target
- Great-buy threshold
- High-asking threshold
- Price confidence
- Whole-PC fair value
- Part-out midpoint
- Seller asking-price comparison
- Optional AI evidence review


## V10.5 navigation fix
Retail and Data Lab are now visible as first-class top-navigation items on every page instead of only becoming discoverable through Tools.


## V10.5 — Security hardening

This release addresses the CodeQL issues raised against earlier builds:

- Dynamic report values are escaped before HTML rendering.
- Error text is written with `textContent` instead of being reinterpreted as markup.
- Obsolete vulnerable pricing code was removed.
- Best Buy API credentials are no longer stored in browser/localStorage.
- A `bestBuySearch` Firebase Function keeps the Best Buy API key in Firebase Secret Manager.
- A shared client-side escaping/safe-URL helper was added.
- A Content Security Policy is included on static pages as an additional browser-side defense.

After deploying this version, rerun GitHub CodeQL. If GitHub still reports an alert, inspect the exact data-flow trace rather than dismissing it.


## V10.5 — Accuracy & data quality pass

V9 separates **recognition**, **measurement**, **interpolation**, **market evidence**, and **heuristics**.

Source-backed data now explicitly includes:
- Tom's Hardware GPU Hierarchy 2026 (June 24, 2026)
- Tom's Hardware CPU Hierarchy 2026 (August 26, 2026)
- DropReference August 2026 Average FPS / 1% Low rows for selected exact game/GPU combinations
- Puget Systems professional-workflow guidance

Exact game/GPU rows take priority in the FPS engine. Ray tracing now defaults to Off. Settings transforms remain clearly modelled.

Where a current source-backed CPU multi-thread score is stored, workstation scoring uses it instead of deriving all application performance from gaming.

Active used marketplace listings are explicitly treated as asking prices, not completed-sale evidence. Asking-price data alone cannot produce a near-certain valuation.


## V10.5 public UI cleanup
- Removed public Firebase/eBay/Best Buy backend URL configuration from Data Lab and Retail.
- Public users no longer see API/provider setup controls.
- Retail and used-market providers are automatic from the user's perspective.
- Added consistent favicon + manifest links to every HTML page.
- Fixed duplicate Retail/Data Lab navigation items.


## V10.5 transitions
- Added a smooth fade-in whenever PCDeal is first opened.
- Added the same fade-in when navigating between internal PCDeal pages/tabs.
- Added a subtle fade-out before internal navigation to avoid abrupt page changes.
- Honors the user's reduced-motion accessibility preference.


## V10.5 — Exact product catalog foundation

PCDeal now identifies non-CPU/GPU hardware at the product/family level for RAM, storage, motherboards, PSUs, coolers and cases.

Examples:
- Corsair Vengeance DDR5
- Kingston FURY Beast DDR5
- Samsung 990 PRO
- Kingston KC3000
- WD_BLACK SN850X
- Corsair RM850x
- Seasonic FOCUS GX
- MSI MAG B650 Tomahawk WiFi
- Gigabyte X870 Eagle WiFi7
- Arctic Liquid Freezer III
- Noctua NH-D15
- Corsair 5000D Airflow
- Lian Li O11 Dynamic EVO

### Important scope
No static website can truthfully contain every hardware SKU ever manufactured. V10.5 therefore uses:
1. a growing local exact-product catalog,
2. alias/fuzzy recognition,
3. brand inference,
4. generic category fallback when exact identity is unavailable.

The pricing engine now prefers exact product names for market searches. This is more accurate than valuing every item only by capacity/type.

Future catalog growth should come from curated product-data imports rather than pretending the local list is exhaustive.

## V10.5 — PCDeal Master Hardware Database

V10 moves hardware identity out of hand-written frontend arrays and into a generated, sharded database.

The included GitHub Action can merge:
- `docyx/pc-part-dataset` (MIT; upstream reports 66,778 parts in its July 23, 2025 snapshot)
- `BuildCores OpenDB` (ODC-By 1.0; community-driven structured hardware database)
- PCDeal manufacturer-verified/manual overrides

The database builder normalizes category/name/brand/model/variant/specs/identifiers, preserves provenance, deduplicates overlapping records, and outputs:
- `master-db/manifest.json`
- category search indexes
- 256-way hash shards per category
- attribution metadata

The checked-in database begins as a small seed so GitHub Pages works immediately. Run **Actions → Update PCDeal Master Database → Run workflow** once after uploading V10 to generate the large catalog in your own repository.

PCDeal does not scrape PCPartPicker live. Retail prices, used-market evidence, benchmarks, and product identity remain separate data layers.


## V10.5 — Analyzer recognition correction
- Robust asking-price extraction: `$2200`, `$2,200`, `2200 CAD`, `asking 2200`, and `2.2k` style formats.
- Product-catalog shorthand recognition for motherboards, storage and PSUs.
- `B650 Tomahawk` resolves to MSI MAG B650 Tomahawk WiFi when the catalog match is strong.
- `SN850X 2TB` resolves to Western Digital SN850X, NVMe, 2TB.
- `RM850x` resolves to Corsair RM850x 850W.
- RAM speed is captured and displayed; exact RAM/storage model fields are available.
- Missing-field alerts now identify the exact missing requirement instead of generically asking for CPU/GPU/price.
- Internal motherboard/PSU/storage/RAM value references use exact-product identity where available. These are still model estimates, not live market quotes.


## V10.5 — Canonical recognition pipeline

V10.5 fixes the shorthand test failures discovered on the live site.

Canonicalization examples:
- `B650 Tomahawk` -> `MSI MAG B650 Tomahawk WiFi`
- `RM850x` -> `Corsair RM850x 850W`
- `SN850X 2TB` -> `WD_BLACK SN850X` + `2TB` + `NVME M.2`
- `$2200`, `$2,200`, `2200 CAD`, `asking 2200`, and `2.2k` -> asking price
- `32GB DDR5 6000` -> RAM capacity/type plus `6000` speed

Recognition is now treated in levels: exact product identity, partial identity, generic category detection, and unknown. A generic capacity/type result should not be presented as equivalent to an exact SKU match.

The Review/Edit detected-parts section is forced closed on page load to keep the Analyzer compact.


## V10.5 — Exact-match UI cleanup

When an exact database product is recognized:
- the canonical motherboard/PSU is selected in its database dropdown,
- the duplicate custom override field is cleared and hidden,
- canonical values are persisted into PCDeal state.

Custom/exact-model inputs remain available only when PCDeal cannot resolve the product to the database.

Storage exact-model identity remains visible because it is useful for pricing and verification.


## V10.5 — Cooler + Case Master Database UI

CPU Cooler and Case no longer use generic "premium / mid-range / 240mm AIO" buckets as their primary selector.

The Analyzer now loads exact products from:
- `master-db/index/cpu-cooler.json`
- `master-db/index/case.json`

The shipped ZIP includes a small working seed. The existing `Update PCDeal Master Database` GitHub Action imports the open catalogs and regenerates these indexes, so the dropdowns automatically expand without another UI rewrite.

Listing detection searches each listing line against the master database and can select the best matching exact cooler/case model. Exact cooler/case names are also available as pricing search keys.
