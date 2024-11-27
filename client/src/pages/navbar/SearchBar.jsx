import React, { useState } from 'react';
import './SearchBar.css'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        className="search-input"
        placeholder="Search..."
      />
      <button className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
