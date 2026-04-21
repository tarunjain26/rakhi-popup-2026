# 🎀 Rakhi Pop-Up 2026 — Kota

PWA Exhibition Management App · Hotel Swan, Aerodrome Circle, Kota
19–20 July 2026

---

## Folder Structure

```
rakhi-popup-2026/
├── public/
│   ├── index.html      ← Main app
│   ├── manifest.json   ← PWA manifest
│   ├── sw.js           ← Service worker (auto-updates)
│   ├── icon-192.png    ← App icon
│   └── icon-512.png    ← App icon (large)
├── vercel.json         ← Vercel deployment config
├── .gitignore
└── README.md
```

## Firebase Config Location

Open `public/index.html` and find (~line 15):

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

Replace with your Firebase project values.

## Firestore Collections
- `exhibitors` — exhibitor records
- `visitors` — visitor check-ins
- `costs` — cost & revenue entries
