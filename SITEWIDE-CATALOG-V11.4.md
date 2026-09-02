# PCDeal V11.4 Site-wide Catalog Upgrade

All major user-facing tools load the same canonical retail catalog and pricing service.

Priority:
1. Exact Canada Computers current-new record.
2. Exact Amazon Canada fallback when Canada Computers has no exact record.
3. Lower-confidence legacy/category fallback only when no current exact record exists.

Open-box records must not become the new-retail baseline.

Pages wired to the shared service:
Analyzer, Hardware, Retail, Compare, Flip, Buying, Dashboard, Inspector, Report,
Performance, Tools, Data Lab, and Deals.

The bundled seed remains a verified subset. The scheduled collector is responsible
for expanding the Canada Computers catalog rather than pretending uncollected
products are already present.
