import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom paw icon
const pawIcon = new L.Icon({
  iconUrl: "/icons/toe.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// Animated marker component
function AnimatedMarker({ route, titles, delay = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [traveled, setTraveled] = useState([]);
  const map = useMap();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (route.length === 0) return;

    map.setView(route[0], 5);
    setTraveled([route[0]]);
    setCurrentIndex(0);

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 1;
        if (next < route.length) {
          setTraveled(route.slice(0, next + 1));
          map.panTo(route[next]);
          return next;
        } else {
          clearInterval(intervalRef.current);
          return prev;
        }
      });
    }, delay);

    return () => clearInterval(intervalRef.current);
  }, [route, delay, map]);

  return (
    <>
      {traveled.map((pos, idx) => (
        <Marker key={idx} position={pos}>
          <Popup>{titles[idx]}</Popup>
        </Marker>
      ))}
      {route[currentIndex] && (
        <Marker position={route[currentIndex]} icon={pawIcon} />
      )}
      {traveled.length > 1 && (
        <Polyline positions={traveled} color="#aa4dc8" weight={4} />
      )}
    </>
  );
}

export default function MapJourney() {
  const [episodes, setEpisodes] = useState([]);
  const [start, setStart] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visible = data.filter((ep) => ep.visible && ep.location);
        visible.sort((a, b) => a.id - b.id);
        setEpisodes(visible);
      });
  }, []);

  const route = episodes.map((ep) => [ep.location.lat, ep.location.lng]);
  const titles = episodes.map((ep) => ep.title);
  const center = route.length > 0 ? route[0] : [45, 10];

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to bottom, #fff1f9, #fce4ec)",
        minHeight: "100vh",
        textAlign: "center"
      }}
    >
      <h1 style={{ color: "#aa4dc8", fontSize: "2rem", marginBottom: "1rem" }}>
        SOLadventure – Animated Journey
      </h1>

      <button
        onClick={() => setStart(true)}
        style={{
          padding: "0.8rem 1.5rem",
          backgroundColor: "#aa4dc8",
          color: "white",
          fontWeight: "bold",
          borderRadius: "16px",
          marginBottom: "1.5rem",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(170, 77, 200, 0.3)",
          transition: "transform 0.2s ease-in-out"
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1.0)")}
      >
        Start Journey 🐾
      </button>

      <div
        style={{
          height: "80vh",
          minHeight: "500px",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(170, 77, 200, 0.15)"
        }}
      >
        <MapContainer
          center={center}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {start && <AnimatedMarker route={route} titles={titles} delay={3000} />}
        </MapContainer>
      </div>
    </div>
  );
}
