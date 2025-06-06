// src/pages/SolSnap.jsx

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import SolBrand from "../components/SolBrand";
import { useLanguage } from "../context/LanguageContext.jsx"; // Πραγματικό import

/* --------------------- Styled Components --------------------- */

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BrandWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Description = styled.p`
  max-width: 600px;
  margin: 0 0 2rem 0;
  font-size: 1rem;
  color: #555;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const LanguageToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ToggleButton = styled.button`
  padding: 0.3rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ $active }) => ($active ? "#f8bbd0" : "#fff")};
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background-color: #f0e0f5;
  }
`;

const QuestionContainer = styled.div`
  max-width: 600px;
  width: 100%;
  background: #ffffffcc;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(170, 77, 200, 0.2);
  text-align: center;
  margin-bottom: 2rem;
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const TimerText = styled.p`
  font-size: 0.9rem;
  color: #d32f2f;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 0.85rem;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const AnswerButton = styled.button`
  background-color: #f8bbd0;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 2rem;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#f8bbd0" : "#f48fb1")};
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ResultText = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $correct }) => ($correct ? "#388e3c" : "#d32f2f")};

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const SummaryContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const SummaryText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const NextButton = styled(AnswerButton)`
  margin-top: 1rem;
`;

const StartButton = styled.button`
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  background-color: #aa4dc8;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 2rem;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background-color: #993cbf;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

/* ----------------------- Main Component ----------------------- */

export default function SolSnap() {
  // Βασιζόμαστε απόλυτα στο Context για τη γλώσσα
  const { language, setLanguage } = useLanguage();

  const [episodes, setEpisodes] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [questionsForEpisode, setQuestionsForEpisode] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [episodeScore, setEpisodeScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(5);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const countdownRef = useRef(null);

  // Όλα τα κείμενα για Αγγλικά και Ελληνικά
  const content = {
    en: {
      pageTitle: "SolSnap – SolTheCat",
      initialTitle: "📷 SolSnap",
      initialDesc: "Ready to test your knowledge? Press Start to begin!",
      startButton: "Start Game",
      backGames: "← Back to Games",
      gameOverTitle: "📷 SolSnap",
      gameOverDesc: (score, total) => `Game Over! Your total score: ${score} out of ${total}`,
      inGameTitle: "📷 SolSnap",
      inGameDesc: "Snap decision: 3 questions per visible episode. Answer within 5 seconds!",
      timeLeft: (t) => `Time left: ${t}s`,
      yes: "Yes",
      no: "No",
      correct: "Correct! 🎉",
      incorrect: "Incorrect ❌",
      summaryPerfectUnlock: (title) =>
        `🎉 Congratulations! You answered 3 out of 3 correctly in ${title}. You unlocked the next episode!`,
      summaryPerfectLast: (title) =>
        `🎉 Great job! You answered 3 out of 3 correctly in ${title}. Stay tuned for next episodes!`,
      summaryScore: (score, total, title) =>
        `You scored ${score} out of ${total} in ${title}.`,
      nextEpisode: "Next Episode",
    },
    el: {
      pageTitle: "SolSnap – SolTheCat",
      initialTitle: "📷 SolSnap",
      initialDesc: "Έτοιμοι; Πατήστε Έναρξη για να ξεκινήσει το παιχνίδι!",
      startButton: "Έναρξη",
      backGames: "← Επιστροφή στα Παιχνίδια",
      gameOverTitle: "📷 SolSnap",
      gameOverDesc: (score, total) =>
        `Τέλος παιχνιδιού! Το σκορ σου: ${score} από ${total}`,
      inGameTitle: "📷 SolSnap",
      inGameDesc:
        "Απόφαση με μια ματιά: 3 ερωτήσεις για κάθε ορατό επεισόδιο. Απάντησε μέσα σε 5 δευτερόλεπτα!",
      timeLeft: (t) => `Χρόνος: ${t}δλ.`,
      yes: "Ναι",
      no: "Όχι",
      correct: "Σωστή επιλογή! 🎉",
      incorrect: "Λάθος! ❌",
      summaryPerfectUnlock: (title) =>
        `🎉 Συγχαρητήρια! Έκανες 3 από 3 ερωτήσεις σωστές στο ${title}. Ξεκλείδωσες το επόμενο επεισόδιο!`,
      summaryPerfectLast: (title) =>
        `🎉 Μπράβο! Έκανες 3 από 3 ερωτήσεις σωστές στο ${title}. Μείνε συντονισμένος για τα επόμενα επεισόδια!`,
      summaryScore: (score, total, title) =>
        `Έκανες ${score} από ${total} ερωτήσεις σωστές στο ${title}.`,
      nextEpisode: "Επόμενο Επεισόδιο",
    },
  };

  const t = content[language];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (ep) => ep.visible && Array.isArray(ep.snapQuestions)
        );
        setEpisodes(filtered);

        // Αν έχουμε ήδη πατήσει Start, φορτώνουμε τις πρώτες 3 ερωτήσεις
        if (filtered.length > 0 && hasStarted) {
          const firstQs = shuffleArray(filtered[0].snapQuestions).slice(0, 3);
          setQuestionsForEpisode(firstQs);
        }
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, [hasStarted]);

  useEffect(() => {
    if (
      hasStarted &&
      currentEpisodeIndex < episodes.length &&
      currentQIndex < questionsForEpisode.length
    ) {
      setTimer(5);
      setButtonsDisabled(false);

      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }

      countdownRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdownRef.current);
            handleWrongOrTimeout();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [hasStarted, currentEpisodeIndex, currentQIndex, questionsForEpisode]);

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const handleWrongOrTimeout = () => {
    setFeedback(null);
    setButtonsDisabled(true);
    setCurrentEpisodeIndex(0);
    setEpisodeScore(0);
    setTotalScore(0);
    if (episodes.length > 0) {
      const freshQs = shuffleArray(episodes[0].snapQuestions).slice(0, 3);
      setQuestionsForEpisode(freshQs);
    }
    setCurrentQIndex(0);
  };

  const handleAnswer = (answer) => {
    setButtonsDisabled(true);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
    }

    const correctAnswer = questionsForEpisode[currentQIndex].answer;
    const isCorrect = answer === correctAnswer;
    setFeedback(isCorrect ? "correct" : "incorrect");

    if (isCorrect) {
      setEpisodeScore((prev) => prev + 1);
      setTotalScore((prev) => prev + 1);

      setTimeout(() => {
        const nextQ = currentQIndex + 1;
        setCurrentQIndex(nextQ);
        setFeedback(null);
      }, 1000);
    } else {
      setTimeout(() => {
        handleWrongOrTimeout();
      }, 500);
    }
  };

  const goToNextEpisode = () => {
    const nextEpisode = currentEpisodeIndex + 1;

    if (nextEpisode < episodes.length) {
      const newQs = shuffleArray(episodes[nextEpisode].snapQuestions).slice(0, 3);
      setQuestionsForEpisode(newQs);
      setCurrentQIndex(0);
      setEpisodeScore(0);
      setFeedback(null);
      setButtonsDisabled(false);
      setCurrentEpisodeIndex(nextEpisode);
    } else {
      setCurrentEpisodeIndex(nextEpisode);
    }
  };

  const startGame = () => {
    if (episodes.length > 0) {
      const firstQs = shuffleArray(episodes[0].snapQuestions).slice(0, 3);
      setQuestionsForEpisode(firstQs);
    }
    setHasStarted(true);
    setCurrentEpisodeIndex(0);
    setEpisodeScore(0);
    setTotalScore(0);
    setCurrentQIndex(0);
    setFeedback(null);
    setButtonsDisabled(false);
  };

  // A) Προ-εκκίνηση: φαίνεται μόνο το κουμπί Έναρξη, χωρίς επιλογή EN/EL
  if (!hasStarted) {
    return (
      <PageContainer>
        <BrandWrapper>
          <SolBrand size="2.5rem" centered />
        </BrandWrapper>

        <Title>{t.initialTitle}</Title>
        <Description>{t.initialDesc}</Description>

        <StartButton onClick={startGame}>{t.startButton}</StartButton>

        <BackLink to="/games">{t.backGames}</BackLink>
      </PageContainer>
    );
  }

  // B) Τέλος παιχνιδιού: τελικό scoreboard
  if (currentEpisodeIndex >= episodes.length) {
    const total = episodes.length * 3;
    return (
      <PageContainer>
        <BrandWrapper>
          <SolBrand size="2.5rem" centered />
        </BrandWrapper>

        <Title>{t.gameOverTitle}</Title>
        <Description>{t.gameOverDesc(totalScore, total)}</Description>

        <BackLink to="/games">{t.backGames}</BackLink>
      </PageContainer>
    );
  }

  // C) Εμφάνιση ερώτησης ή summary
  const currentEpisode = episodes[currentEpisodeIndex];
  const currentQuestionText =
    language === "en"
      ? questionsForEpisode[currentQIndex]?.question.en
      : questionsForEpisode[currentQIndex]?.question.el;

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/solsnap" />
      </Helmet>

      <PageContainer>
        <BrandWrapper>
          <SolBrand size="2.5rem" centered />
        </BrandWrapper>

        <Title>{t.inGameTitle}</Title>
        <Description>{t.inGameDesc}</Description>

        <LanguageToggleContainer>
          {/* Δείχνουμε ποια γλώσσα είναι επιλεγμένη, 
              αλλά δεν δίνουμε τη δυνατότητα εναλλαγής εδώ */}
          <ToggleButton $active={language === "en"} disabled>
            {language === "en" ? "🇬🇧 English" : "🇬🇷 Ελληνικά"}
          </ToggleButton>
        </LanguageToggleContainer>

        {currentQIndex < questionsForEpisode.length ? (
          <QuestionContainer>
            <QuestionText>
              <strong>
                {`#${currentEpisode.id} – `}
                {typeof currentEpisode.title === "object"
                  ? currentEpisode.title[language]
                  : currentEpisode.title}
              </strong>
            </QuestionText>
            <TimerText>{t.timeLeft(timer)}</TimerText>
            <QuestionText>{currentQuestionText}</QuestionText>

            {!feedback && (
              <ButtonsWrapper>
                <AnswerButton
                  onClick={() => handleAnswer(true)}
                  disabled={buttonsDisabled}
                >
                  {t.yes}
                </AnswerButton>
                <AnswerButton
                  onClick={() => handleAnswer(false)}
                  disabled={buttonsDisabled}
                >
                  {t.no}
                </AnswerButton>
              </ButtonsWrapper>
            )}

            {feedback && (
              <ResultText $correct={feedback === "correct"}>
                {feedback === "correct" ? t.correct : t.incorrect}
              </ResultText>
            )}
          </QuestionContainer>
        ) : (
          <SummaryContainer>
            {episodeScore === questionsForEpisode.length ? (
              currentEpisodeIndex < episodes.length - 1 ? (
                <SummaryText>
                  {t.summaryPerfectUnlock(
                    typeof currentEpisode.title === "object"
                      ? currentEpisode.title[language]
                      : currentEpisode.title
                  )}
                </SummaryText>
              ) : (
                <SummaryText>
                  {t.summaryPerfectLast(
                    typeof currentEpisode.title === "object"
                      ? currentEpisode.title[language]
                      : currentEpisode.title
                  )}
                </SummaryText>
              )
            ) : (
              <SummaryText>
                {t.summaryScore(
                  episodeScore,
                  questionsForEpisode.length,
                  typeof currentEpisode.title === "object"
                    ? currentEpisode.title[language]
                    : currentEpisode.title
                )}
              </SummaryText>
            )}

            {currentEpisodeIndex < episodes.length - 1 && (
              <NextButton onClick={goToNextEpisode}>
                {t.nextEpisode}
              </NextButton>
            )}

            <BackLink to="/games">{t.backGames}</BackLink>
          </SummaryContainer>
        )}
      </PageContainer>
    </>
  );
}
