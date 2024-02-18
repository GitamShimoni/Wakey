import React, { useState, useEffect } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";
import "./MainPage.css";
import CircularSliderCom from "./CircularSliderCom";
function MainPage() {
  const [method, setMethod] = useState(1);

  const [prependToValue, setPrependToValue] = useState();
  const [appendToValue, setAppendToValue] = useState();
  const [max, setMax] = useState();
  const [progressColorFrom, setProgressColorFrom] = useState("");
  const [progressColorTo, setProgressColorTo] = useState("");
  const [knobColor, setKnobColor] = useState("");


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
      setPrependToValue("דקות");
      setAppendToValue("min");
      setProgressColorFrom("#00bfbd");
      setProgressColorTo("#009c9a");
      setKnobColor("#005a58");
    }
    if (method == 2) {
      setMax(5);
      setPrependToValue(`ק"מ`);
      setAppendToValue("Km");
      setProgressColorFrom("#AB3131");
      setProgressColorTo("#8C2828");
      setKnobColor("#611C1C");
    }
  }, [method]);
  return (
    <div id="mainPage-container">
      <div className="mainPage-main-section-container">
        <div className="mainPage-method-selection-section">
          <div
            id="mainPage-time-method-btn"
            className={`mainPage-method-btn ${
              method == 1 && "method-selected"
            }`}
            onClick={() => setMethod(1)}
          >
            זמן
          </div>
          <div
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
            prependToValue={prependToValue}
            appendToValue={appendToValue}
            max={max}
            progressColorFrom={progressColorFrom}
            progressColorTo={progressColorTo}
            knobColor={knobColor}
          />
          <iframe className="map"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.145840976973!2d${position.longitude}!3d${position.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580d7c23fe0b1%3A0xbb0d06ecf42e5f5d!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1645110984816!5m2!1sen!2sus`}
        width="256"
        height="256"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"

      ></iframe>
        </div>
 


      </div>
    </div>
  );
}

export default MainPage;
