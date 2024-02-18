import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import DestinationForm from "./DestinationForm";

const FrontPage = () => {
  const [busInfo, setBusInfo] = useState([]);
  const [finishedForm, setFinishedForm] = useState(false);

  async function getBusStationInfo() {
    const BusStopNumber = localStorage.getItem("DestinationBusStopNumber");
    const BusLineNumber = localStorage.getItem("BusLineNumber");
    const data = await axios.get(
      `https://bus.gov.il/WebApi/api/passengerinfo/GetRealtimeBusLineListByBustop/${BusStopNumber}/he/false`
    );
    console.log(data?.data, "This is the unfiltered data from the front page");
    const filteredStationInfo = data?.data.filter((busLine) => {
      //There are some busLines that writes the Shilut with spaces, so i use the trim() Function
      return busLine?.Shilut.trim() == BusLineNumber.trim();
    });
    console.log(filteredStationInfo, "This is the filtered BUS INFOOOO");
    return filteredStationInfo;
  }

  useEffect(() => {
    setBusInfo(getBusStationInfo());
  }, [finishedForm]);
  return (
    <div>
      <DestinationForm setFinishedForm={setFinishedForm} />
    </div>
  );
};

export default FrontPage;
