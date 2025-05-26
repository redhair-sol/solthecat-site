import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Hamburger – μόνο σε κινητό */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#f8bbd0] rounded shadow md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Desktop Sidebar – ΜΟΝΟ από md και πάνω */}
      <nav className="hidden md:flex sidebar">
        <Link to="/">Home</Link>
        <Link to="/episodes">Episodes</Link>
        <Link to="/map">Map</Link>
        <Link to="/gallery">Gallery</Link>
        {/* Το SOL's Journey παραλείπεται από το μενού */}
      </nav>
    </>
  );
}
