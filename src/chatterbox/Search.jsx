import React from "react";

function Search({search, onSearch}) {
  return (
    <nav>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        autoComplete="off"
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
    </nav>
  );
}

export default Search;
