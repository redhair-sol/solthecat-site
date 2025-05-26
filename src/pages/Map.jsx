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

const pawIcon = new L.Icon({
  iconUrl: "/icons/toe.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

function AnimatedMarker({ route, titles, delay = 3000, onUpdateIndex, onComplete }) {
  const [traveled, setTraveled] = useState([route[0]]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const map = useMap();
  const stepIndex = useRef(1);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!route || route.length < 2) return;

    map.setView(route[0], 5);
    setCurrentIndex(0);
    onUpdateIndex(0);

    function step() {
      if (stepIndex.current >= route.length) {
        const last = route[route.length - 1];
        if (map && last) {
          map.setView(last, 7, { animate: true });
        }
        if (onComplete) onComplete();
        return;
      }

      const next = route[stepIndex.current];
      setTraveled((prev) => [...prev, next]);
      setCurrentIndex(stepIndex.current);
      onUpdateIndex(stepIndex.current);
      map.panTo(next);

      stepIndex.current++;
      timeoutRef.current = setTimeout(step, delay);
    }

    timeoutRef.current = setTimeout(step, delay);

    return () => clearTimeout(timeoutRef.current);
  }, [route, map, delay, onUpdateIndex, onComplete]);

  return (
    <>
      {traveled.map((pos, idx) => (
        <Marker key={`marker-${idx}`} position={pos}>
          <Popup>{titles[idx]}</Popup>
        </Marker>
      ))}
      <Marker position={route[Math.min(currentIndex, route.length - 1)]} icon={pawIcon} />
      {traveled.length > 1 && (
        <Polyline positions={traveled} color="#aa4dc8" weight={4} />
      )}
    </>
  );
}

export default function MapPage() {
  const [episodes, setEpisodes] = useState([]);
  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [locationText, setLocationText] = useState("");
  const [journeyId, setJourneyId] = useState(0);
  const [completedRoute, setCompletedRoute] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visible = data.filter((ep) => ep.visible && ep.location);
        visible.sort((a, b) => a.id - b.id);
        setEpisodes(visible);
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  const route = episodes.map((ep) => [ep.location.lat, ep.location.lng]);
  const titles = episodes.map((ep) => ep.title);
  const current = route.length > 0 ? route[route.length - 1] : [45, 10];
  const currentTitle = titles.length > 0 ? titles[titles.length - 1] : "Here";

  useEffect(() => {
    if (!start && titles.length > 0) {
      setLocationText(`📍 Current Location: ${titles[0]}`);
    }
  }, [start, titles]);

  useEffect(() => {
    if (start && titles[currentIndex]) {
      setLocationText(`${titles[currentIndex]}`);
    }
  }, [start, currentIndex, titles]);

  const handleStart = () => {
    setStart(true);
    setJourneyId((prev) => prev + 1);
    setCompletedRoute(null);
  };

  const handleComplete = () => {
    setStart(false);
    setLocationText(`📍 Current Location: ${titles[titles.length - 1]}`);
    setCompletedRoute(route);
  };

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
      <h1 style={{ color: "#aa4dc8", fontSize: "2rem", marginBottom: "0.5rem" }}>
        SOLadventures Map
      </h1>

      <p style={{ marginBottom: "1rem", fontSize: "1rem", color: "#6a1b9a" }}>
        {locationText}
      </p>

      {route.length > 1 && (
        <button
          onClick={handleStart}
          disabled={start}
          style={{
            marginBottom: "1.5rem",
            padding: "0.8rem 1.5rem",
            backgroundColor: start ? "#ccc" : "#aa4dc8",
            color: "white",
            fontWeight: "bold",
            borderRadius: "16px",
            cursor: start ? "default" : "pointer",
            boxShadow: "0 4px 10px rgba(170, 77, 200, 0.3)",
            transition: "transform 0.2s ease-in-out"
          }}
          onMouseEnter={(e) => {
            if (!start) e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            if (!start) e.target.style.transform = "scale(1.0)";
          }}
        >
          Show Journey
        </button>
      )}

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
          center={current}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Πατουσάκια για κάθε πόλη */}
          {route.map((pos, idx) => (
            <Marker key={`paw-${idx}`} position={pos} icon={pawIcon} />
          ))}

          {/* Popup για την τελική πόλη */}
          {!start && (
            <Marker position={current}>
              <Popup>{currentTitle}<br />Here she is 🐾</Popup>
            </Marker>
          )}

          {/* Γραμμή (μόνιμη) */}
          {completedRoute && (
            <Polyline positions={completedRoute} color="#aa4dc8" weight={4} />
          )}

          {/* Animation */}
          {start && (
            <AnimatedMarker
              key={`journey-${journeyId}`}
              route={route}
              titles={titles}
              delay={3000}
              onUpdateIndex={setCurrentIndex}
              onComplete={handleComplete}
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
