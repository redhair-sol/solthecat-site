// Games.jsx

import { Link } from "react-router-dom";
import styled from "styled-components";
import SolBrand from "../components/SolBrand";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
`;

const BrandWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const GameCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.03);
  }
`;

const GameEmoji = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.8rem;
`;

const GameTitle = styled.h2`
  font-size: 1.2rem;
  color: #d35ca3;
  margin-bottom: 0.5rem;
`;

const GameDescription = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;
`;

const PlayButton = styled(Link)`
  background-color: #f8bbd0;
  color: #fff;
  padding: 0.5rem 1.2rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background-color: #f48fb1;
  }
`;

export default function Games() {
  const games = [
    {
      id: 1,
      emoji: "🐾",
      name: "Pawprints Memory",
      description: "Find matching pawprint pairs!",
      route: "/games/pawprints",
    },
    {
      id: 2,
      emoji: "🧩",
      name: "SOL's Puzzle Map",
      description: "Rebuild the cities Sol has visited!",
      route: "/games/puzzlemap",
    },
    {
      id: 3,
      emoji: "🧠",
      name: "SOL Quiz",
      description: "Test your knowledge!",
      route: "/games/cityquiz",
    },
  ];

  return (
    <PageContainer>
      <BrandWrapper>
        <SolBrand />
      </BrandWrapper>
      <Title>🎮 Sol's Game Room</Title>
      <GamesGrid>
        {games.map((game) => (
          <GameCard key={game.id}>
            <GameEmoji>{game.emoji}</GameEmoji>
            <GameTitle>{game.name}</GameTitle>
            <GameDescription>{game.description}</GameDescription>
            <PlayButton to={game.route}>Play</PlayButton>
          </GameCard>
        ))}
      </GamesGrid>
    </PageContainer>
  );
}
