import React, {Component} from 'react';
import styled from 'styled-components';


const ClockInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #4c5062;
  font-size: 3.2rem;
  width: 80%; // 100% for type="time"
  display: block;
  text-align: center;
`

const Clock = () => {
  return (
      <ClockInput /*type="time"*/ placeholder="12:00"/>
  );
}


export default Clock;
