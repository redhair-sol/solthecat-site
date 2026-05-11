// src/pages/PawprintsGame.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { celebrate } from "../utils/celebrate.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { markDailyDoneIfMatches } from "../utils/dailyChallenge.js";

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 1.2rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
`;

const Timer = styled.div`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #6a1b9a;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  justify-items: center;
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    max-width: 100%;
    gap: 0.7rem;
  }
`;

const Card = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f8bbd0;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: ${(props) => (props.$revealed ? "0 0 10px #aa4dc8" : "none")};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const Message = styled.div`
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #4a148c;
`;

const StartButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  border: none;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackLink = styled(Link)`
  margin-top: 2rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

// --- Leaderboard styled bits (mirrored from CatchCats for visual parity) ---
const Top3Box = styled.div`
  background: #ffffffcc;
  border: 2px solid #f8bbd0;
  border-radius: 1rem;
  padding: 0.8rem 1rem;
  margin: 0.5rem auto 1rem;
  max-width: 320px;
  width: 100%;
  font-family: 'Poppins', sans-serif;
  text-align: left;
`;

const Top3Title = styled.p`
  font-weight: 700;
  color: #6a1b9a;
  margin: 0 0 0.4rem;
  text-align: center;
  font-size: 0.95rem;
`;

const Top3Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #5b2b7b;
  padding: 0.15rem 0;
`;

const Top3Empty = styled.p`
  color: #5b2b7b;
  font-size: 0.85rem;
  font-style: italic;
  text-align: center;
  margin: 0;
`;

const PersonalBestText = styled.p`
  color: #aa4dc8;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  text-align: center;
  margin: 0.4rem 0;
`;

const NameInputRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 0.6rem;
`;

const NameInput = styled.input`
  padding: 0.6rem 1rem;
  border: 2px solid #c187d8;
  border-radius: 999px;
  font-family: 'Poppins', sans-serif;
  font-size: 0.95rem;
  color: #5b2b7b;
  outline: none;
  width: 12ch;

  &:focus {
    border-color: #aa4dc8;
    box-shadow: 0 0 0 3px rgba(170, 77, 200, 0.15);
  }
`;

const SmallButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${({ $secondary }) => ($secondary ? "#ffffff" : "#c187d8")};
  color: ${({ $secondary }) => ($secondary ? "#6a1b9a" : "white")};
  border: 2px solid #c187d8;
  border-radius: 999px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const initialCards = [
  { id: 1, emoji: "🐾" },
  { id: 2, emoji: "🍗" },
  { id: 3, emoji: "🏛️" },
  { id: 4, emoji: "🐟" },
  { id: 5, emoji: "🧀" },
  { id: 6, emoji: "🎒" },
  { id: 7, emoji: "🚌" },
  { id: 8, emoji: "🍕" },
  { id: 9, emoji: "📸" },
  { id: 10, emoji: "🐾" },
  { id: 11, emoji: "🍗" },
  { id: 12, emoji: "🏛️" },
  { id: 13, emoji: "🐟" },
  { id: 14, emoji: "🧀" },
  { id: 15, emoji: "🎒" },
  { id: 16, emoji: "🚌" },
  { id: 17, emoji: "🍕" },
  { id: 18, emoji: "📸" },
];

export default function PawprintsGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [won, setWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { language } = useLanguage();

  // Leaderboard score = timeLeft when the user wins (higher = faster).
  const [winScore, setWinScore] = useState(0);
  const [topEntries, setTopEntries] = useState([]);
  const [personalBest, setPersonalBest] = useState(0);
  const [submitName, setSubmitName] = useState("");
  const [submitState, setSubmitState] = useState("idle");
  const [submittedRank, setSubmittedRank] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const content = {
    en: {
      pageTitle: "Match the Pawprints – SolTheCat",
      heading: "Sol’s Pawprints Game 🐾",
      subtitle: "Find all the matching pairs before time runs out!",
      start: "Start Game",
      playAgain: "Play Again",
      timer: (secs) => `⏳ Time left: ${secs}s`,
      success: "Well done, explorer! 🐾🐾🐾",
      failure: "Time’s up! Try again 🐾",
      back: "← Back to games",
      personalBest: (s) => `🏆 Your best: ${s}s left`,
      noBest: "🏆 No personal record yet",
      top3Title: "🏆 Top 3 (seconds left)",
      top3Empty: "No scores yet — be the first!",
      newRecord: "🎉 NEW PERSONAL BEST!",
      qualifies: "🌟 You made the leaderboard!",
      enterName: "Enter your name:",
      submit: "Submit",
      skip: "Skip",
      submittedRank: (r) => `You're #${r} on the board!`,
      finalScore: (s) => `⏱️ Finished with ${s}s left!`,
    },
    el: {
      pageTitle: "Βρες τα Πατουσάκια – SolTheCat",
      heading: "Sol’s Πατουσάκια Παιχνίδι 🐾",
      subtitle: "Βρες όλα τα ζευγάρια πριν τελειώσει ο χρόνος!",
      start: "Έναρξη Παιχνιδιού",
      playAgain: "Παίξε Ξανά",
      timer: (secs) => `⏳ Υπόλοιπο χρόνου: ${secs}δ`,
      success: "Μπράβο, εξερευνητή! 🐾🐾🐾",
      failure: "Τελείωσε ο χρόνος! Δοκίμασε ξανά 🐾",
      back: "← Επιστροφή στα παιχνίδια",
      personalBest: (s) => `🏆 Καλύτερό σου: ${s}δ που έμειναν`,
      noBest: "🏆 Κανένα ρεκόρ ακόμη",
      top3Title: "🏆 Top 3 (δευτερόλεπτα που έμειναν)",
      top3Empty: "Κανένα σκορ ακόμη — γίνε ο πρώτος!",
      newRecord: "🎉 ΝΕΟ ΠΡΟΣΩΠΙΚΟ ΡΕΚΟΡ!",
      qualifies: "🌟 Μπήκες στη βαθμολογία!",
      enterName: "Όνομα:",
      submit: "Καταχώρηση",
      skip: "Παράλειψη",
      submittedRank: (r) => `Είσαι #${r} στη βαθμολογία!`,
      finalScore: (s) => `⏱️ Τελείωσες με ${s}δ. να μένουν!`,
    },
  };

  const t = content[language];

  const startGame = () => {
    setCards([...initialCards].sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
    setWon(false);
    setGameOver(false);
    setTimeLeft(60);
    setGameStarted(true);
  };

  useEffect(() => {
    if (!gameStarted || won || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, won, gameOver]);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setWon(true);
      // Freeze the score (seconds left) at the moment of winning. Higher
      // = faster, which matches the leaderboard's "higher is better" sort.
      setWinScore(timeLeft);
      celebrate();
    }
  }, [matched, cards, timeLeft]);

  // Fetch top 3 + load personal best on mount.
  useEffect(() => {
    setPersonalBest(parseInt(localStorage.getItem("pawprints_best") || "0", 10));
    fetch("/leaderboard?game=pawprints&level=default")
      .then((r) => (r.ok ? r.json() : { entries: [] }))
      .then((data) => setTopEntries(data.entries || []))
      .catch(() => setTopEntries([]));
  }, []);

  // Update personal best whenever the user wins.
  useEffect(() => {
    if (!won) return;
    const prevBest = parseInt(localStorage.getItem("pawprints_best") || "0", 10);
    if (winScore > prevBest) {
      localStorage.setItem("pawprints_best", String(winScore));
      setPersonalBest(winScore);
    }
    setSubmitName("");
    setSubmitState("idle");
    setSubmittedRank(null);
    markDailyDoneIfMatches("pawprints", "default");
  }, [won, winScore]);

  const qualifiesForLeaderboard = () => {
    if (winScore <= 0) return false;
    if (topEntries.length < 3) return true;
    return winScore > topEntries[2].score;
  };

  const submitToLeaderboard = async () => {
    const name = submitName.trim();
    if (!name) return;
    setSubmitState("submitting");
    try {
      const res = await fetch("/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game: "pawprints",
          level: "default",
          score: winScore,
          name,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setSubmittedRank(data.rank || null);
      setTopEntries(data.top || []);
      setSubmitState("submitted");
    } catch (err) {
      console.error("Leaderboard submit failed:", err);
      setSubmitError(err.message || "Submit failed");
      setSubmitState("error");
    }
  };

  const skipSubmit = () => setSubmitState("skipped");

  const handleFlip = (index) => {
    if (
      !gameStarted ||
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index) ||
      won ||
      gameOver
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        setMatched((prev) => [...prev, first, second]);
        setTimeout(() => setFlipped([]), 800);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/pawprints" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{t.heading}</Title>
        <Subtitle>{t.subtitle}</Subtitle>

        {(!gameStarted || won || gameOver) && (
          <Top3Box>
            <Top3Title>{t.top3Title}</Top3Title>
            {topEntries.length === 0 ? (
              <Top3Empty>{t.top3Empty}</Top3Empty>
            ) : (
              topEntries.map((e, i) => (
                <Top3Row key={`${e.name}-${e.score}-${i}`}>
                  <span>
                    {["🥇", "🥈", "🥉"][i] || "·"} {e.name}
                  </span>
                  <span><strong>{e.score}s</strong></span>
                </Top3Row>
              ))
            )}
            <PersonalBestText>
              {personalBest > 0 ? t.personalBest(personalBest) : t.noBest}
            </PersonalBestText>
          </Top3Box>
        )}

        {!gameStarted || won || gameOver ? (
          <StartButton onClick={startGame}>
            {gameStarted ? t.playAgain : t.start}
          </StartButton>
        ) : (
          <Timer>{t.timer(timeLeft)}</Timer>
        )}

        <Grid>
          {cards.map((card, index) => (
            <Card
              key={card.id}
              $revealed={flipped.includes(index) || matched.includes(index)}
              onClick={() => handleFlip(index)}
            >
              {flipped.includes(index) || matched.includes(index)
                ? card.emoji
                : "❔"}
            </Card>
          ))}
        </Grid>

        {won && (
          <>
            <Message>{t.success}</Message>
            <Message style={{ fontSize: "1rem" }}>{t.finalScore(winScore)}</Message>

            {winScore > 0 && winScore >= personalBest && (
              <PersonalBestText style={{ fontSize: "1rem" }}>
                {t.newRecord}
              </PersonalBestText>
            )}

            {qualifiesForLeaderboard() && submitState === "idle" && (
              <>
                <PersonalBestText>{t.qualifies}</PersonalBestText>
                <p style={{ color: "#5b2b7b", fontSize: "0.85rem", margin: "0.3rem 0" }}>
                  {t.enterName}
                </p>
                <NameInputRow>
                  <NameInput
                    type="text"
                    maxLength={12}
                    value={submitName}
                    onChange={(e) => setSubmitName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && submitName.trim()) submitToLeaderboard();
                    }}
                    placeholder="Sol"
                    autoFocus
                  />
                  <SmallButton
                    onClick={submitToLeaderboard}
                    disabled={!submitName.trim()}
                  >
                    {t.submit}
                  </SmallButton>
                  <SmallButton $secondary onClick={skipSubmit}>
                    {t.skip}
                  </SmallButton>
                </NameInputRow>
              </>
            )}

            {submitState === "submitting" && (
              <PersonalBestText>...</PersonalBestText>
            )}

            {submitState === "submitted" && submittedRank && (
              <PersonalBestText style={{ fontSize: "1rem" }}>
                {t.submittedRank(submittedRank)}
              </PersonalBestText>
            )}

            {submitState === "error" && (
              <>
                <PersonalBestText style={{ color: "#c62828", fontSize: "0.9rem" }}>
                  ⚠️ {submitError || "Submit failed"}
                </PersonalBestText>
                <SmallButton onClick={() => setSubmitState("idle")}>
                  Try again
                </SmallButton>
              </>
            )}
          </>
        )}
        {gameOver && !won && <Message>{t.failure}</Message>}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
