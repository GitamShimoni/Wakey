import React, { useEffect, useState } from "react";
import InTripPopUp from "./InTripPopUp";
import axios from "axios";
import Host from "../utils/routes";

const InTripPage = () => {
  //////////// CALC DISTANCE FUNCTION

  const [userData, setUserData] = useState([]);
  const [reqWakeUp, setReqWakeUp] = useState(null);
  const [distance, setDistance] = useState(null);
  const [landmark, setLandmark] = useState(null);
  const [landmark2, setLandMark2] = useState(null);
  const [isKillometer, setIsKillometer] = useState(true);
  const [busStopId, setBusStopId] = useState("");
  const [busStopNum, setBusStopNum] = useState("");
  const [busStopData, setBusStopData] = useState([]);
  const [currentTrip, setCurrentTrip] = useState([]);

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

  async function getBusStopInfo() {
    console.log(busStopId, "THIS IS THE BUS STOP ID");
    const data = await axios.get(
      `https://bus.gov.il/WebApi/api/passengerinfo/GetRealtimeBusLineListByBustop/${busStopId}/he/false`
    );
    console.log(data.data, "These are the line numbers");
    const tempBusStopData = data.data;
    // tempBusStopData = tempBusStopData.filter(() => )
    setBusStopData(data.data);
  }
  useEffect(() => {
    if (landmark) {
      // const landmark2 = {
      //   latitude: 37.774929179760605, // Example latitude
      //   longitude: -122.4194154846738, // Example longitude
      // };
      distanceCalculator(landmark2);
      // getBusStopInfo();
    }
  }, [landmark]); // Trigger distance calculation whenever landmark changes

  console.log(busStopData, "This is the data from the station");
  //twilio call trigger:
  //A function that calls the user - with token and voiceType as a header

  async function getUserByToken() {
    const data = await axios.get(`${Host}/users/getUser`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setUserData(data.data);
  }

  console.log(userData, "This is the userData");
  async function callUserWithTwilio() {
    const data = await axios.get(`${Host}/phonecall/callToNumber`, {
      headers: {
        token: localStorage.getItem("token"),
        voicetype: userData.voiceType,
      },
    });
  }
  console.log(distance, reqWakeUp, "DISTANCE AND WAKE UP");

  //THIS IS THE USE EFFECT THAT CALLS THE USER - USING TWILIO FUNCTION
  useEffect(() => {
    if (distance <= reqWakeUp && reqWakeUp != null) {
      console.log(distance, "GOT INTO THE IF");
      // callUserWithTwilio();
    }
  }, [distance]);

  const distanceCalculator = (landmark2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const lat1 = toRadians(landmark.latitude);
    const lon1 = toRadians(landmark.longitude);
    const lat2 = toRadians(landmark2?.latitude);
    const lon2 = toRadians(landmark2?.longitude);

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
  //////////////////////////////////////////////////// CALC DISTANCE FUNCTION

  async function getCurrentTrip() {
    const data = await axios.get(`${Host}/trips/getLastTrip`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setCurrentTrip(data.data);

    //Got the trip and set the data
    const destination = {
      latitude: data?.data?.destination?.lat,
      longitude: data?.data?.destination?.long,
    };

    //Check if you should wake up by killometer or timer.
    if (data?.data?.wakeUpTimer != null) {
      setIsKillometer(false);
      setReqWakeUp(data?.data?.wakeUpTimer);
    } else if (data?.data?.wakeUpKillometer != null) {
      setIsKillometer(true);
      setReqWakeUp(data?.data?.wakeUpKillometer);
    }

    //Set the busStopId, set the target landmark (landmark2)
    setBusStopId(data?.data?.destination.stopId);
    setLandMark2(destination);
  }

  async function getUserByToken() {
    const data = await axios.get(`${Host}/users/getUser`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setUserData(data.data);
  }

  console.log(reqWakeUp, "Thishdalshljdahsjdasjdhsajda");
  console.log(currentTrip);
  console.log(landmark2);
  useEffect(() => {
    getCurrentTrip();
    getUserByToken();
  }, []);
  return <InTripPopUp />;
};

export default InTripPage;
