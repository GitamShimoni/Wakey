import React from "react";
import "./InTrip.css";
import Logo from "../../public/logo2.png";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import CancelTripBtn from "./CancelTripBtn";
function InTrip() {
  return (
    <div className="InTrip-container">
      <img className="wakey-logo" src={Logo} alt="logo" />
      <h4 id="in-trip-title">אתה יכול לישון בשקט Wakey יעיר אותך</h4>
      <div className="trip-info-section">
        <div className="in-trip-info-div">
          <AlarmOnIcon />
          <span className="in-trip-info-span"> 5 דק' לפני</span>
        </div>
        <div className="in-trip-info-div">
          <SportsScoreIcon />
          <span className="in-trip-info-span"> תחנה מרכזית תל אביב</span>
        </div>
      </div>
      <CancelTripBtn />
    </div>
  );
}

export default InTrip;
