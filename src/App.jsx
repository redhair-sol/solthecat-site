import React from "react";
import GlobalStyle from "./styles/GlobalStyle.js";   // ← εισαγωγή
import Topbar from "./components/Topbar";
import ScrollToTop from "./components/ScrollToTop";
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <GlobalStyle />        {/* ← εφαρμόζουμε global styles σε όλο το app */}
      <ScrollToTop />        {/* scroll reset */}
      <Topbar />

      <div className="w-full min-h-screen bg-royal-bg flex flex-col items-center">
        <div className="flex w-full max-w-screen-xl flex-grow bg-royal-bg">
          <main className="flex-grow px-4 py-2 md:py-6 w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
