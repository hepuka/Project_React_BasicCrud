import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const NavBar = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");

      if (storedUser?.email) {
        await axios.post("http://localhost:8000/logout", {
          email: storedUser.email,
        });
      }

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="navbar">
      <NavLink to="/dashboard">KUNPAO's LIBRARY MANAGEMENT SYSTEM</NavLink>

      {user.role === "basic" && (
        <NavLink to="/dashboard/profile">My Profile</NavLink>
      )}

      {user.role === "admin" && (
        <>
          <NavLink to="/dashboard/addBook">Add New Book</NavLink>
          <NavLink to="/dashboard/all">All User</NavLink>
          <NavLink to="/dashboard/add">Add User</NavLink>
          <NavLink to="/dashboard/addBook">Add New Book</NavLink>
          <NavLink to="/dashboard/searchbook">Search Book</NavLink>
        </>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default NavBar;
