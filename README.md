# SOLadventures Website

A stylish and responsive React website for @solthecat01 — the traveling queen 🐾

## 🔗 Live Site

[https://solthecat.com](https://solthecat.com)

## 📦 Tech Stack

- React 18 + Vite 6
- React Router DOM 7
- Tailwind CSS 3 + styled-components 6
- Leaflet (interactive map with cinematic flyTo per city)
- Framer Motion (animations)
- HLS.js (live SolCam stream)
- react-helmet-async (per-page SEO)
- @fontsource/* (self-hosted Google Fonts — privacy + tighter CSP)
- Hosted on Cloudflare Pages
- Custom domain: `solthecat.com`

## 🚀 Local Development

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → /dist
npm run preview      # serve /dist locally for sanity check
npm run lint         # ESLint
```

## 🌐 Deployment

The `main` branch is connected to **Cloudflare Pages** for auto-deploy:

1. `git push origin main` → Cloudflare builds and deploys to https://solthecat.com
2. Pushing any other branch creates a **preview deployment** at `<branch>.<project>.pages.dev`

## 📁 Project Structure

```
/functions
  solcam-check.js  Cloudflare Pages Function — server-side proxy for the
                   solcam HLS stream check (avoids cross-origin CORS).
/public
  /episodes        episode images (WebP, 800×800)
  /icons           favicons, paw markers, instagram icon (WebP)
  /images          hero, watermarks, product shots (WebP)
  /data            quiz/product/quote JSON
  episodes.json    episode metadata (50 visible cities)
  sitemap.xml, robots.txt, _headers, _redirects
/scripts
  optimize-images.js  Batch PNG/JPG → WebP via sharp. `--delete-png` removes
                      originals after verification.
/src
  /components      Topbar, Sidebar, MobileMenu, PageContainer, SolButton, ...
  /pages           Home, Episodes, Map, Gallery, WhoIsSol, SolCam, Contact,
                   Shop, Games hub + 6 mini-games (Pawprints, PuzzleMap,
                   RoyalPuzzle, QuizPlayer, SolSnap, SolsTreasureHunt),
                   NotFound (404)
  /context         LanguageContext (EN/EL toggle from Home / Contact)
  /hooks           useLiveStatus, useStreakBadges
  /data            quiz data, city JSON files
  /utils           streamUtils (solcam URL + checkStream), celebrate (confetti)
  /styles          GlobalStyle.js
  config.js        Central app constants (form URLs, re-exports stream URL)
  theme.js         Color palette + gradients + shadows
  App.jsx, main.jsx, index.css
```

## ✨ Features

- Bilingual EN/EL via global `LanguageContext` (toggle on Home and Contact)
- **Episodes search** — filter 50 city cards by title / caption / city name
- **Animated journey** on `/map` — cinematic flyTo per city with Show Journey button
- **6 mini-games** with shared confetti celebration + Play Again pattern
- **SolCam live stream** via HLS.js with offline fallback
- Per-day mood / fortune quote on Home (cached in localStorage)
- Loyalty badge with daily-visit streak

## 🔒 Security

`public/_headers` ships with HSTS, X-Frame-Options, X-Content-Type-Options,
Referrer-Policy, Permissions-Policy and an **enforced** Content-Security-Policy.
The CSP pins the three inline `<script type="application/ld+json">` blocks in
`index.html` by SHA256 hash. **If you edit any JSON-LD content (even
whitespace), recompute the hashes** — see the comment block in `index.html`
for the one-liner. Otherwise the structured data scripts will be silently
blocked and crawlers lose Schema.org metadata.

Site holds an **A+** grade on [securityheaders.com](https://securityheaders.com).

## 📸 Instagram

Follow the adventures: [@solthecat01](https://instagram.com/solthecat01)

---

## ✍️ License

Private use only — All rights reserved 🐾
