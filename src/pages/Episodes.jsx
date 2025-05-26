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

  &:hover {
    transform: scale(1.03);
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

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visibleEpisodes = data.filter(ep => ep.visible);
        const nextPlaceholder = data.find(ep => !ep.visible);
        if (nextPlaceholder) visibleEpisodes.push(nextPlaceholder);
        setEpisodes(visibleEpisodes);
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  return (
    <PageContainer>
      <Title>SOLadventures</Title>
      <EpisodesWrapper>
        {episodes.map((ep) => (
          <EpisodeCard key={ep.id}>
            <EpisodeImage
              src={`${import.meta.env.BASE_URL}${ep.image}`}
              alt={ep.title}
            />
            <EpisodeTitle>{ep.title}</EpisodeTitle>
            <EpisodeQuote>{ep.quote}</EpisodeQuote>
            <EpisodeCaption>{ep.caption}</EpisodeCaption>
          </EpisodeCard>
        ))}
      </EpisodesWrapper>
    </PageContainer>
  );
}
