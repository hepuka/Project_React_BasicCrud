import { AppBar, Toolbar, styled, Button } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";

const Header = styled(AppBar)`
  background: #111111;
`;

const Tabs = styled(NavLink)`
  font-size: 20px;
  margin-right: 20px;
  color: inherit;
  text-decoration: none;
`;
//main
const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/dashboard">***KUNPAO's COFFEE MANAGEMENT SYSTEM ***</Tabs>
        <Tabs to="/all">All User</Tabs>
        <Tabs to="/add">Add User</Tabs>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          style={{ marginLeft: "auto" }}
        >
          Logout
        </Button>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
