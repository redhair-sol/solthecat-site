// src/pages/Episodes.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import SolBrand from "../components/SolBrand";
import { useLanguage } from "../context/LanguageContext.jsx";

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
  const { language } = useLanguage();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visibleEpisodes = data.filter((ep) => ep.visible);
        const nextNumber = visibleEpisodes.length + 1;

        const teaser = {
          id: 999,
          title: {
            en: `SOLadventure #${nextNumber} – Coming Soon 🐾`,
            el: `SOLadventure #${nextNumber} – Coming Soon 🐾`
          },
          image: "episodes/coming-soon.png",
          caption: {
            en: "Stay tuned for the next purrfect stop 🐾🐾🐾",
            el: "Μείνε συντονισμένος για το επόμενο τέλειο σταθμό 🐾🐾🐾"
          },
          visible: false,
          quote: "",
          story: { en: "", el: "" }
        };

        visibleEpisodes.push(teaser);
        setEpisodes(visibleEpisodes);
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Episodes – SolTheCat</title>
        <link rel="canonical" href="https://solthecat.com/episodes" />
      </Helmet>

      <PageContainer>
        <Title>
          <SolBrand size="2.5rem" centered />
        </Title>

        <EpisodesWrapper>
          {episodes.map((ep) => (
            <EpisodeCard key={ep.id} $isTeaser={!ep.visible}>
              <EpisodeImage
                src={`${import.meta.env.BASE_URL}${ep.image}`}
                alt={typeof ep.title === "object" ? ep.title[language] : ep.title}
                $isTeaser={!ep.visible}
              />
              <EpisodeTitle>
                {typeof ep.title === "object" ? ep.title[language] : ep.title}
              </EpisodeTitle>
              {ep.quote && <EpisodeQuote>{ep.quote}</EpisodeQuote>}
              <EpisodeCaption>
                {typeof ep.caption === "object" ? ep.caption[language] : ep.caption}
              </EpisodeCaption>

              {ep.story && ep.story[language] && (
                <StoryContainer>
                  <StoryTitle>
                    {language === "en" ? "SOL’s Tale" : "Το Παραμύθι της SOL"}
                  </StoryTitle>
                  <p>{ep.story[language]}</p>
                </StoryContainer>
              )}
            </EpisodeCard>
          ))}
        </EpisodesWrapper>
      </PageContainer>
    </>
  );
}
