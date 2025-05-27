import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

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
          <span className="font-bold text-lg">SOLadventures</span>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4 text-lg">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/episodes" onClick={onClose}>Episodes</Link>
          <Link to="/map" onClick={onClose}>Map</Link>
          <Link to="/gallery" onClick={onClose}>Gallery</Link>
        </nav>

        <div className="mt-auto p-mp4">
          <img
            src="/images/sol-menu.gif"
			alt="SOL the Cat animated"
            className="w-full max-h-52 object-contain mx-auto rounded-xl shadow-md"
          />
        </div>
      </div>
    </>
  );
}
