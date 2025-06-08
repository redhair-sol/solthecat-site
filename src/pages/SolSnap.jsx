// src/pages/SolSnap.jsx

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useLanguage } from "../context/LanguageContext.jsx";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
`;

const StartButton = styled.button`
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

const QuestionBox = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(170, 77, 200, 0.15);
  max-width: 600px;
  width: 100%;
  margin-bottom: 1.5rem;
`;

const Timer = styled.p`
  font-size: 0.9rem;
  color: #d32f2f;
  margin-bottom: 0.8rem;
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: #333;
`;

const AnswerButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const AnswerButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #f8bbd0;
  color: white;
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #f48fb1;
  }
`;

const Result = styled.p`
  font-weight: bold;
  font-size: 1rem;
  margin-top: 1rem;
  color: ${({ correct }) => (correct ? "#388e3c" : "#d32f2f")};
`;

const NextButton = styled(StartButton)`
  margin-top: 1rem;
`;

export default function SolSnap() {
  const { language } = useLanguage();
  const [hasStarted, setHasStarted] = useState(false);
  const [episodes, setEpisodes] = useState([]);
  const [epIndex, setEpIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [epScore, setEpScore] = useState(0);
  const [inSummary, setInSummary] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const countdown = useRef(null);

  const t = {
    en: {
      pageTitle: "SolSnap – SolTheCat",
      title: "Sol’s Snap Game",
      subtitle: "Ready to test your knowledge? Press Start to begin!",
      start: "Start Game",
      back: "← Back to games",
      timeLeft: (s) => `Time left: ${s}s`,
      correct: "Correct! 🎉",
      incorrect: "Wrong! ❌",
      summaryPerfectUnlock: (title) =>
        `🎉 You got 3/3 in ${title}! You unlocked the next episode!`,
      summaryPerfectLast: (title) =>
        `🎉 You got 3/3 in ${title}! Stay tuned for more!`,
      summaryScore: (sc) => `You got ${sc}/3 correct.`,
      nextEp: "Next Episode",
      gameOver: (s, t) => `Game Over! You scored ${s} out of ${t}.`,
    },
    el: {
      pageTitle: "SolSnap – SolTheCat",
      title: "Το Snap Παιχνίδι της Sol",
      subtitle: "Έτοιμος να δοκιμάσεις τις γνώσεις σου; Πάτα Έναρξη!",
      start: "Έναρξη Παιχνιδιού",
      back: "← Επιστροφή στα παιχνίδια",
      timeLeft: (s) => `Χρόνος: ${s}δλ.`,
      correct: "Σωστό! 🎉",
      incorrect: "Λάθος! ❌",
      summaryPerfectUnlock: (title) =>
        `🎉 3/3 στο ${title}! Ξεκλείδωσες το επόμενο επεισόδιο!`,
      summaryPerfectLast: (title) =>
        `🎉 3/3 στο ${title}! Μείνε συντονισμένος!`,
      summaryScore: (sc) => `Έκανες ${sc}/3 σωστές.`,
      nextEp: "Επόμενο Επεισόδιο",
      gameOver: (s, t) => `Τέλος παιχνιδιού! Σκορ: ${s} από ${t}`,
    },
  }[language];

  // Start play: load episodes + first 3 questions
  const startGame = async () => {
    const res = await fetch(`${import.meta.env.BASE_URL}episodes.json`);
    const data = await res.json();
    const vis = data.filter((ep) => ep.visible && Array.isArray(ep.snapQuestions));
    setEpisodes(vis);
    if (vis.length) {
      const first3 = shuffle(vis[0].snapQuestions).slice(0, 3);
      setQuestions(first3);
      setHasStarted(true);
    }
  };

  // Timer hook
  useEffect(() => {
    if (!hasStarted || inSummary || showResult) return;
    setTimer(10);
    countdown.current = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(countdown.current);
          answer(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(countdown.current);
  }, [hasStarted, qIndex, inSummary]);

  // Answer logic
  const answer = (ans) => {
    clearInterval(countdown.current);
    const corr = questions[qIndex].answer;
    const ok = ans === corr;
    setFeedback(ok ? "correct" : "incorrect");
    if (ok) {
      setScore((s) => s + 1);
      setEpScore((s) => s + 1);
    }
    setTimeout(() => {
      setFeedback(null);
      if (qIndex < 2) {
        setQIndex((i) => i + 1);
      } else {
        setInSummary(true);
      }
    }, 800);
  };

  // Next episode or finish
  const nextEpisode = () => {
    const next = epIndex + 1;
    if (next < episodes.length) {
      const qs = shuffle(episodes[next].snapQuestions).slice(0, 3);
      setQuestions(qs);
      setEpIndex(next);
      setQIndex(0);
      setEpScore(0);
      setInSummary(false);
    } else {
      setShowResult(true);
    }
  };

  const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/solsnap" />
      </Helmet>

      <PageContainer>
        {/* Before start */}
        {!hasStarted && (
          <>
            <Title>{t.title}</Title>
            <Subtitle>{t.subtitle}</Subtitle>
            <StartButton onClick={startGame}>{t.start}</StartButton>
            <BackLink to="/games">{t.back}</BackLink>
          </>
        )}

        {/* In-game questions */}
        {hasStarted && !inSummary && !showResult && questions.length > 0 && (
          <QuestionBox>
            <Subtitle>
              {(typeof episodes[epIndex].title === "object"
                ? episodes[epIndex].title[language]
                : episodes[epIndex].title) || ""}
            </Subtitle>
            <Timer>{t.timeLeft(timer)}</Timer>
            <QuestionText>{questions[qIndex].question[language]}</QuestionText>
            <AnswerButtons>
              <AnswerButton onClick={() => answer(true)}>✔️</AnswerButton>
              <AnswerButton onClick={() => answer(false)}>❌</AnswerButton>
            </AnswerButtons>
            {feedback && <Result correct={feedback === "correct"}>{t[feedback]}</Result>}
          </QuestionBox>
        )}

        {/* Summary after 3 questions */}
        {inSummary && !showResult && (
          <>
            <Title>{t.title}</Title>
            <Subtitle>
              {epScore === 3
                ? epIndex < episodes.length - 1
                  ? t.summaryPerfectUnlock(
                      typeof episodes[epIndex].title === "object"
                        ? episodes[epIndex].title[language]
                        : episodes[epIndex].title
                    )
                  : t.summaryPerfectLast(
                      typeof episodes[epIndex].title === "object"
                        ? episodes[epIndex].title[language]
                        : episodes[epIndex].title
                    )
                : t.summaryScore(epScore)}
            </Subtitle>
            <NextButton onClick={nextEpisode}>{t.nextEp}</NextButton>
          </>
        )}

        {/* Final result */}
        {showResult && (
          <>
            <Title>{t.title}</Title>
            <Subtitle>{t.gameOver(score, episodes.length * 3)}</Subtitle>
            <BackLink to="/games">{t.back}</BackLink>
          </>
        )}
      </PageContainer>
    </>
  );
}
