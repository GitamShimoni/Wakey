import React, { useState } from "react";
import axios from "axios";
import VirtualizedDropdownLocation from "./VirtualizedDropDownLocation";
import GoToSleepBtn from "./GoToSleepBtn";
import Host from "../utils/routes";

const SearchLocation = () => {
  const [placesList, setPlacesList] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(["empty"]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    console.log(option, "This is the option");
  };
  async function createNewTrip() {
    const data = await axios.post(
      `${Host}/trips/newTrip`,
      {
        stopId: "notknown",
        stopName: selectedOption.display_name,
        lat: selectedOption.lat,
        long: selectedOption.lon,
        wakeUpTimer: null,
        wakeUpKillometer: localStorage.getItem("sliderValue"),
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    localStorage.setItem("currentTripId", data.data._id);
  }
  async function changeUserSleepingToTrue() {
    const data = await axios.get(
      `${Host}/users/changeIsUserSleepingToTrue`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
  }
  async function sendFormFunction() {
    createNewTrip();
    changeUserSleepingToTrue();
    setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  }

  console.log(selectedOption, "The selected option is:");
  return (
    <div>
      <VirtualizedDropdownLocation
        searchbarId={0}
        searchbarName={"LocationAddress"}
        onSelect={handleSelect}
        placeholderValue={"חפש כתובת"} //Search Bar Placeholder value
        toSearch={"display_name"} //What should the search bar Search for?
      />
      {selectedOption[0] != "empty" && (
        <div className="GoToSleepBtn">
          <GoToSleepBtn sendFormFunction={sendFormFunction} />
        </div>
      )}
    </div>
  );
};

export default SearchLocation;
