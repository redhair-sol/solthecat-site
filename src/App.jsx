import React from "react";
import GlobalStyle from "./styles/GlobalStyle.js";
import ScrollToTop from "./components/ScrollToTop";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <GlobalStyle />
      <ScrollToTop />
      <Topbar />

      {/* Προσθήκη padding-top ίσου με το ύψος του header */}
      <div className="w-full min-h-screen bg-royal-bg flex flex-col items-center pt-14 md:pt-16">
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
