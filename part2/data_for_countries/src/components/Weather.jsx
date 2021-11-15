import React from "react";

const Weather = ({ capital, weather }) => {
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>temperature: </strong>
        {weather.temperature} Celcius
      </p>
      <img src={weather.weather_icons[0]} alt='weather icon' />
      <p>
        <strong>wind: </strong>
        {weather.wind_speed} km/h direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
