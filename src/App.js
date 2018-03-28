import React, {Component} from 'react';
import styled from 'styled-components';
import logo from './logo.svg';

const Logo = styled.img `
  width: 100px;
  height: 100px;
`;

const Text = styled.h1`
  font-weight: 900;
  text-transform: uppercase;
  display: block;
`;

const MiniText = styled.h1`
  font-weight: 300;
  font-size: 1.2rem;
  margin-top: 20%;
  display: block;
`;

const App = () => {
  return (
    <div className="App">
      <Logo src={logo}></Logo>
      <Text>Migraine</Text>
      <MiniText>Tap to start...</MiniText>
    </div>
  );
}


export default App;
