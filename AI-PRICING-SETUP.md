# PCDeal V8.4 AI Pricing Setup

The Hardware pricing engine works without AI. AI is optional and only explains the structured price evidence PCDeal already calculated.

## Why the API key is server-side
Do not put a Gemini API key into `firebase-client.js` or any GitHub Pages JavaScript.

V8.4 includes a Firebase Function called `pricingAi` and reads the key from Firebase Secret Manager.

## Setup

From the extracted PCDeal folder:

```bash
firebase login
firebase use pcdeal-d8f08
firebase functions:secrets:set GEMINI_API_KEY
firebase deploy --only functions:pricingAi
```

Paste your Gemini API key only when the Firebase CLI asks for the secret value.

The included function defaults to:
`gemini-3.7-flash`

After deployment, the normal function URL is typically:

```text
https://us-central1-pcdeal-d8f08.cloudfunctions.net/pricingAi
```

PCDeal uses that as its default. You can change the endpoint in Data Lab if Firebase gives you a different URL.

## Used marketplace evidence

For live used-listing evidence, also configure the eBay backend described in `MARKET-DATA-SETUP.md`.

Without eBay, the pricing engine still works but confidence is lower because it relies more heavily on PCDeal's internal used-value model and static references.
