import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import Display from './Display';

function App() {
  const [countries, setCountries] = useState([]);
  const [showCountries, setShowCountries] = useState([]);
  const [showData, setShowData] = useState(true);
  const [temp, setTemp] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  //console.log(currentWeather);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  const currentWeatherFetch = (data) => {
    console.log(data);
    let lat = data[0]?.capitalInfo.latlng[0];
    let lon = data[0]?.capitalInfo.latlng[1];
    console.log(lat);
    console.log(lon);
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_MY_API_KEY}&units=metric`
      )
      .then((res) => setCurrentWeather(res));
  };

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
    currentWeatherFetch(result);
    // console.log(result);
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
    //console.log(res);

    res = [res];

    setShowCountries(res);
    currentWeatherFetch(res);
  };

  return (
    <Display
      showCountries={showCountries}
      onChange={onChange}
      showDetails={showDetails}
      temp={temp}
      back={back}
      currentWeather={currentWeather}
    />
  );
}
export default App;
