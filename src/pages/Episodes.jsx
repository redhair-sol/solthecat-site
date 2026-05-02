// src/pages/Episodes.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext.jsx";
import PageContainer from "../components/PageContainer.jsx";

const TopSection = styled.div`
  margin-bottom: 2rem;
`;

const Heading = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
`;

const Subheading = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin: 0 auto;
  max-width: 600px;
  line-height: 1.5;
`;

const EpisodeCard = styled(motion.div)`
  background: #ffffffcc;
  padding: 1.5rem;
  border-radius: 1.5rem;
  max-width: 600px;
  width: 100%;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const EpisodeImage = styled.img`
  width: 100%;
  border-radius: 1rem;
  object-fit: cover;
  margin-bottom: 1rem;
`;

const EpisodeTitle = styled.h2`
  font-size: 1.2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
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

const ErrorBox = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 1rem auto;
  font-size: 0.95rem;
  text-align: center;
`;

export default function Episodes() {
  const [episodes, setEpisodes] = useState([]);
  const [loadError, setLoadError] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const visibleEpisodes = data.filter((ep) => ep.visible);
        const nextNumber = visibleEpisodes.length + 1;

        const teaser = {
          id: 999,
          title: {
            en: `SOLadventure #${nextNumber} – Coming Soon`,
            el: `SOLadventure #${nextNumber} – Έρχεται Σύντομα`
          },
          image: "episodes/coming-soon.png",
          caption: {
            en: "Stay tuned for the next purrfect stop",
            el: "Μείνε συντονισμένος για τον επόμενο σταθμό"
          },
          visible: false,
          quote: "",
          story: { en: "", el: "" }
        };

        visibleEpisodes.push(teaser);
        setEpisodes(visibleEpisodes);
        setLoadError(false);
      })
      .catch((err) => {
        console.error("Failed to load episodes:", err);
        setLoadError(true);
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {language === "el" ? "Επεισόδια" : "Episodes"} – SolTheCat
        </title>
        <link rel="canonical" href="https://solthecat.com/episodes" />
      </Helmet>

      <PageContainer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <TopSection>
          <Heading>
            {language === "el" ? "Τα επεισόδια της Sol 🎥" : "Sol’s Episodes 🎥"}
          </Heading>
          <Subheading>
            {language === "el"
              ? "Ακολούθησε τα πατουσάκια της βασίλισσας"
              : "Follow the pawprints of royalty"}
          </Subheading>
        </TopSection>

        {loadError && (
          <ErrorBox role="alert">
            {language === "el"
              ? "Δεν φόρτωσαν τα επεισόδια. Παρακαλώ δοκίμασε refresh."
              : "Couldn't load episodes. Please try refreshing the page."}
          </ErrorBox>
        )}

        {episodes.map((ep) => (
          <EpisodeCard key={ep.id}>
            <EpisodeImage
              src={`${import.meta.env.BASE_URL}${ep.image}`}
              alt={typeof ep.title === "object" ? ep.title[language] : ep.title}
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
      </PageContainer>
    </>
  );
}