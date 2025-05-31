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

const Title = styled.h1`
  font-size: 2.7rem;
  margin-bottom: 0.3rem;
  font-weight: 600;
  font-style: italic;
  color: #4a005f;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  @media (max-width: 480px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 600;
  font-family: 'Playfair Display', serif;
  color: #4a005f;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  font-style: italic;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    font-size: 1.4rem;
  }
`;

const Tagline = styled(motion.p)`
  font-size: 1.3rem;
  font-style: italic;
  font-weight: 500;
  color: #6a1b9a;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    font-size: 1.1rem;
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

  &:hover {
    transform: scale(1.05);
  }
`;

const InstagramLink = styled(motion.a)`
  color: #aa4dc8;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  font-weight: normal;
  font-size: 0.95rem;
  margin-top: 1.5rem;

  img {
    width: 20px;
    height: 20px;
    margin-right: 0.4rem;
    vertical-align: middle;
  }
`;

export default function Home() {
  return (
    <PageContainer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <Title>
        <span
          style={{
            fontFamily: '"Dancing Script", cursive',
            color: "#aa4dc8",
            fontWeight: 700,
            fontSize: "3rem",
          }}
        >
          SOLadventures <span style={{ marginLeft: "0.2rem" }}>👑</span>
        </span>
      </Title>

      <Subtitle
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        the journey of a Queen
      </Subtitle>

      <Tagline
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        Fluffy. Fierce. Fabulous. 🐾🐾🐾
      </Tagline>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <JourneyButton to="/episodes">View the Journey</JourneyButton>
      </motion.div>

      <InstagramLink
        href="https://www.instagram.com/solthecat01/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
      >
        <img
          src="/icons/instagram-icon.webp"
          alt="Instagram"
          loading="lazy"
        />
        Follow on Instagram
      </InstagramLink>
    </PageContainer>
  );
}
