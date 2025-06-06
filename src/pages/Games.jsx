// src/pages/Games.jsx

import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import SolBrand from "../components/SolBrand";
import { useLanguage } from "../context/LanguageContext.jsx";

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

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
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

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const GameDescription = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
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
  const { language } = useLanguage();

  const content = {
    en: {
      pageTitle: "Sol’s Game Room – SolTheCat",
      heading: "🎮 Sol’s Game Room",
      playText: "Play",
      games: [
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
        {
          id: 4,
          emoji: "📷",
          name: "SolSnap",
          description: "Snap decision: 3 yes/no questions per episode.",
          route: "/games/solsnap",
        },
      ],
    },
    el: {
      pageTitle: "Αίθουσα Παιχνιδιών της Sol – SolTheCat",
      heading: "🎮 Αίθουσα Παιχνιδιών της Sol",
      playText: "Παίξε",
      games: [
        {
          id: 1,
          emoji: "🐾",
          name: "Μνήμη με Πατουσάκια",
          description: "Βρες τα ζευγάρια των πατουσακιών!",
          route: "/games/pawprints",
        },
        {
          id: 2,
          emoji: "🧩",
          name: "Παζλ Χάρτης της Sol",
          description: "Συγκέντρωσε πάλι τις πόλεις που επισκέφθηκε η Sol!",
          route: "/games/puzzlemap",
        },
        {
          id: 3,
          emoji: "🧠",
          name: "Quiz της Sol",
          description: "Δοκίμασε τις γνώσεις σου!",
          route: "/games/cityquiz",
        },
        {
          id: 4,
          emoji: "📷",
          name: "SolSnap",
          description: "Γρήγορο τεστ: 3 ερωτήσεις ναι/όχι ανά επεισόδιο.",
          route: "/games/solsnap",
        },
      ],
    },
  };

  const t = content[language];

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games" />
      </Helmet>

      <PageContainer>
        <BrandWrapper>
          <SolBrand />
        </BrandWrapper>

        <Title>{t.heading}</Title>

        <GamesGrid>
          {t.games.map((game) => (
            <GameCard key={game.id}>
              <GameEmoji>{game.emoji}</GameEmoji>
              <GameTitle>{game.name}</GameTitle>
              <GameDescription>{game.description}</GameDescription>
              <PlayButton to={game.route}>{t.playText}</PlayButton>
            </GameCard>
          ))}
        </GamesGrid>
      </PageContainer>
    </>
  );
}
