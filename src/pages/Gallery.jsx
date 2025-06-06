import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    padding: 0 0.5rem;
  }
`;

const Tile = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffffcc;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(170, 77, 200, 0.15);
  overflow: hidden;
  cursor: zoom-in;

  /* Fade-up animation */
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Scale on hover */
  &:hover {
    transform: scale(1.02);
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .caption-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    text-align: center;
    font-size: 0.9rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .caption-static {
    display: none;
    margin-top: 0.5rem;
    color: #444;
    font-size: 0.9rem;
    text-align: center;
    padding: 0 0.5rem;
  }

  @media (hover: hover) {
    &:hover .caption-overlay {
      opacity: 1;
    }

    .caption-static {
      display: none;
    }
  }

  @media (hover: none) {
    .caption-overlay {
      display: none;
    }

    .caption-static {
      display: block;
    }
  }
`;

export default function GalleryPage() {
  const [episodes, setEpisodes] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visibleEpisodes = data.filter((ep) => ep.visible);
        setEpisodes(visibleEpisodes);
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  // Intersection Observer for fade-up
  useEffect(() => {
    const tiles = document.querySelectorAll('.gallery-tile');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    tiles.forEach((tile) => observer.observe(tile));
    return () => observer.disconnect();
  }, [episodes]);

  const slides = episodes.map((ep) => ({ src: `/${ep.image}` }));

  const cleanCaption = (caption) => caption.replace(/🐾/g, "").trim();

  return (
    <>
      <Helmet>
        <title>
          {language === "en" ? "Gallery – SolTheCat" : "Gallery – SolTheCat"}
        </title>
        <link rel="canonical" href="https://solthecat.com/gallery" />
      </Helmet>

      <PageContainer>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <SolBrand />
        </div>

        <Grid>
          {episodes.map((ep, i) => {
            const titleText =
              typeof ep.title === "object" ? ep.title[language] : ep.title;
            const captionText =
              typeof ep.caption === "object"
                ? ep.caption[language]
                : ep.caption;
            return (
              <Tile
                key={ep.id}
                className="gallery-tile"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
              >
                <img src={`/${ep.image}`} alt={titleText} />
                <div className="caption-overlay">{cleanCaption(captionText)}</div>
                <div className="caption-static">{cleanCaption(captionText)}</div>
              </Tile>
            );
          })}
        </Grid>

        {open && (
          <Lightbox
            open={open}
            close={() => setOpen(false)}
            index={index}
            slides={slides}
          />
        )}
      </PageContainer>
    </>
  );
}
