import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Logo from '../components/Logo'
import Button from '../components/Button'

const Join = (props) => {
  const logoMargin = '10% 0';
  return (
    <div>
      <Logo size='80px' margin='5% 0'/>
      <Button primary text='Log In' />
      <p>or</p>
      <Button text='Sign Up' />
    </div>
  )
}

export default Join
