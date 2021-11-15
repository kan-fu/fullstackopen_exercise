import React from "react";
import Country from "./Country";

const Countries = ({ filter, countries }) => {
  const countriesToShow = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  if (countriesToShow.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <>
      {countriesToShow.map((country) => (
        <Country
          key={country.cioc}
          country={country}
          total_number={countriesToShow.length}
        />
      ))}
    </>
  );
};

export default Countries;
