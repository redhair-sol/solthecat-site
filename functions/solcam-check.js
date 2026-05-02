// Cloudflare Pages Function: server-side proxy for the solcam HLS stream check.
//
// Why: solcam.solthecat.com is a different ORIGIN from solthecat.com (subdomains
// = different origins), so the browser blocks the direct fetch with CORS even
// in production. By calling solcam from a Pages Function, we bypass the browser
// CORS check entirely and return a clean JSON response to the client, keeping
// the production console free of error noise when the stream is offline.
//
// Returns: { live: boolean }, always HTTP 200, no caching.
//
// NOTE: This URL is duplicated in src/utils/streamUtils.js (client) and
// vite.config.js (dev middleware). The three runtimes are isolated and
// can't share imports — keep all three in sync if the stream URL ever changes.

const STREAM_URL = "https://solcam.solthecat.com/solcam/index.m3u8";

export async function onRequest() {
  let live = false;

  try {
    const upstream = await fetch(STREAM_URL, {
      method: "GET",
      cf: { cacheTtl: 0, cacheEverything: false },
      signal: AbortSignal.timeout(3000),
    });
    live = upstream.ok;
  } catch {
    live = false;
  }

  return new Response(JSON.stringify({ live }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
