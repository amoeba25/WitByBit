import { useMemo } from "react";
import "./App.css";
import fakeData from "./fakeData.json";
import AuthMainPage from "./components/authentication/AuthMainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/general/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthMainPage />} />
        <Route path="/main/*" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
