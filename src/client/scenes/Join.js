import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from "react-router-dom";
import {languageText} from '../languages/MultiLanguage.js';

import Logo from '../components/Logo'
import Button from '../components/Button'
import ButtonBrand from '../components/ButtonBrand'

const Join = (props) => {
  if (window.localStorage.getItem('isLogged') === 'true') {
    props.history.push('/home');
  }
  
  const logoMargin = '10% 0';
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
      <p>{languageText.join.orJoinWith}</p>
      <div>
        <ButtonBrand brand="google" />
        <ButtonBrand brand="fb" />
      </div>
    </div>
  )
}

export default Join
