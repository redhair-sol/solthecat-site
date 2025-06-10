// src/pages/SolSnap.jsx

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

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
  const [showReset, setShowReset] = useState(false);
  const countdown = useRef(null);

  const t = {
    en: {
      pageTitle: "SolSnap – SolTheCat",
      title: "Sol’s Snap Game 📸",
      subtitle: "Ready to test your knowledge? Press Start to begin!",
      start: "Start Game",
      back: "← Back to games",
      timeLeft: (s) => `Time left: ${s}s`,
      correct: "Correct! 🎉",
      incorrect: "Wrong! ❌",
      restart: "Restarting the game…",
      summaryPerfectUnlock: (title) =>
        `🎉 You got 3/3 in ${title}! You unlocked the next episode!`,
      summaryPerfectLast: (title) =>
        `🎉 You got 3/3 in ${title}! Stay tuned for next episodes!`,
      summaryScore: (sc) => `You got ${sc}/3 correct.`,
      nextEp: "Next Episode",
      gameOver: (s, t) => `Game Over! You scored ${s} out of ${t}.`,
    },
    el: {
      pageTitle: "SolSnap – SolTheCat",
      title: "Το Snap Παιχνίδι της Sol 📸",
      subtitle: "Έτοιμος να δοκιμάσεις τις γνώσεις σου; Πάτα Έναρξη!",
      start: "Έναρξη Παιχνιδιού",
      back: "← Επιστροφή στα παιχνίδια",
      timeLeft: (s) => `Χρόνος: ${s}δλ.`,
      correct: "Σωστό! 🎉",
      incorrect: "Λάθος! ❌",
      restart: "Επανεκκίνηση παιχνιδιού…",
      summaryPerfectUnlock: (title) =>
        `🎉 3/3 στο ${title}! Ξεκλείδωσες το επόμενο επεισόδιο!`,
      summaryPerfectLast: (title) =>
        `🎉 3/3 στο ${title}! Μείνε συντονισμένος για τα επόμενα επεισόδια!`,
      summaryScore: (sc) => `Έκανες ${sc}/3 σωστές.`,
      nextEp: "Επόμενο Επεισόδιο",
      gameOver: (s, t) => `Τέλος παιχνιδιού! Σκορ: ${s} από ${t}`,
    },
  }[language];

  const resetGame = () => {
    setHasStarted(false);
    setEpisodes([]);
    setEpIndex(0);
    setQuestions([]);
    setQIndex(0);
    setScore(0);
    setEpScore(0);
    setInSummary(false);
    setShowResult(false);
  };

  const startGame = async () => {
    const res = await fetch(`${import.meta.env.BASE_URL}episodes.json`);
    const data = await res.json();
    const vis = data.filter(
      (ep) => ep.visible && Array.isArray(ep.snapQuestions)
    );
    setEpisodes(vis);
    if (vis.length) {
      const first3 = shuffle(vis[0].snapQuestions).slice(0, 3);
      setQuestions(first3);
      setHasStarted(true);
    }
  };

  useEffect(() => {
    if (!hasStarted || inSummary || feedback) return;
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
  }, [hasStarted, qIndex, inSummary, feedback]);

  const answer = (ans) => {
    clearInterval(countdown.current);
    const correctAns = questions[qIndex].answer;
    const isCorrect = ans === correctAns;
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setScore((s) => s + 1);
      setEpScore((s) => s + 1);
      setTimeout(() => {
        setFeedback(null);
        if (qIndex < 2) {
          setQIndex((i) => i + 1);
        } else {
          setInSummary(true);
        }
      }, 800);
    } else {
      setTimeout(() => {
        setFeedback(null);
        setShowReset(true);
        setTimeout(() => {
          setShowReset(false);
          resetGame();
        }, 1200);
      }, 800);
    }
  };

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

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {showReset && (
          <>
            <Title>{t.incorrect}</Title>
            <Subtitle>{t.restart}</Subtitle>
          </>
        )}

        {!hasStarted && !showReset && (
          <>
            <Title>{t.title}</Title>
            <Subtitle>{t.subtitle}</Subtitle>
            <StartButton onClick={startGame}>{t.start}</StartButton>
            <BackLink to="/games">{t.back}</BackLink>
          </>
        )}

        {hasStarted && !inSummary && !showResult && !showReset && questions.length > 0 && (
          <QuestionBox>
            <Subtitle>
              {typeof episodes[epIndex].title === "object"
                ? episodes[epIndex].title[language]
                : episodes[epIndex].title}
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

        {inSummary && !showResult && !showReset && (
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

            {epIndex < episodes.length - 1 ? (
              <NextButton onClick={nextEpisode}>{t.nextEp}</NextButton>
            ) : (
              <BackLink to="/games">{t.back}</BackLink>
            )}
          </>
        )}

        {showResult && !showReset && (
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
