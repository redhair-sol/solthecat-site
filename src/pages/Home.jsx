// src/pages/Home.jsx

import { useState } from "react";
import { useLocation, Link } from "react-router-dom"; // Προσθήκη useLocation
import { motion } from "framer-motion";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import SolBrand from "../components/SolBrand";

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const JourneyButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: #aa4dc8;
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
`;

export default function Home() {
  const [language, setLanguage] = useState("en");
  const location = useLocation();

  // Πιάσε το query parameter "s" (search)
  const queryParams = new URLSearchParams(location.search);
  const hasSearchParam = Boolean(queryParams.get("s"));

  const content = {
    en: {
      title: "the journey of a Queen",
      flair: "Fluffy. Fierce. Fabulous. 🐾🐾🐾",
      bio: `Welcome to the official home of solthecat — the feline queen behind the SOLadventures series. From Athens to Paris and beyond, Sol brings elegance, attitude, and a touch of royal paw-power to every destination. Follow her travels, her tales, and her timeless stare.`,
      viewJourney: "View the Journey",
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
        {hasSearchParam && (
          // Αν υπάρχει παράμετρος "?s=", βάζουμε noindex, follow
          <meta name="robots" content="noindex, follow" />
        )}
      </Helmet>

      <PageContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <SolBrand size="2.5rem" centered />

        <LanguageToggle>
          <ToggleButton onClick={() => setLanguage("en")} $active={language === "en"}>
            🇬🇧 English
          </ToggleButton>
          <ToggleButton onClick={() => setLanguage("el")} $active={language === "el"}>
            🇬🇷 Ελληνικά
          </ToggleButton>
        </LanguageToggle>

        <h2
          style={{
            fontSize: "1.8rem",
            fontWeight: 600,
            fontFamily: "'Playfair Display', serif",
            color: "#4a005f",
            fontStyle: "italic",
            margin: "1.2rem 0",
            textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
          }}
        >
          {t.title}
        </h2>

        <p
          style={{
            fontSize: "1.3rem",
            fontStyle: "italic",
            fontWeight: 500,
            color: "#6a1b9a",
            marginBottom: "2rem",
          }}
        >
          {t.flair}
        </p>

        {/* SEO mini-bio */}
        <p
          style={{
            maxWidth: "700px",
            fontSize: "1rem",
            color: "#5b2b7b",
            marginBottom: "2rem",
            lineHeight: "1.6",
          }}
        >
          {t.bio}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <JourneyButton to="/episodes">{t.viewJourney}</JourneyButton>
        </motion.div>

        {/* Games block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          style={{
            backgroundColor: "#f8bbd0",
            padding: "1.5rem",
            borderRadius: "1.5rem",
            marginTop: "2.5rem",
            maxWidth: "600px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#6a1b9a",
              marginBottom: "0.8rem",
            }}
          >
            {t.gamesTitle}
          </h3>
          <p
            style={{
              fontSize: "1rem",
              color: "#4a005f",
              marginBottom: "1.2rem",
            }}
          >
            {t.gamesText}
          </p>
          <Link
            to="/games"
            style={{
              display: "inline-block",
              padding: "0.6rem 1.2rem",
              backgroundColor: "#aa4dc8",
              color: "#fff",
              borderRadius: "1rem",
              fontWeight: "bold",
              textDecoration: "none",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            {t.gamesCTA}
          </Link>
        </motion.div>

        <a
          href="https://www.instagram.com/solthecat01/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "#aa4dc8",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            fontWeight: "normal",
            fontSize: "0.95rem",
            marginTop: "1.8rem",
          }}
        >
          <picture style={{ display: "inline-block", marginRight: "0.4rem" }}>
            <source srcSet="/icons/instagram-icon.webp" type="image/webp" />
            <img
              src="/icons/instagram-icon.png"
              alt="Instagram"
              style={{
                width: "20px",
                height: "20px",
                verticalAlign: "middle",
              }}
            />
          </picture>
          {t.instagram}
        </a>
      </PageContainer>
    </>
  );
}
