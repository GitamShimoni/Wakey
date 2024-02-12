import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/LoginPage";

function App() {
  return (
    <div className="appmain-container">
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
