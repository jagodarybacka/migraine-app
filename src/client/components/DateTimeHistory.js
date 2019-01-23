import React from 'react';
import styled from 'styled-components';


import {languageText} from '../languages/MultiLanguage.js';

const TimeDateComponent = styled.div`
  display: inline-block;
  border: 2px solid #000;
  align-items: center;
  background-color: #FFFFFF;
  justify-content: center;
  padding: 1rem 1rem 1rem 1rem;
  border-radius: 20px;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
  margin-left: 0.5rem;
  margin: 1rem auto;
  min-width: 200px;

  input {
    border: none;
    border-bottom: 1px solid #9e9e9e;
    margin: 0 0.5rem;
    align-text: center;
    width: 150px;

  }
  label{
   color: #67AEED;
   font-size: 0.9rem;
  }

`


const  DateTimeHistory = (props) => {
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
    <TimeDateComponent>
      <label>{props.label==="From" ? languageText.dateTime.from : languageText.dateTime.to}</label>
      <input
        value={inputDate ? inputDate : undefined}
        name={`${props.name}_date`}
        type='date'
        id={props.id}
        onChange={props.onChange}
      />
    </TimeDateComponent>
  ) : (
    <TimeDateComponent>
      <label>{languageText.dateTime.time}</label>
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


export default DateTimeHistory;
