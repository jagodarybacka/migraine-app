import React from 'react';
import styled from 'styled-components';
import { withTheme } from "@callstack/react-theme-provider";

import dateImg from '../assets/date.png'
import timeImg from '../assets/time.png'

import {languageText} from '../languages/MultiLanguage.js';

const TimeDateComponent = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  margin: 1rem 10%;
  padding: 2.5rem 1rem 1.5rem 1rem;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);

  background-color:${props => props.theme.backgroundColor}
  color:${props => props.theme.fontColor}

  img {
    width: 24px;
    height: 24px;
  }

  input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #9e9e9e;
    margin: 0 0.5rem;
    align-text: center;
    color:${props => props.theme.fontColor}
  }

  label {
    position: absolute;
    top: 0.5rem;
//    left: 45px;
    font-size: 0.8rem;
    text-transform: uppercase;
  }
`

const  DateTimeCustomPeriod = (props) => {
  const monthNames = languageText.dateTime.monthNames;
  const time = `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}
                :
                ${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`;
  const date = `${new Date().getDate()} ${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`;

  let inputDate = ''
  let inputTime = ''
  if (props.valueTime && typeof props.valueTime === 'string' ){
    inputTime = props.valueTime;
  }
  if (props.valueDate && typeof props.valueDate === 'string' ){
    inputDate = props.valueDate.substr(0,10)
  }


  const el = props.date ? (
    <TimeDateComponent theme={props.theme}>
      <label>{props.label==="From" ? languageText.dateTime.from : languageText.dateTime.to}</label>
      <img src={dateImg} alt="date"/>
      <input
        value={inputDate ? inputDate : undefined}
        name={`${props.name}_date`}
        type='date'
        id={props.id}
        onChange={props.onChange}
      />
    </TimeDateComponent>
  ) : (
    <TimeDateComponent theme={props.theme}>
      <label>{languageText.dateTime.time}</label>
      <img src={timeImg} alt="time"/>
      <input
        value={inputTime}
        name={`${props.name}_time`}
        type="time"
        id={props.id}
        onChange={props.onChange}
      />
    </TimeDateComponent>
  );

  return el;
}


export default withTheme(DateTimeCustomPeriod);
