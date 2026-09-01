# PCDeal Master Database — Source Attribution

PCDeal's master hardware database is designed to merge multiple open data sources.

## docyx/pc-part-dataset
- Source: https://github.com/docyx/pc-part-dataset
- License: MIT
- Upstream README reports 66,778 parts and a July 23, 2025 snapshot.
- PCDeal imports the published dataset; it does **not** need to scrape PCPartPicker live.

## BuildCores OpenDB
- Source: https://github.com/buildcores/buildcores-open-db
- License: Open Data Commons Attribution License (ODC-By) v1.0
- BuildCores describes OpenDB as a community-driven structured component database and requires attribution for public use.
- BuildCores notes that its database does not provide price/retailer data due to restrictions.

## PCDeal official/manual overrides
PCDeal may add manufacturer-verified corrections/overrides with source URLs. These take precedence over weaker imported fields.

## Pricing separation
Product identity/specifications belong in the master product database.
Current retail prices, used-market asking prices, completed-sale evidence, and benchmark data remain separate evidence layers with their own timestamps and provenance.
