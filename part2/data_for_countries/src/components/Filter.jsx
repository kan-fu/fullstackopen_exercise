import React from "react";

const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      <form>
        <label htmlFor='find-countries'>find countries</label>
        <input
          type='text'
          value={filter}
          onChange={handleChange}
          id='find-countries'
        />
      </form>
    </div>
  );
};

export default Filter;
