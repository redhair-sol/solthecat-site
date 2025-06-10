// src/pages/PuzzleMapGame.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
  @media (max-width: 480px) { font-size: 1.6rem; }
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
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  cursor: pointer;
  position: relative;
`;

const EmptyTile = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
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
  background: #c187d8;
  color: #fff;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 10px rgba(170,77,200,0.3);
  transition: transform 0.2s;

  &:hover { transform: scale(1.05); }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;

  &:hover { text-decoration: underline; }
`;

const initialArr = [...Array(9).keys()];

export default function PuzzleMapGame() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [tiles, setTiles] = useState(initialArr);
  const [isSolved, setIsSolved] = useState(false);
  const [slices, setSlices] = useState([]);
  const { language } = useLanguage();

  const content = {
    en: {
      pageTitle: "Sol’s Puzzle Game – SolTheCat",
      title: "Sol’s Puzzle Game 🧩",
      subtitle: selectedId ? `Puzzle: SOLadventure #${selectedId}` : "",
      playAgain: "🔁 Play Again",
      solvedMessage: "🎉 Puzzle Solved!",
      back: "← Back to games",
    },
    el: {
      pageTitle: "Παζλ της Sol – SolTheCat",
      title: "Παζλ της Sol 🧩",
      subtitle: selectedId ? `Παζλ: SOLadventure #${selectedId}` : "",
      playAgain: "🔁 Παίξε Ξανά",
      solvedMessage: "🎉 Λύθηκε το Παζλ!",
      back: "← Επιστροφή στα παιχνίδια",
    },
  };
  const t = content[language];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((r) => r.json())
      .then((data) => {
        const vis = data.filter((ep) => ep.visible);
        setEpisodes(vis);
        if (vis.length) setSelectedId(vis[0].id.toString());
      });
  }, []);

  const selectedEpisode = episodes.find((ep) => ep.id.toString() === selectedId);
  const imagePath = selectedEpisode && `${import.meta.env.BASE_URL}${selectedEpisode.image}`;

  useEffect(() => {
    if (!imagePath) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagePath;
    img.onload = () => {
      const w = img.width / 3;
      const h = img.height / 3;
      const tmp = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, col * w, row * h, w, h, 0, 0, w, h);
          tmp.push(canvas.toDataURL());
        }
      }
      setSlices(tmp);
    };
  }, [imagePath]);

  useEffect(() => {
    if (slices.length === 9) {
      let arr = [...initialArr];
      let emptyIdx = 8;
      const swap = (a, b) => {
        const c = [...arr];
        [c[a], c[b]] = [c[b], c[a]];
        return c;
      };
      for (let i = 0; i < 100; i++) {
        const moves = [];
        if (emptyIdx % 3 !== 0) moves.push(emptyIdx - 1);
        if (emptyIdx % 3 !== 2) moves.push(emptyIdx + 1);
        if (emptyIdx >= 3) moves.push(emptyIdx - 3);
        if (emptyIdx < 6) moves.push(emptyIdx + 3);
        const to = moves[Math.floor(Math.random() * moves.length)];
        arr = swap(emptyIdx, to);
        emptyIdx = to;
      }
      setTiles(arr);
      setIsSolved(false);
    }
  }, [slices]);

  const handleClick = (idx) => {
    if (isSolved) return;
    const emptyIdx = tiles.indexOf(8);
    if ([idx - 1, idx + 1, idx - 3, idx + 3].includes(emptyIdx)) {
      const c = [...tiles];
      [c[idx], c[emptyIdx]] = [c[emptyIdx], c[idx]];
      setTiles(c);
      const sol = [...Array(9).keys()];
      const chk = [...c];
      const e = chk.indexOf(8);
      chk.splice(e, 1);
      sol.splice(e, 1);
      if (chk.every((v, i) => v === sol[i])) {
        setIsSolved(true);
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/puzzlemap" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{t.title}</Title>
        {selectedId && <Subtitle>{t.subtitle}</Subtitle>}

        <DropdownWrapper>
          <Dropdown
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {episodes.map((ep) => {
              const lbl =
                typeof ep.title === "object"
                  ? ep.title[language]
                  : ep.title;
              return (
                <option key={ep.id} value={ep.id}>
                  {lbl}
                </option>
              );
            })}
          </Dropdown>
        </DropdownWrapper>

        <PuzzleWrapper>
          <Grid>
            {tiles.map((tile, i) =>
              tile === 8 ? (
                <EmptyTile key={i} />
              ) : (
                <Tile key={i} onClick={() => handleClick(i)}>
                  <img
                    src={slices[tile]}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </Tile>
              )
            )}
          </Grid>
        </PuzzleWrapper>

        {isSolved && (
          <>
            <Message>{t.solvedMessage}</Message>
            <StyledButton onClick={() => setSlices([])}>
              {t.playAgain}
            </StyledButton>
          </>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
