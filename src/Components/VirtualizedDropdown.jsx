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
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    // Filter options based on search term
    if (options) {
      const filtered = options?.filter((option) =>
        option[toSearch].toLowerCase().includes(searchTerm.toLowerCase())
      );
      // setFilteredOptions(filtered.slice(0, 20));
      setFilteredOptions(filtered);
    }
  }, [searchTerm, options]);

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
      {isOpen && filteredOptions?.length > 0 && (
        <ul className="dropdown-list-ul">
          <FixedSizeList
            height={Math.min(200, filteredOptions.length * 35)} // Set the desired height for the virtualized list
            width={200} // Set the desired width
            itemSize={35} // Set the height of each list item
            itemCount={filteredOptions.length}
          >
            {({ index, style }) => (
              <li
                className="dropdown-list-li"
                key={index}
                style={{
                  ...style,
                  height: "24px",
                  width: "86%",
                  marginBottom: "10px",
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
        </ul>
      )}
    </div>
  );
};

export default VirtualizedDropdown;
