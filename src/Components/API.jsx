import React, { useState, useEffect } from "react";
import axios from "axios";

function API() {
  const [data, setData] = useState([]);
  const [stationId, setStationId] = useState(21256);
  const [filteredData, setFilteredData] = useState([]);

  const [distance, setDistance] = useState(null);
  const [landmark, setLandmark] = useState({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLandmark({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    if (landmark!=null) {
      distanceCalculator();
    }
  }, [landmark]); // Trigger distance calculation whenever landmark changes

  const distanceCalculator = () => {
    const landmark2 = { latitude: 32.32894, longitude: 34.858547 };

    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = toRadians(landmark?.latitude);
    const lon1 = toRadians(landmark?.longitude);
    const lat2 = toRadians(landmark2.latitude);
    const lon2 = toRadians(landmark2.longitude);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceInKm = R * c; // Distance in kilometers
    setDistance(distanceInKm);
  };

  const toRadians = (angle) => {
    return angle * (Math.PI / 180);
  };

  return (
    <div className="App">
      <h1>Bus Data</h1>
      {/* {data.map(item => item)} */}
      <p>
        Distance:{" "}
        {distance !== null ? distance.toFixed(2) + " km" : "Calculating..."}
      </p>
    </div>
  );
}

export default API;

//   useEffect(() => {
//     axios
//       .get(
//         `https://bus.gov.il/WebApi/api/passengerinfo/GetRealtimeBusLineListByBustop/${stationId}/he/false`
//       )
//       .then((res) => {
//         setData(res.data);
//         filterByLineNumber(605);
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   }, []);

//   function filterByLineNumber(lineNumber) {
//     setFilteredData(data.filter((item) => item.shilut != lineNumber));
//     console.log(filteredData);
//   }
