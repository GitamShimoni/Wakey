import React, { useState } from "react";
import axios from "axios";
import VirtualizedDropdown from "./VirtualizedDropdown";
import VirtualizedDropdownLocation from "./VirtualizedDropDownLocation";

const SearchLocation = () => {
  const [placesList, setPlacesList] = useState([]);
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

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
    </div>
  );
};

export default SearchLocation;
