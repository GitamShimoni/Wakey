import React, { useState, useEffect } from "react";
import "./InTrip.css";
import Logo from "../../public/logo2.png";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CancelTripBtn from "./CancelTripBtn";
import axios from "axios";
function InTripPopUp() {
  const [currentTrip, setCurrentTrip] = useState([]);
  async function getLastTrip() {
    const data = await axios.get(`http://localhost:5000/trips/getLastTrip`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setCurrentTrip(data.data);
  }
  useEffect(() => {
    getLastTrip();
  }, []);
  console.log(currentTrip, "This is the current trip");
  return (
    <div className="InTrip-container">
      <img className="wakey-logo" src={Logo} alt="logo" />
      <h4 className="in-trip-title">אתה יכול לישון בשקט...</h4>
      <h4 className="in-trip-title">{`Wakey יעיר אותך :)`}</h4>
      <div className="trip-info-section">
        <div className="in-trip-info-div">
          <AlarmOnIcon />
          {currentTrip?.wakeUpKillometer != null && (
            <span className="in-trip-info-span">{`${currentTrip?.wakeUpKillometer} דק' לפני`}</span>
          )}
          {currentTrip?.wakeUpTimer != null && (
            <span className="in-trip-info-span">{`${currentTrip?.wakeUpTimer} דק' לפני`}</span>
          )}
        </div>
        <div className="in-trip-info-div">
          <SportsScoreIcon />
          {currentTrip?.destination?.stopName <= 30 ? (
            <span className="in-trip-info-span">{`${currentTrip?.destination?.stopName}`}</span>
          ) : (
            <span className="in-trip-info-span">{`${currentTrip?.destination?.stopName.slice(
              0,
              30
            )}...`}</span>
          )}
        </div>
      </div>
      <CancelTripBtn />
    </div>
  );
}

export default InTripPopUp;
