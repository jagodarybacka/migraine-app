import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {languageText, setLanguage} from '../languages/MultiLanguage.js';
import pl from '../assets/lang/plIcon.png';
import eng from '../assets/lang/engIcon.png';

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

export const Language = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 2vw 0 2vw;

  .language__button {
    margin: 0 0.5em;
    outline: none;
    border: none;
    padding: 0;
  }
`

class Welcome extends Component {
  constructor(props) {
    super(props);

    if (window.localStorage.getItem('isLogged') === 'true') {
      props.history.push('/home');
    }
  }

  setNewLanguage(lang) {
    setLanguage(lang);
    window.location.reload();
  }

  render() {
    return (
      <div>
      <Language>
            <img className="language__button" src={pl} alt={languageText.web.plAlt} onClick={() => this.setNewLanguage('pl')} />
            <img className="language__button" src={eng} alt={languageText.web.engAlt} onClick={() => this.setNewLanguage('eng')} />
      </Language>
      <Link to="/join">
        <div className="Welcome">
          <Logo notlink></Logo>
          <Text>{languageText.welcome.migraine}</Text>
          <MiniText>{languageText.welcome.tapToStart}</MiniText>
        </div>
      </Link>
      </div>
    );
  }

}

export default Welcome;
