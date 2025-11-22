// src/pages/SolCam.jsx
import { useEffect, useRef, useState } from "react";
import PageContainer from "../components/PageContainer.jsx";
import styled from "styled-components";
import Hls from "hls.js";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext.jsx";

// ----- STYLES (χωρίς αλλαγές) -----
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
  position: relative;
  transition: opacity 0.4s ease;
`;

const LiveBadge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: red;
  color: white;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
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
  margin: 0 auto;
  transition: opacity 0.4s ease;
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
  font-family: 'Poppins', sans-serif;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  background: #000;
`;

// ----- CHECK STREAM -----
async function checkStream(url) {
  try {
    const noCacheUrl = `${url}?t=${Date.now()}`;
    const res = await fetch(noCacheUrl, { method: "GET" });
    return res.status === 200;
  } catch {
    return false;
  }
}

export default function SolCam() {
  const videoRef = useRef(null);
  const { language } = useLanguage();
  const [isOffline, setIsOffline] = useState(true);

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

  const streamURL = "https://solcam.solthecat.com/solcam/index.m3u8";

  // ----------- FIXED useEffect (always running) -------------
  useEffect(() => {
    let hls;

    const loadStream = async () => {
      const video = videoRef.current;
      if (!video) return;

      // 1. Check if online
      const online = await checkStream(streamURL);

      if (!online) {
        setIsOffline(true);
        return;
      }

      // 2. Stream is online
      setIsOffline(false);

      if (hls) hls.destroy();

      // HLS load
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(streamURL + `?t=${Date.now()}`);
        hls.attachMedia(video);

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            setIsOffline(true);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = streamURL + `?t=${Date.now()}`;
        video.onerror = () => setIsOffline(true);
      }

      // Fix autoplay
      video.play().catch(() => {
        video.muted = true;
        video.play();
      });
    };

    // 🔥 FIX: run initial load
    loadStream();

    // 🔥 FIX: ALWAYS retry, not only when isOffline changes
    const interval = setInterval(() => {
      loadStream();
    }, 6000);

    return () => {
      clearInterval(interval);
      if (hls) hls.destroy();
    };
  }, []); // <-- FIX: no dependencies

  return (
    <>
      <Helmet>
        <title>SolCam Live – SolTheCat</title>
        <link rel="canonical" href="https://solthecat.com/solcam" />
      </Helmet>

      <PageContainer alignTop>
        <Title>{text[language].title}</Title>
        <Subtitle>{text[language].subtitle}</Subtitle>

        {isOffline ? (
          <OfflineBox>
            <OfflineImage src="/images/solcam-offline.jpg" alt="SolCam offline" />
            <OfflineCaption>{text[language].offline}</OfflineCaption>
          </OfflineBox>
        ) : (
          <VideoBox>
            <LiveBadge>LIVE</LiveBadge>
            <Video ref={videoRef} autoPlay muted controls />
          </VideoBox>
        )}
      </PageContainer>
    </>
  );
}
