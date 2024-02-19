import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import API from "./Components/API";
import DestinationForm from "./Components/DestinationForm";
import FrontPage from "./Components/FrontPage";
import MainPage from "./Components/MainPage";
import SearchLocation from "./Components/SearchLocation";
import Settings from "./Components/Settings";

function App() {
  return (
    <div className="appMain-container">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/apiCheck" element={<API />} />
        <Route path="/homepage" element={<MainPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

export default App;
