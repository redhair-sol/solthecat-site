// src/pages/CatchCats.jsx
//
// "Catch the Cats" — falling-objects game. Cats drop from the top of the
// play area; player drags a basket left/right to catch them. Each missed
// cat costs a life. 30-second round, 3 difficulty levels.
//
// Performance notes:
// - Basket position is held in a ref + applied via direct DOM mutation, NOT
//   React state. setState on every pointermove (~60fps) was triggering full
//   re-renders that included every falling cat → noticeable lag on mobile.
// - Collision is decided by a setTimeout fired at 88% of the fall duration
//   (just before basket level). On hit the cat is removed from state →
//   AnimatePresence plays an exit (looks like it lands in the basket). On
//   miss the cat keeps animating down to 110% (off-screen) and we deduct a
//   life when it reaches 100%.
//
// Controls:
//   - Touch / pointer drag (mobile + desktop): move basket horizontally.
//   - Arrow Left/Right (desktop): step the basket.
//
// Zero new assets — uses cat emoji + a basket emoji.

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { celebrate } from "../utils/celebrate.js";

const ROUND_SECONDS = 30;
const BASKET_HALF_WIDTH_PCT = 9; // collision tolerance — fairly forgiving
const KEY_STEP_PCT = 6;
const HIT_CHECK_FRACTION = 0.88; // % of fall time at which we test the catch

const CAT_EMOJIS = ["🐱", "🐈", "😺", "😸", "😻", "😼", "🙀"];
const CROWN_CHANCE = 0.1; // 10% bonus drops

// Per-level tuning. fallSec lower = harder. spawnMs lower = more cats.
const LEVELS = [
  { id: "easy",   lives: 5, fallSec: 4.0, spawnMs: 1400 },
  { id: "medium", lives: 4, fallSec: 3.0, spawnMs: 1000 },
  { id: "hard",   lives: 3, fallSec: 2.0, spawnMs: 700  },
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
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 0.8rem;
  font-family: 'Poppins', sans-serif;
  color: #6a1b9a;
  font-weight: 700;
`;

const HUDChip = styled.div`
  background: #ffffffcc;
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  box-shadow: 0 2px 6px rgba(170, 77, 200, 0.15);
  font-size: 0.9rem;
`;

const PlayArea = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  /* dvh (dynamic viewport height) accounts for the mobile browser address
     bar showing/hiding. 50dvh leaves room above for Topbar + Title + HUD
     and below for the bottom tab bar without forcing the user to scroll. */
  height: 50dvh;
  max-height: 480px;
  min-height: 260px;
  margin: 0 auto 1rem;
  background: linear-gradient(to bottom, #fff1f9 0%, #fce4ec 100%);
  border: 2px solid #c187d8;
  border-radius: 1rem;
  overflow: hidden;
  touch-action: none;
  cursor: ew-resize;
  user-select: none;
`;

const FallingCat = styled(motion.span)`
  position: absolute;
  font-size: 2.4rem;
  pointer-events: none;
  transform: translateX(-50%);
  filter: drop-shadow(0 2px 4px rgba(170, 77, 200, 0.25));
`;

const BasketWrap = styled.div`
  position: absolute;
  bottom: 0.5rem;
  font-size: 3rem;
  transform: translateX(-50%);
  pointer-events: none;
  filter: drop-shadow(0 -1px 3px rgba(0, 0, 0, 0.15));
  /* No CSS transition — direct DOM updates from pointer events should be
     instant. Any easing here adds perceptible latency on touch devices. */
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
  margin: 0.4rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const LevelGrid = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  flex-wrap: wrap;
  margin: 1rem 0 0.5rem;
`;

const LevelButton = styled.button`
  padding: 0.7rem 1.3rem;
  background: ${({ $active }) => ($active ? "#c187d8" : "#ffffff")};
  color: ${({ $active }) => ($active ? "white" : "#6a1b9a")};
  border: 2px solid #c187d8;
  border-radius: 999px;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;

  &:hover {
    transform: scale(1.04);
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
  font-size: 1.5rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const ResultMessage = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 1rem;
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

export default function CatchCats() {
  const { language } = useLanguage();
  const [phase, setPhase] = useState("intro"); // intro | playing | won | lost
  const [levelIdx, setLevelIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(LEVELS[0].lives);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [cats, setCats] = useState([]);

  const playAreaRef = useRef(null);
  const basketRef = useRef(null);
  const basketXRef = useRef(50); // single source of truth for basket position
  const livesRef = useRef(0);
  const phaseRef = useRef("intro");
  const resultRef = useRef(null);

  const t = {
    en: {
      pageTitle: "Catch the Cats – SolTheCat",
      title: "Catch the Cats 🧺",
      subtitle:
        "Drag the basket to catch falling cats. Crown cats are worth 5 points. Don't let them all slip!",
      pickLevel: "Pick a difficulty",
      easy: "🌸 Easy",
      medium: "⚡ Medium",
      hard: "🔥 Hard",
      start: "🐾 Start round",
      score: "Score",
      lives: "Lives",
      time: "Time",
      wonTitle: "🎒 Round survived!",
      wonMessage: (s) => `You caught ${s} points worth of cats.`,
      lostTitle: "🙀 Out of lives",
      lostMessage: (s) =>
        `Too many cats slipped past. Final score: ${s}. Try again!`,
      retry: "🔁 Play again",
      changeLevel: "Choose level",
      back: "← Back to games",
    },
    el: {
      pageTitle: "Πιάσε τις Γάτες – SolTheCat",
      title: "Πιάσε τις Γάτες 🧺",
      subtitle:
        "Σύρε το καλάθι για να πιάσεις τις γάτες που πέφτουν. Οι γάτες με κορώνα μετρούν 5 πόντους. Μην τις αφήσεις να χαθούν!",
      pickLevel: "Διάλεξε δυσκολία",
      easy: "🌸 Εύκολο",
      medium: "⚡ Μέτριο",
      hard: "🔥 Δύσκολο",
      start: "🐾 Ξεκίνα γύρο",
      score: "Σκορ",
      lives: "Ζωές",
      time: "Χρόνος",
      wonTitle: "🎒 Επιβίωσες!",
      wonMessage: (s) => `Έπιασες γάτες αξίας ${s} πόντων.`,
      lostTitle: "🙀 Τέλος ζωών",
      lostMessage: (s) =>
        `Πολλές γάτες ξέφυγαν. Τελικό σκορ: ${s}. Ξαναπροσπάθησε!`,
      retry: "🔁 Παίξε ξανά",
      changeLevel: "Επιλογή επιπέδου",
      back: "← Επιστροφή στα παιχνίδια",
    },
  }[language];

  // Keep refs in sync with state so async timeouts read fresh values.
  useEffect(() => { livesRef.current = lives; }, [lives]);
  useEffect(() => { phaseRef.current = phase; }, [phase]);

  // Auto-scroll to result card on round end.
  useEffect(() => {
    if ((phase === "won" || phase === "lost") && resultRef.current) {
      requestAnimationFrame(() => {
        resultRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }, [phase]);

  // Set basket position both in ref and on the DOM node directly.
  // Avoids a React re-render cycle on every pointer move.
  const setBasket = (xPct) => {
    const clamped = Math.max(
      BASKET_HALF_WIDTH_PCT,
      Math.min(100 - BASKET_HALF_WIDTH_PCT, xPct)
    );
    basketXRef.current = clamped;
    if (basketRef.current) {
      basketRef.current.style.left = `${clamped}%`;
    }
  };

  const startGame = (idx = levelIdx) => {
    setLevelIdx(idx);
    setScore(0);
    setLives(LEVELS[idx].lives);
    livesRef.current = LEVELS[idx].lives;
    setTimeLeft(ROUND_SECONDS);
    setCats([]);
    setBasket(50);
    setPhase("playing");
  };

  // Round timer.
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      setTimeLeft((tl) => {
        if (tl <= 1) {
          clearInterval(id);
          setPhase("won");
          return 0;
        }
        return tl - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [phase]);

  // Cat spawner. Each spawn schedules its own collision + miss timeouts.
  useEffect(() => {
    if (phase !== "playing") return;
    const cfg = LEVELS[levelIdx];
    const fallMs = cfg.fallSec * 1000;

    const spawn = () => {
      if (phaseRef.current !== "playing") return;
      const isCrown = Math.random() < CROWN_CHANCE;
      const emoji = isCrown
        ? "👑"
        : CAT_EMOJIS[Math.floor(Math.random() * CAT_EMOJIS.length)];
      const cat = {
        id: `${Date.now()}-${Math.random()}`,
        emoji,
        // Spawn x clamped to [10, 90] so cats land where the basket can reach.
        x: 10 + Math.random() * 80,
        isCrown,
        points: isCrown ? 5 : 1,
      };
      setCats((prev) => [...prev, cat]);

      // Collision check: fired just before the cat reaches the basket level.
      // If the basket overlaps the cat's x → caught (cat disappears).
      const hitTimer = setTimeout(() => {
        if (phaseRef.current !== "playing") return;
        const dist = Math.abs(cat.x - basketXRef.current);
        if (dist <= BASKET_HALF_WIDTH_PCT) {
          setScore((s) => s + cat.points);
          setCats((prev) => prev.filter((c) => c.id !== cat.id));
        }
        // If miss, do nothing — cat keeps animating to 110% and the miss
        // timeout below handles life deduction.
      }, fallMs * HIT_CHECK_FRACTION);

      // Miss check: fires when the cat would have reached the bottom.
      // If the cat is still in state, it wasn't caught → -1 life.
      const missTimer = setTimeout(() => {
        if (phaseRef.current !== "playing") return;
        setCats((prev) => {
          const stillThere = prev.find((c) => c.id === cat.id);
          if (!stillThere) return prev; // already caught and removed

          const newLives = livesRef.current - 1;
          livesRef.current = newLives;
          setLives(newLives);
          if (newLives <= 0) {
            setPhase("lost");
            return [];
          }
          return prev.filter((c) => c.id !== cat.id);
        });
      }, fallMs);

      // Track timers for cleanup if the round ends mid-fall.
      cat._timers = [hitTimer, missTimer];
    };

    const spawnInterval = setInterval(spawn, cfg.spawnMs);
    return () => {
      clearInterval(spawnInterval);
      // Best-effort: pending hit/miss timers will no-op via phase guard.
    };
  }, [phase, levelIdx]);

  // Pointer / touch tracking on the play area.
  const handlePointerMove = (e) => {
    if (phaseRef.current !== "playing") return;
    const rect = playAreaRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 100;
    setBasket(xPct);
  };

  // Keyboard arrow steps for desktop accessibility.
  useEffect(() => {
    if (phase !== "playing") return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        setBasket(basketXRef.current - KEY_STEP_PCT);
      } else if (e.key === "ArrowRight") {
        setBasket(basketXRef.current + KEY_STEP_PCT);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase]);

  // Confetti on a respectable survive score.
  useEffect(() => {
    if (phase === "won" && score >= 15) celebrate();
  }, [phase, score]);

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/catch-cats" />
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
            <Subtitle style={{ fontSize: "0.85rem", marginBottom: "0.2rem" }}>
              {t.pickLevel}:
            </Subtitle>
            <LevelGrid>
              {LEVELS.map((lvl, idx) => (
                <LevelButton
                  key={lvl.id}
                  $active={levelIdx === idx}
                  onClick={() => setLevelIdx(idx)}
                >
                  {idx === 0 ? t.easy : idx === 1 ? t.medium : t.hard}
                </LevelButton>
              ))}
            </LevelGrid>
            <StartButton onClick={() => startGame(levelIdx)}>{t.start}</StartButton>
          </>
        )}

        {phase === "playing" && (
          <>
            <HUDRow>
              <HUDChip>{t.score}: {score}</HUDChip>
              <HUDChip>{t.lives}: {"❤️".repeat(lives)}</HUDChip>
              <HUDChip>{t.time}: {timeLeft}s</HUDChip>
            </HUDRow>
            <PlayArea
              ref={playAreaRef}
              onPointerMove={handlePointerMove}
              onPointerDown={handlePointerMove}
            >
              <AnimatePresence>
                {cats.map((cat) => (
                  <FallingCat
                    key={cat.id}
                    style={{ left: `${cat.x}%` }}
                    initial={{ top: "-12%" }}
                    animate={{ top: "110%" }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{
                      duration: LEVELS[levelIdx].fallSec,
                      ease: "linear",
                    }}
                  >
                    {cat.emoji}
                  </FallingCat>
                ))}
              </AnimatePresence>
              <BasketWrap ref={basketRef} style={{ left: "50%" }}>🧺</BasketWrap>
            </PlayArea>
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
            <ResultMessage>{t.wonMessage(score)}</ResultMessage>
            <StartButton onClick={() => startGame(levelIdx)}>{t.retry}</StartButton>
            <StartButton onClick={() => setPhase("intro")}>
              {t.changeLevel}
            </StartButton>
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
            <ResultMessage>{t.lostMessage(score)}</ResultMessage>
            <StartButton onClick={() => startGame(levelIdx)}>{t.retry}</StartButton>
            <StartButton onClick={() => setPhase("intro")}>
              {t.changeLevel}
            </StartButton>
          </ResultCard>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
