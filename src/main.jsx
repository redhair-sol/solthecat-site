import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // ✅ ΝΕΟ

import { LanguageProvider } from "./context/LanguageContext.jsx";
import App from "./App.jsx";
import "./index.css";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home.jsx"));
const Episodes = lazy(() => import("./pages/Episodes.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
// SOLsJourney is now the canonical /map page (animated journey + static fallback).
const SOLsJourney = lazy(() => import("./pages/SOLsJourney.jsx"));
const WhoIsSol = lazy(() => import("./pages/WhoIsSol.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Games = lazy(() => import("./pages/Games.jsx"));
const PawprintsGame = lazy(() => import("./pages/PawprintsGame.jsx"));
const PuzzleMapGame = lazy(() => import("./pages/PuzzleMapGame.jsx"));
const QuizPlayer = lazy(() => import("./pages/QuizPlayer.jsx"));
const RoyalPuzzleGame = lazy(() => import("./pages/RoyalPuzzleGame.jsx"));
const SolSnap = lazy(() => import("./pages/SolSnap.jsx"));
const SolCam = lazy(() => import("./pages/SolCam.jsx"));
const SolsTreasureHunt = lazy(() => import("./pages/SolsTreasureHunt.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider> {/* ✅ Τύλιξε τα όλα */}
      <LanguageProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
            <Routes>
              <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="episodes" element={<Episodes />} />
                <Route path="map" element={<SOLsJourney />} />
                <Route path="gallery" element={<Gallery />} />
                {/* Legacy URL — redirect to /map (Cloudflare _redirects also serves a 301 in prod). */}
                <Route path="solsjourney" element={<Navigate to="/map" replace />} />
                <Route path="whoissol" element={<WhoIsSol />} />
                <Route path="contact" element={<Contact />} />
                <Route path="shop" element={<Shop />} />
				<Route path="solcam" element={<SolCam />} />

                {/* 🎮 Games */}
                <Route path="games" element={<Games />} />
                <Route path="games/pawprints" element={<PawprintsGame />} />
                <Route path="games/puzzlemap" element={<PuzzleMapGame />} />
                <Route path="games/cityquiz" element={<QuizPlayer />} />
                <Route path="games/royalpuzzle" element={<RoyalPuzzleGame />} />
                <Route path="games/solsnap" element={<SolSnap />} />
                <Route path="games/treasurehunt" element={<SolsTreasureHunt />} />
				
                {/* Custom 404 */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </LanguageProvider>
    </HelmetProvider>
  </React.StrictMode>
);
