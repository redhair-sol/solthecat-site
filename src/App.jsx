import React from "react";
import GlobalStyle from "./styles/GlobalStyle.js";
import ScrollToTop from "./components/ScrollToTop";
import Topbar from "./components/Topbar";
import InstagramFloatingButton from "./components/InstagramFloatingButton"; // ✅ ΝΕΟ
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <Topbar />

      {/* Ορατό λευκό κενό ΜΟΝΟ σε desktop */}
      <div className="hidden md:block h-6 w-full bg-white"></div>

      <div className="w-full min-h-screen bg-royal-bg flex flex-col items-center pt-20 md:pt-24">
        <div className="flex w-full max-w-screen-xl flex-grow bg-royal-bg">
          <main className="flex-grow px-4 py-2 md:py-6 w-full">
            <Outlet />
          </main>
        </div>
      </div>

      {/* ✅ Floating κουμπί Instagram μόνο σε κινητό */}
      <InstagramFloatingButton />
    </>
  );
}

export default App;
