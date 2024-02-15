import React, { useState, useEffect } from "react";

//Options is an array containing objects, the objects should have a key named CityName for this example.
const SearchableDropdown = ({ options, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Filter options based on search term
    if (options) {
      const filtered = options?.filter((option) =>
        option.CityName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOptions(filtered.slice(0, 5));
    }
  }, [searchTerm, options]);
  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="searchable-dropdown">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onClick={toggleDropdown}
        placeholder="Search..."
      />
      {isOpen && (
        <ul className="dropdown-list">
          {filteredOptions.map((option, index) => (
            <li key={index} onClick={() => handleSelect(option)}>
              {option.CityName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
