// src/pages/SolCam.jsx
import { useEffect, useRef, useState } from "react";
import PageContainer from "../components/PageContainer.jsx";
import styled from "styled-components";
import Hls from "hls.js";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "../context/LanguageContext.jsx";

// ----- STYLES (Παραμένουν ως έχουν) -----
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
  background: #47c9a0;
  color: white;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
`;

const LiveDot = styled.div`
  width: 10px;
  height: 10px;
  background: white;
  border-radius: 50%;
  animation: pulse 2.5s infinite ease-in-out;

  @keyframes pulse {
    0% { transform: scale(0.7); opacity: 0.6; }
    50% { transform: scale(1); opacity: 1; }
    100% { transform: scale(0.7); opacity: 0.6; }
  }
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

// ----- CHECK STREAM FUNCTION (ΕΛΕΓΧΟΣ MANIFEST) -----
async function checkStream(url) {
  try {
    // Προσθέτουμε timestamp για να παρακάμψουμε το cache
    const noCacheUrl = `${url}?t=${Date.now()}`;
    const res = await fetch(noCacheUrl, { method: "GET" });
    
    // Επιστρέφουμε true μόνο αν το Status είναι 200
    return res.status === 200;
  } catch (err) {
    // Σε περίπτωση σφάλματος δικτύου/fetch, θεωρούμε ότι είναι offline
    return false;
  }
}

export default function SolCam() {
  const videoRef = useRef(null);
  const { language } = useLanguage();
  const [isOffline, setIsOffline] = useState(false);

  // Χρήση Ref για την HLS instance (για να είναι διαθέσιμη στο cleanup)
  const hlsRef = useRef(null); 

  const text = {
    en: {
      title: "SolCam Live 🎥",
      subtitle: "Live view of Queen Sol.",
      offline: "SolCam currently offline",
    },
    el: {
      title: "SolCam Live 🎥",
      subtitle: "Ζωντανή μετάδοση της Sol.",
      offline: "Η SolCam είναι εκτός λειτουργίας",
    },
  };

  const streamURL = "https://solcam.solthecat.com/solcam/index.m3u8";
  // Η συχνότητα του polling για ανάκαμψη (5 δευτερόλεπτα)
  const RECOVERY_INTERVAL_MS = 5000; 

  useEffect(() => {
    let hls;
    let recoveryInterval;
    const video = videoRef.current;

    // 1. Συνάρτηση για φόρτωση του Player (τρέχει όταν isOffline === false)
    const initPlayer = async () => {
      // Κάνουμε έναν γρήγορο αρχικό έλεγχο
      const online = await checkStream(streamURL);
      if (!online) {
        setIsOffline(true);
        return;
      }

      if (!video) return; 

      if (Hls.isSupported()) {
        hls = new Hls();
        hlsRef.current = hls;
        
        hls.loadSource(`${streamURL}?force=${Date.now()}`);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {
            video.muted = true;
            video.play();
          });
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            hls.destroy();
            hlsRef.current = null;
            setIsOffline(true);
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari Support
        video.src = `${streamURL}?t=${Date.now()}`;
        video.play();
        
        video.onerror = () => {
          setIsOffline(true);
        };
      }
    };

    // 2. Συνάρτηση επαναφοράς (τρέχει όταν isOffline === true)
    const checkRecovery = async () => {
      const online = await checkStream(streamURL);
      if (online) {
        // Η ανάκαμψη επιτεύχθηκε, επανεκκινούμε το component
        setIsOffline(false); 
      }
    };

    // --- ΚΥΡΙΑ ΛΟΓΙΚΗ EFFECT ---
    if (isOffline) {
      // Είμαστε Offline: Ξεκινάμε το polling (τον "ανιχνευτή")
      recoveryInterval = setInterval(checkRecovery, RECOVERY_INTERVAL_MS);
    } else {
      // Είμαστε Online: Προσπαθούμε να φορτώσουμε τον player
      initPlayer();
    }

    // Cleanup function: Πολύ σημαντικό για να μην τρέχουν πολλαπλά intervals/players
    return () => {
      if (recoveryInterval) clearInterval(recoveryInterval);
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
    
  }, [isOffline]); // <-- Τρέχει ξανά κάθε φορά που αλλάζει το status

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
            <video
              src="/images/solcam-offline.webm"
              autoPlay
              loop
              muted
              playsInline
              style={{ width: "100%", display: "block", objectFit: "cover" }}
            />
            <OfflineCaption>{text[language].offline}</OfflineCaption>
          </OfflineBox>
        ) : (
          <VideoBox>
            <LiveBadge>
              <LiveDot />
              LIVE
            </LiveBadge>
            <Video ref={videoRef} autoPlay muted controls />
          </VideoBox>
        )}
      </PageContainer>
    </>
  );
}