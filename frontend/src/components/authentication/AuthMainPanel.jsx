import React from "react";
import { Routes, Route } from "react-router-dom";
import { PiFileLock } from "react-icons/pi";

const AuthMainPanel = () => {
  return (
    <div className="mainpanel auth-mainpanel">
      <PiFileLock className="filelock-logo" />
      <p>Please sign in to view the data</p>
    </div>
  );
};

export default AuthMainPanel;
