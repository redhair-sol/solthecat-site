import { useState } from "react";
import styled from "styled-components";
import SolBrand from "../components/SolBrand";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem 1rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  font-family: "Poppins", sans-serif;
  min-height: 100vh;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: #aa4dc8;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: 800px;
  border: none;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }

  @media (max-width: 480px) {
    height: 900px;
  }
`;

const LanguageToggle = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const ToggleButton = styled.button`
  padding: 0.3rem 0.8rem;
  border: 1px solid #ccc;
  background-color: ${({ $active }) => ($active ? '#f8bbd0' : '#fff')};
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
`;

export default function Contact() {
  const [language, setLanguage] = useState("en");

  const subtitles = {
    en: "Sol personally reviews every message you send – or so she claims.",
    el: "Η Sol λαμβάνει προσωπικά κάθε μήνυμα που της στέλνεις – ή τουλάχιστον έτσι θέλει να πιστεύεις.",
  };

  const forms = {
    en: "https://docs.google.com/forms/d/e/1FAIpQLSewVmGzPREJWL8I7jmLisaPUcgiN7hV9uDSuRZyX7hIuyIQdQ/viewform?embedded=true",
    el: "https://docs.google.com/forms/d/e/1FAIpQLSeJq77VFhKxVPaLMNnYPua3EU0hxBAQ7qz5IWGlCI1nhMRFaA/viewform?embedded=true",
  };

  return (
    <Container>
      <Title>
        <SolBrand size="2.5rem" centered />
      </Title>

      <LanguageToggle>
        <ToggleButton onClick={() => setLanguage("en")} $active={language === "en"}>
          🇬🇧 English
        </ToggleButton>
        <ToggleButton onClick={() => setLanguage("el")} $active={language === "el"}>
          🇬🇷 Ελληνικά
        </ToggleButton>
      </LanguageToggle>

      <Subtitle>{subtitles[language]}</Subtitle>

      <IframeWrapper>
        <iframe
          src={forms[language]}
          title="Contact Form"
          loading="lazy"
        >
          {language === "en" ? "Contact form" : "Φόρμα επικοινωνίας"}
        </iframe>
      </IframeWrapper>
    </Container>
  );
}
