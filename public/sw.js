// Minimal service worker for SOLadventures PWA.
// - Caches the app shell so the site works offline as a fallback.
// - Network-first for HTML so content updates propagate immediately.
// - Lets the browser handle other requests (CDN/HTTP cache already optimized).
//
// Bump CACHE on shell changes to invalidate old caches.

const CACHE = "sol-v1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(["/", "/manifest.json"]))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  // Navigation: network-first, fallback to cached shell when offline.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => caches.match("/"))
    );
  }
  // All other requests pass through to the network with browser cache.
});
