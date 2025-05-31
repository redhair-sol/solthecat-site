import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import SolBrand from "../components/SolBrand";

// Custom paw icon
const pawIcon = new L.Icon({
  iconUrl: "/icons/toe.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// Component to update view dynamically
function SetViewOnLastLocation({ position, route }) {
  const map = useMap();
  useEffect(() => {
    if (route.length > 1) {
      map.fitBounds(route, { padding: [50, 50] });
    } else if (position) {
      map.setView(position, 7, { animate: true });
    }
  }, [position, route, map]);
  return null;
}

export default function SolsJourney() {
  const [episodes, setEpisodes] = useState([]);

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
  const currentLocation =
    route.length > 0 ? route[route.length - 1] : [45, 10];
  const currentTitle =
    episodes.length > 0 ? episodes[episodes.length - 1].title : "";

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(to bottom, #fff1f9, #fce4ec)",
        minHeight: "100vh",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <SolBrand />
      </div>

      <p style={{ fontSize: "1rem", color: "#6a1b9a", marginBottom: "1.5rem" }}>
        📍 Current Location: {currentTitle}
      </p>

      {route.length > 0 && (
        <div
          style={{
            height: "80vh",
            minHeight: "500px",
            width: "100%",
            maxWidth: "1000px",
            margin: "0 auto",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(170, 77, 200, 0.15)",
          }}
        >
          <MapContainer
            center={currentLocation}
            zoom={5}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <SetViewOnLastLocation
              position={currentLocation}
              route={route}
            />

            {episodes.map((ep, idx) => (
              <Marker
                key={`paw-${idx}`}
                position={[ep.location.lat, ep.location.lng]}
                icon={pawIcon}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -20]}
                  opacity={1}
                  permanent={false}
                >
                  <div
                    style={{
                      textAlign: "center",
                      maxWidth: "160px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      fontSize: "0.85rem",
                      lineHeight: "1.2rem",
                      padding: "2px",
                    }}
                  >
                    <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                      {ep.title}
                    </div>
                    <img
                      src={`${import.meta.env.BASE_URL}${ep.image}`}
                      alt={ep.title}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </div>
                </Tooltip>
              </Marker>
            ))}

            {route.length > 1 && (
              <Polyline positions={route} color="#aa4dc8" weight={4} />
            )}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
