import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import axios from 'axios';

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button'
import HistoryWidget from './history/HistoryWidget'
import WeatherWidget from './weather/WeatherWidget'
import Join from './Join'
import {languageText} from '../languages/MultiLanguage.js';
import { getGeolocation } from '../utils/GetGeolocation'
import { getForecast } from './Weather'

const HomeComponent = styled.div`
  justify-content: center;
  display: block;
  padding: 7rem 0;
  margin: 0;
  text-align: center;
`

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recentMigraine: null,
    }

    this.getWeatherForecast = this.getWeatherForecast.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.getWeatherForecast();
    axios.get('/api/recent')
      .then(({ data }) => {
        this.setState({ recentMigraine: data });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  getWeatherForecast() {
    if(!localStorage.getItem('forecast_time')){
      this.getForecast()
    } else {
      const now = new Date()
      const then = new Date(localStorage.getItem('forecast_time'))
      const diff = Math.round((now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24))
      if(diff > 1) {
        this.getForecast()
      }
    }
  }

  async getForecast() {
    const geolocation = await getGeolocation()
    const forecast = await getForecast(geolocation)
    console.log(forecast.list.length)
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
    const { recentMigraine } = this.state;

    return (
      <HomeComponent className="Home">
        <Header />
        <Link to="/add">
          <Button text={languageText.home.add} />
        </Link>
        <HistoryWidget item={recentMigraine} />
        <WeatherWidget />
        <Menubar />
      </HomeComponent>
    );
  }
}

export default Home;
