import React, { useState, useEffect } from "react";
import { FixedSizeList } from "react-window";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "./DropDownList.css";

const VirtualizedDropdown = ({
  searchbarId,
  searchbarName,
  options,
  onSelect,
  placeholderValue,
  toSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Filter options based on search term
    if (options) {
      setIsLoading(true);
      const filtered = options.filter((option) =>
        option[toSearch].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setTimeout(() => {
        setFilteredOptions(filtered);
        setIsLoading(false);
      }, 1000); // Simulating loading time with setTimeout
    }
  }, [searchTerm, options, toSearch]);

  const handleSelect = (option) => {
    onSelect(option, searchbarName, searchbarId);
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
      {isOpen && (
        <ul className="dropdown-list-ul">
          {isLoading && <div className="simple-loader">טוען...</div>}
          {!isLoading && filteredOptions.length > 0 && (
            <FixedSizeList
              height={Math.min(200, filteredOptions.length * 35)}
              width={"100%"}
              itemSize={30}
              itemCount={filteredOptions.length}
            >
              {({ index, style }) => (
                <li
                  className="dropdown-list-li"
                  key={index}
                  style={{
                    ...style,
                    height: "30px",
                    width: "100%",
                    textAlign: "right",
                    paddingRight: "10px",
                    display: "flex",
                    alignItems: "center",
                    boxSizing: "border-box"
                  }}
                  onClick={() => handleSelect(filteredOptions[index])}
                >
                  <ListItemText
                    className="listItemInSearchbar"
                    primary={filteredOptions[index][toSearch]}
                  />
                </li>
              )}
            </FixedSizeList>
          )}
        </ul>
      )}
    </div>
  );
};

export default VirtualizedDropdown;
