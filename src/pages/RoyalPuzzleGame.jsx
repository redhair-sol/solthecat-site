import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import SolButton from "../components/SolButton.jsx";

// ✅ Level buttons: ίδια με SolButton
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
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
  text-align: center;
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

const PuzzleArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: 600px;
  background: #fce4ec;
  margin: 2rem auto;
  border-radius: 12px;
  overflow: hidden;
`;

const Piece = styled.img`
  position: absolute;
  user-select: none;
  touch-action: none; /* critical for mobile drag */
`;

const Info = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-weight: bold;
  color: #8e24aa;
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 2rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;
  text-align: center;

  &:hover {
    text-decoration: underline;
  }
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
      subtitle: selectedId ? `Puzzle: SOLadventure #${selectedId}` : "",
      description: "Choose your episode, pick a difficulty and piece together the royal puzzle!",
      solved: "🎉 Puzzle Solved!",
      playAgain: "🔁 Play Again",
      download: "⬇️ Download Puzzle",
      back: "← Back to games",
      best: "🏆 Best Time: ",
    },
    el: {
      pageTitle: "Βασιλικό Παζλ – SolTheCat",
      title: "Βασιλικό Παζλ 🧩",
      subtitle: selectedId ? `Παζλ: SOLadventure #${selectedId}` : "",
      description: "Διάλεξε επεισόδιο, επέλεξε δυσκολία και φτιάξε το βασιλικό παζλ!",
      solved: "🎉 Το Παζλ Λύθηκε!",
      playAgain: "🔁 Παίξε Ξανά",
      download: "⬇️ Κατέβασε το Παζλ",
      back: "← Επιστροφή στα παιχνίδια",
      best: "🏆 Καλύτερος Χρόνος: ",
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

  useEffect(() => {
    setLevel("");
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
        const key = `royalpuzzle_${selectedId}_${level}`;
        const best = localStorage.getItem(key);
        if (!best || elapsed < parseInt(best)) {
          localStorage.setItem(key, elapsed);
        }
      }
    }
  };

  // ✅ New: Cross-device drag (pointer + touch)
  const bindDragHandlers = (idx, el) => {
    if (!el) return;

    let lastX, lastY;

    const move = (ev) => {
      let clientX, clientY;
      if (ev.touches) {
        clientX = ev.touches[0].clientX;
        clientY = ev.touches[0].clientY;
      } else {
        clientX = ev.clientX;
        clientY = ev.clientY;
      }

      if (lastX !== undefined) {
        const dx = clientX - lastX;
        const dy = clientY - lastY;
        onDrag(idx, { movementX: dx, movementY: dy });
      }
      lastX = clientX;
      lastY = clientY;
    };

    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
      lastX = lastY = undefined;
    };

    el.onpointerdown = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;
      window.addEventListener("pointermove", move, { passive: false });
      window.addEventListener("pointerup", up);
    };

    el.ontouchstart = (e) => {
      lastX = e.touches[0].clientX;
      lastY = e.touches[0].clientY;
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", up);
    };
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
        {selectedId && <Subtitle>{t.subtitle}</Subtitle>}
        <Description>{t.description}</Description>

        <DropdownWrapper>
          <Dropdown value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
            {episodes.map((ep) => (
              <option key={ep.id} value={ep.id}>
                {typeof ep.title === "object" ? ep.title[language] : ep.title}
              </option>
            ))}
          </Dropdown>
        </DropdownWrapper>

        {!level && ["easy", "medium", "hard"].map((l) => (
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
                style={{ left: p.x, top: p.y, width: `${600 / cols}px`, height: `${600 / rows}px` }}
                draggable="false"
                ref={(el) => bindDragHandlers(i, el)}
              />
            ))}
          </PuzzleArea>
        )}

        {solved && (
          <>
            <Info>{t.solved}</Info>
            <Info>{t.best} {best ? `${best}s` : `${elapsed}s`}</Info>
            <SolButton as="button" onClick={downloadImage}>{t.download}</SolButton>
            <SolButton as="button" onClick={() => {
              setLevel("");
              setSolved(false);
            }}>{t.playAgain}</SolButton>
          </>
        )}

        {level && <Info>{elapsed}s</Info>}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
