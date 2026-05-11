// functions/leaderboard.js — v1
//
// Generic top-10 leaderboard backed by Cloudflare KV. Designed to support
// every score-based game on the site — keys are namespaced by `{game}_{level}`
// so adding new games requires zero backend changes (only KV writes/reads).
//
// One-time Cloudflare setup (manual, in dashboard):
//   1. Workers & Pages → KV → Create namespace, e.g. "solthecat-leaderboards"
//   2. Pages → solthecat-site → Settings → Bindings → Add KV binding:
//      Variable name: LEADERBOARDS
//      Namespace:     solthecat-leaderboards
//   3. Re-deploy (push triggers fresh build with binding live).
//
// Endpoints:
//   GET  /leaderboard?game=catch-cats&level=easy
//        → { entries: [{name, score, date}, ...up to 3] }
//
//   POST /leaderboard
//        body: { game, level, score, name }
//        → { success, rank, top: [up to 3] }
//
// Anti-cheat (light): per-game/level max score caps reject obviously
// fabricated submissions. Not foolproof — for a casual fan site this is
// sufficient. If a leaderboard gets polluted, edit the key directly in
// the Cloudflare KV dashboard.

const TOP_N_STORED = 10;
const TOP_N_RETURNED = 3;
const MAX_NAME_LEN = 12;
// Allow Latin letters, Greek letters, digits, dash, underscore, space.
const NAME_REGEX = /^[A-Za-z0-9_\-\sͰ-Ͽ]{1,12}$/;

// Maximum plausible scores per game/level. Submissions exceeding the cap
// are rejected. Generous to avoid blocking honest top players.
//
// quiz_<city>: per-episode quiz boards (8 questions) — no cap entry per
// city since slugs are dynamic; the 1-12 char name regex + 0-8 score range
// already make cheating uninteresting.
const MAX_SCORES = {
  "catch-cats_easy": 80,
  "catch-cats_medium": 120,
  "catch-cats_hard": 200,
  "quick-paws_default": 200,
  "mapquiz_default": 5000,
  "spotcity_default": 5,
  "solsnap_default": 200,
  // Pawprints score = seconds left when matched all pairs (60s round).
  "pawprints_default": 60,
  // Puzzles: score = 9999 - elapsed seconds (no time limit). Cap matches
  // the formula's max, so any honest solve falls within the cap.
  "puzzlemap_default": 9999,
  "royalpuzzle_default": 9999,
  // Cat Sort: score = 9999 - total run seconds (across all 5 levels).
  "cat-sort_default": 9999,
};

export async function onRequest(context) {
  const { request, env } = context;
  const kv = env.LEADERBOARDS;

  if (!kv) {
    return json({ error: "KV namespace LEADERBOARDS not bound" }, 500);
  }

  if (request.method === "GET") {
    return handleGet(request, kv);
  }
  if (request.method === "POST") {
    return handlePost(request, kv);
  }
  return new Response("Method not allowed", { status: 405 });
}

async function handleGet(request, kv) {
  const url = new URL(request.url);
  const game = url.searchParams.get("game");
  const level = url.searchParams.get("level") || "default";
  if (!game) return json({ error: "Missing 'game' param" }, 400);

  const key = `${sanitizeId(game)}_${sanitizeId(level)}`;
  const list = (await kv.get(key, "json")) || [];
  return json({ entries: list.slice(0, TOP_N_RETURNED) });
}

async function handlePost(request, kv) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }
  const { game, level = "default", score, name } = body || {};

  if (!game || typeof game !== "string") {
    return json({ error: "Missing or invalid 'game'" }, 400);
  }
  if (
    typeof score !== "number" ||
    !Number.isFinite(score) ||
    score < 0
  ) {
    return json({ error: "Invalid score" }, 400);
  }
  const trimmedName = typeof name === "string" ? name.trim() : "";
  if (!NAME_REGEX.test(trimmedName)) {
    return json(
      { error: "Invalid name (1-12 chars, Latin/Greek/digits/space)" },
      400
    );
  }

  const key = `${sanitizeId(game)}_${sanitizeId(level)}`;
  const cap = MAX_SCORES[key];
  if (cap !== undefined && score > cap) {
    return json({ error: `Score exceeds plausible max for ${key}` }, 400);
  }

  const list = (await kv.get(key, "json")) || [];
  const entry = {
    name: trimmedName.slice(0, MAX_NAME_LEN),
    score: Math.floor(score),
    date: new Date().toISOString().slice(0, 10),
  };
  list.push(entry);
  list.sort((a, b) => b.score - a.score);
  const trimmed = list.slice(0, TOP_N_STORED);
  await kv.put(key, JSON.stringify(trimmed));

  // Find rank of THIS entry (1-indexed). Compare by reference markers.
  const rank =
    trimmed.findIndex(
      (e) => e.name === entry.name && e.score === entry.score && e.date === entry.date
    ) + 1;

  return json({
    success: true,
    rank: rank || null,
    top: trimmed.slice(0, TOP_N_RETURNED),
  });
}

// Restrict path-like keys to a safe subset.
function sanitizeId(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);
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
