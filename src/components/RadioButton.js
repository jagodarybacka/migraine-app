import React, {Component} from 'react';
import styled from 'styled-components';


const RadioComponent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: ${props => props.small ? '0.7rem' : '1rem' };
  label {
    font-size: ${props => props.small ? '1.2rem' : '1.8rem' };
    padding-left: ${props => props.small ? '0.5rem' : '1rem' };
    opacity: 0.7;
  }
`
const Radio = styled.input`
  appearance: none;
  border-radius: 50%;
  width: ${props => props.small ? '1rem' : '1.4rem' };
  height: ${props => props.small ? '1rem' : '1.4rem' };;
  border: 3px solid #999;
  margin: 0.3rem;
  transition: 0.2s border ease-in;

  &:hover,
  &:focus,
  &:active {
    border: 8px solid #999;
  }
`

const RadioButton = (props) => {
  return (
    <RadioComponent
      small={props.small}>
    <Radio  type="radio"
            small={props.small}
            id={props.name}
            name={props.name}
            value={props.value}/>
    <label htmlFor={props.name}>{props.text}</label>
    </RadioComponent>
  )
}


export default RadioButton;
