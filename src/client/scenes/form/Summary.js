import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/Header';
import Divider from '../../components/Divider';
import Bubble from '../../components/Bubble';
import RecordCard from '../../components/RecordCard'


import date from '../../assets/date.png'
import time from '../../assets/time.png'
import faceNeutral from '../../assets/face-neutral.png'
import faceSmile from '../../assets/face-smile.png'
import drop from '../../assets/drop.png'
import eye from '../../assets/eye.png'
import localization from '../../assets/localization.png'
import medicine from '../../assets/medicine.png'
import questionmark from '../../assets/questionmark.png'
import accept from '../../assets/accept.png'
import {languageText} from '../../languages/MultiLanguage.js';

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
  textarea{
    width: 250px;
    height: 150px;
    box-sizing: border-box;
    border-radius: 10px;
    outline: none;
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
  outline: none; 
  
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

    this.state = {notes: props.location.state.data.notes || ''};
    this.submit = this.submit.bind(this);
    this.handleChangeNotes = this.handleChangeNotes.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const { state } = this.props.location;

    if (!state || !state.data || !Object.keys(state.data).length) {
      this.props.history.push('/add');

    }
  }

  handleChangeNotes(event){
    this.setState({notes: event.target.value});
  }

  submit() {
    let { data, id } = this.props.location.state;
    data = { ...data, notes: this.state.notes } 

    const { match } = this.props
    let method = 'POST'
    let url = "/api/reports/";
    if (match.params.edit) {
      method = 'PUT'
      url += `${id}/`
    }
    return axios({ method, data, url })
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.log(err))
  }

  getTranslatedValue(toTranslate, type){
    if(toTranslate == '')
      return '';
    let translationDict = languageText.addForm[type+"Answers"];
    let foundPair = translationDict.find(f => f.value == toTranslate);
    if(foundPair != undefined)
      return foundPair.text;
    else
      return "";
  }

  render() {
    const { state } = this.props.location;
    let preview = false;
    if(state.preview){
      preview = true;
    }
    
    let result = (
      <div>Loading...</div>
    );

    if (state && state.data) {
      const { data } = state;

      result = (
        <SummaryComponent>
          <Header />
          <h2>{languageText.addForm.summary}</h2>

          <Divider text={languageText.addForm.start} />
          <TimeDate date={data.start_date.substr(0,10)} time={data.start_time} />

          <Divider text={languageText.addForm.end} />
          {!!data.end_date && !!data.end_time ? (
            <TimeDate date={data.end_date.substr(0,10)} time={data.end_time} />            
          ) : (
            <TimeDateComponent>{languageText.addForm.notYet}</TimeDateComponent>
          )}
          <Divider text={languageText.addForm.pressure} />
          <Bubble text={data.pressure +" mmHG"} color='#cddc39' />

          <Divider text={languageText.addForm.sleepDuration} />
          <Bubble text={data.sleep_duration +"h"} color='#cddc39' />

          <Divider text={languageText.addForm.pain} />
          <Bubble text={this.getTranslatedValue(data.pain,"pain")} img={faceNeutral} color='#ED8836' />
          
          <Divider text={languageText.addForm.menstruation} />
          <Bubble text={this.getTranslatedValue(data.menstruation,"menstruation")} img={drop} color='#E91E63' />

          <Divider text={languageText.addForm.mood} />
          <Bubble text={this.getTranslatedValue(data.mood,"mood")} img={faceSmile} color='#ffc107' />

          <Divider text={languageText.addForm.localization} />
          <Bubble text={this.getTranslatedValue(data.localization,"localization")} img={localization} color='#cddc39' />

          <Divider text={languageText.addForm.medicines} />
          {data.medicines.map(name => (
            <Bubble key={name} text={this.getTranslatedValue(name,"medicines")} img={medicine} color='#00bcd4' />
          ))}

          <Divider text={languageText.addForm.triggers} />
          {data.triggers.map(name => (
            <Bubble key={name} text={this.getTranslatedValue(name,"triggers")} img={questionmark} color='#607d8b' />
          ))}

          <Divider text={languageText.addForm.aura} />
          {data.aura.map(name => (
            <Bubble key={name} text={this.getTranslatedValue(name,"aura")} img={eye} color='#67252e' />
          ))}
          
          <Divider text={languageText.addForm.notes} />
          <textarea key={"notes"} readOnly={preview} value={this.state.notes} onChange={this.handleChangeNotes} type="text"  placeholder={languageText.addForm.notesPlaceholder} />

          { !preview && [
          <Divider text={languageText.addForm.acceptRaport} />,
          <AcceptButton key="accept_button" onClick={this.submit} />
          ]}
        </SummaryComponent>
      );
    }

    return result;
  }
}

export default withRouter(Summary);