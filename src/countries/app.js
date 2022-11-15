import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Display from './Display';

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [showData, setShowData] = useState(true);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  const onChange = (e) => {
    const query = e.target.value;
    let result = countries.filter((item) => {
      return item.name.common.toLowerCase().includes(query.toLowerCase());
    });

    if (result.length > 10) {
      result = result.slice(0, 10);
    } else if (result.length > 1 && result.length < 10) {
      result = result.slice();
    }
    setShowCountries(result);
    setTemp(result);
  };

  const back = () => {
    setShowCountries(temp);
  };

  const showDetails = (e) => {
    setShowData(!showData);
    const country = e.target.parentNode.firstChild.data;

    let res = countries.find((item) => {
      return item.name.common === country;
    });
    res = [res];

    setShowCountries(res);
  };
  console.log(showCountries.length > 1);

  return (
    <Display
      showCountries={showCountries}
      onChange={onChange}
      showDetails={showDetails}
      temp={temp}
      back={back}
    />
  );
}
export default App;
