import "./App.css";
import Dashboard from "./components/Dashboard.jsx";
import AllUser from "./components/AllUser.jsx";
import AddUser from "./components/AddUser.jsx";
import EditUser from "./components/EditUser.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import UserDetails from "./components/UserDetails.jsx";
import PasswordReset from "./components/PasswordReset.jsx";
import MainContent from "./components/MainContent.jsx";
import AddnewBook from "./components/AddnewBook.jsx";
import SearchBook from "./components/SearchBook.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<MainContent />} />
          <Route path="all" element={<AllUser />} />
          <Route path="add" element={<AddUser />} />
          <Route path="addBook" element={<AddnewBook />} />
          <Route path="searchbook" element={<SearchBook />} />
          <Route path=":id" element={<EditUser />} />
          <Route path="user/:id" element={<UserDetails />} />
          <Route path="reset" element={<PasswordReset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
