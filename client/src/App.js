//import tools
import "./App.css";

//import components
import NavBar from "./components/navbar.component";
import KunPaosCoffee from "./components/kunpaoscoffee";
import AllUser from "./components/allUser";
import AddUser from "./components/addUser.component";
import EditUser from "./components/editUser";

//import routers
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<KunPaosCoffee />} />
        <Route path="/all" element={<AllUser />} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
