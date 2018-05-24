import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button'
import HistoryWidget from './history/HistoryWidget'

const HomeComponent = styled.div`
  margin-top: 6rem;
  justify-content: normal;
`

const Home = () => {
  return (
    <HomeComponent className="Home">
      <Header />
      <Link to="/add">
        <Button text="Add headache" />
      </Link>
      <HistoryWidget />
      <Menubar />
    </HomeComponent>
  );
}


export default Home;
