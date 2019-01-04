import React, {Component} from 'react';
import {Link} from "react-router-dom";

import allergyIcon from "../../assets/weather/allergy.png"
import cloudyIcon from "../../assets/weather/cloudy.png"
import hailIcon from "../../assets/weather/hail.png"
import humidityIcon from "../../assets/weather/humidity.png"
import partlyCloudyIcon from "../../assets/weather/partly-cloudy.png"
import pressureIcon from "../../assets/weather/pressure.png"
import rainIcon from "../../assets/weather/rain.png"
import rainyIcon from "../../assets/weather/rainy.png"
import rainyNightIcon from "../../assets/weather/rainy-night.png"
import snowIcon from "../../assets/weather/snow.png"
import stormIcon from "../../assets/weather/storm.png"
import sunnyIcon from "../../assets/weather/sunny.png"
import nightIcon from "../../assets/weather/clear-night.png"
import cloudyNightIcon from "../../assets/weather/cloudy-night.png"
import veryCloudyIcon from "../../assets/weather/very-cloudy.png"
import foggyIcon from "../../assets/weather/foggy.png"
import temperatureIcon from "../../assets/weather/temperature.png"
import windIcon from "../../assets/weather/wind.png"
import lastDayIcon from "../../assets/weather/last-day.png"
import { getGeolocation } from '../../utils/GetGeolocation'
import { getWeather } from '../Weather'
import {Widget, Header, Element} from './WeatherWidget.styles'
import {languageText} from '../../languages/MultiLanguage.js';

class WeatherWidget extends Component {
  icons = {
    '01d' : sunnyIcon,        //clear
    '02d' : partlyCloudyIcon, //few clouds
    '03d' : cloudyIcon,       //cloudy
    '04d' : veryCloudyIcon,   //very cloudy
    '09d' : rainyIcon,        //strong rain
    '10d' : rainyIcon,        //light rain
    '11d' : stormIcon,        //storm
    '13d' : snowIcon,         //snow
    '50n' : foggyIcon,     //mist
    '01n' : nightIcon,
    '02n' : cloudyNightIcon,
    '03n' : cloudyIcon,
    '04n' : veryCloudyIcon,
    '09n' : rainyIcon,
    '10n' : rainyNightIcon,
    '11n' : stormIcon,
    '13n' : snowIcon,
    '50n' : foggyIcon,
  }
  async componentDidMount() {
    const geolocation = await getGeolocation()
    const weather = await getWeather(geolocation)
    this.setState({
      weather: weather,
      temperature: weather.main.temp,
      icon: String(weather.weather[0].icon),
      //description: weather.weather[0].description,
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
      rain: weather.rain ? weather.rain.rain : 0,
      wind: weather.wind.speed
    })
  }
  
  render() {
    if(this.state) {
      const {temperature,icon, humidity, pressure, rain, wind } = this.state
      return (
      <Widget >
        <Header>
          <p>{languageText.weather.forecast}</p>
          <img src={this.icons[icon]} />
          <h3>{temperature}{String.fromCharCode(176)}C </h3>
        </Header>
        <Element>
          <img src={rainIcon}/>
          <p>
            <span className="name">{languageText.weather.rain}</span>
            <span className="value">{rain}</span>
          </p>
        </Element>
        <Element>
          <img src={humidityIcon}/>
          <p>
            <span className="name">{languageText.weather.humidity}</span>
            <span className="value">{humidity}%</span>
          </p>
        </Element>
        <Element>
          <img src={pressureIcon}/>
          <p>
            <span className="name">{languageText.weather.pressure}</span>
            <span className="value">{pressure} hPa</span>
          </p>
        </Element>
        <Element>
          <img src={windIcon}/>
          <p>
            <span className="name">{languageText.weather.windSpeed}</span>
            <span className="value">{wind}m/s</span>
          </p>
        </Element>
      </Widget>
      ) 
    } else return null
  }
}

export default WeatherWidget;
