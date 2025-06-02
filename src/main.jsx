import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import './index.css';

const Home = lazy(() => import('./pages/Home.jsx'));
const Episodes = lazy(() => import('./pages/Episodes.jsx'));
const Map = lazy(() => import('./pages/Map.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const SOLsJourney = lazy(() => import('./pages/SOLsJourney.jsx'));
const WhoIsSol = lazy(() => import('./pages/WhoIsSol.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Shop = lazy(() => import('./pages/Shop.jsx'));
const PawprintsGame = lazy(() => import('./pages/PawprintsGame.jsx')); // ✅ hidden memory game
const NotFound = lazy(() => import('./pages/NotFound.jsx')); // ✅ fallback 404

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="episodes" element={<Episodes />} />
            <Route path="map" element={<Map />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="solsjourney" element={<SOLsJourney />} />
            <Route path="whoissol" element={<WhoIsSol />} />
            <Route path="contact" element={<Contact />} />
            <Route path="shop" element={<Shop />} />
            <Route path="games/pawprints" element={<PawprintsGame />} /> {/* ✅ hidden route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
