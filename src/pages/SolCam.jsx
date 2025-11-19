// src/pages/SolCam.jsx

import { useEffect, useRef, useState } from "react";
import PageContainer from "../components/PageContainer.jsx";
import styled from "styled-components";
import Hls from "hls.js";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext.jsx";

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin-bottom: 0.5rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin-bottom: 2rem;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const VideoBox = styled.div`
  width: 100%;
  max-width: 950px;
  background: #000;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  margin: 0 auto;
`;

const OfflineBox = styled.div`
  width: 100%;
  max-width: 950px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.25);
  background: #000;
  color: white;
  text-align: center;
`;

const OfflineImage = styled.img`
  width: 100%;
  display: block;
  object-fit: cover;
`;

const OfflineCaption = styled.div`
  padding: 1rem;
  font-size: 1rem;
  font-weight: 500;
  background: rgba(0,0,0,0.6);
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  background: #000;
`;

export default function SolCam() {
  const videoRef = useRef(null);
  const { language } = useLanguage();
  const [isOffline, setIsOffline] = useState(false);

  const text = {
    en: {
      title: "SolCam Live 🎥",
      subtitle: "Live view of Queen Sol — directly from her royal lounge.",
      offline: "SolCam currently offline",
    },
    el: {
      title: "SolCam Live 🎥",
      subtitle: "Ζωντανή μετάδοση της Sol — απευθείας από το παλατάκι της.",
      offline: "Το SolCam είναι εκτός λειτουργίας",
    },
  };

  useEffect(() => {
    const video = videoRef.current;
    const url = "https://solcam.solthecat.com/solcam/index.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.on(Hls.Events.ERROR, () => {
        setIsOffline(true);
      });

      hls.loadSource(url);
      hls.attachMedia(video);

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;

      video.onerror = () => {
        setIsOffline(true);
      };
    } else {
      setIsOffline(true);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>SolCam Live – SolTheCat</title>
        <link rel="canonical" href="https://solthecat.com/solcam" />
      </Helmet>

      <PageContainer
        alignTop
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>{text[language].title}</Title>
        <Subtitle>{text[language].subtitle}</Subtitle>

        {isOffline ? (
          <OfflineBox>
            <OfflineImage src="/images/solcam-offline.jpg" alt="Sol offline" />
            <OfflineCaption>{text[language].offline}</OfflineCaption>
          </OfflineBox>
        ) : (
          <VideoBox>
            <Video ref={videoRef} autoPlay muted controls />
          </VideoBox>
        )}
      </PageContainer>
    </>
  );
}
