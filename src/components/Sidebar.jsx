// src/components/Sidebar.jsx

import { useState } from "react";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Sidebar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 bg-[#f8bbd0] rounded shadow md:hidden"
        onClick={() => setMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile Sliding Menu */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
