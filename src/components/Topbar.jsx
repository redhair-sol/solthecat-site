// src/components/Topbar.jsx

import React from "react";
import { NavLink } from "react-router-dom";
import LogoText from "./LogoText";
import Sidebar from "./Sidebar";

export default function Topbar() {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 transition-colors ${
      isActive
        ? "text-purple-700 border-b-4 border-[#00aaff]"
        : "text-black hover:text-pink-300 hover:underline"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Logo + mobile hamburger */}
      <div className="w-full bg-[#fef8f8] py-0.5">
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4">
          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sidebar />
          </div>

          {/* Logo */}
          <div className="flex-1 flex justify-center">
            <LogoText />
          </div>

          {/* Spacer for centering logo */}
          <div className="w-6 md:hidden" />
        </div>
      </div>

      {/* Desktop nav */}
      <nav className="hidden md:block w-full bg-[#f8bbd0]/90 backdrop-blur-md shadow-md py-0.5">
        <div className="max-w-screen-xl mx-auto px-4">
          <div
            className="flex space-x-8 text-2xl font-medium"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            <NavLink to="/" className={linkClasses}>
              Home
            </NavLink>
            <NavLink to="/episodes" className={linkClasses}>
              Episodes
            </NavLink>
            <NavLink to="/map" className={linkClasses}>
              Map
            </NavLink>
            <NavLink to="/gallery" className={linkClasses}>
              Gallery
            </NavLink>
            <NavLink to="/games" className={linkClasses}>
              Games
            </NavLink>
            <NavLink to="/whoissol" className={linkClasses}>
              About
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
