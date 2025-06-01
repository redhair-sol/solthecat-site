import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import LogoTextMobile from "./LogoTextMobile";

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sliding menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#f8bbd0] z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-lg flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b border-pink-300">
          <LogoTextMobile />
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="flex flex-col p-4 gap-4 text-2xl text-black"
          style={{ fontFamily: '"Dancing Script", cursive' }}
        >
          <Link to="/" onClick={onClose} className="hover:underline">Home</Link>
          <Link to="/episodes" onClick={onClose} className="hover:underline">Episodes</Link>
          <Link to="/map" onClick={onClose} className="hover:underline">Map</Link>
          <Link to="/gallery" onClick={onClose} className="hover:underline">Gallery</Link>
          <Link to="/whoissol" onClick={onClose} className="hover:underline">About</Link>
          {/* <Link to="/contact" onClick={onClose} className="hover:underline">Contact</Link> */}
        </nav>

        {/* Animated SOL video */}
        <div className="mt-auto p-4">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-h-52 object-contain mx-auto rounded-xl shadow-md"
          >
            <source src="/images/sol-menu.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </>
  );
}
