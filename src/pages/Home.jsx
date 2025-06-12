// src/pages/Home.jsx

import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

const JourneyButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: bold;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1.5rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const LanguageToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.2rem;
`;

const ToggleButton = styled.button`
  padding: 0.3rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ $active }) => ($active ? '#f8bbd0' : '#fff')};
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
`;

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasSearchParam = Boolean(queryParams.get("s"));

  const [quote, setQuote] = useState("");

  useEffect(() => {
    const today = new Date();
    const isoDate = today.toISOString().slice(0, 10);
    const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const month = today.getMonth();
    const season = ["winter", "winter", "spring", "spring", "spring", "summer", "summer", "summer", "autumn", "autumn", "autumn", "winter"][month];

    fetch("/data/smartQuotes.json")
      .then((res) => res.json())
      .then((data) => {
        const options =
          data[isoDate]?.[language] ||
          data[dayOfWeek]?.[language] ||
          data[season]?.[language] ||
          data["default"]?.[language] || [];

        const selected = options[Math.floor(Math.random() * options.length)];
        setQuote(
          selected ||
            (language === "el"
              ? "Η Sol ξεκουράζεται βασιλικά σήμερα. 🐾"
              : "Sol is taking a royal pause today. 🐾")
        );
      });
  }, [language]);

  const content = {
    en: {
      title: "the journey of a Queen",
      flair: "Fluffy. Fierce. Fabulous. 🐾🐾🐾",
      bio: `Welcome to the official home of solthecat — the feline queen behind the SOLadventures series. From Athens to Paris and beyond, Sol brings elegance, attitude, and a touch of royal paw-power to every destination. Follow her travels, her tales, and her timeless stare.`,
      viewJourney: "View the Journey",
      quoteTitle: "Royal Moment of the Day",
      gamesTitle: "🎮 Ready to play with Sol?",
      gamesText: "Explore mini-games inspired by her royal travels — from memory cards to paw-powered puzzles!",
      gamesCTA: "Play the Games",
      instagram: "Follow on Instagram",
    },
    el: {
      title: "το ταξίδι μιας Βασίλισσας",
      flair: "Χνουδωτή. Δυναμική. Ακαταμάχητη. 🐾🐾🐾",
      bio: `Καλωσήρθες στο επίσημο σπίτι της solthecat — της βασίλισσας με πατούσες πίσω από τη σειρά SOLadventures. Από την Αθήνα ως το Παρίσι και πέρα, η Sol φέρνει κομψότητα, ύφος και βασιλική γοητεία σε κάθε της στάση.`,
      viewJourney: "Δες το Ταξίδι",
      quoteTitle: "Η Πατουσένια Στιγμή της Ημέρας",
      gamesTitle: "🎮 Παίξε με τη Sol!",
      gamesText: "Ανακάλυψε mini-games εμπνευσμένα από τα βασιλικά της ταξίδια — memory cards, παζλ και άλλα!",
      gamesCTA: "Παίξε Παιχνίδια",
      instagram: "Ακολούθησε στο Instagram",
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

      <PageContainer initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <LanguageToggle>
          <ToggleButton onClick={() => setLanguage("en")} $active={language === "en"}> {"🇬🇧"} English </ToggleButton>
          <ToggleButton onClick={() => setLanguage("el")} $active={language === "el"}> {"🇬🇷"} Ελληνικά </ToggleButton>
        </LanguageToggle>

        <h2 style={{ fontSize: "1.8rem", fontWeight: 600, fontFamily: "'Playfair Display', serif", color: "#4a005f", fontStyle: "italic", margin: "1.2rem 0", textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)" }}>{t.title}</h2>

        <p style={{ fontSize: "1.3rem", fontStyle: "italic", fontWeight: 500, color: "#6a1b9a", marginBottom: "2rem" }}>{t.flair}</p>

        <p style={{ maxWidth: "600px", width: "100%", fontSize: "1rem", color: "#5b2b7b", lineHeight: "1.6", margin: "0 auto 2rem auto", padding: "0 1rem", fontFamily: "'Segoe UI', 'Helvetica Neue', sans-serif" }}>{t.bio}</p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          <JourneyButton to="/episodes">{t.viewJourney}</JourneyButton>
        </motion.div>

        {quote && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} style={{ backgroundColor: "#fff3f8", padding: "1.2rem", borderRadius: "1.5rem", marginTop: "2.5rem", maxWidth: "600px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", textAlign: "center" }}>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "bold", color: "#8e24aa", marginBottom: "0.5rem" }}>{t.quoteTitle}</h3>
            <p style={{ fontSize: "1rem", fontStyle: "italic", color: "#6a1b9a" }}>{quote}</p>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} style={{ backgroundColor: "#f8bbd0", padding: "1.5rem", borderRadius: "1.5rem", marginTop: "2.5rem", maxWidth: "600px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)" }}>
          <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#6a1b9a", marginBottom: "0.8rem" }}>{t.gamesTitle}</h3>
          <p style={{ fontSize: "1rem", color: "#4a005f", marginBottom: "1.2rem" }}>{t.gamesText}</p>
          <Link to="/games" style={{ display: "inline-block", padding: "0.6rem 1.2rem", backgroundColor: "#c187d8", color: "#fff", borderRadius: "1rem", fontWeight: "bold", textDecoration: "none", transition: "transform 0.2s ease-in-out" }} onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")} onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}>{t.gamesCTA}</Link>
        </motion.div>

        <a href="https://www.instagram.com/solthecat01/" target="_blank" rel="noopener noreferrer" style={{ color: "#c187d8", textDecoration: "none", display: "inline-flex", alignItems: "center", fontWeight: "normal", fontSize: "0.95rem", marginTop: "1.8rem" }}>
          <picture style={{ display: "inline-block", marginRight: "0.4rem" }}>
            <source srcSet="/icons/instagram-icon.webp" type="image/webp" />
            <img src="/icons/instagram-icon.png" alt="Instagram" style={{ width: "20px", height: "20px", verticalAlign: "middle" }} />
          </picture>
          {t.instagram}
        </a>
      </PageContainer>
    </>
  );
}
