// src/utils/greekUpper.js
//
// Greek typography rule: when text is rendered in ALL CAPS, the tonos (acute
// accent) is dropped — but the dialytika (diaeresis) is preserved. CSS
// `text-transform: uppercase` does not do this on its own; it just uppercases
// each character while keeping any combining marks, producing e.g.
// "ΠΡΌΚΛΗΣΗ ΗΜΈΡΑΣ" instead of the correct "ΠΡΟΚΛΗΣΗ ΗΜΕΡΑΣ".
//
// Use this helper at the JSX site for any label that's meant to render in
// all-caps via styling. Latin text passes through cleanly.

const COMBINING_ACUTE = "́";

export function upperLocal(str) {
  if (typeof str !== "string") return str;
  // Decompose so any precomposed Greek vowels-with-tonos become base + U+0301.
  // Strip only U+0301 (combining acute) — keep U+0308 (dialytika) so words
  // like ΑΫΠΝΟΣ retain their diaeresis. Then uppercase.
  return str
    .normalize("NFD")
    .split(COMBINING_ACUTE)
    .join("")
    .toUpperCase();
}
