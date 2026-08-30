# PCDeal V5.1.2

PCDeal V5.0 is a multi-page used-PC buying, comparison, inspection, performance and flipping toolkit.

## Major V5 changes
- Includes the full 1–50 feature roadmap in a multi-page architecture.
- Premium, descriptive Compare page.
- FPS results only recalculate when **Estimate FPS** is pressed.
- New Inspector Mode.
- New local My Deals / Watchlist / Leaderboard / Price History page.
- New Tools page with Build Cost, PC Finder, Upgrade Simulator, Listing Generator and Component Intelligence.
- Expanded Hardware page with RAM layout, XMP/EXPO, PCIe, BIOS, GPU-fit and radiator-fit analysis.
- Expanded Buying page with Deal Heat, urgency, missing-spec grading, negotiation message generation, warranty/receipt tracker and photo checklist.
- Expanded Flip page with max flip buy price, part-out value and sale-strategy comparison.

## Important data limitation
PCDeal V5 does **not** claim to pull live marketplace prices or measured benchmark data. “Market position,” FPS, values, power, thermals and price history are explicitly internal/local models unless you later connect real benchmark or market data.

## Deployment
Keep your existing unchanged database files in the repository root:
- `platform.js`
- `cpu-data.js`
- `gpu-data.js`
- `parts.js`

Upload/replace the V5 files from this package in the same repository root.

## Pages
- `index.html` — Analyzer
- `dashboard.html` — Overall scores / deal heat / fingerprint
- `performance.html` — FPS / bottleneck / power / thermals
- `hardware.html` — compatibility / values / platform / RAM / PCIe / BIOS / fit
- `buying.html` — negotiation / risk / questions / checklists
- `compare.html` — premium two-PC comparison
- `flip.html` — resale / profit / part-out
- `inspector.html` — in-person checklist
- `deals.html` — saved deals / watchlist / leaderboard / local history
- `tools.html` — build cost / finder / upgrade simulator / listing generator / components

## Cache
V5 pages reference `pcdeal-v5.js?v=5` and `styles.css?v=5`.


## V5.1.2.2 Active Tab Fix Experience

V5.1.2 adds a presentation-only visual layer without changing PCDeal's valuation or parsing logic:

- moving ambient glow background and drifting grid
- pointer-following desktop spotlight
- page-load and scroll-reveal animations
- button ripple and processing sweep feedback
- animated result emphasis
- polished hover sheen for cards/panels
- animated navigation indicators
- top scroll-progress line
- optional FX toggle saved locally
- back-to-top control
- keyboard shortcuts on the Analyzer (`/` to focus the listing and Ctrl/Cmd + Enter to detect)
- lightweight page transitions between PCDeal tools
- `prefers-reduced-motion` support

The visual layer is isolated in `pcdeal-visuals.js` and the V5.1.2 section of `styles.css`, so it can be refined without touching analysis logic.


## V5.1.2 navigation fix

The currently active navigation tab is now inert. Clicking Analyzer while already on Analyzer, or any other tab while already on that page, no longer reloads or redirects the page. Other navigation links continue to work normally.
