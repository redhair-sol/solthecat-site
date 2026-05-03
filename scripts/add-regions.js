#!/usr/bin/env node
// Recompute / backfill the `region` field on each entry in public/episodes.json
// using the classifier in src/utils/region.js.
//
// Behavior:
//   - default       : adds `region` only to entries that don't have one
//   - --overwrite   : overwrites existing `region` values too (useful if you
//                     edit the classifier and want to reset everyone)
//
// Manual overrides in JSON are kept by default. Use --overwrite only when you
// deliberately want auto-detection to win.

import { readFileSync, writeFileSync } from "node:fs";
import { detectRegion } from "../src/utils/region.js";

const overwrite = process.argv.includes("--overwrite");
const path = "public/episodes.json";
const data = JSON.parse(readFileSync(path, "utf8"));

const dist = {};
let changed = 0;
let kept = 0;

for (const ep of data) {
  const lat = ep.location?.lat;
  const lng = ep.location?.lng;
  const detected = detectRegion(lat, lng);

  if (ep.region && !overwrite) {
    kept++;
    dist[ep.region] = (dist[ep.region] || 0) + 1;
    continue;
  }

  if (detected) {
    if (ep.region !== detected) changed++;
    ep.region = detected;
    dist[detected] = (dist[detected] || 0) + 1;
  } else {
    const t = typeof ep.title === "object" ? ep.title.en : ep.title;
    console.warn(`✗ no region detected for #${ep.id} ${t} (lat=${lat}, lng=${lng})`);
  }
}

writeFileSync(path, JSON.stringify(data, null, 2));

console.log(`Updated ${changed}, kept manual ${kept}, total ${data.length}`);
console.log("Distribution:");
for (const r of Object.keys(dist).sort()) console.log(`  ${r}: ${dist[r]}`);
