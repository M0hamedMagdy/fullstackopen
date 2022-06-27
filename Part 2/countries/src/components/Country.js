import { useState, useEffect } from "react";
import axios from "axios";

function Country({ country }) {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const para = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital,
    };

    axios
      .get("http://api.weatherstack.com/current", { para })
      .then((response) => {
        const Response = response.data;
        console.log(Response);
        console.log(
          `Current temperature in ${Response.location.name} is ${Response.current.temperature}℃`
        );
        setWeather([Response]);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  if (weather.length > 0) {
    const currentWeather = weather[0].current;
    return (
      <>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="Country flag"></img>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {currentWeather.temperature}° Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
        <p>
          wind: {currentWeather.wind_speed} mph direction{" "}
          {currentWeather.wind_dir}
        </p>
      </>
    );
  }

  return (
    <>
      <h1>{country.name}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Spoken languages</h2>
      <ul>
        {country.languages.map((language) => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Country flag"></img>
    </>
  );
}

export default Country;
