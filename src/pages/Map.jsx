import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

export default function MapPage() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) =>
        setEpisodes(data.filter(ep => ep.visible && ep.location))
      )
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  const route = episodes
    .sort((a, b) => a.id - b.id)
    .map(ep => [ep.location.lat, ep.location.lng]);

  const center = route.length === 1
    ? route[0]
    : route.length > 1
      ? route[Math.floor(route.length / 2)]
      : [45, 10];
	  
  if (route.length === 0) return null;

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", color: "#aa4dc8", marginBottom: "1rem" }}>
        SOLadventures Map
      </h1>
      <MapContainer
	    key={center.toString()}
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "80vh",
          minHeight: "500px",
          width: "100%",
          maxWidth: "1000px",
          margin: "0 auto",
          borderRadius: "16px"
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {episodes.map((ep) => (
          <Marker key={ep.id} position={[ep.location.lat, ep.location.lng]}>
            <Popup>{ep.title}</Popup>
          </Marker>
        ))}
        {route.length > 1 && (
          <Polyline positions={route} color="#aa4dc8" weight={4} />
        )}
      </MapContainer>
    </div>
  );
}
