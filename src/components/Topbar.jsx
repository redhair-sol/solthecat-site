import { Link } from "react-router-dom";
import LogoText from "./LogoText";

export default function Topbar() {
  return (
    <>
      <LogoText />

      <nav className="hidden md:block w-full bg-[#f8bbd0] py-2 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4">
          <div
            className="flex space-x-8 text-2xl text-black font-medium"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/episodes" className="hover:underline">Episodes</Link>
            <Link to="/map" className="hover:underline">Map</Link>
            <Link to="/gallery" className="hover:underline">Gallery</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
