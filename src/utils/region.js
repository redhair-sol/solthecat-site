// src/utils/region.js
//
// Continent classifier from lat/lng. Used as a runtime fallback in Episodes.jsx
// so that new entries in public/episodes.json don't HAVE to ship with a `region`
// field — if missing, we derive it from `location.lat/lng`.
//
// Bounding boxes are pragmatic, not geographically perfect. Edge cases handled:
//   - Southern Mediterranean coast (Tunis, Cairo, Marrakech) → "africa", not "europe"
//   - Central America (Panama, Costa Rica) → "north-america", not "south-america"
//   - Northern South America (Cartagena, Caracas) → "south-america", not "north-america"
//   - Hawaii → "north-america" (politically USA, matches visitor expectation)

export function detectRegion(lat, lng) {
  if (lat == null || lng == null) return null;
  // Pacific Oceania
  if (lat >= -50 && lat <= 0 && lng >= 110 && lng <= 180) return "oceania";
  // Asia — east of lng 45
  if (lat >= -10 && lat <= 78 && lng >= 45 && lng <= 180) return "asia";
  // North African Mediterranean coast — BEFORE Europe (overlapping lat band)
  if (lat >= 28 && lat <= 37.5 && lng >= -10 && lng <= 35) return "africa";
  // Europe
  if (lat >= 35 && lat <= 72 && lng >= -25 && lng <= 45) return "europe";
  // Africa (sub-Saharan + remainder)
  if (lat >= -35 && lat <= 38 && lng >= -18 && lng <= 52) return "africa";
  // Americas — North (lat >= 13, no ambiguity)
  if (lat >= 13 && lat <= 84 && lng >= -170 && lng <= -50) return "north-america";
  // Central America vs N. South America (lat 7.5–13 strip)
  if (lat > 7.5 && lat < 13 && lng > -77 && lng <= -34) return "south-america";
  if (lat > 7.5 && lat < 13 && lng >= -170 && lng <= -77) return "north-america";
  // Rest of South America (lat ≤ 7.5)
  if (lat >= -56 && lat <= 7.5 && lng >= -82 && lng <= -34) return "south-america";
  return null;
}
