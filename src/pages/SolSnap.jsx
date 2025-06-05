// src/pages/SolSnap.jsx

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import SolBrand from "../components/SolBrand";

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

const LanguageToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ToggleButton = styled.button`
  padding: 0.3rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ $active }) => ($active ? '#f8bbd0' : '#fff')};
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
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
`;

const TimerText = styled.p`
  font-size: 0.9rem;
  color: #d32f2f;
  margin-bottom: 1rem;
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
`;

const ResultText = styled.p`
  margin-top: 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ $correct }) => ($correct ? "#388e3c" : "#d32f2f")};
`;

const SummaryContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const SummaryText = styled.p`
  font-size: 1rem;
  color: #555;
  margin-bottom: 1rem;
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
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 1rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;
`;

/* ----------------------- Main Component ----------------------- */

export default function SolSnap() {
  // Όλα τα visible επεισόδια που έχουν snapQuestions
  const [episodes, setEpisodes] = useState([]);
  // Επιλεγμένη γλώσσα
  const [language, setLanguage] = useState("en");
  // Κατάσταση αν έχει ξεκινήσει το παιχνίδι
  const [hasStarted, setHasStarted] = useState(false);
  // Δείκτης τρέχοντος επεισοδίου (0-based)
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  // Οι 3 τυχαίες ερωτήσεις για κάθε επεισόδιο
  const [questionsForEpisode, setQuestionsForEpisode] = useState([]);
  // Δείκτης τρέχουσας ερώτησης (0, 1, 2). Όταν γίνει 3 → εμφάνιση summary
  const [currentQIndex, setCurrentQIndex] = useState(0);
  // Σκορ για το τρέχον επεισόδιο (0 έως 3)
  const [episodeScore, setEpisodeScore] = useState(0);
  // Συνολικό σκορ σε όλη τη διαδρομή (0 έως episodes.length * 3)
  const [totalScore, setTotalScore] = useState(0);
  // Feedback μετά την απάντηση ("correct" / "incorrect" / null)
  const [feedback, setFeedback] = useState(null);
  // Χρονόμετρο (5 δευτερόλεπτα)
  const [timer, setTimer] = useState(5);
  // Απενεργοποίηση κουμπιών μετά επιλογή ή timeout
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  // Αναφορά interval για τον countdown
  const countdownRef = useRef(null);

  /* useEffect: Φόρτωση episodes.json & προετοιμασία πρώτων ερωτήσεων μόλις πατηθεί Start */
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (ep) => ep.visible && Array.isArray(ep.snapQuestions)
        );
        setEpisodes(filtered);

        if (filtered.length > 0 && hasStarted) {
          const firstQs = shuffleArray(filtered[0].snapQuestions).slice(0, 3);
          setQuestionsForEpisode(firstQs);
        }
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, [hasStarted]);

  /* useEffect: Countdown 5 δευτερολέπτων όταν εμφανίζεται ερώτηση */
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

  /* Συνάρτηση: Τυχαία αναδιάταξη πίνακα */
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  /* Όταν λήξει ο χρόνος ή δοθεί λάθος απάντηση → Επανεκκίνηση παιχνιδιού */
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

  /* Όταν ο χρήστης απαντάει Yes/No */
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
        if (nextQ < questionsForEpisode.length) {
          setCurrentQIndex(nextQ);
          setFeedback(null);
        } else {
          setCurrentQIndex(nextQ);
          setFeedback(null);
        }
      }, 1000);
    } else {
      setTimeout(() => {
        handleWrongOrTimeout();
      }, 500);
    }
  };

  /* Πατώντας “Next Episode” */
  const goToNextEpisode = () => {
    const nextEpisode = currentEpisodeIndex + 1;

    if (nextEpisode < episodes.length) {
      const newQs = shuffleArray(
        episodes[nextEpisode].snapQuestions
      ).slice(0, 3);
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

  /* Πατώντας “Start Game” */
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

  /* ------------------ Conditional Rendering ------------------ */

  // A) Προ-εκκίνηση: επιλογή γλώσσας + Start Game
  if (!hasStarted) {
    return (
      <PageContainer>
        <BrandWrapper>
          <SolBrand size="2.5rem" centered />
        </BrandWrapper>

        <LanguageToggle>
          <ToggleButton
            onClick={() => setLanguage("en")}
            $active={language === "en"}
          >
            🇬🇧 English
          </ToggleButton>
          <ToggleButton
            onClick={() => setLanguage("el")}
            $active={language === "el"}
          >
            🇬🇷 Ελληνικά
          </ToggleButton>
        </LanguageToggle>

        <Title>📷 SolSnap</Title>
        <Description>
          {language === "en"
            ? "Ready to test your knowledge? Press Start to begin!"
            : "Έτοιμοι; Πατήστε Έναρξη για να ξεκινήσει το παιχνίδι!"}
        </Description>

        <StartButton onClick={startGame}>
          {language === "en" ? "Start Game" : "Έναρξη"}
        </StartButton>

        <BackLink to="/games">← Back to Games</BackLink>
      </PageContainer>
    );
  }

  // B) Τέλος παιχνιδιού: τελικό scoreboard
  if (currentEpisodeIndex >= episodes.length) {
    return (
      <PageContainer>
        <BrandWrapper>
          <SolBrand size="2.5rem" centered />
        </BrandWrapper>

        <Title>📷 SolSnap</Title>
        <Description>
          {language === "en"
            ? `Game Over! Your total score: ${totalScore} out of ${
                episodes.length * 3
              }`
            : `Τέλος παιχνιδιού! Το σκορ σου: ${totalScore} από ${
                episodes.length * 3
              }`}
        </Description>

        <BackLink to="/games">← Back to Games</BackLink>
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
        <title>SolSnap – SolTheCat</title>
        <link rel="canonical" href="https://solthecat.com/games/solsnap" />
      </Helmet>

      <PageContainer>
        <BrandWrapper>
          <SolBrand size="2.5rem" centered />
        </BrandWrapper>

        <Title>📷 SolSnap</Title>
        <Description>
          {language === "en"
            ? "Snap decision: 3 questions per visible episode. Answer within 5 seconds!"
            : "Απόφαση με μια ματιά: 3 ερωτήσεις για κάθε ορατό επεισόδιο. Απάντησε μέσα σε 5 δευτερόλεπτα!"}
        </Description>

        <LanguageToggle>
          <ToggleButton
            onClick={() => setLanguage("en")}
            $active={language === "en"}
          >
            🇬🇧 English
          </ToggleButton>
          <ToggleButton
            onClick={() => setLanguage("el")}
            $active={language === "el"}
          >
            🇬🇷 Ελληνικά
          </ToggleButton>
        </LanguageToggle>

        {currentQIndex < questionsForEpisode.length ? (
          /* --- Εμφάνιση ερώτησης --- */
          <QuestionContainer>
            <QuestionText>
              <strong>
                {`#${currentEpisode.id} – ${currentEpisode.title}`}
              </strong>
            </QuestionText>
            <TimerText>
              {language === "en" ? `Time left: ${timer}s` : `Χρόνος: ${timer}δλ.`}
            </TimerText>
            <QuestionText>{currentQuestionText}</QuestionText>

            {!feedback && (
              <ButtonsWrapper>
                <AnswerButton
                  onClick={() => handleAnswer(true)}
                  disabled={buttonsDisabled}
                >
                  {language === "en" ? "Yes" : "Ναι"}
                </AnswerButton>
                <AnswerButton
                  onClick={() => handleAnswer(false)}
                  disabled={buttonsDisabled}
                >
                  {language === "en" ? "No" : "Όχι"}
                </AnswerButton>
              </ButtonsWrapper>
            )}

            {feedback && (
              <ResultText $correct={feedback === "correct"}>
                {feedback === "correct"
                  ? language === "en"
                    ? "Correct! 🎉"
                    : "Σωστή επιλογή! 🎉"
                  : language === "en"
                  ? "Incorrect ❌"
                  : "Λάθος! ❌"}
              </ResultText>
            )}
          </QuestionContainer>
        ) : (
          /* --- Summary επεισοδίου --- */
          <SummaryContainer>
            {episodeScore === questionsForEpisode.length ? (
              currentEpisodeIndex < episodes.length - 1 ? (
                /* Αν δεν είναι το τελευταίο ορατό επεισόδιο */
                <SummaryText>
                  {language === "en" ? (
                    <>
                      🎉 Congratulations! You answered <strong>3 out of 3</strong> correctly in{" "}
                      <strong>{currentEpisode.title}</strong>. <br />
                      You unlocked the next episode!
                    </>
                  ) : (
                    <>
                      🎉 Συγχαρητήρια! Έκανες <strong>3 από 3</strong> ερωτήσεις σωστές στο{" "}
                      <strong>{currentEpisode.title}</strong>. <br />
                      Ξεκλείδωσες το επόμενο επεισόδιο!
                    </>
                  )}
                </SummaryText>
              ) : (
                /* Αν είναι το τελευταίο ορατό επεισόδιο */
                <SummaryText>
                  {language === "en" ? (
                    <>
                      🎉 Great job! You answered <strong>3 out of 3</strong> correctly in{" "}
                      <strong>{currentEpisode.title}</strong>. <br />
                      Stay tuned for next episodes!
                    </>
                  ) : (
                    <>
                      🎉 Μπράβο! Έκανες <strong>3 από 3</strong> ερωτήσεις σωστές στο{" "}
                      <strong>{currentEpisode.title}</strong>. <br />
                      Μείνε συντονισμένος για τα επόμενα επεισόδια!
                    </>
                  )}
                </SummaryText>
              )
            ) : (
              /* Αν δεν ήταν 3/3 σωστές απαντήσεις */
              <SummaryText>
                {language === "en" ? (
                  <>
                    You scored <strong>{episodeScore}</strong> out of{" "}
                    <strong>{questionsForEpisode.length}</strong> in{" "}
                    <strong>{currentEpisode.title}</strong>.
                  </>
                ) : (
                  <>
                    Έκανες <strong>{episodeScore}</strong> από{" "}
                    <strong>{questionsForEpisode.length}</strong> ερωτήσεις σωστές στο{" "}
                    <strong>{currentEpisode.title}</strong>.
                  </>
                )}
              </SummaryText>
            )}

            {currentEpisodeIndex < episodes.length - 1 && (
              <NextButton onClick={goToNextEpisode}>
                {language === "en" ? "Next Episode" : "Επόμενο Επεισόδιο"}
              </NextButton>
            )}

            <BackLink to="/games">← Back to Games</BackLink>
          </SummaryContainer>
        )}
      </PageContainer>
    </>
  );
}
