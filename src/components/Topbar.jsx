// src/components/Topbar.jsx

import { Link } from "react-router-dom";
import LogoText from "./LogoText";
import Sidebar from "./Sidebar";

export default function Topbar() {
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
            className="flex space-x-8 text-2xl text-black font-medium"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/episodes" className="hover:underline">Episodes</Link>
            <Link to="/map" className="hover:underline">Map</Link>
            <Link to="/gallery" className="hover:underline">Gallery</Link>
            <Link to="/games" className="hover:underline">Games</Link>
            <Link to="/whoissol" className="hover:underline">About</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
