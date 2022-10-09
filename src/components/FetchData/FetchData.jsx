import React, { useEffect, useState } from "react";

import axios from "axios";
import Card from "../Card/Card";
import Error from "../ErrorPage/Error";

const FetchData = () => {
  let weatherCondition = {
    city: "",
    weather_Text: "",
    weather_icon: "",
    status: "",
    temp: "",
    humidity: "",
    wind: "",
  };
  const [isError, setIsError] = useState(false);
  const [callApi, setCallApi] = useState(false); // we take this state for when form is submitted
  const [userSearch, setUserSearch] = useState("");
  const [cityWeatherCond, setCityWeatherCond] = useState(weatherCondition);
  useEffect(() => {
    getCity(userSearch ? userSearch : "karachi");
    setUserSearch("");
  }, [callApi]);

  // API KEY
  const apiKey = "KAIUdyGW9Wpzox54zodpCrrqGv8f80pF";
  const submitHandler = (e) => {
    e.preventDefault();
    if (!userSearch) {
      return;
    }
    setCallApi(!callApi);
    // getCity(userSearch); // return city data
  };
  const userSearchHandler = (e) => {
    setUserSearch(e.target.value);
  };
  const getCity = (userSearch) => {
    setIsError(false);
    // 1st API
    const base = `http://dataservice.accuweather.com/locations/v1/cities/search`;
    const query = `?apikey=${apiKey}&q=${userSearch}`;
    axios
      .get(base + query)
      .then((res) => {
        let cityKey = res.data[0].Key;
        let cityName = res.data[0].LocalizedName;
        // console.log(res.data[0]);
        // console.log(res.data[0].Key, res.data[0].LocalizedName);
        weatherCond(cityKey, cityName);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err + " error from get city side");
      });
  };
  const weatherCond = (cityKey, cityName) => {
    // console.log(cityKey, cityName);
    // 2nd API
    const base = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`;
    const query = `?apikey=${apiKey}&details=true`;
    axios
      .get(base + query)
      .then((res) => {
        // console.log(res);
        const {
          WeatherText,
          WeatherIcon,
          IsDayTime,
          Temperature,
          RelativeHumidity,
          Wind,
        } = res.data[0];
        // let weather_Text = res.data[0].WeatherText;
        // let weather_icon = res.data[0].WeatherIcon;
        // let status = res.data[0].IsDayTime;
        // let temp = res.data[0].Temperature.Metric.Value;
        // let humidity = res.data[0].RelativeHumidity;
        // let wind = res.data[0].Wind.Speed.Metric.Value;
        let weatherCondDetails = {
          city: cityName,
          weather_Text: WeatherText,
          weather_icon: WeatherIcon,
          status: IsDayTime,
          temp: Temperature.Metric.Value,
          humidity: RelativeHumidity,
          wind: Wind.Speed.Metric.Value,
        };
        setCityWeatherCond(weatherCondDetails);

        // console.log(
        //   cityName,
        //   weather_Text,
        //   weather_icon,
        //   status,
        //   temp,
        //   humidity,
        //   wind
        // );
      })
      .catch((err) => {
        setIsError(true);
        console.log(err + "error from weather condition side ");
      });
  };

  return (
    <>
      {!isError ? (
        <Card
          onsubmit={submitHandler}
          onchange={userSearchHandler}
          userSearch={userSearch}
          weatherCondition={cityWeatherCond}
        />
      ) : (
        <Error />
      )}
    </>
  );
};

export default FetchData;
