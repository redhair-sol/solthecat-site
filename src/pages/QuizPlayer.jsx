// src/pages/QuizPlayer.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import SolBrand from "../components/SolBrand";
import { Link } from "react-router-dom";

// Αντίγραφο του JourneyButton από το Home, ώστε να έχουμε το ίδιο style
const JourneyButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background-color: #aa4dc8;
  color: white;
  text-decoration: none;
  border-radius: 16px;
  font-weight: bold;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;
  margin-top: 1.5rem;

  &:hover {
    transform: scale(1.05);
  }
`;

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Dropdown = styled.select`
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 2px solid #aa4dc8;
  border-radius: 8px;
  background: #fff;
  color: #6a1b9a;
  cursor: pointer;
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
`;

const AnswerButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.6rem;
  margin: 0.4rem 0;
  border: 1px solid #d35ca3;
  border-radius: 8px;
  background: #fce4ec;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background: #f8bbd0;
  }
`;

const ScoreText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 2rem;
  color: #8e24aa;
`;

const Message = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
  color: red;
`;

const BackLink = styled(Link)`
  margin-top: 2rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;
`;

export default function QuizPlayer() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [language, setLanguage] = useState("en");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState("");

  // Φόρτωμα των episodes από episodes.json
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visible = data.filter((ep) => ep.visible);
        setEpisodes(visible);
        if (visible.length > 0) {
          setSelectedId(visible[0].id.toString());
        }
      })
      .catch(() => {
        setError("Failed to load episodes.");
      });
  }, []);

  const selectedEpisode = episodes.find(
    (ep) => ep.id.toString() === selectedId
  );
  const city = selectedEpisode?.city;

  // Συνάρτηση για τυχαίο shuffle πίνακα
  const shuffleArray = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  // Όταν πατάμε "Start Quiz", φορτώνουμε το JSON και κρατάμε μόνο 8 τυχαίες
  const loadQuiz = () => {
    if (!city) return;

    fetch(`${import.meta.env.BASE_URL}data/quiz/${city}.json`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        // data είναι πίνακας 25 ερωτήσεων
        const shuffled = shuffleArray(data);
        const eightQuestions = shuffled.slice(0, 8);
        setQuestions(eightQuestions);
        setCurrent(0);
        setScore(0);
        setShowResults(false);
        setError("");
      })
      .catch(() => {
        setQuestions([]);
        setError("Quiz file not found or invalid.");
      });
  };

  // Χειρισμός απάντησης στην τρέχουσα ερώτηση
  const handleAnswer = (index) => {
    const isCorrect = questions[current].answers[index].correct;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Quiz: {selectedEpisode ? selectedEpisode.title : "Loading..."} – SolTheCat
        </title>
        <link
          rel="canonical"
          href="https://solthecat.com/games/cityquiz"
        />
      </Helmet>

      <PageContainer>
        <SolBrand />
        <Title>🧠 Quiz for: {selectedEpisode?.title || "Loading..."}</Title>

        {/* Επιλογή επεισοδίου */}
        <Dropdown
          value={selectedId}
          onChange={(e) => {
            setSelectedId(e.target.value);
            setQuestions([]);
            setShowResults(false);
            setError("");
          }}
        >
          {episodes.map((ep) => (
            <option key={ep.id} value={ep.id}>
              {ep.title}
            </option>
          ))}
        </Dropdown>

        {/* Επιλογή γλώσσας */}
        <Dropdown
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setQuestions([]);
            setShowResults(false);
            setError("");
          }}
        >
          <option value="en">🇬🇧 English</option>
          <option value="el">🇬🇷 Ελληνικά</option>
        </Dropdown>

        {/* Χρήση του JourneyButton για συνοχή με το Home */}
        <JourneyButton as="button" onClick={loadQuiz}>
          Start Quiz
        </JourneyButton>

        {error && <Message>{error}</Message>}

        {/* Εμφάνιση τρέχουσας ερώτησης (μέχρι να δώσουμε όλες τις 8) */}
        {questions.length > 0 && !showResults && (
          <QuestionCard>
            <QuestionText>
              {questions[current].question[language]}
            </QuestionText>
            {questions[current].answers.map((ansObj, i) => (
              <AnswerButton key={i} onClick={() => handleAnswer(i)}>
                {ansObj.text[language]}
              </AnswerButton>
            ))}
          </QuestionCard>
        )}

        {/* Τελική βαθμολογία μετά τις 8 ερωτήσεις */}
        {showResults && (
          <ScoreText>
            🎉 You got {score} out of {questions.length} correct!
          </ScoreText>
        )}

        <BackLink to="/games">← Back to games</BackLink>
      </PageContainer>
    </>
  );
}
