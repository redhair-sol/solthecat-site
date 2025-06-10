import React from "react";
import { NavLink, Link } from "react-router-dom";
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
      {/* Topbar */}
      <div className="w-full bg-[#fef8f8] py-1 shadow-sm relative">
        <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-between relative h-14">
          {/* Left: Hamburger */}
          <div className="md:hidden z-10">
            <Sidebar />
          </div>

          {/* Center: Logo with Link */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img
                src="/icons/soladventures.png"
                alt="SOLadventures"
                className="!h-14 md:!h-11 object-contain"
              />
            </Link>
          </div>

          {/* Right: Spacer */}
          <div className="w-6 md:hidden" />
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block w-full bg-[#f8bbd0]/90 backdrop-blur-md shadow-md py-1">
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
