// src/pages/MapQuiz.jsx

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { celebrate } from "../utils/celebrate.js";

const ROUNDS = 5;
const MAX_PER_ROUND = 1000;

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 1rem;
  max-width: 600px;
  text-align: center;
  line-height: 1.5;
`;

const ScoreLine = styled.p`
  font-size: 0.95rem;
  color: #6a1b9a;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const BigButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#c187d8")};
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }
`;

const PhotoWrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 1rem;
`;

const PhotoCard = styled.div`
  background: #ffffff;
  border-radius: 1rem;
  padding: 0.5rem;
  box-shadow: 0 4px 16px rgba(170, 77, 200, 0.18);
  text-align: center;
`;

const Photo = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.6rem;
  display: block;
`;

const PhotoCaption = styled.p`
  font-size: 0.9rem;
  color: #5b2b7b;
  font-style: italic;
  margin: 0.5rem 0 0;
`;

const MapWrapper = styled.div`
  height: 50vh;
  min-height: 350px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto 1rem;
  border-radius: 1rem;
  overflow: hidden;
  border: 2px solid #c187d8;
  box-shadow: 0 4px 16px rgba(170, 77, 200, 0.18);
  cursor: ${({ $clickable }) => ($clickable ? "crosshair" : "default")};
  /* Confine Leaflet's internal z-indices within this stacking context. */
  position: relative;
  z-index: 0;

  /* dvh on mobile so the map height stays correct as the address bar shows/hides. */
  @media (max-width: 768px) {
    height: 50dvh;
    min-height: 320px;
  }

  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

const ResultCard = styled(motion.div)`
  background: #ffffffcc;
  padding: 1.2rem 1.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 16px rgba(170, 77, 200, 0.18);
  text-align: center;
  margin: 0.5rem auto 1rem;
`;

const ResultEmoji = styled.div`
  font-size: 2rem;
  margin-bottom: 0.3rem;
`;

const ResultPoints = styled.h2`
  font-size: 1.4rem;
  color: #6a1b9a;
  margin: 0 0 0.3rem;
`;

const ResultDistance = styled.p`
  font-size: 0.95rem;
  color: #5b2b7b;
  margin: 0;
`;

const FinalCard = styled(motion.div)`
  background: #ffffffcc;
  padding: 1.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 16px rgba(170, 77, 200, 0.18);
  text-align: center;
  margin-top: 1rem;
`;

const FinalScore = styled.h2`
  font-size: 1.6rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const FinalMessage = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 1rem;
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 2rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorBox = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 1rem auto;
  font-size: 0.95rem;
  text-align: center;
`;

// Reuse the same paw icon as SOLsJourney for the actual location marker —
// brand-consistent and already optimized.
const pawIcon = new L.Icon({
  iconUrl: "/icons/toe.webp",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

// User-click marker: simple pink pin emoji via divIcon so we don't need a new asset.
const userIcon = L.divIcon({
  className: "mapquiz-user-icon",
  html: '<div style="font-size:28px;line-height:1;transform:translate(-50%,-100%);position:absolute;">📍</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371; // km
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function scoreFromDistance(km) {
  if (km < 100) return { points: 1000, tier: "bullseye" };
  if (km < 500) return { points: 700, tier: "close" };
  if (km < 1500) return { points: 400, tier: "good" };
  if (km < 4000) return { points: 150, tier: "area" };
  return { points: 30, tier: "far" };
}

function ClickCatcher({ onSelect, disabled }) {
  useMapEvents({
    click(e) {
      if (disabled) return;
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default function MapQuiz() {
  const { language } = useLanguage();
  const [episodes, setEpisodes] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [phase, setPhase] = useState("intro"); // "intro" | "playing" | "reveal" | "final"
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [queue, setQueue] = useState([]); // shuffled list of episodes for this game
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [userPick, setUserPick] = useState(null);
  const [roundResult, setRoundResult] = useState(null);

  // Refs for auto-scroll on phase change. On mobile the page is tall (photo +
  // map + result stack), so when the user clicks the map the ResultCard
  // appears below the fold and they don't realize the round has resolved.
  const roundTopRef = useRef(null); // points at round subtitle (above photo)
  const resultRef = useRef(null);
  const finalRef = useRef(null);

  const t = {
    en: {
      pageTitle: "Where in the World? – SolTheCat",
      title: "Where in the World? 🌍",
      subtitle: `Sol took a photo. Click on the map where you think she was. ${ROUNDS} rounds.`,
      start: "🐾 Start the journey",
      progress: (r) => `Round ${r} / ${ROUNDS}`,
      scoreLine: (s) => `Score: ${s}`,
      promptClick: "Click on the map to place your guess.",
      distance: (km) => `${km} km away`,
      tiers: {
        bullseye: "🎯 Bullseye!",
        close: "🔥 Very close!",
        good: "👍 Not bad.",
        area: "🌍 Right area.",
        far: "😅 Way off.",
      },
      next: "Next round →",
      finish: "See result →",
      finishedTitle: "🎒 Adventure complete!",
      finishedScore: (s) => `Final score: ${s} / ${ROUNDS * MAX_PER_ROUND}`,
      finishedPerfect: "Pawfect navigator! 🏆",
      finishedGood: "Sol's impressed! 🐾",
      finishedSoso: "Keep exploring!",
      playAgain: "🔁 Play again",
      back: "← Back to games",
      loadFail: "Couldn't load episodes. Please try refreshing the page.",
    },
    el: {
      pageTitle: "Πού στον Κόσμο; – SolTheCat",
      title: "Πού στον Κόσμο; 🌍",
      subtitle: `Η Sol έβγαλε μια φωτογραφία. Κλίκαρε στον χάρτη πού νομίζεις ότι ήταν. ${ROUNDS} γύροι.`,
      start: "🐾 Ξεκίνα το ταξίδι",
      progress: (r) => `Γύρος ${r} / ${ROUNDS}`,
      scoreLine: (s) => `Σκορ: ${s}`,
      promptClick: "Κλίκαρε στον χάρτη για την επιλογή σου.",
      distance: (km) => `${km} χλμ. μακριά`,
      tiers: {
        bullseye: "🎯 Διάνα!",
        close: "🔥 Πολύ κοντά!",
        good: "👍 Καλά!",
        area: "🌍 Σωστή περιοχή.",
        far: "😅 Πολύ μακριά.",
      },
      next: "Επόμενος γύρος →",
      finish: "Αποτέλεσμα →",
      finishedTitle: "🎒 Τέλος ταξιδιού!",
      finishedScore: (s) => `Τελικό σκορ: ${s} / ${ROUNDS * MAX_PER_ROUND}`,
      finishedPerfect: "Τέλειος πλοηγός! 🏆",
      finishedGood: "Η Sol εντυπωσιάστηκε! 🐾",
      finishedSoso: "Συνέχισε να εξερευνείς!",
      playAgain: "🔁 Παίξε ξανά",
      back: "← Επιστροφή στα παιχνίδια",
      loadFail: "Δεν φόρτωσαν τα επεισόδια. Παρακαλώ δοκίμασε refresh.",
    },
  }[language];

  // Auto-scroll the relevant section into view when the phase changes:
  //   - reveal → center the ResultCard so the user sees the score immediately
  //   - final  → center the FinalCard
  //   - playing (incl. round transitions) → top-align the round subtitle so
  //     the user sees the round number, score AND the new photo + map below
  useEffect(() => {
    let target = null;
    let block = "center";
    if (phase === "reveal") target = resultRef.current;
    else if (phase === "final") target = finalRef.current;
    else if (phase === "playing") {
      target = roundTopRef.current;
      block = "start";
    }
    if (target) {
      // rAF lets the new DOM/animation settle before measuring scroll.
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block });
      });
    }
  }, [phase, round]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const usable = data.filter(
          (ep) => ep.visible && ep.location?.lat != null && ep.location?.lng != null
        );
        setEpisodes(usable);
        setLoadError(false);
      })
      .catch((err) => {
        console.error("Failed to load episodes:", err);
        setLoadError(true);
      });
  }, []);

  const startGame = () => {
    if (episodes.length < ROUNDS) return;
    const shuffled = shuffle(episodes).slice(0, ROUNDS);
    setQueue(shuffled);
    setCurrentEpisode(shuffled[0]);
    setRound(1);
    setScore(0);
    setUserPick(null);
    setRoundResult(null);
    setPhase("playing");
  };

  const handleMapClick = ({ lat, lng }) => {
    if (phase !== "playing" || !currentEpisode) return;
    const km = haversine(
      lat,
      lng,
      currentEpisode.location.lat,
      currentEpisode.location.lng
    );
    const { points, tier } = scoreFromDistance(km);
    setUserPick({ lat, lng });
    setRoundResult({ km: Math.round(km), points, tier });
    setScore((s) => s + points);
    setPhase("reveal");
  };

  const handleNext = () => {
    if (round >= ROUNDS) {
      setPhase("final");
      // Celebrate if user reached at least 80% of max possible.
      if (score >= ROUNDS * MAX_PER_ROUND * 0.8) celebrate();
      return;
    }
    const next = queue[round]; // queue is 0-indexed, round is 1-based
    setCurrentEpisode(next);
    setRound((r) => r + 1);
    setUserPick(null);
    setRoundResult(null);
    setPhase("playing");
  };

  const finalMessage =
    score >= ROUNDS * MAX_PER_ROUND * 0.8
      ? t.finishedPerfect
      : score >= ROUNDS * MAX_PER_ROUND * 0.4
      ? t.finishedGood
      : t.finishedSoso;

  const epCaption =
    currentEpisode &&
    (typeof currentEpisode.caption === "object"
      ? currentEpisode.caption[language]
      : currentEpisode.caption);

  const polylinePositions =
    userPick && currentEpisode
      ? [
          [userPick.lat, userPick.lng],
          [currentEpisode.location.lat, currentEpisode.location.lng],
        ]
      : null;

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/mapquiz" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{t.title}</Title>

        {loadError && <ErrorBox role="alert">{t.loadFail}</ErrorBox>}

        {phase === "intro" && !loadError && (
          <>
            <Subtitle>{t.subtitle}</Subtitle>
            <BigButton onClick={startGame} disabled={episodes.length < ROUNDS}>
              {t.start}
            </BigButton>
          </>
        )}

        {(phase === "playing" || phase === "reveal") && currentEpisode && (
          <>
            <Subtitle ref={roundTopRef}>{t.progress(round)}</Subtitle>
            <ScoreLine>{t.scoreLine(score)}</ScoreLine>

            <PhotoWrapper>
              <PhotoCard>
                <Photo
                  src={`${import.meta.env.BASE_URL}${currentEpisode.image}`}
                  alt=""
                  width="800"
                  height="800"
                  loading="eager"
                  decoding="async"
                />
                {epCaption && <PhotoCaption>{epCaption}</PhotoCaption>}
              </PhotoCard>
            </PhotoWrapper>

            {phase === "playing" && <Subtitle>{t.promptClick}</Subtitle>}

            <MapWrapper $clickable={phase === "playing"}>
              <MapContainer
                center={[20, 0]}
                zoom={2}
                minZoom={2}
                worldCopyJump
                scrollWheelZoom
                doubleClickZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ClickCatcher
                  onSelect={handleMapClick}
                  disabled={phase !== "playing"}
                />
                {userPick && (
                  <Marker position={[userPick.lat, userPick.lng]} icon={userIcon} />
                )}
                {phase === "reveal" && (
                  <Marker
                    position={[
                      currentEpisode.location.lat,
                      currentEpisode.location.lng,
                    ]}
                    icon={pawIcon}
                  />
                )}
                {phase === "reveal" && polylinePositions && (
                  <Polyline
                    positions={polylinePositions}
                    pathOptions={{ color: "#c187d8", weight: 3, dashArray: "6 8" }}
                  />
                )}
              </MapContainer>
            </MapWrapper>

            {phase === "reveal" && roundResult && (
              <ResultCard
                ref={resultRef}
                key={`result-${round}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <ResultEmoji>{t.tiers[roundResult.tier].split(" ")[0]}</ResultEmoji>
                <ResultPoints>
                  {t.tiers[roundResult.tier].replace(/^\S+\s/, "")} +{roundResult.points}
                </ResultPoints>
                <ResultDistance>{t.distance(roundResult.km)}</ResultDistance>
                <BigButton onClick={handleNext}>
                  {round >= ROUNDS ? t.finish : t.next}
                </BigButton>
              </ResultCard>
            )}
          </>
        )}

        {phase === "final" && (
          <FinalCard
            ref={finalRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalScore>{t.finishedTitle}</FinalScore>
            <FinalMessage>{t.finishedScore(score)}</FinalMessage>
            <FinalMessage>{finalMessage}</FinalMessage>
            <BigButton onClick={startGame}>{t.playAgain}</BigButton>
          </FinalCard>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
