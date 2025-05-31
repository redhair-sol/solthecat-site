import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const PageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 2rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

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

export default function Home() {
  return (
    <PageContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1
        style={{
          fontFamily: '"Dancing Script", cursive, sans-serif',
          color: "#aa4dc8",
          fontWeight: 700,
          fontSize: "3rem",
          textAlign: "center",
          marginBottom: "0.3rem",
          fontStyle: "italic",
          letterSpacing: "0.02em",
          textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        SOLadventures <span style={{ marginLeft: "0.2rem" }}>👑</span>
      </h1>

      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: 600,
          fontFamily: "'Playfair Display', serif",
          color: "#4a005f",
          fontStyle: "italic",
          marginBottom: "1.2rem",
          textShadow: "0 1px 1px rgba(0, 0, 0, 0.05)",
        }}
      >
        the journey of a Queen
      </h2>

      <p
        style={{
          fontSize: "1.3rem",
          fontStyle: "italic",
          fontWeight: 500,
          color: "#6a1b9a",
          marginBottom: "2rem",
        }}
      >
        Fluffy. Fierce. Fabulous. 🐾🐾🐾
      </p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <JourneyButton to="/episodes">View the Journey</JourneyButton>
      </motion.div>

      <a
        href="https://www.instagram.com/solthecat01/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: "#aa4dc8",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          fontWeight: "normal",
          fontSize: "0.95rem",
          marginTop: "1.8rem",
        }}
      >
        <picture style={{ display: "inline-block", marginRight: "0.4rem" }}>
          <source srcSet="/icons/instagram-icon.webp" type="image/webp" />
          <img
            src="/icons/instagram-icon.png"
            alt="Instagram"
            style={{
              width: "20px",
              height: "20px",
              verticalAlign: "middle",
            }}
          />
        </picture>
        Follow on Instagram
      </a>
    </PageContainer>
  );
}
