import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";


import App from './App.jsx';
import './index.css';

// ✅ Lazy-loaded pages
const Home = lazy(() => import('./pages/Home.jsx'));
const Episodes = lazy(() => import('./pages/Episodes.jsx'));
const Map = lazy(() => import('./pages/Map.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const SOLsJourney = lazy(() => import('./pages/SOLsJourney.jsx'));
const WhoIsSol = lazy(() => import('./pages/WhoIsSol.jsx'));

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
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
