import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { withTheme } from "@callstack/react-theme-provider";

const ButtonComp = styled.button`
  min-width: ${props => props.small ? '' : '150px'};
  margin:  ${props => props.small ? '5px' : '10px 0'};
  padding: ${props => props.small ? '5px 10px' : '20px 25px'};
  cursor: pointer;
  text-transform: uppercase;

  outline: none;
  color: ${props => props.theme.buttonFontColor}
  border: none;
  border-radius: 7px;
  background-color: ${props => props.disabled ?
    '#ddc' : (
      props.primary ?
      props.theme.buttonColor : props.theme.buttonColorSecondary
    )};
  font-family: 'Roboto', sans-serif;
  font-size: ${props => props.small ? '1em' : '1.2em'};
  font-weight: 700;
  pointer-events: ${props => props.disabled ? 'none' : 'all'}

  &:hover {
    background: ${props => props.theme.buttonColorHover}
  }
`
const Img = styled.img`
  width: 25px;
  heigth: auto;
`

const Button = (props) => {
  const imgContent = props.img && <Img src={props.img}/>
  return (
    <ButtonComp
      primary={props.primary}
      onClick={props.onClick}
      disabled={props.disabled}
      small={props.small}
      theme={props.theme}
    >
      {props.text}
      {props.img && imgContent}
    </ButtonComp>
  )
}

Button.propTypes = {
  text: PropTypes.string
}

export default withTheme(Button)
