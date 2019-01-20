import React, { Component } from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {languageText, setLanguage} from '../languages/MultiLanguage.js';
import pl from '../assets/lang/plIcon.png';
import eng from '../assets/lang/engIcon.png';

import Logo from '../components/Logo'
import Button from '../components/Button'

const Language = styled.div`
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
class Join extends Component {
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
        <h1 style={{textTransform: 'uppercase'}}>{languageText.join.migraine}</h1>
        <Logo size='80px' margin='5% 0'/>
        <Link to="/login">
          <Button primary text={languageText.join.logIn} />
        </Link>
        <Link to="/register">
          <Button text={languageText.join.signIn} />
        </Link>
      </div>
    )
  }
}

export default Join
