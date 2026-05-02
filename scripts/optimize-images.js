#!/usr/bin/env node
// Batch-convert PNG/JPG images under public/ to WebP, in place (sibling .webp).
// Skips images that already have a WebP sibling (idempotent — safe to re-run).
//
// Usage:
//   node scripts/optimize-images.js              # convert only
//   node scripts/optimize-images.js --delete-png # also delete originals after success
//
// We KEEP originals by default so you can verify the WebP output before
// deleting. Once verified, re-run with --delete-png.

import { readdir, stat, unlink } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = join(fileURLToPath(import.meta.url), "..", "..");
const TARGETS = ["public/episodes", "public/images"];
const QUALITY = 80;
const SKIP_DIRS = new Set(["dressup"]); // skip dressup paper-doll pieces (transparency-sensitive)

const deletePng = process.argv.includes("--delete-png");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* walk(join(dir, entry.name));
    } else {
      yield join(dir, entry.name);
    }
  }
}

async function exists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skipped = 0;
let deleted = 0;

for (const target of TARGETS) {
  const dir = join(ROOT, target);
  if (!(await exists(dir))) continue;
  for await (const file of walk(dir)) {
    const ext = extname(file).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") continue;

    const webp = file.slice(0, -ext.length) + ".webp";
    const before = (await stat(file)).size;
    totalBefore += before;

    if (await exists(webp)) {
      const afterExisting = (await stat(webp)).size;
      totalAfter += afterExisting;
      skipped++;
      if (deletePng) {
        await unlink(file);
        deleted++;
        console.log(`🗑  ${basename(file)} (kept ${basename(webp)})`);
      }
      continue;
    }

    try {
      await sharp(file).webp({ quality: QUALITY }).toFile(webp);
      const after = (await stat(webp)).size;
      totalAfter += after;
      converted++;
      const pct = ((1 - after / before) * 100).toFixed(0);
      console.log(`✓ ${basename(file)} → ${basename(webp)}  -${pct}%`);
      if (deletePng) {
        await unlink(file);
        deleted++;
      }
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
      totalAfter += before; // count original size if conversion failed
    }
  }
}

const pct = totalBefore ? ((1 - totalAfter / totalBefore) * 100).toFixed(0) : 0;
console.log(
  `\nConverted ${converted}, skipped ${skipped} (already had .webp), deleted ${deleted} originals.`
);
console.log(
  `Total: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(
    totalAfter /
    1024 /
    1024
  ).toFixed(1)} MB  (-${pct}%)`
);
