// src/pages/SolSnap.jsx

import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useLanguage } from "../context/LanguageContext.jsx";

const PageContainer = styled.div`
  padding: 2rem;
  background: linear-gradient(to bottom, #fff1f9, #fce4ec);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.95rem;
  }
`;

const StartButton = styled.button`
  padding: 0.8rem 1.5rem;
  background-color: #c187d8;
  color: white;
  border: none;
  border-radius: 16px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 10px rgba(170, 77, 200, 0.3);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const BackLink = styled(Link)`
  display: block;
  margin-top: 1.5rem;
  color: #d35ca3;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default function SolSnap() {
  const { language } = useLanguage();
  const content = {
    en: {
      pageTitle: "SolSnap – SolTheCat",
      title: "Sol’s Snap Game",
      subtitle: "Ready to test your knowledge? Press Start to begin!",
      start: "Start Game",
      back: "← Back to games",
    },
    el: {
      pageTitle: "SolSnap – SolTheCat",
      title: "Το Snap Παιχνίδι της Sol",
      subtitle: "Έτοιμος να δοκιμάσεις τις γνώσεις σου; Πάτα Έναρξη για να ξεκινήσεις!",
      start: "Έναρξη Παιχνιδιού",
      back: "← Επιστροφή στα παιχνίδια",
    },
  };

  const t = content[language];

  return (
    <>
      <Helmet>
        <title>{t.pageTitle}</title>
        <link rel="canonical" href="https://solthecat.com/games/solsnap" />
      </Helmet>

      <PageContainer>
        <Title>{t.title}</Title>
        <Subtitle>{t.subtitle}</Subtitle>
        <StartButton>{t.start}</StartButton>
        <BackLink to="/games">{t.back}</BackLink>
      </PageContainer>
    </>
  );
}
