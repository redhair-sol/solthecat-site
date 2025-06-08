// src/pages/PuzzleMapGame.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";

const PageContainer = styled.div`
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  padding: 2rem;
  background: #fce4ec;
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  box-sizing: border-box;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Dropdown = styled.select`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #aa4dc8;
  border-radius: 8px;
  background: #fff;
  color: #6a1b9a;
  cursor: pointer;
  max-width: 90vw;
`;

const PuzzleWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 100%;
  max-width: 300px;
`;

const Tile = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  background-image: url(${props => props.bgImage});
  background-size: 300% 300%;
  background-position: ${props => props.bgPos};
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const EmptyTile = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  background: #fce4ec;
  border-radius: 6px;
`;

const Message = styled.p`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #8e24aa;
  font-weight: bold;
`;

const StyledButton = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const initialArr = [...Array(9).keys()];

export default function PuzzleMapGame() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [tiles, setTiles] = useState(initialArr);
  const [isSolved, setIsSolved] = useState(false);
  const { language } = useLanguage();

  const content = {
    en: {
      pageTitle: "Sol’s Puzzle Game – SolTheCat",
      title: "Sol’s Puzzle Game",
      subtitle: selectedId ? `Puzzle: SOLadventure #${selectedId}` : "",
      loading: "Loading...",
      playAgain: "🔁 Play Again",
      solvedMessage: "🎉 Puzzle Solved!",
      back: "← Back to games",
    },
    el: {
      pageTitle: "Παζλ της Sol – SolTheCat",
      title: "Παζλ της Sol",
      subtitle: selectedId ? `Παζλ: SOLadventure #${selectedId}` : "",
      loading: "Φόρτωση...",
      playAgain: "🔁 Παίξε Ξανά",
      solvedMessage: "🎉 Λύθηκε το Παζλ!",
      back: "← Επιστροφή στα παιχνίδια",
    },
  };

  const t = content[language];

  // Fetch episodes (π.χ. data για τα επεισόδια)
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then(res => res.json())
      .then(data => {
        const visible = data.filter(ep => ep.visible);
        setEpisodes(visible);
        if (visible.length > 0) setSelectedId(visible[0].id.toString());
      });
  }, []);

  const selectedEpisode = episodes.find(ep => ep.id.toString() === selectedId);
  const imagePath = selectedEpisode ? `${import.meta.env.BASE_URL}${selectedEpisode.image}` : "";

  // Νέα χρήση effect με έλεγχο για να ξεκινήσει το reset μόνο αφού βρεθεί η εικόνα
  useEffect(() => {
    if (selectedId && selectedEpisode?.image) {
      resetGame();
    }
  }, [selectedId, selectedEpisode]);

  const resetGame = () => {
    let arr = [...initialArr];
    let emptyIndex = 8;
    const swap = (a, b) => {
      const newArr = [...arr];
      [newArr[a], newArr[b]] = [newArr[b], newArr[a]];
      return newArr;
    };
    for (let i = 0; i < 100; i++) {
      const moves = [];
      if (emptyIndex % 3 !== 0) moves.push(emptyIndex - 1);
      if (emptyIndex % 3 !== 2) moves.push(emptyIndex + 1);
      if (emptyIndex >= 3) moves.push(emptyIndex - 3);
      if (emptyIndex < 6) moves.push(emptyIndex + 3);
      const moveTo = moves[Math.floor(Math.random() * moves.length)];
      arr = swap(emptyIndex, moveTo);
      emptyIndex = moveTo;
    }
    setTiles(arr);
    setIsSolved(false);
  };

  const handleTileClick = index => {
    if (isSolved) return;
    const emptyIndex = tiles.indexOf(8);
    const validMoves = [index - 1, index + 1, index - 3, index + 3];
    if (validMoves.includes(emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      if (newTiles.every((v, i) => v === i)) setIsSolved(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.pageTitle.replace("#${selectedId}", selectedEpisode ? selectedEpisode.id : '')}</title>
        <link rel="canonical" href="https://solthecat.com/games/puzzlemap" />
      </Helmet>

      <PageContainer>
        <Title>{t.title}</Title>
        {selectedId && <Subtitle>{t.subtitle}</Subtitle>}

        <DropdownWrapper>
          <Dropdown value={selectedId} onChange={e => setSelectedId(e.target.value)}>
            {episodes.map(ep => {
              const epTitle = typeof ep.title === 'object' ? ep.title[language] : ep.title;
              return <option key={ep.id} value={ep.id}>{epTitle}</option>;
            })}
          </Dropdown>
        </DropdownWrapper>

        <PuzzleWrapper>
          <Grid>
            {tiles.map((tile, idx) =>
              tile === 8 ? (
                <EmptyTile key={idx} />
              ) : (
                <Tile
                  key={idx}
                  bgImage={imagePath}
                  bgPos={`${(tile % 3) * -100 / 2}% ${Math.floor(tile / 3) * -100 / 2}%`}
                  onClick={() => handleTileClick(idx)}
                />
              )
            )}
          </Grid>
        </PuzzleWrapper>

        {isSolved && (
          <>
            <Message>{t.solvedMessage}</Message>
            <StyledButton onClick={resetGame}>{t.playAgain}</StyledButton>
          </>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
