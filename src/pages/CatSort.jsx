// src/pages/CatSort.jsx
//
// "Cat Sort" — simplified version of the cat-sort puzzle from the IG ad.
// Cats wait in a top row; tap one to send it to the nest. Two matching cats
// in the nest auto-rescue. Win when grid + nest are empty. Lose if the nest
// fills with 4 different cats (no pair available to clear).
// 5 levels, increasing variety (2 → 5 emoji types). Zero new assets.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { celebrate } from "../utils/celebrate.js";

const NEST_SIZE = 4;

// Pool of cat emoji for puzzle variety.
const CAT_POOL = ["🐱", "😺", "😸", "😻", "😼", "🙀"];

// Level definitions: { topCount, types } — cells in top row + how many
// distinct emoji to draw from. Counts are even per emoji so puzzles are
// always solvable in principle (never start in a guaranteed-lose state).
const LEVELS = [
  { topCount: 6, types: 2 }, // 1 — 3 pairs of 2 types each
  { topCount: 6, types: 3 }, // 2 — 2 pairs of 3 types
  { topCount: 8, types: 3 }, // 3 — mixed (4+2+2)
  { topCount: 8, types: 4 }, // 4 — 2 pairs each
  { topCount: 10, types: 5 }, // 5 — 2 pairs each, max variety
];

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
  max-width: 600px;
  text-align: center;
  line-height: 1.5;
`;

const HUDRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #6a1b9a;
  font-weight: 600;
`;

const HUDChip = styled.div`
  background: #ffffffcc;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(170, 77, 200, 0.15);
  font-size: 0.9rem;
`;

const RowLabel = styled.p`
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #5b2b7b;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  margin: 0.5rem 0 0.4rem;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  gap: 0.5rem;
  width: 100%;
  max-width: 480px;
  margin: 0 auto 1rem;
`;

const Nest = styled.div`
  display: grid;
  grid-template-columns: repeat(${NEST_SIZE}, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 320px;
  margin: 0 auto 1rem;
  padding: 0.6rem;
  background: #fce4ec;
  border-radius: 1rem;
  border: 2px dashed #c187d8;
`;

const Cell = styled.div`
  aspect-ratio: 1 / 1;
  background: ${({ $empty }) => ($empty ? "transparent" : "#ffffff")};
  border-radius: 0.8rem;
  border: ${({ $empty, $nest }) =>
    $empty
      ? $nest
        ? "2px dashed #c187d8aa"
        : "2px dashed #f8bbd0"
      : "2px solid #f8bbd0"};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: ${({ $empty }) => ($empty ? "default" : "pointer")};
  user-select: none;
  transition: transform 0.1s ease;

  &:active {
    transform: ${({ $empty }) => ($empty ? "none" : "scale(0.92)")};
  }
`;

const StartButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const ResultCard = styled(motion.div)`
  background: #ffffffcc;
  padding: 1.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 16px rgba(170, 77, 200, 0.18);
  text-align: center;
  margin-top: 1rem;
`;

const ResultTitle = styled.h2`
  font-size: 1.4rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const ResultMessage = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 2rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Build a top row for the given level. Each emoji appears in even counts so
// the puzzle is always solvable in principle.
function buildLevel(levelIndex) {
  const { topCount, types } = LEVELS[levelIndex];
  const pickedEmojis = shuffle(CAT_POOL).slice(0, types);

  // Distribute counts evenly. If topCount/types isn't a clean integer,
  // give extras (in pairs) to the first few types so all counts stay even.
  const baseCount = Math.floor(topCount / types);
  const evenBase = baseCount % 2 === 0 ? baseCount : baseCount - 1;
  const extras = topCount - evenBase * types; // always even
  const extraPairs = extras / 2;

  const cells = [];
  pickedEmojis.forEach((emoji, idx) => {
    const count = evenBase + (idx < extraPairs ? 2 : 0);
    for (let i = 0; i < count; i++) {
      cells.push({ id: `${emoji}-${i}-${Math.random()}`, emoji });
    }
  });
  return shuffle(cells);
}

export default function CatSort() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState("intro"); // intro | playing | won | lost | done
  const [levelIndex, setLevelIndex] = useState(0);
  const [topRow, setTopRow] = useState([]);
  const [nest, setNest] = useState(Array(NEST_SIZE).fill(null));
  const resultRef = useRef(null);

  const t = {
    en: {
      pageTitle: "Cat Sort – SolTheCat",
      title: "Cat Sort 🏠",
      subtitle:
        "Tap a cat to send it to the nest. Two matching cats auto-rescue. Don't fill the nest with different cats!",
      start: "🐾 Start",
      level: "Level",
      nest: "Nest",
      cats: "Cats",
      wonTitle: "🎉 Level cleared!",
      wonMessage: (n) => `Level ${n} done. Onward to the next!`,
      lostTitle: "🙀 Nest is full",
      lostMessage: "All four nest slots have different cats. Try again!",
      doneTitle: "👑 You rescued every cat!",
      doneMessage: "All 5 levels complete. The Queen approves.",
      next: "Next level →",
      retry: "🔁 Retry",
      restart: "🔁 Start over",
      back: "← Back to games",
    },
    el: {
      pageTitle: "Ταξινόμηση Γατών – SolTheCat",
      title: "Ταξινόμηση Γατών 🏠",
      subtitle:
        "Πάτα γάτα για να την στείλεις στη φωλιά. Δύο ίδιες auto-rescue. Μη γεμίσεις τη φωλιά με διαφορετικές!",
      start: "🐾 Ξεκίνα",
      level: "Επίπεδο",
      nest: "Φωλιά",
      cats: "Γάτες",
      wonTitle: "🎉 Πέρασες το επίπεδο!",
      wonMessage: (n) => `Επίπεδο ${n} ολοκληρώθηκε. Πάμε στο επόμενο!`,
      lostTitle: "🙀 Η φωλιά γέμισε",
      lostMessage:
        "Και οι 4 θέσεις της φωλιάς έχουν διαφορετικές γάτες. Ξαναπροσπάθησε!",
      doneTitle: "👑 Έσωσες όλες τις γάτες!",
      doneMessage: "Πέρασες και τα 5 επίπεδα. Η Βασίλισσα ευχαριστιέται.",
      next: "Επόμενο επίπεδο →",
      retry: "🔁 Ξανά",
      restart: "🔁 Από την αρχή",
      back: "← Επιστροφή στα παιχνίδια",
    },
  }[language];

  // Auto-scroll on result so user sees the win/lose card on mobile.
  useEffect(() => {
    if ((phase === "won" || phase === "lost" || phase === "done") && resultRef.current) {
      requestAnimationFrame(() => {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [phase]);

  const startLevel = (idx) => {
    setLevelIndex(idx);
    setTopRow(buildLevel(idx));
    setNest(Array(NEST_SIZE).fill(null));
    setPhase("playing");
  };

  const startGame = () => startLevel(0);

  const tapCat = (cellIndex) => {
    if (phase !== "playing") return;
    const cat = topRow[cellIndex];
    if (!cat) return;

    // Remove from top row.
    setTopRow((prev) => prev.map((c, i) => (i === cellIndex ? null : c)));

    // Try to pair in nest.
    setNest((prev) => {
      const matchIdx = prev.findIndex((n) => n && n.emoji === cat.emoji);
      if (matchIdx !== -1) {
        // Pair found — both cats rescued.
        const next = [...prev];
        next[matchIdx] = null;
        return next;
      }
      // No match — drop into first empty slot.
      const emptyIdx = prev.findIndex((n) => n === null);
      if (emptyIdx === -1) return prev; // shouldn't happen (lose check below)
      const next = [...prev];
      next[emptyIdx] = cat;
      return next;
    });
  };

  // Win/lose detection runs after every state update.
  useEffect(() => {
    if (phase !== "playing") return;
    const topRemaining = topRow.filter(Boolean).length;
    const nestFilled = nest.filter(Boolean).length;

    if (topRemaining === 0 && nestFilled === 0) {
      // Cleared this level.
      const isLast = levelIndex === LEVELS.length - 1;
      if (isLast) {
        setPhase("done");
        celebrate();
      } else {
        setPhase("won");
        celebrate();
      }
      return;
    }

    if (nestFilled === NEST_SIZE) {
      // Nest is full. If no two slots share an emoji, no pairing possible
      // from inside the nest — but the player can still pair a cat from
      // top row WITH a nest cat. Lose only when nest is full AND no cat
      // in topRow matches any nest cat.
      const nestEmojis = nest.map((c) => c?.emoji);
      const hasMatch = topRow.some(
        (c) => c && nestEmojis.includes(c.emoji)
      );
      if (!hasMatch) setPhase("lost");
    }
  }, [topRow, nest, phase, levelIndex]);

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/cat-sort" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{t.title}</Title>

        {phase === "intro" && (
          <>
            <Subtitle>{t.subtitle}</Subtitle>
            <StartButton onClick={startGame}>{t.start}</StartButton>
          </>
        )}

        {phase === "playing" && (
          <>
            <HUDRow>
              <HUDChip>
                {t.level}: {levelIndex + 1} / {LEVELS.length}
              </HUDChip>
              <HUDChip>
                {t.cats}: {topRow.filter(Boolean).length}
              </HUDChip>
            </HUDRow>

            <RowLabel>{t.cats}</RowLabel>
            <TopRow>
              {topRow.map((cat, idx) => (
                <Cell
                  key={cat ? cat.id : `empty-${idx}`}
                  $empty={!cat}
                  onClick={() => tapCat(idx)}
                >
                  <AnimatePresence>
                    {cat && (
                      <motion.span
                        key={cat.id}
                        initial={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {cat.emoji}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Cell>
              ))}
            </TopRow>

            <RowLabel>{t.nest}</RowLabel>
            <Nest>
              {nest.map((cat, idx) => (
                <Cell key={`nest-${idx}`} $empty={!cat} $nest>
                  <AnimatePresence>
                    {cat && (
                      <motion.span
                        key={cat.id}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        {cat.emoji}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Cell>
              ))}
            </Nest>
          </>
        )}

        {phase === "won" && (
          <ResultCard
            ref={resultRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultTitle>{t.wonTitle}</ResultTitle>
            <ResultMessage>{t.wonMessage(levelIndex + 1)}</ResultMessage>
            <ButtonRow>
              <StartButton onClick={() => startLevel(levelIndex + 1)}>
                {t.next}
              </StartButton>
            </ButtonRow>
          </ResultCard>
        )}

        {phase === "lost" && (
          <ResultCard
            ref={resultRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultTitle>{t.lostTitle}</ResultTitle>
            <ResultMessage>{t.lostMessage}</ResultMessage>
            <ButtonRow>
              <StartButton onClick={() => startLevel(levelIndex)}>
                {t.retry}
              </StartButton>
            </ButtonRow>
          </ResultCard>
        )}

        {phase === "done" && (
          <ResultCard
            ref={resultRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ResultTitle>{t.doneTitle}</ResultTitle>
            <ResultMessage>{t.doneMessage}</ResultMessage>
            <ButtonRow>
              <StartButton onClick={startGame}>{t.restart}</StartButton>
            </ButtonRow>
          </ResultCard>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
