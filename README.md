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


**PCDeal — built to make used-PC listings easier to understand before you spend your money.**
