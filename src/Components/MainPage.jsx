import React, { useState, useEffect } from "react";
import "./MainPage.css";
import "animate.css";
import axios from "axios";
import PlanTrip from "./PlanTrip";
import InTripPage from "./InTripPage";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import Host from "../utils/routes";
import NameIcon from "../../public/name-logo.png";

function MainPage() {
  const [isUserSleepingBool, setIsUserSleepingBool] = useState(false);
  const navigate = useNavigate();

  async function isUserSleeping() {
    console.log("Callingggg");
    const data = await axios.get(`${Host}/users/isUserSleeping`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    console.log(data.data, "This is the return");
    setIsUserSleepingBool(data.data);
  }

  useEffect(() => {
    isUserSleeping();
  }, []);

  return (
    <div id="mainPage-container">
    <img className="name-logo" src={NameIcon} alt="ad matai" />

      {isUserSleepingBool ? <InTripPage /> : <PlanTrip />}
      <div className="settings-btn" onClick={() => navigate("/settings")}>
        <AccountCircleIcon />
      </div>
    </div>
  );
}

export default MainPage;
