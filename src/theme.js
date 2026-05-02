// Central color palette. Add new colors here and import in styled-components
// instead of repeating hex codes across files. Color drift across pages is
// the audit's #1 maintainability issue — keep new colors in this file.
//
// Naming reflects role, not appearance: `primary` is the main heading purple,
// `accent` is buttons/links, `surface` is card backgrounds, etc.

export const colors = {
  // Primary purples (headings, body)
  primary: "#6a1b9a",       // H1, page titles
  primarySoft: "#5b2b7b",   // body text, subheadings
  primaryDeep: "#4a005f",   // hero italic, emphasized labels
  primaryHilite: "#8e24aa", // quote titles, info accents

  // Accent purples (buttons, links, polylines)
  accent: "#aa4dc8",        // map polyline, hover, secondary buttons
  accentLight: "#c187d8",   // primary CTA buttons
  accentPink: "#d35ca3",    // game card titles, back links

  // Pinks (toggles, hover, surfaces)
  pinkSoft: "#f8bbd0",      // toggle active bg, hover surfaces, games card
  pinkSurface: "#fff3f8",   // quote/badge box bg
  pinkBgFrom: "#fff1f9",    // page gradient start
  pinkBgTo: "#fce4ec",      // page gradient end

  // Live stream badge
  liveGreen: "#47c9a0",
};

// Shared gradient used as the default page background.
export const gradients = {
  pageBg: `linear-gradient(to bottom, ${colors.pinkBgFrom}, ${colors.pinkBgTo})`,
};

// Common box shadows.
export const shadows = {
  button: "0 4px 10px rgba(170, 77, 200, 0.3)",
  card: "0 4px 12px rgba(0, 0, 0, 0.05)",
  cardElevated: "0 4px 12px rgba(0, 0, 0, 0.08)",
  tile: "0 4px 16px rgba(170, 77, 200, 0.15)",
};
