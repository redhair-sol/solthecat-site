import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import useStreakBadges from "../hooks/useStreakBadges";

// ----- LIVE BADGE -----
const LiveBadge = styled.div`
  background: #ff0000;
  color: white;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 9999;
`;

const LiveDot = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: pulse 2.5s infinite ease-in-out;

  @keyframes pulse {
    0% { transform: scale(0.7); opacity: 0.6; }
    50% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.7); opacity: 0.6; }
  }
`;

const JourneyButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: bold;
  display: inline-block;
  margin-top: 1.5rem;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const LanguageToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.2rem;
  flex-wrap: wrap;
`;

const ToggleButton = styled.button`
  padding: 0.3rem 0.8rem;
  min-width: 150px;
  border: 1px solid #ccc;
  background-color: ${({ $active }) => ($active ? "#f8bbd0" : "#fff")};
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-weight: 500;
`;

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasSearchParam = Boolean(queryParams.get("s"));

  const [quote, setQuote] = useState("");
  const [mode, setMode] = useState("mood");
  const [isLive, setIsLive] = useState(false);

  const streamURL = "https://solcam.solthecat.com/solcam/index.m3u8";

  const checkStream = async () => {
    try {
      const res = await fetch(`${streamURL}?t=${Date.now()}`);
      setIsLive(res.status === 200);
    } catch {
      setIsLive(false);
    }
  };

  useEffect(() => { checkStream(); }, []);
  useEffect(() => {
    const interval = setInterval(checkStream, 5000);
    return () => clearInterval(interval);
  }, []);

  const { streak, currentBadge, unlockedToday } = useStreakBadges();

  function getDailyMessage(mode, language, options) {
    const today = new Date().toISOString().slice(0, 10);
    const key = `solDaily-${mode}-${language}-${today}`;
    const cached = localStorage.getItem(key);

    if (cached) return JSON.parse(cached);

    const selected = options[Math.floor(Math.random() * options.length)];
    localStorage.setItem(key, JSON.stringify(selected));
    return selected;
  }

  useEffect(() => {
    const today = new Date();
    const isoDate = today.toISOString().slice(0, 10);
    const dayOfWeek = today
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const month = today.getMonth();

    const season = [
      "winter","winter","spring","spring","spring",
      "summer","summer","summer","autumn","autumn","autumn","winter"
    ][month];

    const file =
      mode === "fortune"
        ? "/data/smartFortunes.json"
        : "/data/smartQuotes.json";

    fetch(file)
      .then((res) => res.json())
      .then((data) => {
        const options =
          mode === "fortune"
            ? data.fortunes.map((f) => f[language]).filter(Boolean)
            : data[isoDate]?.[language] ||
              data[dayOfWeek]?.[language] ||
              data[season]?.[language] ||
              data["default"]?.[language] ||
              [];

        const selected = getDailyMessage(mode, language, options);
        setQuote(
          selected ||
            (language === "el"
              ? "Η Sol ξεκουράζεται βασιλικά σήμερα. 🐾"
              : "Sol is taking a royal pause today. 🐾")
        );
      });
  }, [language, mode]);

  const content = {
    en: {
      title: "the journey of a Queen",
      flair: "Fluffy. Fierce. Fabulous. 🐾🐾🐾",
      bio: "Welcome to the official home of solthecat, the feline queen behind the SOLadventures series. From Athens to Paris and beyond, Sol brings elegance, attitude, and a touch of royal paw-power to every destination. Follow her travels, her tales, and her timeless stare.",
      viewJourney: "View the Journey",
      quoteTitle:
        mode === "fortune"
          ? "Royal Fortune of the Day"
          : "Royal Mood of the Day",
      toggleMood: "Mood of the Day",
      toggleFortune: "Words of Sol",
      instagram: "Follow on Instagram",
      gamesTitle: "🎮 Ready to play with Sol?",
      gamesText: "Explore mini-games inspired by her travels!",
      gamesCTA: "Play the Games",
    },
    el: {
      title: "το ταξίδι μιας Βασίλισσας",
      flair: "Χνουδωτή. Δυναμική. Ακαταμάχητη. 🐾🐾🐾",
      bio: "Καλωσήρθες στο επίσημο σπίτι της solthecat, της πρωταγωνίστριας της σειράς SOLadventures. Από την Αθήνα ως το Παρίσι και πέρα, η Sol φέρνει κομψότητα, ύφος και βασιλική γοητεία σε κάθε της στάση. Ακολούθησε τα ταξίδια της, τις ιστορίες της και το διαχρονικό της βλέμμα.",
      viewJourney: "Δες το Ταξίδι",
      quoteTitle:
        mode === "fortune"
          ? "Η Πατουσένια Συμβουλή της Ημέρας"
          : "Η Πατουσένια Στιγμή της Ημέρας",
      toggleMood: "Διάθεση Ημέρας",
      toggleFortune: "Λόγια της Sol",
      instagram: "Ακολούθησε στο Instagram",
      gamesTitle: "🎮 Παίξε με τη Sol!",
      gamesText: "Ανακάλυψε mini-games...",
      gamesCTA: "Παίξε Παιχνίδια",
    },
  };

  const t = content[language];

  return (
    <>
      <Helmet>
        <title>Sol’s Adventures – Home</title>
        <link rel="canonical" href="https://solthecat.com/" />
        {hasSearchParam && <meta name="robots" content="noindex, follow" />}
      </Helmet>

      {/* LIVE BADGE POSITION FIX */}
      <style>
        {`
          @media (max-width: 768px) {
            .live-badge-link {
              top: 10px !important;
              left: 50% !important;
              transform: translateX(-50%) !important;
              right: auto !important;
            }
          }

          @media (max-width: 360px) {
            .live-badge-link {
              top: 30px !important;
            }
          }
        `}
      </style>

      <PageContainer
        style={{ position: "relative" }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {isLive && (
          <Link
            to="/solcam"
            className="live-badge-link"
            style={{
              position: "absolute",
              top: "18px",
              right: "18px",
              textDecoration: "none",
              zIndex: 9999,
            }}
          >
            <LiveBadge>
              <LiveDot /> LIVE
            </LiveBadge>
          </Link>
        )}

        {/* LANGUAGE */}
        <LanguageToggle>
          <ToggleButton onClick={() => setLanguage("en")} $active={language === "en"}>
            🇬🇧 English
          </ToggleButton>
          <ToggleButton onClick={() => setLanguage("el")} $active={language === "el"}>
            🇬🇷 Ελληνικά
          </ToggleButton>
        </LanguageToggle>

        {/* TITLE */}
        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            fontFamily: "'Playfair Display', serif",
            color: "#4a005f",
            fontStyle: "italic",
            margin: "1.2rem 0",
          }}
        >
          {t.title}
        </h2>

        <p
          style={{
            fontSize: "1.3rem",
            fontStyle: "italic",
            color: "#6a1b9a",
            marginBottom: "2rem",
          }}
        >
          {t.flair}
        </p>

        <p
          style={{
            maxWidth: "600px",
            margin: "0 auto 0.5rem",
            padding: "0 1rem",
            color: "#5b2b7b",
            fontSize: "1rem",
            lineHeight: "1.6",
          }}
        >
          {t.bio}
        </p>

        {/* JOURNEY BUTTON */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <JourneyButton to="/episodes">{t.viewJourney}</JourneyButton>
        </motion.div>

        {/* QUOTE TOGGLE */}
        <LanguageToggle style={{ marginTop: "2.2rem" }}>
          <ToggleButton onClick={() => setMode("mood")} $active={mode === "mood"}>
            {t.toggleMood}
          </ToggleButton>
          <ToggleButton onClick={() => setMode("fortune")} $active={mode === "fortune"}>
            {t.toggleFortune}
          </ToggleButton>
        </LanguageToggle>

        {/* QUOTE BOX */}
        {quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              backgroundColor: "#fff3f8",
              padding: "1.2rem",
              borderRadius: "1.5rem",
              marginTop: "1.5rem",
              maxWidth: "600px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontSize: "1.3rem", color: "#8e24aa", marginBottom: "0.5rem" }}>
              {t.quoteTitle}
            </h3>
            <p style={{ fontStyle: "italic", color: "#6a1b9a" }}>{quote}</p>
          </motion.div>
        )}

        {/* BADGE */}
        {currentBadge && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{
              backgroundColor: "#fff3f8",
              padding: "1rem",
              borderRadius: "1.5rem",
              maxWidth: "600px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
              textAlign: "center",
              marginTop: "1.5rem",
            }}
          >
            <p style={{ color: "#5b2b7b" }}>
              {language === "en"
                ? "Your loyalty badge shows how many days you’ve walked the royal path with Sol."
                : "Το badge πίστης σου δείχνει πόσες μέρες ακολουθείς το βασιλικό μονοπάτι με τη Sol."}
            </p>

            <p style={{ fontSize: "1.1rem", color: "#8e24aa", fontWeight: 600 }}>
              {currentBadge.emoji} {currentBadge.name[language]}
            </p>

            <p style={{ color: "#6a1b9a" }}>{currentBadge.description[language]}</p>

            <p style={{ color: "#5b2b7b", marginTop: "0.5rem" }}>
              Visit Streak: {streak} day{streak > 1 ? "s" : ""}
            </p>

            {unlockedToday && (
              <p style={{ color: "#4a005f", marginTop: "0.5rem" }}>
                🎉 New Badge Unlocked Today!
              </p>
            )}
          </motion.div>
        )}

        {/* GAMES */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            backgroundColor: "#f8bbd0",
            padding: "1.5rem",
            borderRadius: "1.5rem",
            maxWidth: "600px",
            marginTop: "2.5rem",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3 style={{ color: "#6a1b9a", fontSize: "1.5rem", fontWeight: 700 }}>
            {t.gamesTitle}
          </h3>
          <p style={{ color: "#4a005f", marginBottom: "1.2rem" }}>{t.gamesText}</p>
          <Link
            to="/games"
            style={{
              display: "inline-block",
              padding: "0.6rem 1.2rem",
              backgroundColor: "#c187d8",
              color: "white",
              textDecoration: "none",
              borderRadius: "1rem",
              fontWeight: "bold",
            }}
          >
            {t.gamesCTA}
          </Link>
        </motion.div>

        {/* INSTAGRAM */}
        <a
          href="https://www.instagram.com/solthecat01/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            color: "#c187d8",
            marginTop: "1.8rem",
            textDecoration: "none",
          }}
        >
          <img
            src="/icons/instagram-icon.png"
            alt="Instagram"
            style={{ width: "20px", height: "20px", marginRight: "0.4rem" }}
          />
          {t.instagram}
        </a>
      </PageContainer>
    </>
  );
}
