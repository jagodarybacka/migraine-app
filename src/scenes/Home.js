import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import Header from '../components/Header';
import Button from '../components/Button'


const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Link to="/add">
        <Button text="Add headache" />
      </Link>
    </div>
  );
}


export default Home;
