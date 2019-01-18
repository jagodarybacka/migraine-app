import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import axios from 'axios';

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button'
import HistoryWidget from './history/HistoryWidget'
import WeatherWidget from './weather/WeatherWidget'
import {languageText} from '../languages/MultiLanguage.js';

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
    window.scrollTo(0, 0)
    axios.get('/api/recent')
      .then(({ data }) => {
        this.setState({ recentMigraine: data });
      })
      .catch((err) => {
        console.log(err)
      });

    const option = {option: "localization", value: "Holiday"};
    axios.post('/api/users/answer',option)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err)
    });
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
