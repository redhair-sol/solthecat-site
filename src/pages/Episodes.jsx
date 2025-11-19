// src/pages/SolCam.jsx

import { useEffect, useRef } from "react";
import PageContainer from "../components/PageContainer.jsx";
import styled from "styled-components";
import Hls from "hls.js";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext.jsx";

const Title = styled.h1`
  font-size: 2rem;
  color: #6a1b9a;
  margin: 0 0 0.5rem 0;   /* ίδιο με Episodes */
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #5b2b7b;
  margin: 0 auto 2rem auto;  /* 2rem, ίδιο με Episodes */
  max-width: 600px;
  line-height: 1.5;
  text-align: center;
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

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
  background: #000;
`;

export default function SolCam() {
  const videoRef = useRef(null);
  const { language } = useLanguage();

  const text = {
    en: {
      title: "SolCam Live 🎥",
      subtitle: "Live view of Queen Sol — directly from her royal lounge.",
    },
    el: {
      title: "SolCam Live 🎥",
      subtitle: "Ζωντανή μετάδοση της βασίλισσας Sol — απευθείας από το παλατάκι της.",
    },
  };

  useEffect(() => {
    const video = videoRef.current;
    const url = "https://solcam.solthecat.com/solcam/index.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxBufferLength: 10,
        enableWorker: true,
      });
      hls.loadSource(url);
      hls.attachMedia(video);

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
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

        <VideoBox>
          <Video ref={videoRef} autoPlay muted controls />
        </VideoBox>
      </PageContainer>
    </>
  );
}
