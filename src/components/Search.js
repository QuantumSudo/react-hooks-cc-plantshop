import React from 'react';

function Search({ searchTerm, setSearchTerm }) {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <label>
        Search Plants:
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name"
        />
      </label>
    </div>
  );
}

export default Search;
