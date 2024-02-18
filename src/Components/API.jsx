import React, { useState, useEffect } from "react";

function API({landmark2} , {reqWakeUp}) {
  const [distance, setDistance] = useState(null);
  const [landmark, setLandmark] = useState(null);

  useEffect(() => {
    // Function to get user's current location
    const getCurrentLocation = () => {
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
    };

    // Get current location initially
    getCurrentLocation();

    // Check location every minute
    const interval = setInterval(() => {
      getCurrentLocation();
    }, 60000); // 60000 milliseconds = 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (landmark) {
      const landmark2 = {
        latitude: 37.774929179760605, // Example latitude
        longitude: -122.4194154846738, // Example longitude
      };
      distanceCalculator(landmark2);
    }
  }, [landmark]); // Trigger distance calculation whenever landmark changes

  //twilio call trigger:
  useEffect(() => {
    if (distance <= reqWakeUp) {    
      //twilio call
    }
  }, [distance]); 

  const distanceCalculator = (landmark2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = toRadians(landmark.latitude);
    const lon1 = toRadians(landmark.longitude);
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
      <h1>Distance Calculator</h1>
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
