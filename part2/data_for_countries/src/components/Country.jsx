import React, { useEffect } from "react";
import Weather from "./Weather";
import axios from "axios";

const Country = ({ country }) => {
  const [show, setShow] = React.useState(false);
  const buttonName = show ? "Hide" : "Show";
  const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_WEATHERSTACK_API_KEY}&query=${country.capital[0]}`;
  const initWeather = {
    temperature: "",
    weather_icons: [],
    wind_speed: "",
    wind_dir: "",
  };
  const [weather, setWeather] = React.useState(initWeather);
  useEffect(() => {
    axios.get(weatherUrl).then((response) => {
      setWeather(response.data.current);
    });
  }, [weatherUrl]);

  return (
    <div>
      <p>
        {country.name.common}
        <button type='button' onClick={() => setShow(!show)}>
          {buttonName}
        </button>
      </p>
      {show && (
        <>
          <h2>{country.name.common}</h2>
          <p>capital {country.capital[0]}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {Object.entries(country.languages).map(([abbr, language]) => (
              <li key={abbr}>{language}</li>
            ))}
          </ul>
          <img
            className='flag'
            src={country.flags.svg}
            alt={country.name.common}
          />
          <Weather capital={country.capital[0]} weather={weather} />
        </>
      )}
    </div>
  );
};

export default Country;
