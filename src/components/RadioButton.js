import React, {Component} from 'react';
import styled from 'styled-components';


const RadioComponent = styled.div`
  color: ${props => props.color};
  display: flex;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  padding-left: 0;
  border-radius: 10px;
  margin: 0.5rem;
  position: relative;

  label {
    font-weight: 400;
    text-transform: none !important;
    font-size: 1.2rem;
    color: ${props => props.color};
    margin: 10px;
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }
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

const Radio = styled.input`
  appearance: none;
  display: none;
  &:checked ~ div {
    background-color: ${props => props.color};
    border: none;
  }
  &:checked ~ label {
    color: white
  }
`

const RadioButton = (props) => {
  let color = props.color || '#9E9E9E';
  return (
    <RadioComponent small={props.small} color={color}>
    <Radio
      type="radio"
      small={props.small}
      id={props.id}
      name={props.name}
      value={props.value}
      onChange={props.onChange}
      color={color}
    />
    <FauxBg class="bg" color={color}/>
    <label htmlFor={props.id}>
      <img src={props.imgColor} />
      {props.text}
    </label>
    </RadioComponent>
  )
}


export default RadioButton;
