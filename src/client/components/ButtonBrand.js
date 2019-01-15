import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


import fb from '../svg/facebook.svg'
import google from '../svg/google.svg'

const Brand = styled.button`
  border: none;
  border-radius: 10px;
  margin: 0 10px;
  background-color: ${props => props.brand == 'fb' ? '#4759B2' : '#D84B37'};
  width: 50px;
  height: 50px;
  outline: none;
`
const Img = styled.img`
  width: 90%;
`

const ButtonBrand = (props) => {
  return (
    <Brand brand={props.brand} onClick={props.onClick}>
      <Img src={props.brand == 'fb' ? fb : google} />
    </Brand>
  )
}

export default ButtonBrand
