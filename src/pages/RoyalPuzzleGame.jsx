// RoyalPuzzleGame.jsx

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import SolButton from "../components/SolButton.jsx";

const LevelButton = styled(SolButton).attrs({ as: "button" })`
  margin: 0.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 0.8rem;
`;

const Dropdown = styled.select`
  padding: 0.5rem 1rem;
  margin: 1rem auto;
  display: block;
  border: 2px solid #aa4dc8;
  border-radius: 8px;
  color: #6a1b9a;
  max-width: 90vw;
`;

const PuzzleArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 1/1;
  background: #fce4ec;
  margin: 2rem auto;
  border-radius: 12px;
  overflow: hidden;
`;

const Piece = styled.img`
  position: absolute;
  cursor: grab;
  user-select: none;
`;

const Info = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  color: #8e24aa;
`;

export default function RoyalPuzzleGame() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [level, setLevel] = useState("");
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const areaRef = useRef();
  const { language } = useLanguage();

  const gridMap = { easy: [2, 5], medium: [4, 5], hard: [5, 6] };

  const content = {
    en: {
      pageTitle: "Royal Puzzle – SolTheCat",
      title: "Royal Puzzle 🧩",
      solved: "🎉 Puzzle Solved!",
      playAgain: "🔁 Play Again",
      download: "⬇️ Download Puzzle",
      back: "← Back to games",
      best: "🏆 Best Time: ",
      desc: "Choose your episode, pick your challenge level and piece together the royal puzzle!"
    },
    el: {
      pageTitle: "Βασιλικό Παζλ – SolTheCat",
      title: "Βασιλικό Παζλ 🧩",
      solved: "🎉 Το Παζλ Λύθηκε!",
      playAgain: "🔁 Παίξε Ξανά",
      download: "⬇️ Κατέβασε το Παζλ",
      back: "← Επιστροφή στα παιχνίδια",
      best: "🏆 Καλύτερος Χρόνος: ",
      desc: "Επίλεξε επεισόδιο, επίπεδο δυσκολίας και φτιάξε το βασιλικό παζλ!"
    },
  }[language];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((r) => r.json())
      .then((data) => {
        const vis = data.filter((ep) => ep.visible);
        setEpisodes(vis);
        if (vis.length) setSelectedId(vis[0].id.toString());
      });
  }, []);

  useEffect(() => setLevel(""), [selectedId]);

  const selectedEpisode = episodes.find((ep) => ep.id.toString() === selectedId);
  const imagePath = selectedEpisode && `${import.meta.env.BASE_URL}${selectedEpisode.puzzleImage || selectedEpisode.image}`;
  const [rows, cols] = gridMap[level] || [];

  useEffect(() => {
    if (!imagePath || !level) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagePath;
    img.onload = () => {
      const w = img.width / cols;
      const h = img.height / rows;
      const tmp = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const canvas = document.createElement("canvas");
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, c * w, r * h, w, h, 0, 0, w, h);
          tmp.push({
            id: r * cols + c,
            img: canvas.toDataURL(),
            x: Math.random() * 400,
            y: Math.random() * 400,
            correctX: c * (600 / cols),
            correctY: r * (600 / rows),
          });
        }
      }
      setPieces(tmp);
      setSolved(false);
      setStartTime(Date.now());
      setElapsed(0);
    };
  }, [imagePath, level]);

  useEffect(() => {
    if (!startTime || solved) return;
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, solved]);

  const onDrag = (idx, e) => {
    if (solved) return;
    const newPieces = [...pieces];
    newPieces[idx].x += e.movementX;
    newPieces[idx].y += e.movementY;
    setPieces(newPieces);

    const snap = 20;
    if (
      Math.abs(newPieces[idx].x - newPieces[idx].correctX) < snap &&
      Math.abs(newPieces[idx].y - newPieces[idx].correctY) < snap
    ) {
      newPieces[idx].x = newPieces[idx].correctX;
      newPieces[idx].y = newPieces[idx].correctY;
      setPieces(newPieces);
      if (newPieces.every(p => p.x === p.correctX && p.y === p.correctY)) {
        setSolved(true);
        const key = `royalpuzzle_${selectedId}_${level}`;
        const best = localStorage.getItem(key);
        if (!best || elapsed < parseInt(best)) {
          localStorage.setItem(key, elapsed);
        }
      }
    }
  };

  const downloadImage = async () => {
    if (!areaRef.current) return;
    const canvas = await html2canvas(areaRef.current);
    const link = document.createElement("a");
    link.download = "sol_puzzle.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const bestKey = `royalpuzzle_${selectedId}_${level}`;
  const best = localStorage.getItem(bestKey);

  return (
    <>
      <Helmet>
        <title>{content.pageTitle}</title>
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{content.title}</Title>
        <Subtitle>{content.desc}</Subtitle>
        <Dropdown value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {episodes.map((ep) => (
            <option key={ep.id} value={ep.id}>
              {typeof ep.title === "object" ? ep.title[language] : ep.title}
            </option>
          ))}
        </Dropdown>

        {!level && ["easy", "medium", "hard"].map(l => (
          <LevelButton key={l} onClick={() => setLevel(l)}>
            {l.charAt(0).toUpperCase() + l.slice(1)}
          </LevelButton>
        ))}

        {level && (
          <PuzzleArea ref={areaRef}>
            {pieces.map((p, i) => (
              <Piece
                key={p.id}
                src={p.img}
                style={{
                  left: p.x,
                  top: p.y,
                  width: `${600 / cols}px`,
                  height: `${600 / rows}px`,
                }}
                draggable="false"
                onPointerDown={e => {
                  e.target.setPointerCapture(e.pointerId);
                  const move = ev => onDrag(i, ev);
                  const up = () => {
                    window.removeEventListener("pointermove", move);
                    window.removeEventListener("pointerup", up);
                  };
                  window.addEventListener("pointermove", move);
                  window.addEventListener("pointerup", up);
                }}
                onTouchStart={e => {
                  const t = e.touches[0];
                  let prevX = t.clientX;
                  let prevY = t.clientY;

                  const move = ev => {
                    const tt = ev.touches[0];
                    const dx = tt.clientX - prevX;
                    const dy = tt.clientY - prevY;
                    prevX = tt.clientX;
                    prevY = tt.clientY;
                    onDrag(i, { movementX: dx, movementY: dy });
                  };

                  const end = () => {
                    window.removeEventListener("touchmove", move);
                    window.removeEventListener("touchend", end);
                  };

                  window.addEventListener("touchmove", move, { passive: false });
                  window.addEventListener("touchend", end);
                }}
              />
            ))}
          </PuzzleArea>
        )}

        {solved && (
          <>
            <Info>{content.solved}</Info>
            <Info>{content.best} {best ? `${best}s` : `${elapsed}s`}</Info>
            <SolButton as="button" onClick={downloadImage}>{content.download}</SolButton>
            <SolButton as="button" onClick={() => { setLevel(""); setSolved(false); }}>{content.playAgain}</SolButton>
          </>
        )}

        {level && <Info>{elapsed}s</Info>}
        <Link to="/games" style={{
          display: "block",
          marginTop: "2rem",
          color: "#d35ca3",
          textDecoration: "none",
          fontWeight: "bold",
          textAlign: "center"
        }}>{content.back}</Link>
      </PageContainer>
    </>
  );
}
