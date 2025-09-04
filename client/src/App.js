//import tools
import "./App.css";
import KunPaosCoffee from "./components/kunpaoscoffee";
import AllUser from "./components/allUser";
import AddUser from "./components/addUser.component";
import EditUser from "./components/editUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import UserDetails from "./components/UserDetails.jsx";
import PasswordReset from "./components/PasswordReset.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<KunPaosCoffee />} />
        <Route path="/all" element={<AllUser />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/:id" element={<EditUser />} />
        <Route path="/user/:id" element={<UserDetails />} />
        <Route path="/reset" element={<PasswordReset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
