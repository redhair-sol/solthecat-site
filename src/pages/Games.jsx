import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

// ✅ ΙΔΙΟ BUTTON ΠΑΝΤΟΥ
const SolButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: bold;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1rem;
  align-self: center;

  &:hover {
    transform: scale(1.05);
  }
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
`;

const Subheading = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
  font-family: 'Poppins', sans-serif;
`;

const GamesGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
`;

const GameCard = styled.div`
  background: white;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.2s ease-in-out;

  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: scale(1.03);
  }
`;

const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
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
  margin-bottom: auto;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

export default function Games() {
  const { language } = useLanguage();

  const content = {
    en: {
      pageTitle: "Sol’s Game Room – SolTheCat",
      heading: "Sol’s Games 🎮",
      subtitle: "Pick your royal challenge",
      playText: "Play",
      games: [
        { id: 1, emoji: "🐾", name: "Pawprints Memory", description: "Find matching pawprint pairs!", route: "/games/pawprints" },
        { id: 2, emoji: "🧩", name: "SOL's Puzzle Map", description: "Rebuild the cities Sol has visited!", route: "/games/puzzlemap" },
        { id: 3, emoji: "🧠", name: "SOL Quiz", description: "Test your knowledge!", route: "/games/cityquiz" },
        { id: 4, emoji: "📷", name: "SolSnap", description: "Snap decision: 3 yes/no questions per episode.", route: "/games/solsnap" },
      ],
    },
    el: {
      pageTitle: "Αίθουσα Παιχνιδιών της Sol – SolTheCat",
      heading: "Παιχνίδια της Sol 🎮",
      subtitle: "Διάλεξε τη βασιλική σου πρόκληση",
      playText: "Παίξε",
      games: [
        { id: 1, emoji: "🐾", name: "Μνήμη με Πατουσάκια", description: "Βρες τα ζευγάρια των πατουσακιών!", route: "/games/pawprints" },
        { id: 2, emoji: "🧩", name: "Παζλ Χάρτης της Sol", description: "Συγκέντρωσε πάλι τις πόλεις που επισκέφθηκε η Sol!", route: "/games/puzzlemap" },
        { id: 3, emoji: "🧠", name: "Quiz της Sol", description: "Δοκίμασε τις γνώσεις σου!", route: "/games/cityquiz" },
        { id: 4, emoji: "📷", name: "SolSnap", description: "Snap decision: 3 yes/no ερωτήσεις ανά επεισόδιο.", route: "/games/solsnap" },
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

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heading>{t.heading}</Heading>
        <Subheading>{t.subtitle}</Subheading>

        <GamesGrid>
          {t.games.map((game) => (
            <GameCard key={game.id}>
              <CardContent>
                <GameEmoji>{game.emoji}</GameEmoji>
                <GameTitle>{game.name}</GameTitle>
                <GameDescription>{game.description}</GameDescription>
              </CardContent>
              <SolButton to={game.route}>{t.playText}</SolButton>
            </GameCard>
          ))}
        </GamesGrid>
      </PageContainer>
    </>
  );
}
