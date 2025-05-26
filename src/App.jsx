import Sidebar from "./components/Sidebar";
import { Outlet } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
