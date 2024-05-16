import React from "react";
import NavSidePanel from "./NavSidePanel";
import ContactMainPanel from "../contact/ContactMainPanel";
import PermissionMainPanel from "../others/PermissionMainPanel";
import SettingMainPanel from "../others/SettingMainPanel";
import ProfileMainPanel from "../others/ProfileMainPanel";
import { Routes, Route } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="mainpage">
      <NavSidePanel />
      <Routes>
        <Route path="/" element={<ContactMainPanel />} />
        <Route path="/profile" element={<ProfileMainPanel />} />
        <Route path="/permission" element={<PermissionMainPanel />} />
        <Route path="/settings" element={<SettingMainPanel />} />
      </Routes>
    </div>
  );
};

export default MainPage;
