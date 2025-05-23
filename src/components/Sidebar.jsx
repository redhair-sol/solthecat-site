import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <Link to="/">Home</Link>
      <Link to="/episodes">Episodes</Link>
      <Link to="/map">Map</Link>
	  <Link to="/gallery">Gallery</Link>
    </nav>
  );
}
