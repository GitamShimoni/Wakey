import React, { useState, useEffect } from "react";
import "./MainPage.css";
import CircularSliderCom from "./CircularSliderCom";
import DestinationForm from "./DestinationForm";
import SearchLocation from "./SearchLocation";
import "animate.css";
import InTrip from "./InTripPopUp";
import axios from "axios";

function PlanTrip() {
  const [method, setMethod] = useState(1);

  const [max, setMax] = useState();
  const [progressColorFrom, setProgressColorFrom] = useState("");
  const [progressColorTo, setProgressColorTo] = useState("");
  const [knobColor, setKnobColor] = useState("");
  const [label, setLabel] = useState("");
  const [position, setPosition] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    if (method == 1) {
      setMax(30);
      setProgressColorFrom("#FEA048");
      setProgressColorTo("#FF8B1F");
      setKnobColor("#FF7B00");
      setLabel("דקות");
    }
    if (method == 2) {
      setMax(5);
      setProgressColorFrom("#AB3131");
      setProgressColorTo("#8C2828");
      setKnobColor("#611C1C");
      setLabel(`ק"מ`);
    }
  }, [method]);

  return (
    <div id="mainPage-container">
      <div className="mainPage-main-section-container">
        <div className="mainPage-method-selection-section">
          <div
            id="time-title"
            className={`mainPage-method-btn ${
              method == 1 && "method-selected"
            }`}
            onClick={() => setMethod(1)}
          >
            זמן
          </div>
          <div
            id="distance-title"
            className={`mainPage-method-btn ${
              method == 2 && "method-selected"
            }`}
            onClick={() => setMethod(2)}
          >
            מרחק
          </div>
        </div>
        <div className="mainPage-main-section">
          <CircularSliderCom
            method={method}
            max={max}
            progressColorFrom={progressColorFrom}
            progressColorTo={progressColorTo}
            knobColor={knobColor}
            position={position}
            label={label}
          />
        </div>

        {method === 1 ? <DestinationForm /> : <SearchLocation />}
      </div>
    </div>
  );
}

export default PlanTrip;
