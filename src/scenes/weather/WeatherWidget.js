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
import snowIcon from "../../assets/weather/snow.png"
import stormIcon from "../../assets/weather/storm.png"
import sunnyIcon from "../../assets/weather/sunny.png"
import temperatureIcon from "../../assets/weather/temperature.png"
import windyIcon from "../../assets/weather/windy.png"
import lastDayIcon from "../../assets/weather/last-day.png"
import { getGeolocation } from '../../utils/GetGeolocation'
import { getWeather } from '../Weather'
import {Widget, Header, Element, Footer} from './WeatherWidget.styles'

class WeatherWidget extends Component {
  icons = {
    '01d' : sunnyIcon,
    '02d' : partlyCloudyIcon,
    '03d' : cloudyIcon,
    '04d' : cloudyIcon,
    '09d' : rainyIcon,
    '10d' : rainyIcon,
    '11d' : stormIcon,
    '13d' : snowIcon,
    '50d' : humidityIcon,
  }
  async componentDidMount() {
    const geolocation = await getGeolocation()
    const weather = await getWeather(geolocation)
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
  
  render() {
    if(this.state) {
      const {temperature,icon, description, humidity, pressure, rain, wind } = this.state
      return (
      <Widget >
        <Header>
          <p>Weather Forecast</p>
          <img src={this.icons[icon]} />
          <h3>{temperature}{String.fromCharCode(176)}C {description}</h3>
        </Header>
        <Element>
          <img src={rainIcon}/>
          <p>
            <span className="name">Rain</span>
            <span className="value">{rain}</span>
          </p>
        </Element>
        <Element>
          <img src={humidityIcon}/>
          <p>
            <span className="name">Humidity</span>
            <span className="value">{humidity}%</span>
          </p>
        </Element>
        <Element>
          <img src={pressureIcon}/>
          <p>
            <span className="name">Pressure</span>
            <span className="value">{pressure} hPa</span>
          </p>
        </Element>
        <Element>
          <img src={windyIcon}/>
          <p>
            <span className="name">Wind speed</span>
            <span className="value">{wind}m/s</span>
          </p>
        </Element>
        <Footer>More</Footer>
      </Widget>
      ) 
    } else return null
  }
}

export default WeatherWidget;
