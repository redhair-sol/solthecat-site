// src/App.jsx

import React from "react";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      {/* Sticky Topbar with logo + navigation */}
      <Topbar />

      {/* Main content wrapper */}
      <div className="w-full min-h-screen bg-royal-bg flex flex-col items-center">
        {/* Content wrapper – same bg as sides now */}
        <div className="flex w-full max-w-screen-xl flex-grow bg-royal-bg">
          {/* Routed page content */}
          <main className="flex-grow px-4 py-2 md:py-6 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
