import Topbar from "./components/Topbar";
import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <div className="w-full min-h-screen bg-[#fef8f8] flex flex-col items-center">
      {/* Topbar (desktop only) */}
      <Topbar />

      {/* Layout wrapper */}
      <div className="flex w-full max-w-screen-xl flex-grow bg-[#fce4ec]">
        {/* Sidebar (mobile only) */}
        <div className="md:hidden">
          <Sidebar />
        </div>

        {/* Main content */}
        <main className="flex-grow px-4 py-6 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
