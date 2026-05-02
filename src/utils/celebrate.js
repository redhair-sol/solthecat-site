import confetti from "canvas-confetti";

// Shared celebration moment for any game win or successful completion.
// - useWorker: false avoids silent worker failures we've seen in some browsers.
// - z-index 100000 sits above everything (Leaflet uses up to 9999).
// - Three bursts (one centered, two from the sides) make the effect easy to
//   notice and survive the case where one origin is clipped by a stacking
//   context.
export function celebrate() {
  const base = {
    particleCount: 80,
    spread: 70,
    startVelocity: 45,
    zIndex: 100000,
    useWorker: false,
    disableForReducedMotion: false,
  };
  confetti({ ...base, origin: { x: 0.5, y: 0.6 } });
  setTimeout(() => confetti({ ...base, origin: { x: 0.15, y: 0.7 } }), 150);
  setTimeout(() => confetti({ ...base, origin: { x: 0.85, y: 0.7 } }), 300);
}
