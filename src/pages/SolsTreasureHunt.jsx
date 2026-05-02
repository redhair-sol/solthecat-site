import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { Link } from "react-router-dom";
import { celebrate } from "../utils/celebrate.js";
import SolButton from "../components/SolButton.jsx";

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 2rem;
  max-width: 500px;
  text-align: center;
`;

const TreasureArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1 / 1;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem auto;
  box-sizing: border-box;
`;

const Item = styled.img`
  position: absolute;
  width: 20px;
  height: 20px;
  cursor: pointer;
  user-select: none;
  opacity: 0.7;
  transition: opacity 0.2s ease;
  &:hover {
    opacity: 1;
  }
`;

const Info = styled.p`
  text-align: center;
  font-weight: bold;
  color: #8e24aa;
  margin-top: 1rem;
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 2rem;
  text-align: center;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;
`;

export default function SolsTreasureHunt() {
  const { language } = useLanguage();
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [items, setItems] = useState([]);
  const [found, setFound] = useState(0);
  const areaRef = useRef();

  const t = {
    en: {
      pageTitle: "Sol’s Treasure Hunt – SolTheCat",
      title: "Sol’s Treasure Hunt 🗺️",
      subtitle: "Find all the hidden treasures!",
      description: "Sol hid 3 royal treasures in this area. Can you find them all?",
      back: "← Back to games",
      done: "🎉 Well done! You found all the treasures!",
      playAgain: "🔁 Play Again",
    },
    el: {
      pageTitle: "Κυνήγι Θησαυρού της Sol – SolTheCat",
      title: "Κυνήγι Θησαυρού της Sol 🗺️",
      subtitle: "Βρες όλους τους κρυμμένους θησαυρούς!",
      description: "Η Sol έκρυψε 3 βασιλικούς θησαυρούς εδώ. Μπορείς να τους βρεις όλους;",
      back: "← Επιστροφή στα παιχνίδια",
      done: "🎉 Μπράβο! Βρήκες όλους τους θησαυρούς!",
      playAgain: "🔁 Παίξε Ξανά",
    },
  }[language];

  // ✅ Load episodes.json dynamically
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((r) => r.json())
      .then((data) => {
        const vis = data.filter((ep) => ep.visible);
        setEpisodes(vis);
        if (vis.length) {
          const random = vis[Math.floor(Math.random() * vis.length)];
          setSelectedEpisode(random);
        }
      });
  }, []);

  // ✅ Place treasures with more random, near borders too
  useEffect(() => {
    if (!areaRef.current || !selectedEpisode) return;
    const size = areaRef.current.clientWidth;
    const margin = 20; // avoid overflow
    const newItems = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      x: margin + Math.random() * (size - margin * 2 - 20),
      y: margin + Math.random() * (size - margin * 2 - 20),
      img: `/icons/treasure-${i + 1}.png`,
    }));
    setItems(newItems);
    setFound(0);
  }, [selectedEpisode]);

  const handleFind = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setFound((prev) => prev + 1);
  };

  // Win effect — runs once whenever `found` lands on 3.
  // (Side effects inside state updaters fire twice in React 18 dev/strict mode.)
  useEffect(() => {
    if (found === 3) celebrate();
  }, [found]);

  const playAgain = () => {
    if (!episodes.length) return;
    const random = episodes[Math.floor(Math.random() * episodes.length)];
    // Spread to force a new reference even if the same episode is picked again,
    // so the placement effect re-fires and resets items + found.
    setSelectedEpisode({ ...random });
  };

  const bg = selectedEpisode
    ? `url(${import.meta.env.BASE_URL}${selectedEpisode.image})`
    : "#f3e5f5";

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/treasurehunt" />
      </Helmet>

      <PageContainer alignTop>
        <Title>{t.title}</Title>
        <Subtitle>{t.subtitle}</Subtitle>
        <Description>{t.description}</Description>

        <TreasureArea ref={areaRef} style={{ backgroundImage: bg }}>
          {items.map((item) => (
            <Item
              key={item.id}
              src={item.img}
              alt="treasure"
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
              }}
              onClick={() => handleFind(item.id)}
            />
          ))}
        </TreasureArea>

        <Info>{found === 3 ? t.done : `${found} / 3`}</Info>

        {found === 3 && (
          <SolButton as="button" onClick={playAgain}>
            {t.playAgain}
          </SolButton>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
