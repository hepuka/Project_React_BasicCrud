import "../styles/dashboard.css";
import NavBar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="container">
      <NavBar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
