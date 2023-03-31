import React from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to='/'>
        <img src={logo} alt="" />
        </Link>
      </div>
      <div className="navbar__auth-btns">
        <Link to="/login">
          <button className="navbar__login-btn">
            Login <span></span>
          </button>
        </Link>
        <Link to="/signup">
          <button className="navbar__signup-btn">Signup</button>
        </Link>
      </div>
    </nav>
  );
};
