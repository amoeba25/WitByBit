import React from "react";
import Logo from "../general/Logo";
import Login from "./Login";

// import { Link, Routes, Route } from "react-router-dom";

const AuthSidePanel = () => {
  return (
    <div className="sidepanel">
      <Logo />
      <Login />
    </div>
  );
};

export default AuthSidePanel;
