// src/components/LogoTextMobile.jsx

import React from "react";
import { Link } from "react-router-dom";

export default function LogoTextMobile() {
  return (
    <div className="flex justify-center my-4">
      <Link to="/" className="hover:opacity-90 transition">
        <h1
          className="text-4xl font-bold tracking-tight
                     bg-gradient-to-r from-[#f48fb1] via-[#ce93d8] to-[#9575cd]
                     text-transparent bg-clip-text drop-shadow"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          SOLadventures{" "}
          <span className="inline-block -mt-2 ml-1">👑</span>
        </h1>
      </Link>
    </div>
  );
}
