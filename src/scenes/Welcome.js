import React, {Component} from 'react';
import styled from 'styled-components';

import Logo from '../components/Logo';


const Text = styled.h1`
  font-weight: 900;
  text-transform: uppercase;
  display: block;
`;

const MiniText = styled.p`
  font-weight: 300;
  font-size: 1.2rem;
  margin-top: 20%;
  display: block;
`;

const Welcome = () => {
  return (
    <div className="Welcome">
      <Logo></Logo>
      <Text>Migraine</Text>
      <MiniText>Tap to start...</MiniText>
    </div>
  );
}


export default Welcome;
