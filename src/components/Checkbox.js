import React, {Component} from 'react';
import styled from 'styled-components';

const Check = styled.label`
  color: white;
  display: flex;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 0.5rem;
  position: relative;

  p {
    font-weight: 400;
    text-transform: none !important;
    font-size: 1.2rem;
    color: ${props => props.color};
  }

  img {
    width: 24px;
    height: 24px;
  }

  input {
    display: none;
  }

  input:checked ~ div{
    background-color: ${props => props.color};
    border: none;
  }
  input:checked ~ p{
    color: white;
  }

  input:checked ~ img {

  }
`

const FauxBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  border: 2px solid ${props => props.color};
  z-index: -1;
`

const Checkbox = (props) => {
  let color = props.color;

  return (
    <Check class="Check" color={color}>
      <input
        name={props.name}
        type="checkbox"
        value={props.value}
        onChange={props.onChange}
      />
      <FauxBg class="bg" color={color}/>
      <img src={props.imgColor} />
      <p>{props.text}</p>
    </Check>
  )
}


export default Checkbox;
