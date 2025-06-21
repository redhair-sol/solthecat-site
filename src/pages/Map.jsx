// src/pages/Map.jsx

import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
import { motion } from "framer-motion";
import styled from "styled-components";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

// Custom paw icon
const pawIcon = new L.Icon({
  iconUrl: "/icons/toe.png",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

const MapWrapper = styled.div`
  height: 80vh;
  min-height: 500px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(170, 77, 200, 0.15);
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const Subheading = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 1.5rem;
`;

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
  const { language } = useLanguage();

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
  const currentLocation = route.length > 0 ? route[route.length - 1] : [45, 10];
  const currentTitle =
    episodes.length > 0
      ? typeof episodes[episodes.length - 1].title === "object"
        ? episodes[episodes.length - 1].title[language]
        : episodes[episodes.length - 1].title
      : "";

  return (
    <>
      <Helmet>
        <title>
          {language === "en"
            ? "Sol’s Journey – SolTheCat"
            : "Το Ταξίδι της Sol – SolTheCat"}
        </title>
        <link rel="canonical" href="https://solthecat.com/solsjourney" />
      </Helmet>

      <PageContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading>
          {language === "en" ? "Sol’s Journey 🗺️" : "Το Ταξίδι της Sol 🗺️"}
        </Heading>
        <Subheading>
          📍 {language === "en"
            ? `Current Location: ${currentTitle}`
            : `Τρέχουσα Τοποθεσία: ${currentTitle}`}
        </Subheading>

        {route.length > 0 && (
          <MapWrapper>
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

              <SetViewOnLastLocation position={currentLocation} route={route} />

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
                        {typeof ep.title === "object"
                          ? ep.title[language]
                          : ep.title}
                      </div>
                      <img
                        src={`${import.meta.env.BASE_URL}${ep.image}`}
                        alt={
                          typeof ep.title === "object"
                            ? ep.title[language]
                            : ep.title
                        }
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
          </MapWrapper>
        )}
      </PageContainer>
    </>
  );
}
