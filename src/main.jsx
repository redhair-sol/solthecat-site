import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Episodes from './pages/Episodes.jsx'
import Map from './pages/Map.jsx'
import Gallery from './pages/Gallery.jsx' // ✅ νέο import
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="episodes" element={<Episodes />} />
          <Route path="map" element={<Map />} />
          <Route path="gallery" element={<Gallery />} /> {/* ✅ νέα γραμμή */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
