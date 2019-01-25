import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import axios from 'axios';
import { withTheme } from "@callstack/react-theme-provider";
import { generatePdf } from '../utils/pdfGeneration';

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button'
import Divider from '../components/Divider';
import HistoryWidget from './history/HistoryWidget'
import WeatherWidget from './weather/WeatherWidget'
import {languageText} from '../languages/MultiLanguage.js';
import {setTheme, getAutomaticThemeStatus,checkIfCurrentMigraine} from '../themes/ThemeHandler.js';

const HomeComponent = styled.div`
  height: auto;
  justify-content: center;
  display: block;
  padding: 5.5rem 0 6em 0;
  margin: 0;
  text-align: center;
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};
  .home__greeting {
    text-transform: uppercase;
    letter-spacing: 2px;
    opacity: 0.5;
    width: 100%;
    font-size: 1.2em;
  }
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

        if(getAutomaticThemeStatus() == true){
          if (checkIfCurrentMigraine(data))
            setTheme("DarkTheme");
          else
            setTheme("LightTheme");
        }

        this.setState({ recentMigraine: data });
      })
      .catch((err) => {
        console.log(err)
      });
  }

  getPdf() {
    axios.get("/api/pdf")
    .then((res) => {
        generatePdf(res.data);
    })
    .catch((err) => console.log(err))
  }

  render() {
    const { recentMigraine } = this.state;
    const userName = localStorage.userName;
    const greeting = userName ? (
      <h2 className="home__greeting">{languageText.home.hi} {userName}, {languageText.home.howru}</h2>
    ) : ""

    return (
      <HomeComponent theme={this.props.theme} className="Home">
        <Header />
        { greeting }
        <Link to="/add">
          <Button text={languageText.home.add} />
        </Link>
        <HistoryWidget item={recentMigraine} />

        <Divider text={languageText.weather.forecast}/>
        <WeatherWidget />

        <Divider text={languageText.settings.exportData}/>
        <Button onClick={this.getPdf} text={languageText.settings.generatePdf}/>

        <Menubar />
      </HomeComponent>
    );
  }
}

export default withTheme(Home);
