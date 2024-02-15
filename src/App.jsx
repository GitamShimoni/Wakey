import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/LoginPage";
import API from "./Components/API";

function App() {
  return (
    <div className="appMain-container">
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/apiCheck" element={<API />}/>
        
      </Routes>
    </div>
  );
}

export default App;
