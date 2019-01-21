import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import axios from 'axios';
import { withTheme } from "@callstack/react-theme-provider";

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button'
import HistoryWidget from './history/HistoryWidget'
import WeatherWidget from './weather/WeatherWidget'
import {languageText} from '../languages/MultiLanguage.js';
import {setTheme, getUserTheme} from '../themes/ThemeHandler.js';

const HomeComponent = styled.div`
  justify-content: center;
  display: block;
  padding: 5.5rem 0;
  margin: 0;
  text-align: center;
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};
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

        if(getUserTheme() == "LightTheme"){
          if (this.checkIfCurrentMigraine(data))
            setTheme("DarkTheme", true);
          else
            setTheme("LightTheme",true);
        }

        this.setState({ recentMigraine: data });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  checkIfCurrentMigraine(data){
    if(data && (data['end_date'] == undefined || data['end_time'] == undefined)){
      return true;
    }else{
      return false
    }
  }

  render() {
    const { recentMigraine } = this.state;

    return (
      <HomeComponent theme={this.props.theme} className="Home">
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

export default withTheme(Home);
