//import tools
import "./App.css";
import KunPaosCoffee from "./components/kunpaoscoffee";
import AllUser from "./components/allUser";
import AddUser from "./components/addUser.component";
import EditUser from "./components/editUser";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login.jsx";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/all" /> : <Login />} />
        <Route path="/dashboard" element={<KunPaosCoffee />} />
        <Route path="/all" element={<AllUser />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
