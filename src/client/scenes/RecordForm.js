import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import {languageText} from '../languages/MultiLanguage.js';
import moment from 'moment';

import Button from '../components/Button'
import Header from '../components/Header'
import MonitorImg from '../assets/monitor.png'

import {
  Start,
  End,
  Menstruation,
  Localization,
  Mood,
  Pain,
  Medicines,
  Triggers,
  Aura,
  Pressure,
  SleepDuration,
  Reliefs
} from './form/AddForm';

const Container = styled.article`
  padding: 0;
  text-align: center;

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
      customAnswers: {}
    };

    this.firstTab = 0;

    this.currentDate = this.currentDate.bind(this);
    this.changeSwipeable = this.changeSwipeable.bind(this);
    this.subtractsOneHour = this.subtractsOneHour.bind(this);
    this.notYetEnd = this.notYetEnd.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.handleChangeTabValue = this.handleChangeTabValue.bind(this);
    this.parseCustomAnswers = this.parseCustomAnswers.bind(this);
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
        this.setState({ data: data.report })
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

      this.setState((prevState) => {
        return {
          ...prevState,
          data: {
            ...prevState.data,
            [name]: result,
          }
        }
      })
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
    this.setState({
      data:{
        ...data,
        [`${name}_time`]: time,
        [`${name}_date`]: date
      }
    });
  }

  subtractsOneHour(name){
    const { data } = this.state;
    const currentTime = data[`${name}_time`]
    const newTime = moment(currentTime,'HH:mm').subtract(1, 'hour').format('HH:mm');
    this.setState({
      data:{
        ...data,
        [`${name}_time`]: newTime
      }
    })
  }

  notYetEnd(){
    const { data } = this.state;
    const {end_time, end_date, ...rest} = data

    this.setState({
      data: rest
    });
  }

  isComplete() {
    const { data } = this.state;
    return (
      data.start_date &&
      data.start_time &&
      data.sleep_duration &&
      data.pressure &&
      data.pain &&
      data.menstruation &&
      data.mood &&
      data.localization &&
      (data.aura && !!data.aura.length) &&
      (data.medicines && !!data.medicines.length) &&
      (data.triggers && !!data.triggers.length) &&
      data.reliefs
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
          <div className="record-tab" key={id}>
            <field.component 
              customAnswers = {customAnswers[field.name]}
              values={data[field.name]} 
              valueData={data[field.name]} 
              onChange={this.handleChangeTabValue} />
          </div>
        )
      }
      return null;
    }).filter(view => !!view);

    return (
      <Container className="Form">
        <Header isForm isValid={ data.start_date && data.start_time } saveLink={{ pathname: this.edit ? '/summary/edit/' : 'summary/', state: { data, id: match.params.id }}} />
        <form>
          <SwipeableViews className="form-container" index={currentTab} onChangeIndex={(index)=> this.changeSwipeable(index) }>
            <div className="record-tab">
              <Hello edit={this.edit} />
            </div>
            <div className="record-tab">
              <Start name="start" onNowButtonClick={this.currentDate} onSubtractHourClick={this.subtractsOneHour} onChange={this.handleChangeTabValue} valueDate={data.start_date} valueTime={data.start_time}/>
            </div>
            <div className="record-tab">
              <End name="end" onNowButtonClick={this.currentDate} onSubtractHourClick={this.subtractsOneHour} onNotYetClick={this.notYetEnd} onChange={this.handleChangeTabValue} valueDate={data.end_date} valueTime={data.end_time}/>
            </div>
            <div className="record-tab">
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
            this.isComplete() ? (
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

export default withRouter(RecordForm);
