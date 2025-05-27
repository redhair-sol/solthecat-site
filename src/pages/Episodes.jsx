import { useEffect, useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #aa4dc8;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: bold;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const EpisodesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const EpisodeCard = styled.div`
  max-width: 600px;
  width: 100%;
  background: #ffffffcc;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(170, 77, 200, 0.2);
  text-align: center;
  transition: transform 0.2s ease-in-out;
  opacity: ${({ $isTeaser }) => ($isTeaser ? 0.6 : 1)};
  filter: ${({ $isTeaser }) => ($isTeaser ? "grayscale(100%)" : "none")};

  &:hover {
    transform: ${({ $isTeaser }) => ($isTeaser ? "none" : "scale(1.03)")};
  }

  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const EpisodeImage = styled.img`
  width: 100%;
  border-radius: 12px;
  object-fit: cover;
  margin-bottom: 1rem;
  filter: ${({ $isTeaser }) => ($isTeaser ? "grayscale(100%) brightness(0.95)" : "none")};
`;

const EpisodeTitle = styled.h2`
  color: #6a1b9a;
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.05rem;
  }
`;

const EpisodeQuote = styled.p`
  font-style: italic;
  color: #944f9e;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
`;

const EpisodeCaption = styled.p`
  font-size: 0.9rem;
  color: #333;
`;

const LanguageToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ToggleButton = styled.button`
  padding: 0.3rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ $active }) => ($active ? '#f8bbd0' : '#fff')};
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
`;

const StoryContainer = styled.div`
  margin-top: 1.2rem;
  font-size: 0.9rem;
  color: #444;
  text-align: justify;
`;

const StoryTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #6a1b9a;
`;

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visibleEpisodes = data.filter((ep) => ep.visible);
        const nextNumber = visibleEpisodes.length + 1;

        const teaser = {
          id: 999,
          title: `SOLadventure #${nextNumber} – Coming Soon 🐾`,
          image: "episodes/coming-soon.png",
          caption: "Stay tuned for the next purrfect stop 🐾🐾🐾",
          visible: false,
          quote: "",
          story: {}
        };

        visibleEpisodes.push(teaser);
        setEpisodes(visibleEpisodes);
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  return (
    <PageContainer>
      <Title>SOLadventures</Title>

      <LanguageToggle>
        <ToggleButton onClick={() => setLanguage("en")} $active={language === "en"}>
          🇬🇧 English
        </ToggleButton>
        <ToggleButton onClick={() => setLanguage("el")} $active={language === "el"}>
          🇬🇷 Ελληνικά
        </ToggleButton>
      </LanguageToggle>

      <EpisodesWrapper>
        {episodes.map((ep) => (
          <EpisodeCard key={ep.id} $isTeaser={!ep.visible}>
            <EpisodeImage
              src={`${import.meta.env.BASE_URL}${ep.image}`}
              alt={ep.title}
              $isTeaser={!ep.visible}
            />
            <EpisodeTitle>{ep.title}</EpisodeTitle>
            {ep.quote && <EpisodeQuote>{ep.quote}</EpisodeQuote>}
            <EpisodeCaption>{ep.caption}</EpisodeCaption>

            {ep.story && ep.story[language] && (
              <StoryContainer>
                <StoryTitle>SOL’s Tale</StoryTitle>
                <p>{ep.story[language]}</p>
              </StoryContainer>
            )}
          </EpisodeCard>
        ))}
      </EpisodesWrapper>
    </PageContainer>
  );
}
