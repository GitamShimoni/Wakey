import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import "./DropDownList.css";

//Options is an array containing objects, the objects should have a key named CityName for this example.
const SearchableDropdown = ({
  searchbarId,
  searchbarName,
  options,
  onSelect,
  placeholderValue,
  toSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  // console.log(filteredOptions, "These are the options from the dropdownlist");

  useEffect(() => {
    // Filter options based on search term
    if (options) {
      // console.log(options, "This is the options");
      const filtered = options?.filter((option) =>
        option[toSearch].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered.slice(0, 20));
      // setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);
  const handleSelect = (option) => {
    onSelect(option, searchbarName, searchbarId);
    console.log(option);
    setSelected(option[toSearch]);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="searchable-dropdown-container">
      <input
        className="searchable-dropdown-input"
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={toggleDropdown}
        placeholder={selected ? selected : placeholderValue}
      />
      {isOpen && filteredOptions?.length > 0 && (
        <ul className="dropdown-list-ul">
          {filteredOptions.map((option, index) => (
            <li
              className="dropdown-list-li"
              key={index}
              onClick={() => handleSelect(option)}
            >
              {option[toSearch]}
            </li>
          ))}
        </ul>
      )}
      {isOpen &&
        filteredOptions?.length == 0 && ( //This is a loader - While the searchbar is loading, it shows up
          <div className="wrapper">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
            <div className="shadow"></div>
          </div>
        )}
    </div>
  );
};

export default SearchableDropdown;
