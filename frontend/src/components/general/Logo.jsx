import React from "react";
import logo from "../../assets/spoticry-logo.png";

const Logo = () => {
  return (
    <div className="logo">
      <h1 className="app-name">Spoticry</h1>
      <img className="app-logo" src={logo} alt="company logo" />
    </div>
  );
};

export default Logo;
