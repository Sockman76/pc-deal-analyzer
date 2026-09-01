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
