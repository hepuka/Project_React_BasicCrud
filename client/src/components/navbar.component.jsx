//import tools
import React from "react";
import { AppBar, Toolbar, styled } from "@mui/material";
import { NavLink } from "react-router-dom";

//styles
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
  return (
    <Header position="static">
      <Toolbar>
        <Tabs to="/">***KUNPAO's COFFEE MANAGEMENT SYSTEM ***</Tabs>
        <Tabs to="all"> All User </Tabs>
        <Tabs to="add"> Add User </Tabs>
      </Toolbar>
    </Header>
  );
};

export default NavBar;
