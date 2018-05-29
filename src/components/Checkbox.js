import React, {Component} from 'react';
import styled from 'styled-components';

const Check = styled.label`
  display: flex;
  align-items: center;
  font-size: ${props => props.small ? '1.2rem' : '1.8rem' };
  padding-left: ${props => props.small ? '0.5rem' : '1rem' };
  opacity: 0.7;
  margin-bottom: 0.3rem;

  input {
    opacity: 0;
  }
  input:checked ~ .Box {
    border: 8px solid #999;
  }
`
const Box = styled.span`
    width: ${props => props.small ? '1rem' : '1.4rem' };
    height: ${props => props.small ? '1rem' : '1.4rem' };;
    border: 3px solid #999;
    display: inline-block;
    box-sizing: border-box;
    margin-right: 1rem;
`
const Checkbox = (props) => {
  return (
    <Check small={props.small}>
      <input
        name={props.name}
        type="checkbox"
        value={props.value}
        onChange={props.onChange}
      />
      <Box className="Box"></Box>
      {props.text}
    </Check>
  )
}


export default Checkbox;
