import React from 'react';

const Search = ({ onChange }) => {
  return (
    <>
      <label htmlFor="search">Filter: </label>

      <input id="search" type="text" label="search" onChange={onChange} />
    </>
  );
};

export default Search;
