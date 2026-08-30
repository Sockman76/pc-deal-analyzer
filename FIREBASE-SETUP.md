# PCDeal V6 Firebase Setup

The Firebase web configuration is already connected in `firebase-client.js`.

## Firebase Console steps
1. Authentication → Sign-in method → enable **Google**.
2. Authentication → Sign-in method → enable **Email/Password**.
3. Authentication → Settings → Authorized domains → add `sockman76.github.io` if it is not already present.
4. Firestore Database → Create database. Choose a region close to your users. Start locked/production mode.
5. Firestore Database → Rules → replace the rules with the contents of `firestore.rules`, then Publish.

## GitHub Pages
Upload all V6 files to the root of the `pc-deal-analyzer` repository. Keep GitHub Pages pointed at the same branch/root you already use.

## Security
The Firebase web config is intended for browser apps and is not a service-account secret. Do not commit Firebase service-account JSON/private keys. Firestore security is enforced with Authentication + Firestore Rules.
