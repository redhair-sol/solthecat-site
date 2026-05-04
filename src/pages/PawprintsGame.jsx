// src/pages/PawprintsGame.jsx

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { celebrate } from "../utils/celebrate.js";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

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
      celebrate();
    }
  }, [matched, cards]);

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

        {won && <Message>{t.success}</Message>}
        {gameOver && !won && <Message>{t.failure}</Message>}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
