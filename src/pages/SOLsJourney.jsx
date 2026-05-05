import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Tooltip,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { colors, shadows } from "../theme.js";

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

// Matches SolButton style (used everywhere else for primary CTAs) but is a
// real <button> with disabled state instead of a <Link>.
const JourneyButton = styled.button`
  margin-top: 1rem;
  margin-bottom: 1.5rem;
  padding: 0.8rem 1.5rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : colors.accentLight)};
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 16px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  box-shadow: ${shadows.button};
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }
`;

const MapWrapper = styled.div`
  height: 80vh;
  min-height: 500px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(170, 77, 200, 0.15);
  /* Confine Leaflet's internal z-indices (controls up to 1000) within this
     stacking context so they cannot stack above fixed UI like the bottom
     tab bar or Instagram button. */
  position: relative;
  z-index: 0;
`;

const pawIcon = new L.Icon({
  iconUrl: "/icons/toe.webp",
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

// MapContainer's `center`/`zoom` only apply at initial mount; once the
// episodes load async we need imperative `flyTo` to actually focus the map
// on the final destination (the latest city Sol has visited).
function InitialFocus({ route }) {
  const map = useMap();
  const lastLat = route.length > 0 ? route[route.length - 1][0] : null;
  const lastLng = route.length > 0 ? route[route.length - 1][1] : null;
  useEffect(() => {
    if (lastLat !== null && lastLng !== null) {
      map.flyTo([lastLat, lastLng], 5, { duration: 1 });
    }
  }, [lastLat, lastLng, map]);
  return null;
}

function AnimatedMarker({ route, titles, delay = 3000, onUpdateIndex, onComplete }) {
  const [traveled, setTraveled] = useState([route[0]]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const map = useMap();
  const stepIndex = useRef(1);
  const timeoutRef = useRef(null);

  // Refs hold latest values so the animation effect can run with stable deps.
  // Without this, parent re-renders (e.g. on currentIndex update) recreate
  // `route`/`onComplete` references, retriggering the effect, cancelling the
  // setTimeout, and flying back to the first city — animation never advances.
  const routeRef = useRef(route);
  const onUpdateIndexRef = useRef(onUpdateIndex);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    routeRef.current = route;
    onUpdateIndexRef.current = onUpdateIndex;
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const r = routeRef.current;
    if (!r || r.length < 2) return;

    map.flyTo(r[0], 7, { duration: 1.2 });
    setCurrentIndex(0);
    onUpdateIndexRef.current(0);

    function step() {
      const cur = routeRef.current;
      if (stepIndex.current >= cur.length) {
        // Journey complete: zoom out to show the full route with polyline.
        if (cur.length > 1) {
          map.flyToBounds(cur, { duration: 1.5, padding: [50, 50] });
        }
        if (onCompleteRef.current) onCompleteRef.current();
        return;
      }

      const next = cur[stepIndex.current];
      setTraveled((prev) => [...prev, next]);
      setCurrentIndex(stepIndex.current);
      onUpdateIndexRef.current(stepIndex.current);
      // Cinematic focus on each city: zoom + pan in one smooth motion.
      map.flyTo(next, 7, { duration: 1.5 });

      stepIndex.current++;
      timeoutRef.current = setTimeout(step, delay);
    }

    timeoutRef.current = setTimeout(step, delay);

    return () => clearTimeout(timeoutRef.current);
    // AnimatedMarker is keyed by `journey-${journeyId}` in the parent, so a
    // new journey remounts and re-runs this effect cleanly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, delay]);

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

export default function SOLsJourneyAnimated() {
  const { language } = useLanguage();
  const [episodes, setEpisodes] = useState([]);
  const [start, setStart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [journeyId, setJourneyId] = useState(0);

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

  const t = {
    en: {
      pageTitle: "Sol's Journey – SolTheCat",
      heading: "Sol's Journey 🗺️",
      currentLocation: "📍 Current Location: ",
      showJourney: "▶️ Show Journey",
    },
    el: {
      pageTitle: "Το Ταξίδι της Sol – SolTheCat",
      heading: "Το Ταξίδι της Sol 🗺️",
      currentLocation: "📍 Τρέχουσα Τοποθεσία: ",
      showJourney: "▶️ Δες το Ταξίδι",
    },
  }[language];

  const epTitle = (ep) =>
    typeof ep.title === "object" ? ep.title[language] : ep.title;

  const route = episodes.map((ep) => [ep.location.lat, ep.location.lng]);
  const titles = episodes.map(epTitle);
  const center = route.length > 0 ? route[route.length - 1] : [45, 10];
  const lastTitle = episodes.length > 0 ? epTitle(episodes[episodes.length - 1]) : "";

  const subheadingText = start && titles[currentIndex]
    ? titles[currentIndex]
    : `${t.currentLocation}${lastTitle}`;

  const handleStart = () => {
    setStart(true);
    setJourneyId((prev) => prev + 1);
  };

  const handleComplete = () => {
    setStart(false);
  };

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/map" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading>{t.heading}</Heading>
        <Subheading>{subheadingText}</Subheading>

        {route.length > 1 && (
          <JourneyButton onClick={handleStart} disabled={start}>
            {t.showJourney}
          </JourneyButton>
        )}

        <MapWrapper>
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

            {episodes.map((ep, idx) => (
              <Marker
                key={`paw-${idx}`}
                position={[ep.location.lat, ep.location.lng]}
                icon={pawIcon}
              >
                <Tooltip direction="top" offset={[0, -20]} opacity={1} permanent={false}>
                  <div
                    style={{
                      textAlign: "center",
                      maxWidth: "160px",
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                      fontSize: "0.85rem",
                      lineHeight: "1.2rem",
                      padding: "2px"
                    }}
                  >
                    <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                      {epTitle(ep)}
                    </div>
                    <img
                      src={`${import.meta.env.BASE_URL}${ep.image}`}
                      alt={epTitle(ep)}
                      style={{
                        width: "100%",
                        borderRadius: "8px",
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"
                      }}
                    />
                  </div>
                </Tooltip>
              </Marker>
            ))}

            {/* Default static polyline shown when not animating. The animation
                draws its own progressive polyline as it goes. */}
            {!start && route.length > 1 && (
              <Polyline positions={route} color="#aa4dc8" weight={4} />
            )}

            {!start && route.length > 0 && (
              <>
                <InitialFocus route={route} />
                <Marker position={center}>
                  <Popup>
                    {lastTitle}
                    <br />
                    {language === "el" ? "Εδώ είναι 🐾" : "Here she is 🐾"}
                  </Popup>
                </Marker>
              </>
            )}

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
        </MapWrapper>
      </PageContainer>
    </>
  );
}
