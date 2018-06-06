import React, {Component} from 'react';
import styled from 'styled-components';

import Header from '../../components/Header';
import Divider from '../../components/Divider';
import Bubble from '../../components/Bubble';

import date from '../../assets/date.png'
import time from '../../assets/time.png'
import faceNeutral from '../../assets/face-neutral.png'
import faceSmile from '../../assets/face-smile.png'
import drop from '../../assets/drop.png'
import localization from '../../assets/localization.png'
import medicine from '../../assets/medicine.png'
import questionmark from '../../assets/questionmark.png'
import accept from '../../assets/accept.png'


const SummaryComponent = styled.section`
  display: block;
  padding: 7rem 0;
  margin: 0;
  text-align: center;
  h2 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 0 0 2rem 0;
    text-align: center;
  }
`
const TimeDateComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10%;
  padding: 10px 0;
  background-color: #fff;
  border-radius: 20px;

  img {
    width: 24px;
    height: 24px;
  }

  p {
    border-bottom: 1px solid #9e9e9e;
  }
`
const TimeDate = (props) => {
  return (
    <TimeDateComponent>
      <img src={date}/>
      <p>{props.date}</p>
      <img src={time}/>
      <p>{props.time}</p>
    </TimeDateComponent>
  )
}

const AcceptComponent = styled.button`
  background-color: #f0908b;
  border: none;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  margin: 0 0 3rem 0;
  box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.5);

  img {
    width: 28px;
    height: 28px;

  }
`

const AcceptButton = (props) => {
  return (
    <AcceptComponent>
      <img src={accept} />
    </AcceptComponent>
  )
}

const Summary = (props) => {
  return (
    <SummaryComponent>
      <Header />
      <h2>Summary</h2>

      <Divider text="Start" />
      <TimeDate date="Wed, 10 may" time="20:00" />

      <Divider text="End" />
      <TimeDate date="Wed, 11 may" time="09:00" />

      <Divider text="Intensity" />
      <Bubble text="Intense" img={faceNeutral} color='#ED8836'/>

      <Divider text="Menstruation" />
      <Bubble text="Yes" img={drop} color='#f44336'/>

      <Divider text="Mood" />
      <Bubble text="Good" img={faceSmile} color='#ffc107'/>

      <Divider text="Localization" />
      <Bubble text="Home" img={localization} color='#cddc39'/>

      <Divider text="Medicines" />
      <Bubble text="Ibuprofen" img={medicine} color='#00bcd4'/>
      <Bubble text="Paracetamol" img={medicine} color='#00bcd4'/>

      <Divider text="Triggers" />
      <Bubble text="Caffeine" img={questionmark} color='#607d8b'/>
      <Bubble text="Cheese" img={questionmark} color='#607d8b'/>
      <Bubble text="Stress" img={questionmark} color='#607d8b'/>

      <Divider text="Accept Raport?" />
      <AcceptButton />
    </SummaryComponent>
  )
}


export default Summary;
