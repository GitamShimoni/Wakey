import React, { useState, useEffect } from "react";
import DropDownList from "./DropDownList";
import axios from "axios";
import "./DestinationForm.css";
import filteredCities from "../Jsons/filteredCities.json";
import VirtualizedDropdown from "./VirtualizedDropdown";
import GoToSleepBtn from "./GoToSleepBtn.jsx";

const DestinationForm = () => {
  const selectedKey = "CityName";
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSelectedArray, setIsSelectedArray] = useState([]);
  const [cities, setCities] = useState(filteredCities);
  const [lineNumbers, setLineNumbers] = useState();
  const [cityArea, setCityArea] = useState([]);
  const [yaadCities, setYaadCities] = useState([]);
  const [yaadPlaces, setYaadPlaces] = useState([]);
  const [busSchedule, setBusSchedule] = useState([]);
  const [filteredBusSchedule, setFilteredBusSchedule] = useState([]);
  const [DestinationBusStopNumber, setDestinationBusStopNumber] = useState("");

  function toggleIsSelectedArray(searchbarId, isTrue) {
    const tempIsSelectedArray = [...isSelectedArray];
    tempIsSelectedArray[searchbarId] = isTrue;
    setIsSelectedArray(tempIsSelectedArray);
  }

  const handleSelect = (option, searchbarName, searchbarId) => {
    const tempSelectedOptions = selectedOptions;
    tempSelectedOptions[searchbarName] = option;
    setSelectedOptions(tempSelectedOptions);
    console.log(selectedOptions);
    toggleIsSelectedArray(searchbarId, true);
    console.log(isSelectedArray, "This is the is selected array");
  };

  // async function getStations() {
  //   const data = await axios.get(
  //     "https://data.gov.il/api/3/action/datastore_search?resource_id=e873e6a2-66c1-494f-a677-f5e77348edb0"
  //   );
  //   setStations(data.data.result.records);
  // }
  // useEffect(() => {
  //   const tempStations = getStations();
  //   console.log(tempStations.Object);
  // }, []);

  async function getBusLinesByCity() {
    console.log(selectedOptions, "These are the selected options");
    const data = await axios.get(
      `https://bus.gov.il/WebApi/api/passengerinfo/GetBusLineListByYeshuv/${selectedOptions?.fromCities?.cityId}/1/he/false`
    );
    console.log(data.data, "These are the line numbers");
    setLineNumbers(data.data);
  }
  async function getPlacesList() {
    const data = await axios.get(
      `https://bus.gov.il/WebApi/api/passengerinfo/GetPlacesList/1/${selectedOptions?.fromCities?.cityId}/0/${selectedOptions?.lineNumber?.ID}/he/false`
    );
    console.log(data.data, "PLACES LIST");
    setCityArea(data.data);
  }
  async function getYaadCitiesList() {
    const data = await axios.get(
      `https://bus.gov.il/WebApi/api/passengerinfo/GetToYeshuvByLine/1/${selectedOptions?.cityArea?.ID}/${selectedOptions?.lineNumber?.ID}/he/false`
    );
    console.log(data.data, "YAAD CITIESSSSSSSSS LIST");
    setYaadCities(data.data);
  }
  async function getYaadPlacesList() {
    const data = await axios.get(
      `https://bus.gov.il/WebApi/api/passengerinfo/GetPlacesList/1/${selectedOptions?.yaadCity?.ID}/${selectedOptions?.cityArea?.ID}/${selectedOptions?.lineNumber?.ID}/he/false`
    );
    console.log(data.data, "YAAD Places LIST");
    setYaadPlaces(data.data);
  }
  async function sendFormFunction() {
    const data = await axios.get(
      `https://bus.gov.il/WebApi/api/passengerinfo/GetScheduleList/1/${selectedOptions?.cityArea?.ID}/0/2/${selectedOptions?.yaadPlace?.ID}/${selectedOptions?.lineNumber?.ID}/he/false`
    );
    console.log(
      data?.data?.Transitions[0]?.ScheduleList,
      "THIS IS THE OVERALL SCHEDULEEEEEEEEEEEEEEEEEEEE"
    );
    setBusSchedule(data?.data?.Transitions[0]?.ScheduleList);
    createNewTrip();
    changeUserSleepingToTrue();
    setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  }

  async function changeUserSleepingToFalse() {
    const data = await axios.get(
      `http://localhost:5000/users/changeIsUserSleepingToFalse`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  async function changeUserSleepingToTrue() {
    const data = await axios.get(
      `http://localhost:5000/users/changeIsUserSleepingToTrue`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  async function fetchBusStationData() {
    try {
      const data = await axios.get(
        `https://data.gov.il/api/3/action/datastore_search?resource_id=e873e6a2-66c1-494f-a677-f5e77348edb0&q=${busSchedule[0]?.MakatDestinationBusstop}}`
        // `https://data.gov.il/api/3/action/datastore_search?resource_id=e873e6a2-66c1-494f-a677-f5e77348edb0&q=${busSchedule[0]?.MakatDestinationBusstop}`
      );
      console.log(data.data.result.records[0], "This is the bus station info");
      return data?.data?.result?.records[0];
    } catch {
      console.log("Failed to fetch bus station");
    }
  }
  async function createNewTrip() {
    const busStationData = await fetchBusStationData();

    if (busStationData) {
      const data = await axios.post(
        "http://localhost:5000/trips/newTrip",
        {
          stopId: localStorage.getItem("DestinationBusStopNumber"),
          stopName: localStorage.getItem("DestinationBusStopName"),
          lat: busStationData?.Lat,
          long: busStationData?.Long,
          wakeUpTimer: localStorage.getItem("sliderValue"),
          wakeUpKillometer: null,
          shilut: localStorage.getItem("BusLineNumber"),
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      localStorage.setItem("currentTripId", data.data._id);
    } else {
      alert("קרתה בעיה, נא נסה שוב");
    }
  }

  useEffect(() => {
    if (isSelectedArray[0] == true) {
      getBusLinesByCity();
      toggleIsSelectedArray(0, false);
    }
    if (isSelectedArray[1] == true) {
      getPlacesList();
      toggleIsSelectedArray(1, false);
    }
    if (isSelectedArray[2] == true) {
      getYaadCitiesList();
      toggleIsSelectedArray(2, false);
    }
    if (isSelectedArray[3] == true) {
      getYaadPlacesList();
      toggleIsSelectedArray(3, false);
    }
  }, [selectedOptions, isSelectedArray, lineNumbers]);

  //A function that checks if a given date is between two other dates, represented in a string
  function isDateBetween(date, string1, string2) {
    const dateFrom = new Date(string1);
    const dateTo = new Date(string2);
    const checkDate = new Date(date);

    return checkDate >= dateFrom && checkDate <= dateTo;
  }

  useEffect(() => {
    // A function that Filters the schedule by StringDepartureDate. Make sure it's bigger then "Departure" and smaller than "Arrival"
    if (busSchedule) {
      localStorage.setItem(
        "DestinationBusStopNumber",
        busSchedule[0]?.MakatDestinationBusstop
      );
      localStorage.setItem("DestinationBusStopName", busSchedule[0]?.Name);
      localStorage.setItem("BusLineNumber", busSchedule[0]?.Shilut);
      const currentDate = new Date();
      const tempFilteredSchedule = busSchedule.filter((schedule) =>
        isDateBetween(
          currentDate,
          schedule?.StringDepartureDateTime,
          schedule?.StringArrivalDateTime
        )
      );
      setFilteredBusSchedule(tempFilteredSchedule);
      localStorage.setItem(
        "filteredSchedule",
        JSON.stringify(tempFilteredSchedule)
      );
      console.log(filteredBusSchedule, "This is the filtered bus schedule");
    }
  }, [busSchedule]);

  return (
    <div id="destination-form-container">
      <h1>רשימת הערים</h1>
      <h3>חפש ישוב מוצא</h3>
      <VirtualizedDropdown
        searchbarId={0}
        searchbarName={"fromCities"}
        options={cities} //The data passed to the component
        onSelect={handleSelect}
        placeholderValue={"חפש ערים"} //Search Bar Placeholder value
        toSearch={"cityName"} //What should the search bar Search for?
      />
      <h3>חפש מספר קו</h3>
      <VirtualizedDropdown
        searchbarId={1}
        searchbarName={"lineNumber"}
        options={lineNumbers} //The data passed to the component
        onSelect={handleSelect}
        placeholderValue={"חפש קווים"} //Search Bar Placeholder value
        toSearch={"NAME"} //What should the search bar Search for?
      />
      <h3>חפש איזור בישוב</h3>
      <VirtualizedDropdown
        searchbarId={2}
        searchbarName={"cityArea"}
        options={cityArea} //The data passed to the component
        onSelect={handleSelect}
        placeholderValue={"איזורים בישוב"} //Search Bar Placeholder value
        toSearch={"NAME"} //What should the search bar Search for?
      />
      <h3>חפש ישובי יעד</h3>
      <VirtualizedDropdown
        searchbarId={3}
        searchbarName={"yaadCity"}
        options={yaadCities} //The data passed to the component
        onSelect={handleSelect}
        placeholderValue={"ישובי יעד"} //Search Bar Placeholder value
        toSearch={"NAME"} //What should the search bar Search for?
      />
      <h3>חפש איזורים בישוב היעד</h3>
      <VirtualizedDropdown
        searchbarId={3}
        searchbarName={"yaadPlace"}
        options={yaadPlaces} //The data passed to the component
        onSelect={handleSelect}
        placeholderValue={"איזורים בישוב היעד"} //Search Bar Placeholder value
        toSearch={"NAME"} //What should the search bar Search for?
      />
      <div className="GoToSleepBtn">
        <GoToSleepBtn sendFormFunction={sendFormFunction} />
      </div>
    </div>
  );
};

export default DestinationForm;
