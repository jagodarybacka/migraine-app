import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import {languageText} from '../languages/MultiLanguage.js';
import moment from 'moment';
import { withTheme } from "@callstack/react-theme-provider";

import Button from '../components/Button'
import Header from '../components/Header'
import MonitorImg from '../assets/monitor.png'

import {
  Start,
  End,
  Pain,
  Medicines,
  Triggers,
  Reliefs,
  Localization,
  Aura,
  Mood,
  Menstruation,
  Pressure,
  SleepDuration
} from './form/AddForm';

const Container = styled.article`
  padding: 0;
  text-align: center;
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};

  h2 {
    text-transform: uppercase;
    font-weight: 900;
    text-align: center;
  }

  p {
    text-transform: uppercase;
    font-size: 1.2rem;
  }

  form {
    width: 100%;
    margin-top: 75px;
    height: calc(100% - 142px);
  }

  .record-tab {
    margin: 0 auto;
    max-width: 400px;
  }

  .start-paragraph {
    text-transform: initial;
    margin: 1em;
    opacity: 0.8;
  }

  a {
    color: #2196f3;
    font-weight: 500;
  }

  .form-container {
    overflow-y: scroll;
    max-height: 100%;
  }
`;

const Error = styled.h4`
  font-weight: 300;
  color:  #ff471a; 
`

const Buttons = styled.div `
  display: flex;
  width: 90%;
  max-width: 860px;
  justify-content: space-between;
  align-items: center;
  outline: none;
  margin: 15px 0;


  > button {
    min-width: auto;
    font-size: 1rem;
    padding: 10px 15px;
    background-color: #f0908b80;
    cursor: pointer;
    box-shadow: 0px 1px 1px 0px rgba(0,0,0,0.5);

  }

  > button:hover {
    background-color: #f0908b;
  }

  > button:disabled {
    background-color: #b7b7b7;
  }
`;

const Hello = (props) => {
  const title = props.edit
    ? <h1>{languageText.recordForm.titleEdit}</h1>
    : <h1>{languageText.recordForm.title}</h1>
  return (
    <div>
      {title}
      <img src={MonitorImg} alt='monitor'/>
      <p className="start-paragraph">{languageText.recordForm.paragraph}</p>
      <p className="start-paragraph">{languageText.recordForm.feelBetter}</p>
      <p className="start-paragraph">
        {languageText.recordForm.inside}
        <Link to='/settings'>
          {languageText.recordForm.settings}
        </Link>
        {languageText.recordForm.customize}
      </p>
    </div>
  )
}

class RecordForm extends Component {
  constructor(props) {
    super(props);
    this.edit = false

    this.state = {
      currentTab: 0,
      data: {
        weather: JSON.parse(localStorage.getItem('weather')) || undefined

      },
      dateValidation: {
        valid: true,
        err_msg: ""
      },
      customAnswers: {},
      validDates: {
        startDate: {
          error: '',
          valid: true
        },
        endDate: {
          error: '',
          valid: true,
        },
        endStart: {
          error: '',
          valid: true
        }
      },
      correctDates: false,
      correctPressure: true
    };

    this.firstTab = 0;

    this.currentDate = this.currentDate.bind(this);
    this.changeSwipeable = this.changeSwipeable.bind(this);
    this.subtractsOneHour = this.subtractsOneHour.bind(this);
    this.notYetEnd = this.notYetEnd.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.handleChangeTabValue = this.handleChangeTabValue.bind(this);
    this.parseCustomAnswers = this.parseCustomAnswers.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.checkDate = this.checkDate.bind(this);
    this.checkStartEnd = this.checkStartEnd.bind(this);
    this.checkIfCorrectDates = this.checkIfCorrectDates.bind(this);
    this.validate = this.validate.bind(this);
    this.validatePressure = this.validatePressure.bind(this);
  }

  componentDidMount() {
    const { match } = this.props
    if (match.params.id) {
      this.edit = true
      axios.get(`/api/reports/${match.params.id}/`).then(res => {
        const { data } = res
        if(data.report.start_date){
          data.report.start_date = data.report.start_date.substr(0,10)
        }
        if(data.report.end_date){
          data.report.end_date = data.report.end_date.substr(0,10)
        }
        this.setState((prevState) => ({ 
          ...prevState,
          data: data.report 
        }), () => {
          this.validate()
          this.validatePressure()
        })
      })
    }
    axios.get('/api/users/answer')
      .then((res) => {
        if(res.status === 204){
          console.log("No content");
        } else {
          const data = this.parseCustomAnswers(res.data);
          this.setState((prevState) => ({
            ...prevState,
            customAnswers: data
          }))
       }
      })
      .catch((err) => {console.log(err);})
  }

  parseCustomAnswers(answers) {
    for(var op in answers) {
      if(answers[op].length > 0){
        answers[op] = this.mapValues(answers[op]);
      }
    }
    return answers;
  }

  mapValues(values) {
    return values.map((value) => {
      return {
        text: value,
        value: value
      }
    })
  }

  handleChangeStartDate(evt) {
    const { data } = this.state;
    const { name, value } = evt.target;
    this.setState((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          [name]: value,
        }
      }), () =>  this.checkStartEnd())
    if(name === "start_time"){
      if(data.start_date) {
        this.checkDate(value,data.start_date,"start");
      } else {
        this.setState((prevState) => ({
          ...prevState,
            validDates: {
              ...prevState.validDates,
              startDate: {
                valid: true,
                error: ''
              }
            }
        }), () => this.checkIfCorrectDates())
      }
    } else {
      if(data.start_time) {
        this.checkDate(data.start_time,value,"start");
      } else {
        this.setState((prevState) => ({
          ...prevState,
            validDates: {
              ...prevState.validDates,
              startDate: {
                valid: true,
                error: ''
              }
            }
        }), () => this.checkIfCorrectDates())
      }
    }
  }

  handleChangeEndDate(evt) {
    const { data } = this.state;
    const { name, value } = evt.target;
    this.setState((prevState) => ({
        ...prevState,
        data: {
          ...prevState.data,
          [name]: value,
        }
      }), () =>  this.checkStartEnd())
    if(name === "end_time"){
      if(data.end_date) {
        this.checkDate(value,data.end_date,"end");
      } else {
        this.setState((prevState) => ({
          ...prevState,
            validDates: {
              ...prevState.validDates,
              endDate: {
                valid: true,
                error: ''
              }
            }
        }), () => this.checkIfCorrectDates())
      }
    } else {
      if(data.end_time) {
        this.checkDate(data.end_time,value,"end");
      } else {
        this.setState((prevState) => ({
          ...prevState,
            validDates: {
              ...prevState.validDates,
              endDate: {
                valid: true,
                error: ''
              }
            }
        }), () => this.checkIfCorrectDates())
      }
    }
  }

  checkDate(value, date, type) {
    const time = value.split(':');
    const name = type + "Date";
    const now = new Date();
    const day = new Date(date);
    const setDate = new Date(day.getFullYear(), day.getMonth(), day.getDate(), time[0], time[1]);
    if(setDate.getTime() > now.getTime()){
      this.setState((prevState) => ({
        ...prevState,
          validDates: {
            ...prevState.validDates,
            [name]: {
              valid: false,
              error: 'Date greater than now'
            }
          }
      }), () => this.checkIfCorrectDates())
    } else {
      this.setState((prevState) => ({
        ...prevState,
          validDates: {
            ...prevState.validDates,
            [name]: {
              valid: true,
              error: ''
            }
          }
      }), () => this.checkIfCorrectDates())
    }
  }

  checkStartEnd() {
    const { data } = this.state;
    if(data.start_time && data.start_date && data.end_time && data.end_date) {
      const startDate = new Date(data.start_date);
      const startTime = data.start_time.split(":");
      const start = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(),startTime[0],startTime[1]);
      const endDate = new Date(data.end_date);
      const endTime = data.end_time.split(":");
      const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(),endTime[0],endTime[1]);
      if(start.getTime() > end.getTime()){
        this.setState((prevState) => ({
          ...prevState,
            validDates: {
              ...prevState.validDates,
              endStart: {
                valid: false,
                error: 'Start date greater than end date'
              }
            }
        }), () => this.checkIfCorrectDates())
      } else {
        this.setState((prevState) => ({
          ...prevState,
            validDates: {
              ...prevState.validDates,
              endStart: {
                valid: true,
                error: ''
              }
            }
        }), () => this.checkIfCorrectDates())
      }
    } else {
      this.setState((prevState) => ({
        ...prevState,
          validDates: {
            ...prevState.validDates,
            endStart: {
              valid: true,
              error: ''
            }
          }
      }), () => this.checkIfCorrectDates())
    }
  }

  checkIfCorrectDates() {
    const { data } = this.state;
    if(!data.start_date || !data.start_time || (data.end_date && !data.end_time) || (!data.end_date && data.end_time)
      || !this.state.validDates.startDate.valid || !this.state.validDates.endDate.valid || !this.state.validDates.endStart.valid){
      this.setState((prevState) => ({
        ...prevState,
        correctDates: false
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        correctDates: true
      }))
    }
  }

  validate() {
    this.checkStartEnd();
    if(this.state.data.start_date && this.state.data.start_time){
      this.checkDate(this.state.data.start_time,this.state.data.start_date,"start")
    } else {
      this.setState((prevState) => ({
        validDates: {
          ...prevState.validDates,
          startDate: {
            valid: true,
            error: ''
          }
        }
      }))
    }
    if(this.state.data.end_date && this.state.data.end_time){
      this.checkDate(this.state.data.end_time,this.state.data.end_date,"end")
    } else {
      this.setState((prevState) => ({
        validDates: {
          ...prevState.validDates,
          endDate: {
            valid: true,
            error: ''
          }
        }
      }))
    }
    this.checkIfCorrectDates();
  }

  validatePressure() {
    const {data} = this.state;
    if(data.pressure) {
      const regex = /^([1-2][0-9]{2}|[1-9][0-9])\/([1-2][0-9]{2}|[1-9][0-9])$/;
      if(regex.test(String(data.pressure))){
        this.setState((prevState) => ({
          ...prevState,
          correctPressure: true
        }))
      } else {
        this.setState((prevState) => ({
          ...prevState,
          correctPressure: false
        }))
      }
    } else {
      this.setState((prevState) => ({
        ...prevState,
        correctPressure: true
      }))
    }
  }

  handleChangeTabValue(evt) {
    const { data } = this.state;
    const { name, value, type } = evt.target;
    let result;
    if (type === 'checkbox') {
      result = data[name] || [];
      const shouldUncheck = result.indexOf(value);

      if (shouldUncheck >= 0) {
        result.splice(shouldUncheck, 1);
      } else {
        result = [
          ...result,
          value,
        ];
      }
    } else {
      result = value;
    }

    this.setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: result,
      }
    }), () => this.validatePressure())
  }

  changeTab(direction) {
    const { currentTab } = this.state;
    let nextTab = currentTab;

    if (direction === 'next') {
      nextTab += 1;
    }

    if (direction === 'prev') {
      nextTab -= 1;
    }

    this.setState({ currentTab: nextTab });
  }

  changeSwipeable(index){
    this.setState({ currentTab: index });
  }

  currentDate(name){
    const { data } = this.state;
    const time = moment().format('HH:mm');
    const date = moment().format('YYYY-MM-DD');
    this.setState((prevState) => ({
      ...prevState,
      data:{
        ...data,
        [`${name}_time`]: time,
        [`${name}_date`]: date
      }
    }), () => {
        this.validate();
    });
  }

  subtractsOneHour(name){
    const { data } = this.state;
    const currentTime = data[`${name}_time`]
    const newTime = moment(currentTime,'HH:mm').subtract(1, 'hour').format('HH:mm');
    this.setState((prevState) => ({
      ...prevState,
      data:{
        ...data,
        [`${name}_time`]: newTime
      }
    }), () => {
      this.validate();
    });
  }

  notYetEnd(){
    const { data } = this.state;
    const {end_time, end_date, ...rest} = data

    this.setState((prevState) => ({
      ...prevState,
      data: rest
    }), () => {
      this.validate();
    });
  }

  isComplete() {
    const { data } = this.state;
    return (
      data.start_date &&
      data.start_time &&
      data.pain &&
      (data.medicines && !!data.medicines.length) &&
      (data.triggers && !!data.triggers.length) &&
      data.reliefs &&
      data.localization &&
      (data.aura && !!data.aura.length) &&
      data.mood &&
      data.menstruation &&
      data.pressure &&
      data.sleep_duration
    )
  }

  getUserFormField(field) {
    return localStorage.getItem(`form-${field}`) === 'true' || localStorage.getItem(`form-${field}`) === null;
  }

  render() {
    const { currentTab, data, customAnswers } = this.state;
    const { match } = this.props;
    const fields = [{
        component: Medicines,
        name: 'medicines',
        custom: true
      }, {
        component: Triggers,
        name: 'triggers',
        custom: true
      }, {
        component: Reliefs,
        name: 'reliefs',
        custom: true
      },  {
        component: Localization,
        name: 'localization',
        custom: true
      }, {
        component: Aura,
        name: 'aura',
        custom: true
      }, {
        component: Mood,
        name: 'mood'
      }, {
        component: Menstruation,
        name: 'menstruation'
      }, {
        component: Pressure,
        name: 'pressure'
      }, {
        component: SleepDuration,
        name: 'sleep_duration'
      }]

    const tabs = fields.map((field, id) => {
      if (this.getUserFormField(field.name)) {
        return (
          <div className="record-tab" key={id+4}>
            <field.component 
              customAnswers = {customAnswers[field.name] ? customAnswers[field.name] : []}
              values={data[field.name]} 
              valueData={data[field.name]} 
              onChange={this.handleChangeTabValue} />
            { field.name === "pressure" && !this.state.correctPressure 
                ? (<Error>{languageText.addForm.pressure.pressureError}</Error>)
                : '' }
          </div>
        )
      }
      return null;
    }).filter(view => !!view);

    return (
      <Container theme={this.props.theme} className="Form">
        <Header isForm isValid={ this.state.correctDates && this.state.correctPressure } saveLink={{ pathname: this.edit ? '/summary/edit/' : 'summary/', state: { data, id: match.params.id }}} />
        <form>

          <SwipeableViews className="form-container" index={currentTab} onChangeIndex={(index)=> this.changeSwipeable(index)}>
            <div className="record-tab" key={0}>
              <Hello edit={this.edit} />
            </div>
            <div className="record-tab" key={1}>
              <Start name="start" onNowButtonClick={this.currentDate} onSubtractHourClick={this.subtractsOneHour} onChange={this.handleChangeStartDate} valueDate={data.start_date} valueTime={data.start_time}/>
              { this.state.validDates.startDate.valid ? '' : (<Error>{languageText.dateErrors.invalidStartDate}</Error>)}
              { this.state.validDates.endStart.valid ? '' : (<Error>{languageText.dateErrors.invalidDatesStart}</Error>)}
            </div>
            <div className="record-tab" key={2}>
              <End name="end" onNowButtonClick={this.currentDate} onSubtractHourClick={this.subtractsOneHour} onNotYetClick={this.notYetEnd} onChange={this.handleChangeEndDate} valueDate={data.end_date} valueTime={data.end_time}/>
              { this.state.validDates.endDate.valid ? '' : (<Error>{languageText.dateErrors.invalidEndDate}</Error>)}
              { this.state.validDates.endStart.valid ? '' : (<Error>{languageText.dateErrors.invalidDatesEnd}</Error>)}
            </div>
            <div className="record-tab" key={3}>
              <Pain valueData={data.pain} onChange={this.handleChangeTabValue} />
            </div>
            {
              tabs
            }
          </SwipeableViews>
        </form>
        <Buttons>
          <Button
            onClick={() => this.changeTab('prev')}
            disabled={currentTab === this.firstTab}
            text="<"
          />
          {
            this.isComplete() && this.state.correctDates && this.state.correctPressure ? (
              <Link to={{ pathname: this.edit ? '/summary/edit/' : 'summary/', state: { data, id: match.params.id }}}>
                <Button small text={languageText.recordForm.summary} />
              </Link>
            ) : (
              <p> {languageText.recordForm.migraineRecord}</p>
            )
          }
          <Button
            onClick={() => this.changeTab('next')}
            disabled={currentTab === tabs.length+3 }
            text=">"
          />
        </Buttons>
      </Container>
    );
  }
}

export default withRouter(withTheme(RecordForm));
