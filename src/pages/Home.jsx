import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import SolButton from "../components/SolButton.jsx";
import useStreakBadges from "../hooks/useStreakBadges";

// ----- LIVE BADGE -----
const LiveBadge = styled.div`
  background: #47c9a0;
  color: white;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
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

const LiveBadgeLink = styled(Link)`
  position: absolute;
  top: 18px;
  right: 18px;
  text-decoration: none;
  z-index: 9999;

  @media (max-width: 768px) {
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    right: auto;
  }

  @media (max-width: 360px) {
    top: 30px;
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

const HeroTagline = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'Playfair Display', serif;
  color: #4a005f;
  font-style: italic;
  margin: 1.2rem 0;
`;

const Flair = styled.p`
  font-size: 1.3rem;
  font-style: italic;
  color: #6a1b9a;
  margin-bottom: 2rem;
`;

const Bio = styled.p`
  max-width: 600px;
  margin: 0 auto 0.5rem;
  padding: 0 1rem;
  color: #5b2b7b;
  font-size: 1rem;
  line-height: 1.6;
`;

const QuoteBox = styled(motion.div)`
  background-color: #fff3f8;
  padding: 1.2rem;
  border-radius: 1.5rem;
  margin-top: 1.6rem;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const QuoteTitle = styled.h3`
  font-size: 1.3rem;
  color: #8e24aa;
  margin-bottom: 0.5rem;
`;

const QuoteText = styled.p`
  font-style: italic;
  color: #6a1b9a;
`;

const BadgeBox = styled(motion.div)`
  background-color: #fff3f8;
  padding: 1rem;
  border-radius: 1.5rem;
  max-width: 600px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin-top: 1.6rem;
`;

const BadgeIntro = styled.p`
  color: #5b2b7b;
`;

const BadgeName = styled.p`
  font-size: 1.1rem;
  color: #8e24aa;
  font-weight: 600;
`;

const BadgeDesc = styled.p`
  color: #6a1b9a;
`;

const StreakText = styled.p`
  color: #5b2b7b;
  margin-top: 0.5rem;
`;

const UnlockedText = styled.p`
  color: #4a005f;
  margin-top: 0.5rem;
`;

const GamesCard = styled(motion.div)`
  background-color: #f8bbd0;
  padding: 1.5rem;
  border-radius: 1.5rem;
  max-width: 600px;
  margin-top: 1.6rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const GamesTitle = styled.h3`
  color: #6a1b9a;
  font-size: 1.5rem;
  font-weight: 700;
`;

const GamesText = styled.p`
  color: #4a005f;
  margin-bottom: 1.2rem;
`;

const GamesCTA = styled(Link)`
  display: inline-block;
  padding: 0.6rem 1.2rem;
  background-color: #c187d8;
  color: white;
  text-decoration: none;
  border-radius: 1rem;
  font-weight: bold;
`;

const InstagramLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #c187d8;
  margin-top: 1.6rem;
  text-decoration: none;
`;

const InstagramIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 0.4rem;
`;

const RelativePageContainer = styled(PageContainer)`
  position: relative;
`;

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasSearchParam = Boolean(queryParams.get("s"));

  const [quote, setQuote] = useState("");
  const [mode, setMode] = useState("mood");
  const [isLive, setIsLive] = useState(false);

  // Same-origin endpoint backed by functions/solcam-check.js (prod) and a
  // matching Vite middleware (dev). Always returns { live: boolean }, status 200.
  const checkStream = async () => {
    try {
      const res = await fetch(`/solcam-check?t=${Date.now()}`);
      if (!res.ok) {
        setIsLive(false);
        return;
      }
      const data = await res.json();
      setIsLive(data.live === true);
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
    if (!options || options.length === 0) return null;
    const today = new Date().toISOString().slice(0, 10);
    const key = `solDaily-${mode}-${language}-${today}`;
    const cached = localStorage.getItem(key);

    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // Corrupt cache (e.g. legacy "undefined" entry) — fall through and re-pick.
      }
    }

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
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
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
      })
      .catch((err) => {
        console.error("Failed to load daily quote:", err);
        setQuote(
          language === "el"
            ? "Η Sol ξεκουράζεται βασιλικά σήμερα. 🐾"
            : "Sol is taking a royal pause today. 🐾"
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
      live: "LIVE",
      visitStreak: (n) => `Visit Streak: ${n} day${n > 1 ? "s" : ""}`,
      newBadge: "🎉 New Badge Unlocked Today!",
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
      live: "ΖΩΝΤΑΝΑ",
      visitStreak: (n) => `Σερί επισκέψεων: ${n} ${n === 1 ? "ημέρα" : "ημέρες"}`,
      newBadge: "🎉 Ξεκλείδωσες νέο Badge σήμερα!",
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

      <RelativePageContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {isLive && (
          <LiveBadgeLink to="/solcam">
            <LiveBadge>
              <LiveDot /> {t.live}
            </LiveBadge>
          </LiveBadgeLink>
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

        <HeroTagline>{t.title}</HeroTagline>
        <Flair>{t.flair}</Flair>
        <Bio>{t.bio}</Bio>

        {/* JOURNEY BUTTON */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <SolButton to="/episodes">{t.viewJourney}</SolButton>
        </motion.div>

        {/* QUOTE TOGGLE */}
        <LanguageToggle style={{ marginTop: "2.4rem" }}>
          <ToggleButton onClick={() => setMode("mood")} $active={mode === "mood"}>
            {t.toggleMood}
          </ToggleButton>
          <ToggleButton onClick={() => setMode("fortune")} $active={mode === "fortune"}>
            {t.toggleFortune}
          </ToggleButton>
        </LanguageToggle>

        {/* QUOTE BOX */}
        {quote && (
          <QuoteBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuoteTitle>{t.quoteTitle}</QuoteTitle>
            <QuoteText>{quote}</QuoteText>
          </QuoteBox>
        )}

        {/* BADGE */}
        {currentBadge && (
          <BadgeBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <BadgeIntro>
              {language === "en"
                ? "Your loyalty badge shows how many days you’ve walked the royal path with Sol."
                : "Το badge πίστης σου δείχνει πόσες μέρες ακολουθείς το βασιλικό μονοπάτι με τη Sol."}
            </BadgeIntro>

            <BadgeName>
              {currentBadge.emoji} {currentBadge.name[language]}
            </BadgeName>

            <BadgeDesc>{currentBadge.description[language]}</BadgeDesc>

            <StreakText>{t.visitStreak(streak)}</StreakText>

            {unlockedToday && <UnlockedText>{t.newBadge}</UnlockedText>}
          </BadgeBox>
        )}

        {/* GAMES */}
        <GamesCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <GamesTitle>{t.gamesTitle}</GamesTitle>
          <GamesText>{t.gamesText}</GamesText>
          <GamesCTA to="/games">{t.gamesCTA}</GamesCTA>
        </GamesCard>

        {/* INSTAGRAM */}
        <InstagramLink
          href="https://www.instagram.com/solthecat01/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon
            src="/icons/instagram-icon.webp"
            alt="Instagram"
            width="20"
            height="20"
          />
          {t.instagram}
        </InstagramLink>
      </RelativePageContainer>
    </>
  );
}
