import React, {Component} from 'react';
import styled from 'styled-components';

import Button from '../../components/Button'
import DateTime from '../../components/DateTime'
import {languageText} from '../../languages/MultiLanguage.js';

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
const DateInputs = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 150px;
  height: 150px;
`

const Date = (props) => { 
  return (
    <Time className="Date">
      <h2>{props.end ? languageText.date.painEnded : languageText.date.painStarted}</h2>
      <DateInputs>
        <DateTime
          valueDate={props.valueDate}
          valueTime={props.valueTime}
          onChange={props.onChange}
          name={props.name}
          id={'time' + props.id + props.end}
          time
        />
        <DateTime
          valueDate={props.valueDate}
          valueTime={props.valueTime}
          onChange={props.onChange}
          name={props.name}
          id={'date' + props.id + props.end}
          date
        />
      </DateInputs>
      <Buttons>
        <Button text={languageText.date.now} onClick={e=>{e.preventDefault(); props.onNowButtonClick(props.name);}}  />
        <Button text="-1h" primary onClick={e=>{e.preventDefault(); props.onSubtractHourClick(props.name);  }}  />
      </Buttons>
      {
        props.end ? <Button text={languageText.date.notYet} primary  onClick={e=>{e.preventDefault(); props.onNotYetClick(props.name);  }}/> : ""
      }
    </Time>
  );
}

export default Date;
