import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <nav className="hidden md:block w-full bg-[#f8bbd0] py-4 shadow-md mt-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <div
          className="flex space-x-8 text-xl text-black font-medium"
          style={{ fontFamily: '"Marcellus", serif' }}
        >
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/episodes" className="hover:underline">Episodes</Link>
          <Link to="/map" className="hover:underline">Map</Link>
          <Link to="/gallery" className="hover:underline">Gallery</Link>
        </div>
      </div>
    </nav>
  );
}
