import React from "react";
import Topbar from "./components/Topbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop"; // ✅ Εισαγωγή
import "./index.css";

function App() {
  return (
    <>
      <ScrollToTop /> {/* ✅ Ενεργοποιεί scroll reset ανά αλλαγή σελίδας */}

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
