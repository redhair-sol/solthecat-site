import { useEffect, useState } from "react";

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
    <div className="episodes-page" style={{ padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", color: "#aa4dc8", textAlign: "center", marginBottom: "2rem" }}>
        SOLadventures
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem"
        }}
      >
        {episodes.map((ep) => (
          <div
            key={ep.id}
            style={{
              maxWidth: "600px",
              width: "90%",
              background: "#fff",
              padding: "1.5rem",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              textAlign: "center",
              margin: "0 auto"
            }}
          >
            <img
              src={`${import.meta.env.BASE_URL}${ep.image}`}
              alt={ep.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                objectFit: "cover",
                marginBottom: "1rem"
              }}
            />
            <h2 style={{ color: "#aa4dc8", fontWeight: "bold", fontSize: "1.2rem", marginBottom: "0.5rem" }}>{ep.title}</h2>
            <p style={{ fontStyle: "italic", color: "#666", marginBottom: "0.5rem" }}>{ep.quote}</p>
            <p style={{ fontSize: "0.9rem", color: "#333" }}>{ep.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
