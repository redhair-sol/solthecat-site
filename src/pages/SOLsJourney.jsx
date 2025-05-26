import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const pawIcon = new L.Icon({
  iconUrl: "/icons/toe.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

export default function SOLsJourney() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then(res => res.json())
      .then(data => {
        const visited = data.filter(ep => ep.visible && ep.location);
        visited.sort((a, b) => a.id - b.id);
        setEpisodes(visited);
      })
      .catch(err => console.error("Failed to load episodes:", err));
  }, []);

  const route = episodes.map(ep => [ep.location.lat, ep.location.lng]);
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
      <h1 style={{ color: "#aa4dc8", fontSize: "2rem", marginBottom: "0.5rem" }}>
        SOL's Journey
      </h1>
      <p style={{ marginBottom: "1.5rem", fontSize: "1.1rem", color: "#6a1b9a" }}>
        Discover the path SOL has walked across the world.
      </p>

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
        <MapContainer center={center} zoom={5} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {episodes.map(ep => (
            <Marker
              key={ep.id}
              position={[ep.location.lat, ep.location.lng]}
              icon={pawIcon}
            >
              <Popup>
                <strong>{ep.title}</strong>
                <br />
                {ep.caption}
              </Popup>
            </Marker>
          ))}

          {route.length > 1 && (
            <Polyline positions={route} color="#aa4dc8" weight={4} />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
