import { useMemo } from "react";
import "./App.css";
import fakeData from "./fakeData.json";
import AuthMainPage from "./components/authentication/AuthMainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/general/MainPage";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<AuthMainPage />} />
          <Route path="/main/*" element={<MainPage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
