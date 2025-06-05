// src/pages/PuzzleMapGame.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import SolBrand from "../components/SolBrand";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  margin-bottom: 1rem;
  text-align: center;
`;

const Dropdown = styled.select`
  margin-bottom: 1.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #aa4dc8;
  border-radius: 8px;
  background: #fff;
  color: #6a1b9a;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 4px;

  @media (max-width: 480px) {
    grid-template-columns: repeat(3, 80px);
    grid-template-rows: repeat(3, 80px);
  }
`;

const Tile = styled.div`
  width: 100px;
  height: 100px;
  background-image: url(${(props) => props.bgImage});
  background-size: 300px 300px;
  background-position: ${(props) => props.bgPos};
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
    background-size: 240px 240px;
  }
`;

const EmptyTile = styled.div`
  width: 100px;
  height: 100px;
  background: #fce4ec;
  border-radius: 6px;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`;

const Message = styled.div`
  margin-top: 1.5rem;
  font-size: 1.2rem;
  color: #8e24aa;
  font-weight: bold;
`;

const Button = styled.button`
  margin-top: 1rem;
  background-color: #f8bbd0;
  color: white;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f48fb1;
  }
`;

const BackLink = styled(Link)`
  margin-top: 2rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;
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
];

export default function PuzzleMapGame() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [tiles, setTiles] = useState([]);
  const [isSolved, setIsSolved] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const published = data.filter((ep) => ep.visible);
        setEpisodes(published);
        if (published.length > 0) {
          setSelectedId(published[0].id.toString());
        }
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  useEffect(() => {
    if (selectedId) resetGame();
  }, [selectedId]);

  const resetGame = () => {
    let arr = [...Array(9).keys()]; // [0,1,2,3,4,5,6,7,8]
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

  const handleTileClick = (index) => {
    if (isSolved) return;

    const emptyIndex = tiles.indexOf(8);
    const validMoves = [index - 1, index + 1, index - 3, index + 3];

    if (validMoves.includes(emptyIndex)) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
      setTiles(newTiles);
      if (isSolvedState(newTiles)) {
        setIsSolved(true);
      }
    }
  };

  const isSolvedState = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== i) return false;
    }
    return true;
  };

  const selectedEpisode = episodes.find((ep) => ep.id.toString() === selectedId);
  const imagePath = selectedEpisode ? `${import.meta.env.BASE_URL}${selectedEpisode.image}` : "";

  return (
    <>
      <Helmet>
        <title>
          Puzzle: {selectedEpisode ? selectedEpisode.title : "Loading..."} – SolTheCat
        </title>
        {/* Διορθωμένο canonical χωρίς παύλα */}
        <link rel="canonical" href="https://solthecat.com/games/puzzlemap" />
      </Helmet>

      <PageContainer>
        <SolBrand />
        <Title>🧩 Puzzle: {selectedEpisode ? selectedEpisode.title : "Loading..."}</Title>

        <Dropdown value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {episodes.map((ep) => (
            <option key={ep.id} value={ep.id}>
              {ep.title.replace("SOLadventure", "Episode")}
            </option>
          ))}
        </Dropdown>

        <Grid>
          {tiles.map((tileValue, tileIndex) =>
            tileValue === 8 ? (
              <EmptyTile key={tileIndex} />
            ) : (
              <Tile
                key={tileIndex}
                bgImage={imagePath}
                bgPos={`-${(tileValue % 3) * 100}px -${Math.floor(tileValue / 3) * 100}px`}
                onClick={() => handleTileClick(tileIndex)}
              />
            ),
          )}
        </Grid>

        {isSolved && (
          <>
            <Message>🎉 Puzzle Solved!</Message>
            <Button onClick={resetGame}>🔁 Play Again</Button>
          </>
        )}

        <BackLink to="/games">← Back to games</BackLink>
      </PageContainer>
    </>
  );
}
