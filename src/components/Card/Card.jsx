import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import "./Card.css";
import vid from "../../assets/images/bg-vid.mp4";
import night_vid from "../../assets/images/night-bg.mp4";
import { WEATHER__ICONS } from "../FetchData/data";

const Card = (props) => {
  const { city, weather_Text, weather_icon, status, temp, humidity, wind } =
    props.weatherCondition;
  console.log(city, weather_Text, weather_icon, status, temp, humidity, wind);
  let app__container_day = `row justify-content-center app__header`;
  let app__container_night = `row justify-content-center app__header night__mode`;
  return (
    <section className="bg">
      {status ? (
        <video className="videoTag" autoPlay loop muted>
          <source src={vid} type="video/mp4" />
        </video>
      ) : (
        <div>
          <video className="videoTag" autoPlay loop muted>
            <source src={night_vid} type="video/mp4" />
          </video>
        </div>
      )}
      <section className="app__ui">
        <div className="container">
          <div className={status ? app__container_day : app__container_night}>
            <div className="col-lg-5">
              <div className="card__container">
                <form className="input-group" onSubmit={props.onsubmit}>
                  <input
                    type="text"
                    name=""
                    id=""
                    className="form-control"
                    value={props.userSearch}
                    onChange={props.onchange}
                  />
                  <button className="search">
                    <BiSearch />
                  </button>
                </form>
                <h1 className="my-4">{city}</h1>
                <h2 className="text-center">
                  {temp}
                  <sup>o</sup>C
                </h2>
                <div className="text-center py-3">
                  <img
                    src={WEATHER__ICONS[weather_icon]}
                    alt=""
                    className="icon"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <h4>{weather_Text}</h4>
                    <h4>Humidity : {humidity}</h4>
                    <h4>Wind : {wind} Km/H</h4>
                  </div>
                  <div className="col-md-6">
                    <h4 className="text-end">{status ? "Day" : "Night"}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};
export default Card;
