# PCDeal Security Policy

## Supported Version

PCDeal is actively developed and updated.

| Version | Supported |
| ------- | --------- |
| 8.2.x   | ✅ |
| < 8.2   | ❌ |

Only the newest public version of PCDeal receives security fixes.

## Reporting a Security Issue

If you discover a security vulnerability in PCDeal, please do not publicly post sensitive details until the issue has been reviewed.

You can report issues through the GitHub repository.

When reporting a vulnerability, please include:

- A description of the issue
- The page or feature affected
- Steps to reproduce it
- Screenshots or console errors if available
- What impact you believe the issue could have

## Account and Firebase Security

PCDeal uses Firebase Authentication and Cloud Firestore for account features.

User data is protected using Firebase Authentication and Firestore security rules that restrict access to the authenticated user's own data.

Sensitive server credentials, private keys, OAuth client secrets, and service-account credentials must never be committed to the public GitHub repository.

Public Firebase web configuration is used only to identify the Firebase web application and is not treated as a secret.

## Marketplace and External APIs

PCDeal may use external services for retail pricing, marketplace information, or hardware data.

Private API secrets must remain server-side and must not be included directly in client-side JavaScript.

## Responsible Disclosure

Please allow reasonable time for a reported security issue to be investigated and fixed before publicly disclosing technical details.
