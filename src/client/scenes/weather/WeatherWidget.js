import React, {Component} from 'react';
import axios from 'axios';
import Button from '../../components/Button';
import moment from 'moment';

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
import { getWeather, getWeatherForCity, getForecast, getForecastForCity } from '../Weather'
import {Widget, Header, Element, City, Input} from './WeatherWidget.styles'
import {languageText} from '../../languages/MultiLanguage.js';

class WeatherWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city_name: localStorage.getItem('city_name') || "",
      currentWeather: undefined,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleCityChange = this.handleCityChange.bind(this);
    this.getWeatherForCity = this.getWeatherForCity.bind(this);
    this.getWeatherForLocation = this.getWeatherForLocation.bind(this);
    this.getWeatherForecast = this.getWeatherForecast.bind(this);
    this.getForecastForLocation = this.getForecastForLocation.bind(this);
    this.getForecastForCity = this.getForecastForCity.bind(this);
    this.success = this.success.bind(this);
    this.fail = this.fail.bind(this);
    this.successForecast = this.successForecast.bind(this);
    this.failForecast = this.failForecast.bind(this);
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
    this.getWeather();
  }

  checkIfGeolocation() {
    navigator.geolocation.getCurrentPosition(this.success,this.fail,{timeout:10000});
  }

  success(position) {
    this.getWeatherForLocation();
  }

  fail(error) {
    this.getWeatherForCity();
  }

  checkIfGeolocationForecast() {
    navigator.geolocation.getCurrentPosition(this.successForecast,this.failForecast,{timeout:10000});
  }

  successForecast(position) {
    this.getForecastForLocation();
  }

  failForecast(error) {
    this.getForecastForCity();
  }

  getWeather() {
    if(!localStorage.getItem('weather')  || !localStorage.getItem('weather_time')) {
      this.checkIfGeolocation()
    } 
    else {
      if(moment(localStorage.getItem('weather_time'),'ddd MMM DD YYYY HH:mm:ss').isValid()) {
        const now = new Date()
        const then = new Date(localStorage.getItem('weather_time'))
        const diff = Math.round((now.getTime() - then.getTime()) / (1000 * 60))
        if(diff > 30) {
          this.checkIfGeolocation();
        } else {
          if(JSON.parse(localStorage.getItem('weather')) != null){
            const weather = JSON.parse(localStorage.getItem('weather')).weather
            this.setState((prevState) => ({
              ...prevState.city_name,
              currentWeather: {
                weather: weather,
                temperature: weather.main.temp,
                icon: String(weather.weather[0].icon),
                description: weather.weather[0].description,
                humidity: weather.main.humidity,
                pressure: weather.main.pressure,
                rain: weather.rain ? weather.rain.rain : 0,
                wind: weather.wind.speed
            }
           }))
          }
          else {
            this.checkIfGeolocation();
          }
        }
      } else {
        this.checkIfGeolocation();
      }
    }
  }

  async getWeatherForLocation(){
    const geolocation = await getGeolocation()
    const weather = await getWeather(geolocation)
    this.setState((prevState) => ({
      ...prevState.city_name,
      currentWeather: {
        weather: weather,
        temperature: weather.main.temp,
        icon: String(weather.weather[0].icon),
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        rain: weather.rain ? weather.rain.rain : 0,
        wind: weather.wind.speed
      }
    }), () => {
      localStorage.setItem('weather', JSON.stringify(this.state.currentWeather));
      localStorage.setItem('weather_time', new Date());
    })
  }

  async getWeatherForCity() {
    const city = this.state.city_name.trim();
    if(city.length === 0){
      return;
    }
    const weather = await getWeatherForCity(city);
    this.setState((prevState) => ({
      ...prevState.city_name,
      currentWeather: {
        weather: weather,
        temperature: weather.main.temp,
        icon: String(weather.weather[0].icon),
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        rain: weather.rain ? weather.rain.rain : 0,
        wind: weather.wind.speed
      }
      }
    ), () => {
      localStorage.setItem('weather', JSON.stringify(this.state.currentWeather));
      localStorage.setItem('weather_time', new Date());
    })
  }

  getWeatherForecast() {
    if(!localStorage.getItem('forecast_time')){
      this.checkIfGeolocationForecast()
    } else {
      if(moment(localStorage.getItem('forecast_time'),'ddd MMM DD YYYY HH:mm:ss').isValid()){
        const now = new Date()
        const then = new Date(localStorage.getItem('forecast_time'))
        const diff = Math.round((now.getTime() - then.getTime()) / (1000 * 60))
        if(diff > 30) {
          this.checkIfGeolocationForecast()
        }
      } else {
        this.checkIfGeolocationForecast()
      }
    }
  }

  async getForecastForLocation() {
    const geolocation = await getGeolocation()
    const forecast = await getForecast(geolocation)
    const url = 'api/forecast';
    axios.post(url, {
      weather_forecast: forecast
    })
    .then((res) => {
      if(res.data.errors) {
        console.log(res.data.errors);
        return;
      }
      localStorage.setItem('forecast_time', new Date())
    })
    .catch((err) => console.log(err));
  }

  async getForecastForCity() {
    const city = this.state.city_name.trim();
    if(city.length === 0){
      return;
    }
    const forecast = await getForecastForCity(city);
    const url = 'api/forecast';
    axios.post(url, {
      weather_forecast: forecast
    })
    .then((res) => {
      if(res.data.errors) {
        console.log(res.data.errors);
        return;
      }
      localStorage.setItem('forecast_time', new Date())
    })
    .catch((err) => console.log(err));
  }

  async handleCityChange(e) {
    e.preventDefault();
    localStorage.setItem('city_name', this.state.city_name.trim());
    this.checkIfGeolocation();
    this.checkIfGeolocationForecast();
  }

  handleChange(evt) {
    const { value, name } = evt.target;
    this.setState((prevState) => ({
        ...prevState,
        [name]: value
      }
    ))
  }
  
  render() {
    if(this.state.currentWeather) {
      const {temperature,icon, humidity, pressure, rain, wind } = this.state.currentWeather
      return (
      <Widget >
        <Header>
          <p>{languageText.weather.forecast}</p>
          <img src={this.icons[icon]} alt="weatherIcon" />
          <h3>{temperature}{String.fromCharCode(176)}C </h3>
        </Header>
        <Element>
          <img src={rainIcon} alt="rain"/>
          <p>
            <span className="name">{languageText.weather.rain}</span>
            <span className="value">{rain}</span>
          </p>
        </Element>
        <Element>
          <img src={humidityIcon} alt="humidity"/>
          <p>
            <span className="name">{languageText.weather.humidity}</span>
            <span className="value">{humidity}%</span>
          </p>
        </Element>
        <Element>
          <img src={pressureIcon} alt="pressure"/>
          <p>
            <span className="name">{languageText.weather.pressure}</span>
            <span className="value">{pressure} hPa</span>
          </p>
        </Element>
        <Element>
          <img src={windIcon} alt="wind"/>
          <p>
            <span className="name">{languageText.weather.windSpeed}</span>
            <span className="value">{wind}m/s</span>
          </p>
        </Element>
      </Widget>
      ) 
    } else {
      const placeholder = languageText.weather.placeholder + languageText.weather.city;
      return (
        <City>
          <Header>
            <p>{languageText.weather.forecast}</p>
            <p className="text">{languageText.weather.geolocationDisabled}</p>
          </Header>
          <Input
            type="text"
            name="city_name"
            placeholder={placeholder}
            value={this.state.city_name}
            onChange={this.handleChange}/>
          <Button type="submit" onClick={this.handleCityChange} small="true" text={languageText.weather.setLocation} primary />
        </City>
      )}
  }
}

export default WeatherWidget;
