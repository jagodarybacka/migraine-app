import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const ButtonComp = styled.button`
  min-width: 150px;
  margin: 10px 0;
  padding: 20px 25px;

  text-transform: uppercase;

  color: white;
  border: none;
  border-radius: 7px;
  background-color: ${props => props.primary ?
    '#006fd2' : '#67AEED'};

  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;

  &:hover {
    background: #276aa6;
  }
`

const Button = (props) => {
  return (
    <ButtonComp
      primary={props.primary}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </ButtonComp>
  )
}

Button.propTypes = {
  text: PropTypes.string
}

export default Button
