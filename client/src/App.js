import "./App.css";
import Dashboard from "./components/dashboard.jsx";
import AllUser from "./components/allUser";
import AddUser from "./components/addUser.component";
import EditUser from "./components/editUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import UserDetails from "./components/UserDetails.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import MainContent from "./components/MainContent.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<MainContent />} />
          <Route path="all" element={<AllUser />} />
          <Route path="add" element={<AddUser />} />
          <Route path=":id" element={<EditUser />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="reset" element={<PasswordReset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
