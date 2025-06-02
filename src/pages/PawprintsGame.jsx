import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SolBrand from "../components/SolBrand";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  margin-bottom: 1rem;
  font-weight: bold;
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
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #aa4dc8; /* ✅ mov */
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 2rem; /* ✅ spacing before grid */
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #8e24aa; /* ✅ darker mov on hover */
  }
`;

const initialCards = [
  { id: 1, emoji: "🐾" },  { id: 2, emoji: "🍗" },
  { id: 3, emoji: "🏛️" }, { id: 4, emoji: "🐟" },
  { id: 5, emoji: "🧀" },  { id: 6, emoji: "🎒" },
  { id: 7, emoji: "🚌" },  { id: 8, emoji: "🍕" },
  { id: 9, emoji: "📸" },  { id: 10, emoji: "🐾" },
  { id: 11, emoji: "🍗" }, { id: 12, emoji: "🏛️" },
  { id: 13, emoji: "🐟" }, { id: 14, emoji: "🧀" },
  { id: 15, emoji: "🎒" }, { id: 16, emoji: "🚌" },
  { id: 17, emoji: "🍕" }, { id: 18, emoji: "📸" },
];

export default function PawprintsGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [won, setWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }, []);

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
    }
  }, [matched, cards]);

  const handleFlip = (index) => {
    if (!gameStarted || flipped.length === 2 || flipped.includes(index) || matched.includes(index) || won || gameOver) return;

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

  const startGame = () => {
    setGameStarted(true);
    setTimeLeft(60);
    setMatched([]);
    setFlipped([]);
    setWon(false);
    setGameOver(false);
    const reshuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(reshuffled);
  };

  return (
    <PageContainer>
      <SolBrand />
      <Title>🎮 Match the Pawprints</Title>

      {!gameStarted && !won && !gameOver && (
        <StartButton onClick={startGame}>Start Game</StartButton>
      )}

      {gameStarted && <Timer>⏳ Time left: {timeLeft}s</Timer>}

      <Grid>
        {cards.map((card, index) => (
          <Card
            key={index}
            $revealed={flipped.includes(index) || matched.includes(index)}
            onClick={() => handleFlip(index)}
          >
            {(flipped.includes(index) || matched.includes(index)) ? card.emoji : "❔"}
          </Card>
        ))}
      </Grid>

      {won && <Message>Well done, explorer! 🐾🐾🐾</Message>}
      {gameOver && !won && <Message>Time’s up! Try again 🐾</Message>}
    </PageContainer>
  );
}
