import React, { useState, useEffect } from "react";
import CircularSlider from "@fseehawer/react-circular-slider";

function CircularSliderCom({prependToValue ,  appendToValue  , progressColorFrom, progressColorTo , knobColor}) {
  const [trackSize, setTrackSize] = useState(24);
  
  function handleChange(value){
    setTrackSize(20+value)
  }

  return (
    <div>
      <CircularSlider
        onChange={(value) => {handleChange(value)
          console.log(value);
        }}
        max={20}
        min={2}
        label="!תעיר אותי"
        labelColor="#005a58"
        knobColor={knobColor}
        progressColorFrom={progressColorFrom}
        progressColorTo={progressColorTo}
        progressSize={trackSize-4}
        trackColor={"#FFFFFF"}
        trackSize={trackSize}
        dataIndex={3}
        prependToValue={prependToValue}
        appendToValue={appendToValue}
        valueFontSize={"2.5rem"}
      />
    </div>
  );
}

export default CircularSliderCom;
