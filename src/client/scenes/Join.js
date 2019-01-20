import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {languageText} from '../languages/MultiLanguage.js';

import Logo from '../components/Logo'
import Button from '../components/Button'

class Join extends Component {
  constructor(props) {
    super(props);

    if (window.localStorage.getItem('isLogged') === 'true') {
      props.history.push('/home');
    }

    this.loginFacebook = this.loginFacebook.bind(this);
  }

  loginFacebook() {
    console.log('facebook');
  }

  render() {
    return (
      <div>
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
