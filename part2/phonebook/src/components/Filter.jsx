import React from "react";

const Filter = ({ filterName, setFilterName }) => {
  return (
    <>
      <form action=''>
        <label htmlFor='nameFilter'>filter shown with </label>
        <input
          type='text'
          id='nameFilter'
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </form>
    </>
  );
};

export default Filter;
