// src/components/SolBrand.jsx
import React from "react";

export default function SolBrand({ size = "2.5rem", centered = false }) {
  return (
    <div
      style={{
        fontFamily: '"Dancing Script", cursive',
        color: "#aa4dc8",
        fontWeight: 700,
        fontSize: size,
        textAlign: centered ? "center" : "left",
      }}
    >
      SOLadventures <span style={{ marginLeft: "0.2rem" }}>👑</span>
    </div>
  );
}
