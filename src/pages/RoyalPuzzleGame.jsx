import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import SolButton from "../components/SolButton.jsx";
import { celebrate } from "../utils/celebrate.js";

// ✅ Styled Components
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
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #444;
  margin-bottom: 2rem;
  max-width: 500px;
  text-align: center;
`;

const Dropdown = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid #aa4dc8;
  border-radius: 8px;
  color: #6a1b9a;
  margin-bottom: 1rem;
  max-width: 90vw;
`;

const LevelButton = styled(SolButton).attrs({ as: "button" })`
  margin: 0.5rem;
`;

const PuzzleArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 90vw;
  max-width: 600px;
  aspect-ratio: 1 / 1;
  background: #fce4ec;
  border-radius: 12px;
  overflow: hidden;
  margin: 2rem auto;
  box-sizing: border-box;
`;

const Piece = styled.img`
  position: absolute;
  user-select: none;
  touch-action: none;
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

const ErrorBox = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 1rem auto;
  font-size: 0.95rem;
  text-align: center;
`;

export default function RoyalPuzzleGame() {
  const { language } = useLanguage();
  const [episodes, setEpisodes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [level, setLevel] = useState("");
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const areaRef = useRef();

  const gridMap = { easy: [2, 5], medium: [4, 5], hard: [5, 6] };

  const t = {
    en: {
      pageTitle: "Royal Puzzle – SolTheCat",
      title: "Royal Puzzle 🧩",
      subtitle: "Puzzle: SOLadventure:",
      description: "Choose your episode, pick your challenge level and piece together the royal puzzle!",
      back: "← Back to games",
      download: "⬇️ Download Puzzle",
      best: "🏆 Best Time: ",
      solvedMessage: "🎉 Royal Puzzle Solved!",
      playAgain: "🔁 Play Again",
      levels: { easy: "Easy", medium: "Medium", hard: "Hard" },
      loadFail: "Couldn't load episodes. Please try refreshing the page.",
    },
    el: {
      pageTitle: "Βασιλικό Παζλ – SolTheCat",
      title: "Βασιλικό Παζλ 🧩",
      subtitle: "Παζλ: SOLadventure:",
      description: "Διάλεξε επεισόδιο, επίπεδο δυσκολίας και συναρμολόγησε το βασιλικό παζλ!",
      back: "← Επιστροφή στα παιχνίδια",
      download: "⬇️ Κατέβασε το Παζλ",
      best: "🏆 Καλύτερος Χρόνος: ",
      solvedMessage: "🎉 Λύθηκε το Βασιλικό Παζλ!",
      playAgain: "🔁 Παίξε Ξανά",
      levels: { easy: "Εύκολο", medium: "Μέσο", hard: "Δύσκολο" },
      loadFail: "Δεν φόρτωσαν τα επεισόδια. Παρακαλώ δοκίμασε refresh.",
    },
  }[language];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const vis = data.filter((ep) => ep.visible);
        setEpisodes(vis);
        if (vis.length) setSelectedId(vis[0].id.toString());
        setLoadError(false);
      })
      .catch((err) => {
        console.error("Failed to load episodes:", err);
        setLoadError(true);
      });
  }, []);

  useEffect(() => {
    setLevel("");
    setPieces([]);
    setSolved(false);
    setStartTime(null);
    setElapsed(0);
  }, [selectedId]);

  const selectedEpisode = episodes.find((ep) => ep.id.toString() === selectedId);
  const imagePath = selectedEpisode && `${import.meta.env.BASE_URL}${selectedEpisode.puzzleImage || selectedEpisode.image}`;
  const [rows, cols] = gridMap[level] || [];

  useEffect(() => {
    if (!imagePath || !level) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imagePath;

    img.onload = () => {
      const areaSize = areaRef.current.clientWidth;
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
            x: Math.random() * (areaSize - areaSize / cols),
            y: Math.random() * (areaSize - areaSize / rows),
            correctX: c * (areaSize / cols),
            correctY: r * (areaSize / rows),
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

  const handleDrag = (idx, e) => {
    const newPieces = [...pieces];
    newPieces[idx].x += e.movementX;
    newPieces[idx].y += e.movementY;
    setPieces(newPieces);

    const snapDist = 20;
    if (
      Math.abs(newPieces[idx].x - newPieces[idx].correctX) < snapDist &&
      Math.abs(newPieces[idx].y - newPieces[idx].correctY) < snapDist
    ) {
      newPieces[idx].x = newPieces[idx].correctX;
      newPieces[idx].y = newPieces[idx].correctY;
      setPieces(newPieces);

      if (newPieces.every(p => p.x === p.correctX && p.y === p.correctY)) {
        setSolved(true);
        celebrate();
        const key = `royalpuzzle_${selectedId}_${level}`;
        const best = localStorage.getItem(key);
        if (!best || elapsed < parseInt(best)) {
          localStorage.setItem(key, elapsed);
        }
      }
    }
  };

  const handlePointerDown = (e, idx) => {
    e.target.setPointerCapture(e.pointerId);
    const move = (ev) => handleDrag(idx, ev);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
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
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/royalpuzzle" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{t.title}</Title>
        {selectedId && <Subtitle>{t.subtitle} {selectedId}</Subtitle>}
        <Description>{t.description}</Description>

        {loadError && <ErrorBox role="alert">{t.loadFail}</ErrorBox>}

        <Dropdown value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          {episodes.map((ep) => (
            <option key={ep.id} value={ep.id}>
              {typeof ep.title === "object" ? ep.title[language] : ep.title}
            </option>
          ))}
        </Dropdown>

        {!level && ["easy", "medium", "hard"].map(l => (
          <LevelButton key={l} onClick={() => setLevel(l)}>
            {t.levels[l]}
          </LevelButton>
        ))}

        {level && (
          <PuzzleArea ref={areaRef}>
            {pieces.map((p, i) => (
              <Piece
                key={p.id}
                src={p.img}
                style={{
                  left: `${p.x}px`,
                  top: `${p.y}px`,
                  width: `${100 / cols}%`,
                  height: `${100 / rows}%`,
                  zIndex: p.x === p.correctX && p.y === p.correctY ? 1 : 2
                }}
                draggable="false"
                onPointerDown={(e) => handlePointerDown(e, i)}
              />
            ))}
          </PuzzleArea>
        )}

        {level && <Info>⏱️ {elapsed}s {best && ` — ${t.best} ${best}s`}</Info>}

        {solved && (
          <>
            <Info>{t.solvedMessage}</Info>
            <SolButton as="button" onClick={downloadImage}>{t.download}</SolButton>
            <SolButton
              as="button"
              onClick={() => {
                setLevel("");
                setPieces([]);
                setSolved(false);
                setStartTime(null);
                setElapsed(0);
              }}
            >
              {t.playAgain}
            </SolButton>
          </>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
