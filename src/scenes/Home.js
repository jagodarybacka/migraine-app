import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button'
import HistoryWidget from './history/HistoryWidget'
import WeatherWidget from './weather/WeatherWidget'

const HomeComponent = styled.div`
  justify-content: center;
  display: block;
  padding: 7rem 0;
  margin: 0;
  text-align: center;
`

const Home = () => {
  return (
    <HomeComponent className="Home">
      <Header />
      <Link to="/add">
        <Button text="Add headache" />
      </Link>
      <HistoryWidget />
      <WeatherWidget />
      <Menubar />
    </HomeComponent>
  );
}


export default Home;
