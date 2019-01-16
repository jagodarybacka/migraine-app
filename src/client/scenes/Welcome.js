import React from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {languageText} from '../languages/MultiLanguage.js';

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

const Welcome = props => {
  if (window.localStorage.getItem('isLogged') === 'true') {
    props.history.push('/home');
  }

  return (
    <Link to="/join">
      <div className="Welcome">
        <Logo notlink></Logo>
        <Text>{languageText.welcome.migraine}</Text>
        <MiniText>{languageText.welcome.tapToStart}</MiniText>
      </div>
    </Link>
  );
}


export default Welcome;
