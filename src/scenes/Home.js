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
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/reports')
      .then(({ data }) => {
        this.setState({ recentMigraine: data.reverse()[0] });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { recentMigraine } = this.state;

    return (
      <HomeComponent className="Home">
        <Header />
        <Link to="/add">
          <Button text="Add headache" />
        </Link>
        <HistoryWidget item={recentMigraine} />
        <WeatherWidget />
        <Menubar />
      </HomeComponent>
    );
  }
}

export default Home;
