import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import allergy from "../../assets/weather/allergy.png"
import cloudy from "../../assets/weather/cloudy.png"
import hail from "../../assets/weather/hail.png"
import humidity from "../../assets/weather/humidity.png"
import partlyCloudy from "../../assets/weather/partly-cloudy.png"
import pressure from "../../assets/weather/pressure.png"
import rain from "../../assets/weather/rain.png"
import rainy from "../../assets/weather/rainy.png"
import snow from "../../assets/weather/snow.png"
import storm from "../../assets/weather/storm.png"
import sunny from "../../assets/weather/sunny.png"
import temperature from "../../assets/weather/temperature.png"
import windy from "../../assets/weather/windy.png"
import lastDay from "../../assets/weather/last-day.png"

const Widget = styled.section`
  width: 90%;
  margin: 1rem 5% 0 5%;
  display: flex;
  flex-direction: column;
  position: relative;
  color: #363636;
  background-color: white;
  padding: 0;
  margin-bottom: 4rem;
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2.7rem 0 0 0;

  p {
    position: absolute;
    top: 0.5rem;
    color: #9a9a9a;
    text-transform: uppercase;
    line-height: 1rem;
    font-size: 0.9rem;
  }

  h3 {
    text-transform: uppercase;
    font-size: 30px;
    margin: 0 1rem;
    font-weight: 300;
  }
  img {
    width: 60px;
    height: 60px;
  }

`

const Element = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  .name {
    margin: 0 0.5rem;
  }

  .value {
    font-weight: 700;
  }
  img {
    width: 24px;
    height: 24px;
  }
`
const Footer = styled.div`
  padding: 1rem 0;
  margin: 1rem 0 0 0;
  text-transform: uppercase;
  color: #9a9a9a;
  border-top: solid 1px #eee;
`

const WeatherWidget = () => {
  // For Farenheit ${String.fromCharCode(8457)}
  let forecast = `20 ${String.fromCharCode(176)}C Cloudy`
  return (
    <Widget >
      <Header>
        <p>Weather Forecast</p>
        <img src={sunny} />
        <h3>{forecast}</h3>
      </Header>
      <Element>
        <img src={rain}/>
        <p>
          <span className="name">Rain</span>
          <span className="value">10%</span>
        </p>
      </Element>
      <Element>
        <img src={humidity}/>
        <p>
          <span className="name">Humidity</span>
          <span className="value">30%</span>
        </p>
      </Element>
      <Element>
        <img src={pressure}/>
        <p>
          <span className="name">Pressure</span>
          <span className="value">1010 hPa</span>
        </p>
      </Element>
      <Element>
        <img src={lastDay}/>
        <p>
          <span className="name">Preassure change</span>
          <span className="value">+10 hPa</span>
        </p>
      </Element>
      <Element>
        <img src={allergy}/>
        <p>
          <span className="name">Allergens</span>
          <span className="value">Bad</span>
        </p>
      </Element>
      <Footer>More</Footer>
    </Widget>
  );
}


export default WeatherWidget;
