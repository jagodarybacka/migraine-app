import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';

import cloudyIcon from "../../assets/weather/cloudy.png"
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
import windIcon from "../../assets/weather/wind.png"
import { getGeolocation } from '../../utils/GetGeolocation'
import { getWeather, getForecast } from '../Weather'
import {Widget, Header, Element} from './WeatherWidget.styles'
import {languageText} from '../../languages/MultiLanguage.js';

class WeatherWidget extends Component {
  constructor(props) {
    super(props);

    this.getWeatherForecast = this.getWeatherForecast.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  icons = {
    '01d' : sunnyIcon,        //clear
    '02d' : partlyCloudyIcon, //few clouds
    '03d' : cloudyIcon,       //cloudy
    '04d' : veryCloudyIcon,   //very cloudy
    '09d' : rainyIcon,        //strong rain
    '10d' : rainyIcon,        //light rain
    '11d' : stormIcon,        //storm
    '13d' : snowIcon,         //snow
    '50d' : foggyIcon,        //mist
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

  componentDidMount() {
    this.getWeatherForecast();
    if(!localStorage.getItem('weather')  || !localStorage.getItem('weather_time')) {
      this.saveWeather()
    } else {
      const now = new Date()
      const then = new Date(localStorage.getItem('weather_time'))
      const diff = Math.round((now.getTime() - then.getTime()) / (1000 * 60))
      if(diff > 30) {
        this.saveWeather();
      } else {
        if(JSON.parse(localStorage.getItem('weather')) != null){
          const weather = JSON.parse(localStorage.getItem('weather')).weather
          this.setState({
            weather: weather,
            temperature: weather.main.temp,
            icon: String(weather.weather[0].icon),
            description: weather.weather[0].description,
            humidity: weather.main.humidity,
            pressure: weather.main.pressure,
            rain: weather.rain ? weather.rain.rain : 0,
            wind: weather.wind.speed
          })
        }
        else {
          this.saveWeather();
        }
      }
    }
  }

  async saveWeather(){
    const geolocation = await getGeolocation()
    const weather = await getWeather(geolocation)
    this.setState({
      weather: weather,
      temperature: weather.main.temp,
      icon: String(weather.weather[0].icon),
      humidity: weather.main.humidity,
      pressure: weather.main.pressure,
      rain: weather.rain ? weather.rain.rain : 0,
      wind: weather.wind.speed
    })
    localStorage.setItem('weather', JSON.stringify(this.state));
    localStorage.setItem('weather_time', new Date());
  }

  getWeatherForecast() {
    if(!localStorage.getItem('forecast_time')){
      this.getForecast()
    } else {
      const now = new Date()
      const then = new Date(localStorage.getItem('forecast_time'))
      const diff = Math.round((now.getTime() - then.getTime()) / (1000 * 60 * 60))
      if(diff > 6) {
        this.getForecast()
      }
    }
  }

  async getForecast() {
    const geolocation = await getGeolocation()
    const forecast = await getForecast(geolocation)
    const url = 'api/forecast';
    axios.post(url, {
      weather_forecast: forecast
    })
    .then((res) => {
      // console.log(res);
    })
    .catch((err) => console.log(err));
    localStorage.setItem('forecast_time', new Date())
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
