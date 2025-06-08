import React from "react";

export default function SolBrand({ size = "2.5rem", centered = false }) {
  return (
    <div
      style={{
        fontFamily: '"Dancing Script", cursive',
        color: "#9253a5",
        fontWeight: 700,
        fontSize: size,
        textAlign: centered ? "center" : "left",
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        lineHeight: 1.1,
      }}
    >
      <span>SOLadventures</span>
      <span
        style={{
          fontSize: "0.9em",
          transform: "translateY(-1px)",
        }}
      >
        👑
      </span>
    </div>
  );
}
