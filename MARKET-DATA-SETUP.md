# PCDeal V7.1 Market Data Setup

## Best Buy
The existing Retail page supports an optional Best Buy developer API key entered in the browser. It is not hard-coded into GitHub.

## eBay used listings — secure Firebase Function

eBay Browse API uses OAuth client credentials. Never put the eBay Client Secret in GitHub Pages.

The V7.1 package includes an optional Firebase Function.

### Requirements
- Firebase CLI
- Firebase project `pcdeal-d8f08`
- eBay Developer production Client ID and Client Secret
- A Firebase plan that supports deploying the required Cloud Function, if Firebase requires billing for your project/region

### Commands

From the project folder:

```bash
npm install -g firebase-tools
firebase login
firebase use pcdeal-d8f08
firebase functions:secrets:set EBAY_CLIENT_ID
firebase functions:secrets:set EBAY_CLIENT_SECRET
firebase deploy --only functions:ebayUsedSearch
```

Firebase will print the deployed HTTPS function URL.

Open PCDeal -> Data Lab and paste that URL into **Deployed Firebase Function URL**.

### What the function does
- obtains an eBay Application access token server-side
- searches the Browse API
- requests used, fixed-price listings
- uses `EBAY_CA` or `EBAY_US`
- returns a reduced JSON payload to PCDeal
- never sends the Client Secret to the browser

Current eBay listings are asking prices and must not be treated as completed-sale values.
