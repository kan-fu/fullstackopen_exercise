import React, { useEffect } from "react";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  useEffect(() => {
    const url = "https://restcountries.com/v3.1/all";
    axios.get(url).then((response) => {
      setCountries(response.data);
    });
  }, []);
  return (
    <>
      <Filter filter={filter} handleChange={(e) => setFilter(e.target.value)} />
      <Countries filter={filter} countries={countries} />
    </>
  );
};

export default App;
