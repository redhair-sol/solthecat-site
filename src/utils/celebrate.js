import confetti from "canvas-confetti";

// Shared celebration moment for any game win or successful completion.
export function celebrate() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    zIndex: 9999,
  });
}
