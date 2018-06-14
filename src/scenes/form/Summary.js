import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

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
    <AcceptComponent
      onClick={props.onClick}
    >
      <img src={accept} />
    </AcceptComponent>
  )
}


class Summary extends Component {
  constructor(props) {
    super(props);

    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const { state } = this.props.location;

    if (!state || !state.data || !Object.keys(state.data).length) {
      this.props.history.push('/add');
    }
  }

  submit() {
    const { data } = this.props.location.state;

    axios.post("http://localhost:3001/api/reports", data)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.log(err));
  }

  render() {
    const { state } = this.props.location;
    let result = (
      <div>Loading...</div>
    );

    if (state && state.data) {
      const { data } = state;

      result = (
        <SummaryComponent>
          <Header />
          <h2>Summary</h2>

          <Divider text="Start" />
          <TimeDate date={data.start_date} time={data.start_time} />

          <Divider text="End" />
          {!!data.end_date && !!data.end_time ? (
            <TimeDate date={data.end_date} time={data.end_time} />            
          ) : (
            <TimeDateComponent>Not yet</TimeDateComponent>
          )}

          <Divider text="Pain Intensity" />
          <Bubble text={data.pain} img={faceNeutral} color='#ED8836' />

          <Divider text="Menstruation" />
          <Bubble text={data.menstruation} img={drop} color='#E91E63' />

          <Divider text="Mood" />
          <Bubble text={data.mood} img={faceSmile} color='#ffc107' />

          <Divider text="Localization" />
          <Bubble text={data.localization} img={localization} color='#cddc39' />

          <Divider text="Medicines" />
          {data.medicines.map(name => (
            <Bubble key={name} text={name} img={medicine} color='#00bcd4' />
          ))}

          <Divider text="Triggers" />
          {data.triggers.map(name => (
            <Bubble key={name} text={name} img={questionmark} color='#607d8b' />
          ))}

          <Divider text="Accept Raport?" />
          <AcceptButton onClick={this.submit} />
        </SummaryComponent>
      );
    }

    return result;
  }
}

export default withRouter(Summary);
