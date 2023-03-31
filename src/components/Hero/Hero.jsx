import React from "react";
import "./Hero.css";
import heroImg from "../../assets/heroimg.gif";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-writeup">
        <h1 className="hero-title">
          Stand out from the crowd with a dynamic, customizable online profile
        </h1>
        <p className="hero-subtitle">
          Elevate your resume with a dynamic live link. Impress employers,
          showcase your skills, and stay up-to-date - all with just one link.
        </p>
        <Link to='/signup'>
        <button className="hero-cta">Let's get started</button>
        </Link>
      </div>
      <div className="hero-image">
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};
