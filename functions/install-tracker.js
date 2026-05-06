// functions/install-tracker.js — v1
//
// Cloudflare Pages Function — global PWA install counter, stored in Cloudflare
// KV. Called by the client when the app first launches in standalone mode
// (i.e. after a successful install on Android, iOS, or desktop).
//
// One-time Cloudflare setup (manual, in dashboard):
//   1. Workers & Pages → KV → Create a namespace named "solthecat-installs"
//      (the actual name doesn't matter — only the binding does)
//   2. Pages → solthecat-site → Settings → Functions → KV namespace bindings
//      → Add binding:
//         Variable name: INSTALL_COUNTER
//         KV namespace:  solthecat-installs
//   3. Re-deploy (push to main triggers a fresh build with the binding live)
//
// Endpoints:
//   POST /install-tracker  → increment counter, return { count }
//   GET  /install-tracker  → return { count } without changing state
//
// Notes:
// - KV is eventually consistent. With low install volume the read-then-write
//   race is negligible. If the site ever sees thousands of installs/day,
//   migrate to Durable Objects for atomic increments.
// - Client dedupes via a localStorage flag, so refreshes don't double-count
//   on the same device.

export async function onRequest(context) {
  const { request, env } = context;
  const kv = env.INSTALL_COUNTER;

  if (!kv) {
    return json({ error: "KV namespace INSTALL_COUNTER not bound" }, 500);
  }

  if (request.method === "POST") {
    const current = parseInt((await kv.get("count")) || "0", 10);
    const next = current + 1;
    await kv.put("count", String(next));
    return json({ count: next });
  }

  if (request.method === "GET") {
    const current = parseInt((await kv.get("count")) || "0", 10);
    return json({ count: current });
  }

  return new Response("Method not allowed", { status: 405 });
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
