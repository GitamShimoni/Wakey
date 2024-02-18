import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import API from "./Components/API";
import DestinationForm from "./Components/DestinationForm";
import FrontPage from "./Components/FrontPage";
import MainPage from "./Components/MainPage";

function App() {
  return (
    <div className="appMain-container">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/apiCheck" element={<API />} />
        <Route path="/DestinationForm" element={<DestinationForm />} />
        <Route path="/FrontPage" element={<FrontPage />} />
        <Route path="/home" element={<MainPage />}/>

      </Routes>
    </div>
  );
}

export default App;
