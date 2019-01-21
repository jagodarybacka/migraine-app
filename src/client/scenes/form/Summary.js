import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { withTheme } from "@callstack/react-theme-provider";

import Header from '../../components/Header';
import Divider from '../../components/Divider';
import Bubble from '../../components/Bubble';
import Question from '../../components/Question'
import QuestionAnswered from '../../components/QuestionAnswered'

import date from '../../assets/date.png'
import time from '../../assets/time.png'
import faceNeutral from '../../assets/face-neutral.png'
import faceSmile from '../../assets/face-smile.png'
import drop from '../../assets/drop.png'
import eye from '../../assets/eye.png'
import localizationIcon from '../../assets/localization.png'
import medicinePill from '../../assets/medicine.png'
import questionmark from '../../assets/questionmark.png'
import accept from '../../assets/accept.png'
import {languageText} from '../../languages/MultiLanguage.js';

const SummaryComponent = styled.section`
  display: block;
  padding: 7rem 0;
  margin: 0;
  text-align: center;
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};
  height:100%;
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
    margin-bottom: 1em;
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
  color: ${props=>props.theme.fontColor};
  background-color: ${props=>props.theme.iconBackgroundColor};

  img {
    width: 24px;
    height: 24px;
  }

  p {
    border-bottom: 1px solid #9e9e9e;
  }
`
const TimeDate = withTheme((props) => {
  return (
    <TimeDateComponent theme={props.theme}>
      <img alt='date' src={date}/>
      <p>{props.date}</p>
      <img alt='time' src={time}/>
      <p>{props.time}</p>
    </TimeDateComponent>
  )
})

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
      <img src={accept} alt='accept'/>
    </AcceptComponent>
  )
}


class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: props.location.state.data.notes || '',
      reliefsEffects: [],
      medicineEffects: []
    };
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

  handleMedicineEffectChange(name, value) {
    let newEffect = { name, value };
    let medicineEffects = this.state.medicineEffects;
    let idx = medicineEffects.findIndex(r => r.name === name);
    idx > -1 ? medicineEffects[idx] = newEffect : medicineEffects.push(newEffect);
    this.setState({ medicineEffects });
  }

  handleReliefsEffectChange(name, value) {
    let newEffect = { name, value };
    let reliefsEffects = this.state.reliefsEffects;
    let idx = reliefsEffects.findIndex(r => r.name === name);
    idx > -1 ? reliefsEffects[idx] = newEffect : reliefsEffects.push(newEffect);
    this.setState({ reliefsEffects });
  }

  updateDataWithEffects(data) {
    let reliefsEffects = this.state.reliefsEffects;
    let reliefs = data["reliefs"];

    if(reliefs !== undefined){
      reliefs = reliefs.map(r => {
        let idx = reliefsEffects.findIndex(e => e.name === r);
        if (idx > -1) {
          return reliefsEffects[idx];
        } else {
          let previousValue = data.reliefsBeforeEdit == undefined ? undefined : data.reliefsBeforeEdit.find(e => e.name === r);
          if (previousValue === undefined)
            return { "name": r, "value": false };
          else
            return { "name": r, "value": previousValue.value };
        }
      });
      data["reliefs"] = reliefs;
    }

    let medicineEffects = this.state.medicineEffects;
    let medicines = data["medicines"];
    if(medicines !== undefined){
      medicines = medicines.map(r => {
        let idx = medicineEffects.findIndex(e => e.name === r);
        if (idx > -1) {
          return medicineEffects[idx];
        } else {
          let previousValue = data.medicinesBeforeEdit == undefined ? undefined : data.medicinesBeforeEdit.find(e => e.name === r);
          if (previousValue === undefined)
            return { "name": r, "value": 0 };
          else
            return { "name": r, "value": previousValue.value };
        }
      });
    data["medicines"] = medicines;
    }

    return data;
  }

  submit() {
    let { data, id } = this.props.location.state;
    data = { ...data, notes: this.state.notes }
    data = this.updateDataWithEffects(data);

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
    if (toTranslate == '')
      return '';

    if (toTranslate.name != undefined) {
      toTranslate = toTranslate.name;
    }

    let translationDict = languageText.addForm[type + 'Answers'];
    let foundPair = translationDict.find(f => f.value == toTranslate);
    if (foundPair != undefined)
      return foundPair.text;
    else
      return '';
  }

  getUserFormField(field) {
    return localStorage.getItem(`form-${field}`) === 'true' || localStorage.getItem(`form-${field}`) === null;
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
      const undefined_bubble = <Bubble text={languageText.addForm.notYet} color='#9e9e9e' />

      const start_date = data.start_date && data.start_time ? (
        <TimeDate date={data.start_date.substr(0,10)} time={data.start_time} />
      ) : (
        <TimeDateComponent>{languageText.addForm.notYet}</TimeDateComponent>
      );

      const end_date =  data.end_date && data.end_time  ? (
        <TimeDate date={data.end_date.substr(0,10)} time={data.end_time} />
      ) : (
        <TimeDateComponent>{languageText.addForm.notYet}</TimeDateComponent>
      );

      const pressure = data.pressure ? (
        <Bubble text={data.pressure +" mmHG"} color='#cddc39' />
      ) : undefined_bubble;

      const sleep_duration = data.sleep_duration ? (
        <Bubble text={data.sleep_duration +"h"} color='#cddc39' />
      ) : undefined_bubble;

      const pain = data.pain ? (
        <Bubble text={this.getTranslatedValue(data.pain,"pain")} img={faceNeutral} color='#ED8836' />
      ) : undefined_bubble;

      const menstruation = data.menstruation ? (
        <Bubble text={this.getTranslatedValue(data.menstruation,"menstruation")} img={drop} color='#E91E63' />
      ) : undefined_bubble;

      const mood = data.mood ? (
        <Bubble text={this.getTranslatedValue(data.mood,"mood")} img={faceSmile} color='#ffc107' />
      ) : undefined_bubble;

      const localization = data.localization ? (
        <Bubble text={this.getTranslatedValue(data.localization,"localization")} img={localizationIcon} color='#cddc39' />
      ) : undefined_bubble;

      const medicines = data.medicines && data.medicines.length ?
          data.medicines.map(medicine => (
            <div>
              <Bubble key={medicine} text={this.getTranslatedValue(medicine, "medicines")} img={medicinePill} color='#00bcd4' />
              {!preview && <Question
                previousValues={data.medicinesBeforeEdit}
                key={medicine + '_q'}
                name={medicine.name != undefined ? medicine.name : medicine}
                value={medicine.value != undefined ? medicine.value : null}
                displayName={this.getTranslatedValue(medicine, "medicines")}
                numericInput={true}
                changeHandler={this.handleMedicineEffectChange.bind(this)}
                placeholder={"[h]"} />}
              {preview &&
                <QuestionAnswered
                  name={this.getTranslatedValue(medicine, "medicines")}
                  isNumeric={true}
                  answer={medicine.value != undefined ? medicine.value : 0} />
              }
            </div>
          ))
       : undefined_bubble;

      const triggers = data.triggers && data.triggers.length ?
        data.triggers.map(name => (
          <Bubble key={name} text={this.getTranslatedValue(name,"triggers")} img={questionmark} color='#607d8b' />
        ))
       : undefined_bubble;

      const aura = data.aura && data.aura.length ?
        data.aura.map(name => (
          <Bubble key={name} text={this.getTranslatedValue(name,"aura")} img={eye} color='#67252e' />
        ))
       : undefined_bubble;

       const reliefs = data.reliefs && data.reliefs.length ?
       data.reliefs.map(relief => (
         <div>
           <Bubble key={relief} text={this.getTranslatedValue(relief, "reliefs")} img={questionmark} color='#4169E1' />
           {!preview &&
             <Question
               previousValues={data.reliefsBeforeEdit}
               key={relief + '_q'}
               name={relief}
               displayName={this.getTranslatedValue(relief, "reliefs")}
               numericInput={false}
               changeHandler={this.handleReliefsEffectChange.bind(this)} />
           }
           {preview &&
             <QuestionAnswered
               name={this.getTranslatedValue(relief, "reliefs")}
               isNumeric={false}
               answer={relief.value != undefined ? relief.value : false} />
           }
         </div>
       ))
        : undefined_bubble;

      result = (
        <SummaryComponent theme={this.props.theme}>
          <Header />
          <h2>{languageText.addForm.summary}</h2>

          <Divider text={languageText.addForm.start} />
          { start_date }
          <Divider text={languageText.addForm.end} />
          { end_date }
          <Divider text={languageText.addForm.pain} />
          { pain }
          { this.getUserFormField('medicines') && (<Divider text={languageText.addForm.medicines} />) }
          { this.getUserFormField('medicines') && medicines }

          { this.getUserFormField('aura') && (<Divider text={languageText.addForm.aura} />) }
          { this.getUserFormField('aura') && aura }

          { this.getUserFormField('triggers') && (<Divider text={languageText.addForm.triggers} />) }
          { this.getUserFormField('triggers') && triggers }

          { this.getUserFormField('reliefs') && (<Divider text={languageText.addForm.reliefs} />) }
          { this.getUserFormField('reliefs') && reliefs }

          { this.getUserFormField('mood') && (<Divider text={languageText.addForm.mood} />) }
          { this.getUserFormField('mood') && mood }

          { this.getUserFormField('pressure') && (<Divider text={languageText.addForm.pressure.title} />) }
          { this.getUserFormField('pressure') && pressure }

          { this.getUserFormField('sleep_duration') && (<Divider text={languageText.addForm.sleepDuration.title} />) }
          { this.getUserFormField('sleep_duration') && sleep_duration }

          { this.getUserFormField('menstruation') && (<Divider text={languageText.addForm.menstruation} />) }
          { this.getUserFormField('menstruation') && menstruation }

          { this.getUserFormField('localization') && (<Divider text={languageText.addForm.localization} />) }
          { this.getUserFormField('localization') && localization }

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

export default withRouter(withTheme(Summary));
