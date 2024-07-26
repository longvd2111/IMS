import React, { useState } from 'react';
import '../../assets/css/candidate-css/Search.css'; 
import { FaSearch } from 'react-icons/fa';

const SearchCandidate = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');

  const handleSearch = () => {
    onSearch(query, status);
  };

  return (
    <div className="search-container">
      <label>
      
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
        />
         <FaSearch className="icon" />
      </label>
      <label>
      
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="OPEN">Open</option>
          <option value="BANNED">Banned</option>
        </select>
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchCandidate;
