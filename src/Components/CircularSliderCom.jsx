import React, { useState, useEffect } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";

function CircularSliderCom({
  progressColorFrom,
  progressColorTo,
  knobColor,
  position,
  method,
  label,
}) {
  const [trackSize, setTrackSize] = useState(24);
  function handleChange(value) {
    setTrackSize(20 + value);
    localStorage.setItem("sliderValue", value);
  }

  return (
    <div className="CircularSlider-container">
      {trackSize && (
        <CircularSlider
          onChange={(value) => {
            handleChange(value);
            console.log(value);
          }}
          max={20}
          min={2}
          label={label}
          labelColor="#005a58"
          labelFontSize="2rem"
          labelBottom={true}
          knobColor={knobColor}
          knobSize={30 + trackSize}
          progressColorFrom={progressColorFrom}
          progressColorTo={progressColorTo}
          progressSize={trackSize - 4}
          trackColor="#FFFFFF"
          trackSize={trackSize}
          dataIndex={3}
          valueFontSize="2.5rem"
        />
      )}
      {method === 2 && (
        <iframe
          className="map"
          src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.145840976973!2d${position.longitude}!3d${position.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580d7c23fe0b1%3A0xbb0d06ecf42e5f5d!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1645110984816!5m2!1sen!2sus`}
          width="256"
          height="256"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map"
        ></iframe>
      )}
    </div>
  );
}

export default CircularSliderCom;
