import React from 'react';
import List from './List';
import CountryInfo from './CountryInfo';

const Display = ({ showCountries, onChange, showDetails, temp, back }) => {
  return (
    <div className="m-3">
      Search:
      <input
        id="search"
        type="text"
        label="search"
        onChange={onChange}
        className="m-3"
      />
      {showCountries.length > 1 ? (
        <ol>
          {showCountries.map((item) => {
            return (
              <List country={item} showDetails={showDetails} key={item.ccn3} />
            );
          })}
        </ol>
      ) : (
        <>
          {showCountries.map((item) => {
            return (
              <CountryInfo
                country={item}
                temp={temp}
                back={back}
                key={item.ccn3}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
export default Display;
