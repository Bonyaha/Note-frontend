import React from 'react';

const Lang = (props) => {
  return <li>{props.data}</li>;
};

const CountryInfo = (props) => {
  let { temp } = props;
  let { languages } = props.country;
  let lang = Object.keys(languages);
  console.log(lang);

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
    </>
  );
};

export default CountryInfo;
