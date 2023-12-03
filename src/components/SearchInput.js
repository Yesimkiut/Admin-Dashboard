import React, { useState } from "react";

const SearchInput = ({ performSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce function implementation
  const debounce = (func, delay) => {
    let timeoutId;

    return (...args) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce((term) => {
    performSearch(term);
  }, 300);

  const handleInputChange = (event) => {
    const newTerm = event.target.value;
    setSearchTerm(newTerm);
    debouncedSearch(newTerm);
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      className="search-box"
      value={searchTerm}
      onChange={handleInputChange}
    />
  );
};

export default SearchInput;
