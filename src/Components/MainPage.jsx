import React, { useState, useEffect } from "react";
import "./MainPage.css";
import "animate.css";
import axios from "axios";
import PlanTrip from "./PlanTrip";
import InTripPage from "./InTripPage";

function MainPage() {
  const [isUserSleepingBool, setIsUserSleepingBool] = useState(false);

  async function isUserSleeping() {
    console.log("Callingggg");
    const data = await axios.get(`http://localhost:5000/users/isUserSleeping`, {
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
      {isUserSleepingBool ? <InTripPage /> : <PlanTrip />}
    </div>
  );
}

export default MainPage;
