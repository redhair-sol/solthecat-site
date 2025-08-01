import React from "react";
import { NavLink, Link } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Topbar() {
  const linkClasses = ({ isActive }) =>
    `px-4 py-2 no-underline transition-colors ${
      isActive
        ? "text-purple-700"
        : "text-black hover:text-pink-300"
    }`;

  return (
    // Με position:fixed και πολύ υψηλό z-index
    <header className="fixed top-0 left-0 z-[9999] w-full">
      <div className="w-full bg-[#fef8f8] py-1 shadow-sm relative">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between relative h-16">
          {/* Mobile hamburger */}
          <div className="md:hidden z-10">
            <Sidebar />
          </div>

          {/* Κεντραρισμένο logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img
                src="/icons/soladventures.png"
                alt="SOLadventures"
                className="!h-16 md:!h-12 object-contain"
              />
            </Link>
          </div>

          {/* Spacer δεξιά (mobile) */}
          <div className="w-6 md:hidden" />
        </div>
      </div>

      {/* Desktop navigation */}
      <nav className="hidden md:block w-full bg-[#f8bbd0]/90 backdrop-blur-md shadow-md py-0.1">
        <div className="max-w-screen-xl mx-auto px-4">
          <div
            className="flex space-x-8 text-2xl font-medium"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            <NavLink to="/" className={linkClasses}>Home</NavLink>
            <NavLink to="/episodes" className={linkClasses}>Episodes</NavLink>
            <NavLink to="/map" className={linkClasses}>Map</NavLink>
            <NavLink to="/gallery" className={linkClasses}>Gallery</NavLink>
            <NavLink to="/games" className={linkClasses}>Games</NavLink>
            <NavLink to="/whoissol" className={linkClasses}>About</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
