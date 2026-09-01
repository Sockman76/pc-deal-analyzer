# PCDeal V8.5 Retail Data Setup

V8.5 no longer stores a Best Buy API key in browser storage.

## Configure Best Buy securely

From the extracted project folder:

```bash
firebase login
firebase use pcdeal-d8f08
firebase functions:secrets:set BESTBUY_API_KEY
firebase deploy --only functions:bestBuySearch
```

Paste the Best Buy developer API key only when the Firebase CLI asks for the secret.

The browser calls the deployed `bestBuySearch` Firebase Function. The API key never ships to GitHub Pages and is never written to localStorage.

Default endpoint:
`https://us-central1-pcdeal-d8f08.cloudfunctions.net/bestBuySearch`


## V10.8 pricing policy
New retail: exact-SKU observations from Amazon Canada, Best Buy Canada, Canada Computers, and Newegg Canada. Store price, seller type, stock status, source and timestamp. Prefer retailer-direct listings and reject obvious outliers.
Used: separate fresh used-market observations. Retail depreciation is only a fallback and must be labeled as such. Analyzer deal scoring uses used value; Hardware/Retail can show both.
