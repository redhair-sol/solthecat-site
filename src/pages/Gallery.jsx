import { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GalleryPage() {
  const [episodes, setEpisodes] = useState([]);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}episodes.json`)
      .then((res) => res.json())
      .then((data) => {
        const visibleEpisodes = data.filter(ep => ep.visible);
        setEpisodes(visibleEpisodes);
      })
      .catch((err) => console.error("Failed to load episodes:", err));
  }, []);

  const slides = episodes.map((ep) => ({ src: `/${ep.image}` }));

  return (
    <div className="gallery-page" style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#aa4dc8", textAlign: "center", marginBottom: "2rem" }}>
        SOLadventures Gallery
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          maxWidth: "1000px",
          margin: "0 auto"
        }}
      >
        {episodes.map((ep, i) => (
          <div
            key={ep.id}
            className="gallery-tile"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
              overflow: "hidden",
              cursor: "pointer"
            }}
          >
            <img
              src={`/${ep.image}`}
              alt={ep.title}
              style={{ width: "100%", height: "auto" }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                padding: "1rem",
                background: "rgba(0, 0, 0, 0.6)",
                color: "white",
                textAlign: "center",
                opacity: 0,
                transition: "opacity 0.3s ease",
                fontSize: "0.9rem"
              }}
              className="caption-overlay"
            >
              {ep.caption}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          index={index}
          slides={slides}
        />
      )}

      <style>{`
        @media (hover: hover) {
          .gallery-tile:hover .caption-overlay {
            opacity: 1;
          }
          .caption-overlay {
            pointer-events: none;
          }
        }
      `}</style>
    </div>
  );
}
