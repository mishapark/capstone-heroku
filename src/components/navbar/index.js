import React from "react";
import { Nav, NavLink, NavMenu, NavBtn, NavBtnLink } from "./NavbarElements";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = () => {
  return (
    <Nav>
      <Sidebar />
      <NavLink to="/">
        <h1 className="logo">Capstone Project</h1>
      </NavLink>
      <NavMenu>
        <NavLink to="/signup" activeStyle>
          Signup
        </NavLink>
      </NavMenu>
      <NavBtn>
        <NavBtnLink to="/login">Login</NavBtnLink>
      </NavBtn>
    </Nav>
  );
};

export default Navbar;
