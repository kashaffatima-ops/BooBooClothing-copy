import React from 'react';
import '../../styles/SearchBar.css';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);  // Update the search query as the user types
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for clothing..."
        value={searchQuery}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
