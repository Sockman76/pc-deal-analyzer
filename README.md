# PCDeal V4.0 — Multi-Page Expansion

PCDeal V4 keeps the main listing analyzer focused and moves deeper tools onto dedicated pages.

## New pages

- `index.html` — listing analyzer and detected build
- `dashboard.html` — overall PCDeal ranking and listing-quality score
- `performance.html` — game FPS modelling, bottleneck analysis, PSU headroom, value/FPS and target resolution
- `hardware.html` — compatibility, individual part values, upgrade recommendations, upgrade-path rating, component age and multi-drive storage
- `buying.html` — negotiation calculator, seller-risk score, questions to ask and used-PC testing checklist
- `compare.html` — side-by-side comparison of two listings
- `flip.html` — resale estimate, flip profit and margin

## New shared files

- `styles.css` — shared premium styling for V4 tool pages
- `pcdeal-v4.js` — shared state + all new V4 calculations

## 20-feature expansion

1. Game-specific FPS calculator
2. CPU/GPU bottleneck analyzer
3. PSU wattage/headroom check
4. Full compatibility scanner
5. Individual part value breakdown
6. Price negotiation calculator
7. Profit / flip calculator
8. Resale price estimator
9. Value-per-FPS score
10. Compare two listings
11. Upgrade recommendation engine
12. Upgrade-path rating
13. Component age analyzer
14. Used-PC testing checklist generator
15. Seller scam/risk score
16. Questions to ask seller
17. Listing quality score
18. Multi-drive storage analyzer
19. Target-resolution recommendation
20. Multi-category overall PCDeal ranking

## Important accuracy note

V4's game FPS values are **modelled estimates**, not measured benchmark results. They are designed to compare performance classes and give a useful expectation range. Real results vary by game version, settings, drivers, RAM, temperatures and other factors.

Used-market values are also heuristics based on PCDeal's component database, not live marketplace prices.

## Installation

Upload/replace these V4 files in the root of your existing GitHub Pages repository:

```text
index.html
app-v4.js
pcdeal-v3.js
pcdeal-v4.js
styles.css
dashboard.html
performance.html
hardware.html
buying.html
compare.html
flip.html
```

Keep your existing database files in the repo:

```text
platform.js
cpu-data.js
gpu-data.js
parts.js
```

The main page loads V4 after the existing V3.1 feature layer so the known-working parser remains the core.

## Shared build state

When specs are detected or changed on `index.html`, V4 stores the current build in browser `localStorage`. The dedicated tool pages read that saved build, which means users do not have to re-enter the same PC on every page.

## Storage

The main analyzer keeps the simple three storage types:

- NVME M.2
- SSD
- HDD

The Hardware page additionally scans the original listing for multiple drives, such as `1TB NVMe + 2TB HDD`.

## Version

PCDeal V4.0
