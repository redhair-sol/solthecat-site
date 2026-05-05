// src/pages/SpotTheCity.jsx

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";
import { celebrate } from "../utils/celebrate.js";

const ROUNDS = 5;

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

const ScoreLine = styled.p`
  font-size: 0.95rem;
  color: #6a1b9a;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const BigButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: ${({ disabled }) => (disabled ? "#ccc" : "#c187d8")};
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1rem;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.05)")};
  }
`;

const CropFrame = styled.div`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1 / 1;
  background-image: url(${(props) => props.$src});
  background-size: 250%;
  background-position: ${(props) => props.$x}% ${(props) => props.$y}%;
  border-radius: 1rem;
  border: 2px solid #c187d8;
  margin: 0.5rem auto 1rem;
  box-shadow: 0 6px 18px rgba(170, 77, 200, 0.18);
`;

const RevealImage = styled(motion.img)`
  width: 100%;
  max-width: 400px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 1rem;
  border: 2px solid #c187d8;
  margin: 0.5rem auto 1rem;
  box-shadow: 0 6px 18px rgba(170, 77, 200, 0.18);
  display: block;
`;

const OptionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;
  width: 100%;
  max-width: 500px;
  margin: 0.5rem auto 0;
`;

const OptionButton = styled.button`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  background: ${({ $state }) =>
    $state === "correct"
      ? "#a5d6a7"
      : $state === "wrong"
      ? "#ef9a9a"
      : $state === "missed"
      ? "#a5d6a7"
      : "#ffffff"};
  color: ${({ $state }) =>
    $state === "correct" || $state === "missed"
      ? "#1b5e20"
      : $state === "wrong"
      ? "#b71c1c"
      : "#5b2b7b"};
  border: 2px solid
    ${({ $state }) =>
      $state === "correct" || $state === "missed"
        ? "#388e3c"
        : $state === "wrong"
        ? "#c62828"
        : "#c187d8"};
  border-radius: 12px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: transform 0.15s ease, background 0.2s ease;

  &:hover {
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.03)")};
  }
`;

const FeedbackText = styled.p`
  font-size: 1rem;
  color: ${({ $correct }) => ($correct ? "#388e3c" : "#c62828")};
  font-weight: 700;
  margin: 1rem 0 0;
`;

const FinalCard = styled(motion.div)`
  background: #ffffffcc;
  padding: 1.5rem;
  border-radius: 1.5rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 16px rgba(170, 77, 200, 0.18);
  text-align: center;
  margin-top: 1rem;
`;

const FinalScore = styled.h2`
  font-size: 1.6rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const FinalMessage = styled.p`
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

// Same helper as SolPicks — extract city name from localized title.
function cityFromTitle(title) {
  if (!title) return "";
  const m = title.match(/[–—-]\s+([^,–—\n]+?)(?:[,–—]|\s+\p{Extended_Pictographic}|$)/u);
  return m ? m[1].trim() : title;
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildRound(allEpisodes, exclude = []) {
  const pool = allEpisodes.filter((ep) => !exclude.includes(ep.id));
  const correct = pool[Math.floor(Math.random() * pool.length)];
  const distractors = shuffle(
    allEpisodes.filter((ep) => ep.id !== correct.id)
  ).slice(0, 3);
  const options = shuffle([correct, ...distractors]);
  return {
    correct,
    options,
    cropX: 20 + Math.random() * 60,
    cropY: 20 + Math.random() * 60,
  };
}

export default function SpotTheCity() {
  const { language } = useLanguage();
  const [episodes, setEpisodes] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const [phase, setPhase] = useState("intro"); // "intro" | "playing" | "final"
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [usedIds, setUsedIds] = useState([]);
  const [currentRound, setCurrentRound] = useState(null);
  const [selected, setSelected] = useState(null);

  // Refs for auto-scrolling so mobile users always see the relevant section.
  const gameTopRef = useRef(null);  // top of round area (after Next round)
  const feedbackRef = useRef(null); // feedback + Next button (after answer)
  const finalRef = useRef(null);    // final score card

  const t = {
    en: {
      pageTitle: "Spot the City – SolTheCat",
      title: "Spot the City 🔍",
      subtitle: `Sol zoomed in on a corner of one of her ${ROUNDS}-round adventures. Can you tell where she is?`,
      start: "🐾 Start guessing",
      progress: (r) => `Round ${r} / ${ROUNDS}`,
      scoreLine: (s) => `Score: ${s} / ${ROUNDS}`,
      correct: "🎉 Spot on!",
      wrong: (city) => `❌ It was ${city}.`,
      next: "Next round →",
      finishedTitle: "🎒 Adventure complete!",
      finishedScore: (s) => `You got ${s} out of ${ROUNDS} right.`,
      finishedPerfect: "Pawfect score! 🏆",
      finishedGood: "Sol's proud of you. 🐾",
      finishedSoso: "Keep exploring with Sol!",
      playAgain: "🔁 Play again",
      back: "← Back to games",
      loadFail: "Couldn't load episodes. Please try refreshing the page.",
    },
    el: {
      pageTitle: "Βρες την Πόλη – SolTheCat",
      title: "Βρες την Πόλη 🔍",
      subtitle: `Η Sol εστίασε σε μια γωνιά από ${ROUNDS} περιπέτειες. Μπορείς να μαντέψεις πού βρίσκεται;`,
      start: "🐾 Ξεκίνα να μαντεύεις",
      progress: (r) => `Γύρος ${r} / ${ROUNDS}`,
      scoreLine: (s) => `Σκορ: ${s} / ${ROUNDS}`,
      correct: "🎉 Σωστά!",
      wrong: (city) => `❌ Ήταν ${city}.`,
      next: "Επόμενος γύρος →",
      finishedTitle: "🎒 Τέλος περιπέτειας!",
      finishedScore: (s) => `Έκανες ${s} σωστές στις ${ROUNDS}.`,
      finishedPerfect: "Τέλειο σκορ! 🏆",
      finishedGood: "Η Sol είναι περήφανη! 🐾",
      finishedSoso: "Συνέχισε να εξερευνείς με τη Sol!",
      playAgain: "🔁 Παίξε ξανά",
      back: "← Επιστροφή στα παιχνίδια",
      loadFail: "Δεν φόρτωσαν τα επεισόδια. Παρακαλώ δοκίμασε refresh.",
    },
  }[language];

  // Auto-scroll on phase / round / answer change so the relevant section
  // (feedback, new round image, or final card) is always in view on mobile.
  useEffect(() => {
    let target = null;
    let block = "center";
    if (phase === "final") {
      target = finalRef.current;
    } else if (phase === "playing") {
      if (selected !== null) target = feedbackRef.current;
      else if (round > 0) {
        target = gameTopRef.current;
        block = "start";
      }
    }
    if (target) {
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: "smooth", block });
      });
    }
  }, [phase, round, selected]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        const visible = data.filter((ep) => ep.visible);
        setEpisodes(visible);
        setLoadError(false);
      })
      .catch((err) => {
        console.error("Failed to load episodes:", err);
        setLoadError(true);
      });
  }, []);

  const startGame = () => {
    if (episodes.length < 4) return;
    const first = buildRound(episodes);
    setUsedIds([first.correct.id]);
    setCurrentRound(first);
    setRound(1);
    setScore(0);
    setSelected(null);
    setPhase("playing");
  };

  const handleSelect = (epId) => {
    if (selected !== null) return;
    setSelected(epId);
    if (epId === currentRound.correct.id) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (round >= ROUNDS) {
      setPhase("final");
      if (score === ROUNDS) celebrate();
      return;
    }
    const next = buildRound(episodes, usedIds);
    setUsedIds((prev) => [...prev, next.correct.id]);
    setCurrentRound(next);
    setRound((r) => r + 1);
    setSelected(null);
  };

  const getCityLabel = (ep) => {
    const title =
      typeof ep.title === "object" ? ep.title[language] : ep.title;
    return cityFromTitle(title);
  };

  const isAnswered = selected !== null;
  const isCorrect = isAnswered && selected === currentRound?.correct.id;

  const finalMessage =
    score === ROUNDS
      ? t.finishedPerfect
      : score >= 3
      ? t.finishedGood
      : t.finishedSoso;

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/spotcity" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{t.title}</Title>

        {loadError && <ErrorBox role="alert">{t.loadFail}</ErrorBox>}

        {phase === "intro" && !loadError && (
          <>
            <Subtitle>{t.subtitle}</Subtitle>
            <BigButton onClick={startGame} disabled={episodes.length < 4}>
              {t.start}
            </BigButton>
          </>
        )}

        {phase === "playing" && currentRound && (
          <>
            <Subtitle ref={gameTopRef}>{t.progress(round)}</Subtitle>
            <ScoreLine>{t.scoreLine(score)}</ScoreLine>

            {!isAnswered ? (
              <CropFrame
                key={`crop-${currentRound.correct.id}`}
                $src={`${import.meta.env.BASE_URL}${currentRound.correct.image}`}
                $x={currentRound.cropX}
                $y={currentRound.cropY}
                role="img"
                aria-label="Zoomed-in detail of an episode photo"
              />
            ) : (
              <RevealImage
                key={`reveal-${currentRound.correct.id}`}
                src={`${import.meta.env.BASE_URL}${currentRound.correct.image}`}
                alt={getCityLabel(currentRound.correct)}
                width="800"
                height="800"
                loading="eager"
                decoding="async"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
            )}

            <OptionGrid>
              {currentRound.options.map((ep) => {
                const isCorrectOpt = ep.id === currentRound.correct.id;
                const isSelectedOpt = selected === ep.id;
                let state = null;
                if (isAnswered) {
                  if (isSelectedOpt && isCorrectOpt) state = "correct";
                  else if (isSelectedOpt && !isCorrectOpt) state = "wrong";
                  else if (!isSelectedOpt && isCorrectOpt) state = "missed";
                }
                return (
                  <OptionButton
                    key={ep.id}
                    $state={state}
                    disabled={isAnswered}
                    onClick={() => handleSelect(ep.id)}
                  >
                    {getCityLabel(ep)}
                  </OptionButton>
                );
              })}
            </OptionGrid>

            {isAnswered && (
              <div ref={feedbackRef}>
                <FeedbackText $correct={isCorrect}>
                  {isCorrect ? t.correct : t.wrong(getCityLabel(currentRound.correct))}
                </FeedbackText>
                <BigButton onClick={handleNext}>{t.next}</BigButton>
              </div>
            )}
          </>
        )}

        {phase === "final" && (
          <FinalCard
            ref={finalRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FinalScore>{t.finishedTitle}</FinalScore>
            <FinalMessage>{t.finishedScore(score)}</FinalMessage>
            <FinalMessage>{finalMessage}</FinalMessage>
            <BigButton onClick={startGame}>{t.playAgain}</BigButton>
          </FinalCard>
        )}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
