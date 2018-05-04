import React, {Component} from 'react';
import styled from 'styled-components';

import Header from '../components/Header';
import Button from '../components/Button'


const Home = () => {
  return (
    <div className="Home">
      <Header />
      <Button text="Add headache" />

    </div>
  );
}


export default Home;
