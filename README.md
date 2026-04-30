# SOLadventures Website

A stylish and responsive React website for @solthecat01 — the traveling queen 🐾

## 🔗 Live Site

[https://solthecat.com](https://solthecat.com)

## 📦 Tech Stack

- React 18 + Vite 6
- React Router DOM 7
- Tailwind CSS 3 + styled-components 6
- Leaflet (interactive map)
- Framer Motion (animations)
- HLS.js (live SolCam stream)
- react-helmet-async (per-page SEO)
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

The legacy `npm run deploy` script (gh-pages) is kept for fallback only — production deploy is via Cloudflare Pages, not GitHub Pages.

## 📁 Project Structure

```
/public
  /episodes        episode images (per-city PNGs)
  /icons           favicons, paw markers, instagram icon
  /images          hero, watermarks, product shots
  /data            quiz/product/quote JSON
  episodes.json    episode metadata
  sitemap.xml, robots.txt, _headers, _redirects
/src
  /components      Topbar, Sidebar, SolButton, etc.
  /pages           19 route components (Home, Episodes, Map, Gallery, Games, ...)
  /context         LanguageContext (EN/EL toggle)
  /hooks           useLiveStatus, useStreakBadges
  /data            quiz data, city JSON files
  /styles          GlobalStyle.js
  App.jsx, main.jsx, index.css
```

## 🔒 Security

`public/_headers` ships with HSTS, X-Frame-Options, X-Content-Type-Options,
Referrer-Policy, Permissions-Policy, and a `Content-Security-Policy-Report-Only`
directive. CSP runs in **report-only** mode — violations are logged in browser
DevTools but nothing is blocked. Promote to enforced CSP only after verifying
that no legitimate resource triggers a violation.

## 📸 Instagram

Follow the adventures: [@solthecat01](https://instagram.com/solthecat01)

---

## ✍️ License

Private use only — All rights reserved 🐾
