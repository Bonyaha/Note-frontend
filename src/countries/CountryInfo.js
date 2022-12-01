import React from 'react';

const Lang = (props) => {
  return <li>{props.data}</li>;
};

const CountryInfo = (props) => {
  let { data } = props.currentWeather;
  let { temp } = props;
  let { languages } = props.country;
  let lang = Object.keys(languages);
  let lat = props.country.capitalInfo.latlng[0];
  let lon = props.country.capitalInfo.latlng[1];

  let { country } = props;
  return (
    <>
      {temp.length > 1 ? (
        <button
          type="button"
          onClick={props.back}
          className="btn btn-info btn-sm m-2"
        >
          Back
        </button>
      ) : (
        ''
      )}
      <h1>{country.name.common}</h1>

      <h6>capital: {country.capital}</h6>
      <h6>area: {country.area}</h6>
      <h6>population: {country.population}</h6>
      <strong>Languages:</strong>
      <ul>
        {lang.map((data, index) => {
          return <Lang data={languages[data]} key={index} />;
        })}{' '}
      </ul>
      <img src={country.flags.png} alt="flag" style={{ height: '150px' }} />
      <div className="weather">
        <h2>Weather in {country.capital}</h2>
        <p>temperature {Math.round(data.main.temp)}°C</p>
        <img
          alt="weather"
          className="weather-icon"
          src={`icons/${data.weather[0].icon}.png`}
        />
        <p>Wind {data.wind.speed}m/s</p>
      </div>
    </>
  );
};

export default CountryInfo;
