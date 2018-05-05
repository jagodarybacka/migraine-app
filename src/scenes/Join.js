import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from "react-router-dom";


import Logo from '../components/Logo'
import Button from '../components/Button'
import ButtonBrand from '../components/ButtonBrand'

const Join = (props) => {
  const logoMargin = '10% 0';
  return (
    <div>
      <h1 style={{textTransform: 'uppercase'}}>Migraine</h1>
      <Logo size='80px' margin='5% 0'/>
      <Link to="/login">
        <Button primary text='Log In' />
      </Link>
      <Link to="/register">
        <Button text='Sign Up' />
      </Link>
      <p>or join with</p>
      <div>
        <ButtonBrand brand="google" />
        <ButtonBrand brand="fb" />
      </div>
    </div>
  )
}

export default Join
