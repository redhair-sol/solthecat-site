// src/pages/Episodes.jsx

import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";
import { Search, X } from "lucide-react";
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

const SearchWrapper = styled.div`
  position: relative;
  max-width: 600px;
  width: 100%;
  margin: 0 auto 1rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.7rem 2.5rem 0.7rem 2.7rem;
  font-size: 1rem;
  border: 2px solid #c187d8;
  border-radius: 999px;
  background: #ffffffee;
  color: #5b2b7b;
  font-family: 'Poppins', sans-serif;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;

  &:focus {
    border-color: #aa4dc8;
    box-shadow: 0 0 0 3px rgba(170, 77, 200, 0.15);
  }

  &::placeholder {
    color: #c187d8;
    opacity: 0.85;
  }
`;

const SearchIconWrapper = styled.span`
  position: absolute;
  left: 0.95rem;
  top: 50%;
  transform: translateY(-50%);
  color: #aa4dc8;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  position: absolute;
  right: 0.6rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #aa4dc8;
  cursor: pointer;
  padding: 0.3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(170, 77, 200, 0.1);
  }
`;

const ResultCount = styled.p`
  font-size: 0.85rem;
  color: #5b2b7b;
  font-style: italic;
  margin: 0 auto 1.5rem;
  text-align: center;
`;

const NoResults = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  font-style: italic;
  text-align: center;
  max-width: 600px;
  margin: 1.5rem auto;
`;

const EpisodeCard = styled.div`
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
  aspect-ratio: 1 / 1;
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
  const [searchQuery, setSearchQuery] = useState("");
  const { language } = useLanguage();

  const t = {
    en: {
      heading: "Sol’s Episodes 🎥",
      subheading: "Follow the pawprints of royalty",
      placeholder: "Search by city or keyword...",
      noResults: (q) => `No episodes found for "${q}". Try another keyword.`,
      matches: (n) => `${n} ${n === 1 ? "match" : "matches"}`,
      clearLabel: "Clear search",
      storyTitle: "SOL’s Tale",
      loadFail: "Couldn't load episodes. Please try refreshing the page.",
    },
    el: {
      heading: "Τα επεισόδια της Sol 🎥",
      subheading: "Ακολούθησε τα πατουσάκια της βασίλισσας",
      placeholder: "Αναζήτηση με πόλη ή λέξη-κλειδί...",
      noResults: (q) => `Δεν βρέθηκαν επεισόδια για "${q}". Δοκίμασε άλλη λέξη.`,
      matches: (n) => `${n} ${n === 1 ? "αποτέλεσμα" : "αποτελέσματα"}`,
      clearLabel: "Καθαρισμός αναζήτησης",
      storyTitle: "Το Παραμύθι της SOL",
      loadFail: "Δεν φόρτωσαν τα επεισόδια. Παρακαλώ δοκίμασε refresh.",
    },
  }[language];

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
          image: "episodes/coming-soon.webp",
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

  const trimmedQuery = searchQuery.trim();
  const isSearching = trimmedQuery.length > 0;

  const filteredEpisodes = useMemo(() => {
    if (!isSearching) return episodes;
    const q = trimmedQuery.toLowerCase();
    return episodes.filter((ep) => {
      // Hide the "Coming Soon" teaser while searching — it is not a real result.
      if (ep.visible === false) return false;
      const title =
        (typeof ep.title === "object" ? ep.title[language] : ep.title) || "";
      const caption =
        (typeof ep.caption === "object" ? ep.caption[language] : ep.caption) ||
        "";
      const city = ep.city || "";
      return (
        title.toLowerCase().includes(q) ||
        caption.toLowerCase().includes(q) ||
        city.toLowerCase().includes(q)
      );
    });
  }, [episodes, isSearching, trimmedQuery, language]);

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
          <Heading>{t.heading}</Heading>
          <Subheading>{t.subheading}</Subheading>
        </TopSection>

        <SearchWrapper>
          <SearchIconWrapper>
            <Search size={18} />
          </SearchIconWrapper>
          <SearchInput
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.placeholder}
          />
          {isSearching && (
            <ClearButton
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label={t.clearLabel}
            >
              <X size={16} />
            </ClearButton>
          )}
        </SearchWrapper>

        {isSearching && filteredEpisodes.length > 0 && (
          <ResultCount>{t.matches(filteredEpisodes.length)}</ResultCount>
        )}

        {loadError && (
          <ErrorBox role="alert">{t.loadFail}</ErrorBox>
        )}

        {!loadError && isSearching && filteredEpisodes.length === 0 && (
          <NoResults>{t.noResults(trimmedQuery)}</NoResults>
        )}

        {filteredEpisodes.map((ep, idx) => (
          <EpisodeCard key={ep.id}>
            <EpisodeImage
              src={`${import.meta.env.BASE_URL}${ep.image}`}
              alt={typeof ep.title === "object" ? ep.title[language] : ep.title}
              width="800"
              height="800"
              loading={idx === 0 ? "eager" : "lazy"}
              fetchpriority={idx === 0 ? "high" : "auto"}
              decoding="async"
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
                <StoryTitle>{t.storyTitle}</StoryTitle>
                <p>{ep.story[language]}</p>
              </StoryContainer>
            )}
          </EpisodeCard>
        ))}
      </PageContainer>
    </>
  );
}
