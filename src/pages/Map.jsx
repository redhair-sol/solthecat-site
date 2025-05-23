import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix για default icon πρόβλημα στο Leaflet + Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function MapPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", color: "#aa4dc8", marginBottom: "1rem" }}>
        SOLadventures Map
      </h1>
      <MapContainer
        center={[37.9715, 23.7257]} // Συντεταγμένες για Ακρόπολη
        zoom={6}
        scrollWheelZoom={false}
        style={{ height: "500px", width: "100%", maxWidth: "900px", margin: "0 auto", borderRadius: "16px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[37.9715, 23.7257]}>
          <Popup>
            Athens – Episode #1<br />
            Historic? So am I 🐾
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
