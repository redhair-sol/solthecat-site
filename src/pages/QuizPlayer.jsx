import { useEffect, useState } from "react";
import styled from "styled-components";
import SolBrand from "../components/SolBrand";
import { Link } from "react-router-dom";

// Styled components
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

const Button = styled.button`
  margin-top: 1rem;
  background-color: #f06292;
  color: white;
  padding: 0.6rem 1.4rem;
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #ec407a;
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

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then(res => res.json())
      .then(data => {
        const visible = data.filter(ep => ep.visible);
        setEpisodes(visible);
        if (visible.length > 0) {
          setSelectedId(visible[0].id.toString());
        }
      })
      .catch(err => console.error("Failed to load episodes:", err));
  }, []);

  const selectedEpisode = episodes.find(ep => ep.id.toString() === selectedId);
  const city = selectedEpisode?.city;

  const loadQuiz = () => {
    if (!city) return;

    fetch(`${import.meta.env.BASE_URL}data/quiz/${city}.json`)
      .then(res => {
        if (!res.ok) throw new Error("Quiz file not found.");
        return res.json();
      })
      .then(data => {
        setQuestions(data);
        setCurrent(0);
        setScore(0);
        setShowResults(false);
        setError("");
        alert(`✅ Quiz for ${city.toUpperCase()} loaded successfully! (${data.length} questions)`);
      })
      .catch(err => {
        console.error(err);
        setQuestions([]);
        setError("Quiz file not found.");
      });
  };

  const handleAnswer = (index) => {
    const isCorrect = index === questions[current].answer;
    if (isCorrect) setScore(prev => prev + 1);

    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  return (
    <PageContainer>
      <SolBrand />
      <Title>🧠 Quiz for: {selectedEpisode?.title || "Loading..."}</Title>

      <Dropdown value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        {episodes.map((ep) => (
          <option key={ep.id} value={ep.id}>{ep.title}</option>
        ))}
      </Dropdown>

      <Dropdown value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">🇬🇧 English</option>
        <option value="el">🇬🇷 Ελληνικά</option>
      </Dropdown>

      <Button onClick={loadQuiz}>Start Quiz</Button>

      {error && <Message>{error}</Message>}

      {questions.length > 0 && !showResults && (
        <QuestionCard>
          <QuestionText>{questions[current].question[language]}</QuestionText>
          {questions[current].options[language].map((opt, i) => (
            <AnswerButton key={i} onClick={() => handleAnswer(i)}>{opt}</AnswerButton>
          ))}
        </QuestionCard>
      )}

      {showResults && (
        <ScoreText>
          🎉 You got {score} out of {questions.length} correct!
        </ScoreText>
      )}

      <BackLink to="/games">← Back to games</BackLink>
    </PageContainer>
  );
}
