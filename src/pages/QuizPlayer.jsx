// src/pages/QuizPlayer.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

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
  margin-bottom: 2rem;
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

const StyledButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1.5rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const QuestionCard = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 4px 20px rgba(170, 77, 200, 0.2);
  margin-top: 2rem;
  text-align: center;
`;

const QuestionText = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const AnswerButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin: 0.4rem 0;
  border: 1px solid #d35ca3;
  border-radius: 8px;
  background: ${({ selected, correct }) =>
    selected ? (correct ? "#a5d6a7" : "#ef9a9a") : "#fce4ec"};
  cursor: ${({ selectedAnswer }) => (selectedAnswer ? "default" : "pointer")};
  font-weight: 500;

  &:hover {
    background: ${({ selected }) => (selected ? undefined : "#f8bbd0")};
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const ScoreText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2rem;
  color: #8e24aa;

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

const Message = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: red;

  @media (max-width: 480px) {
    font-size: 1rem;
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

export default function QuizPlayer() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const { language } = useLanguage();

  const content = {
    en: {
      title: "Sol’s Quiz 🧠",
      subtitle: `Quiz: SOLadventure #${current + 1}`,
      loading: "Loading...",
      start: "Start Quiz",
      quizUrl: "https://solthecat.com/games/cityquiz",
      back: "← Back to games",
      scoreText: (s, total) => `🎉 You got ${s} out of ${total} correct!`,
      errLoadEpisodes: "Failed to load episodes.",
      errLoadQuiz: "Quiz file not found or invalid.",
      dropdownLabel: (title) => title,
    },
    el: {
      title: "Quiz της Sol 🧠",
      subtitle: `Quiz: SOLadventure #${current + 1}`,
      loading: "Φόρτωση...",
      start: "Εκκίνηση Quiz",
      quizUrl: "https://solthecat.com/games/cityquiz",
      back: "← Επιστροφή στα παιχνίδια",
      scoreText: (s, total) => `🎉 Είχες ${s} σωστές από ${total}!`,
      errLoadEpisodes: "Αποτυχία φόρτωσης επεισοδίων.",
      errLoadQuiz: "Το αρχείο quiz δεν βρέθηκε ή δεν είναι έγκυρο.",
      dropdownLabel: (title) => title,
    },
  };
  const t = content[language];

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visible = data.filter((ep) => ep.visible);
        setEpisodes(visible);
        if (visible.length > 0) setSelectedId(visible[0].id.toString());
      })
      .catch(() => setError(t.errLoadEpisodes));
  }, []);

  const selectedEpisode = episodes.find((ep) => ep.id.toString() === selectedId);
  const city = selectedEpisode?.city;

  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const loadQuiz = () => {
    if (!city) return;
    fetch(`${import.meta.env.BASE_URL}data/quiz/${city}.json`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const shuffled = shuffleArray(data);
        const eightQuestions = shuffled.slice(0, 8);
        setQuestions(eightQuestions);
        setCurrent(0);
        setScore(0);
        setShowResults(false);
        setError("");
        setSelectedAnswer(null);
      })
      .catch(() => {
        setQuestions([]);
        setError(t.errLoadQuiz);
      });
  };

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) return;
    const correct = questions[current].answers[index].correct;
    setSelectedAnswer(index);
    if (correct) setScore((prev) => prev + 1);

    setTimeout(() => {
      const nextIndex = current + 1;
      if (nextIndex < questions.length) {
        setCurrent(nextIndex);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>{t.title} – SolTheCat</title>
        <link rel="canonical" href={t.quizUrl} />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{t.title}</Title>
        <Subtitle>{t.subtitle}</Subtitle>

        <DropdownWrapper>
          <Dropdown
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              setQuestions([]);
              setShowResults(false);
              setError("");
              setSelectedAnswer(null);
            }}
          >
            {episodes.map((ep) => {
              const epTitle =
                typeof ep.title === "object"
                  ? ep.title[language]
                  : ep.title;
              return (
                <option key={ep.id} value={ep.id}>
                  {t.dropdownLabel(epTitle)}
                </option>
              );
            })}
          </Dropdown>
        </DropdownWrapper>

        <StyledButton onClick={loadQuiz}>{t.start}</StyledButton>

        {error && <Message>{error}</Message>}

        {questions.length > 0 && !showResults && (
          <QuestionCard>
            <QuestionText>{questions[current].question[language]}</QuestionText>
            {questions[current].answers.map((ansObj, i) => (
              <AnswerButton
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                selected={selectedAnswer === i}
                correct={ansObj.correct}
                selectedAnswer={selectedAnswer}
              >
                {ansObj.text[language]}
              </AnswerButton>
            ))}
          </QuestionCard>
        )}

        {showResults && <ScoreText>{t.scoreText(score, questions.length)}</ScoreText>}

        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
