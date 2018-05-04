import React, {Component} from 'react';
import styled from 'styled-components';

import Button from '../../components/Button'
import Clock from '../../components/Clock'

const Time = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    font-size: 1rem;
    min-width: 40%;
    background-color: #9e9e9e;
  }
`
const Buttons = styled.div `
  display: flex;
  width: 90%;
  > button {
    font-size: 1rem;
    min-width: 40%;
    margin: 2rem 5% 1rem 5%;
  }
`

const Date = (props) => {
  return (
    <Time className="Date">
      <h2>Pain {props.end ? 'End' : 'Start'}</h2>
      <Clock />
      <Buttons>
        <Button text="Now"/>
        <Button text="-1h" primary/>
      </Buttons>
      {
        props.end ? <Button text="Not Yet" primary/> : ""
      }

    </Time>
  );
}


export default Date;
