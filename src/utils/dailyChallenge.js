// src/utils/dailyChallenge.js
//
// Daily Challenge: one game/level rotation per day, picked deterministically
// from the ISO date so every visitor sees the same challenge that day.
//
// Shared between the Home page (which shows the card + Top 3 + Personal Best)
// and the games themselves (which call markDailyDoneIfMatches() on round end
// to track completion and bump the streak counter).

export const DAILY_CHALLENGES = [
  { game: "catch-cats", level: "easy",    route: "/games/catch-cats",  emoji: "🧺", titleEn: "Catch the Cats — Easy",    titleEl: "Πιάσε τις Γάτες — Εύκολο" },
  { game: "catch-cats", level: "medium",  route: "/games/catch-cats",  emoji: "🧺", titleEn: "Catch the Cats — Medium",  titleEl: "Πιάσε τις Γάτες — Μέτριο" },
  { game: "catch-cats", level: "hard",    route: "/games/catch-cats",  emoji: "🧺", titleEn: "Catch the Cats — Hard",    titleEl: "Πιάσε τις Γάτες — Δύσκολο" },
  { game: "quick-paws", level: "default", route: "/games/quick-paws",  emoji: "⚡", titleEn: "Quick Paws",               titleEl: "Γρήγορες Πατούσες" },
  { game: "mapquiz",    level: "default", route: "/games/mapquiz",     emoji: "🌍", titleEn: "Where in the World?",      titleEl: "Πού στον Κόσμο;" },
  { game: "spotcity",   level: "default", route: "/games/spotcity",    emoji: "🔍", titleEn: "Spot the City",            titleEl: "Βρες την Πόλη" },
  { game: "pawprints",  level: "default", route: "/games/pawprints",   emoji: "🐾", titleEn: "Pawprints Memory",         titleEl: "Μνήμη με Πατουσάκια" },
  { game: "puzzlemap",  level: "default", route: "/games/puzzlemap",   emoji: "🧩", titleEn: "SOL's Puzzle Map",         titleEl: "Παζλ Χάρτης της Sol" },
  { game: "royalpuzzle",level: "default", route: "/games/royalpuzzle", emoji: "🧩", titleEn: "Royal Puzzle",             titleEl: "Βασιλικό Παζλ" },
  { game: "cat-sort",   level: "default", route: "/games/cat-sort",    emoji: "🏠", titleEn: "Cat Sort",                 titleEl: "Ταξινόμηση Γατών" },
  { game: "solsnap",    level: "default", route: "/games/solsnap",     emoji: "📸", titleEn: "SolSnap",                  titleEl: "SolSnap" },
];

export function getTodayIso() {
  return new Date().toISOString().slice(0, 10);
}

// Hash yyyy-mm-dd → pool index so consecutive days don't produce neighbouring
// entries (avoids visible patterns).
export function pickDailyChallenge(isoDate) {
  let h = 0;
  for (let i = 0; i < isoDate.length; i++) {
    h = (h * 31 + isoDate.charCodeAt(i)) >>> 0;
  }
  return DAILY_CHALLENGES[h % DAILY_CHALLENGES.length];
}

export function getTodayChallenge() {
  return pickDailyChallenge(getTodayIso());
}

// Map game/level pair → localStorage best-score key. Mirrors the per-game
// key names each game page uses for its own personal best.
export function getPersonalBestKey(game, level) {
  switch (game) {
    case "catch-cats":  return `catchCats_best_${level}`;
    case "quick-paws":  return "solTap_best";
    case "mapquiz":     return "mapQuiz_best";
    case "spotcity":    return "spotCity_best";
    case "pawprints":   return "pawprints_best";
    case "puzzlemap":   return "puzzleMap_best";
    case "royalpuzzle": return "royalPuzzle_best";
    case "cat-sort":    return "catSort_best";
    case "solsnap":     return "solSnap_best";
    default:            return null;
  }
}

export function getPersonalBest(game, level) {
  const key = getPersonalBestKey(game, level);
  if (!key) return 0;
  return parseInt(localStorage.getItem(key) || "0", 10);
}

// Pretty-print a leaderboard score. Most games store the raw display value
// (points), but a couple use a composite "correct * 10000 - totalSeconds"
// encoding so that ties on max-correct are broken by speed. Decode those
// back to "X/Y · Ns" for human-readable Top 3 rows.
//
// Why ceil and not floor: a perfect 5/5 in 12s encodes as 49988
// (= 5 * 10000 - 12). floor(49988/10000) = 4, which is wrong. ceil = 5,
// which lets `correct * 10000 - score` yield the original seconds value.
// floor was the bug that displayed "4/5 · -9974s" for what was actually
// "5/5 · 26s".
//
// Backwards compat: entries written before the composite migration are
// raw 0-5 / 0-8 and stay below 10000 — display them as plain numbers so
// nothing breaks in the existing board.
export function formatScore(game, score) {
  if (game === "spotcity" && score >= 10000) {
    const correct = Math.ceil(score / 10000);
    const seconds = correct * 10000 - score;
    return `${correct}/5 · ${seconds}s`;
  }
  if (game === "quiz" && score >= 10000) {
    const correct = Math.ceil(score / 10000);
    const seconds = correct * 10000 - score;
    return `${correct}/8 · ${seconds}s`;
  }
  return String(score);
}

function isoOf(date) {
  return date.toISOString().slice(0, 10);
}

function yesterdayIso(todayIso) {
  const d = new Date(todayIso);
  d.setDate(d.getDate() - 1);
  return isoOf(d);
}

// Called from a game's "round complete" effect. If the (game, level) matches
// today's daily challenge AND we haven't already marked today done, flip the
// per-day flag and bump the streak counter.
//
// Idempotent: replaying the daily challenge on the same day is a no-op for
// streak purposes (single mark per day).
export function markDailyDoneIfMatches(game, level) {
  const today = getTodayIso();
  const challenge = pickDailyChallenge(today);
  if (challenge.game !== game || challenge.level !== level) return false;
  if (localStorage.getItem(`solDailyDone-${today}`) === "true") return true;

  localStorage.setItem(`solDailyDone-${today}`, "true");

  const raw = localStorage.getItem("solDailyStreak");
  let streak = { count: 0, lastDate: null };
  if (raw) {
    try { streak = JSON.parse(raw); } catch { /* corrupt → reset */ }
  }
  if (streak.lastDate === yesterdayIso(today)) {
    streak.count = (streak.count || 0) + 1;
  } else {
    streak.count = 1;
  }
  streak.lastDate = today;
  localStorage.setItem("solDailyStreak", JSON.stringify(streak));
  return true;
}

export function isDailyDoneToday() {
  return localStorage.getItem(`solDailyDone-${getTodayIso()}`) === "true";
}

// Returns current streak count. Returns 0 if the last completion was older
// than yesterday (broken streak).
export function getDailyStreak() {
  const raw = localStorage.getItem("solDailyStreak");
  if (!raw) return 0;
  try {
    const streak = JSON.parse(raw);
    const today = getTodayIso();
    if (streak.lastDate === today || streak.lastDate === yesterdayIso(today)) {
      return streak.count || 0;
    }
    return 0;
  } catch {
    return 0;
  }
}
