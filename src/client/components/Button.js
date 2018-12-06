import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const ButtonComp = styled.button`
  min-width: ${props => props.small ? '' : '150px'};
  margin:  ${props => props.small ? '5px' : '10px 0'};
  padding: ${props => props.small ? '5px 10px' : '20px 25px'};
  cursor: pointer;
  text-transform: uppercase;

  outline: none;
  color: white;
  border: none;
  border-radius: 7px;
  background-color: ${props => props.primary ?
    '#006fd2' : '#67AEED'};

  font-family: 'Roboto', sans-serif;
  font-size: ${props => props.small ? '1em' : '1.2em'};
  font-weight: 700;

  &:hover {
    background: #276aa6;
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
    >
      {props.text}
      {props.img && imgContent}
    </ButtonComp>
  )
}

Button.propTypes = {
  text: PropTypes.string
}

export default Button
