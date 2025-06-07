// src/App.jsx

import React from "react";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      {/* 1. Header as sibling: LogoText + mobile menu + desktop nav */}
      <Topbar />

      {/* 2. Content wrapper (ροζ background) */}
      <div className="w-full min-h-screen bg-[#fef8f8] flex flex-col items-center">
        <div className="flex w-full max-w-screen-xl flex-grow bg-[#fce4ec]">
          {/* Main content */}
          <main className="flex-grow px-4 py-6 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
