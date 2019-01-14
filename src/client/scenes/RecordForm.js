import React, { Component } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import axios from 'axios';
import {languageText} from '../languages/MultiLanguage.js';


import Button from '../components/Button'
import Header from '../components/Header'
import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'

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
    height: calc(100% - 130px);
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
`;

const Buttons = styled.div `
  /* position: absolute; */
  /* bottom: 0; */
  display: flex;
  width: 90%;
  max-width: 860px;
  justify-content: space-between;
  align-items: center;
  outline: none;



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
      <img src={MonitorImg} />
      <p className="start-paragraph">In this form you can note various aspects of your condition. Keeping track of your migraine triggers will help you avoid them later.</p>
      <p className="start-paragraph">Feel better soon!</p>
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
      }
    };

    this.firstTab = 0;
    this.lastTab = 12;

    this.changeTab = this.changeTab.bind(this);
    this.handleChangeTabValue = this.handleChangeTabValue.bind(this);
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

  render() {
    const { currentTab, data } = this.state;
    const { match } = this.props;

    return (
      <Container className="Form">
        <Header isForm />
        <form>
          <SwipeableViews index={currentTab}>
            <div className="record-tab">
              <Hello edit={this.edit} />
            </div>
            <div className="record-tab">
              <Start onChange={this.handleChangeTabValue} valueDate={data.start_date} valueTime={data.start_time}/>
            </div>
            <div className="record-tab">
              <End onChange={this.handleChangeTabValue} valueDate={data.end_date} valueTime={data.end_time}/>
            </div>
            <div className="record-tab">
              <Pressure valueData={data.pressure} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <SleepDuration valueData={data.sleep_duration} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Menstruation valueData={data.menstruation} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Localization valueData={data.localization} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Mood valueData={data.mood} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Pain valueData={data.pain} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Medicines values={data.medicines} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Aura values={data.aura} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Triggers values={data.triggers} onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Reliefs values={data.reliefs} onChange={this.handleChangeTabValue} />
            </div>
          </SwipeableViews>
        </form>
        {this.isComplete() && (
          <div>
            <Link to={{ pathname: this.edit ? '/summary/edit/' : 'summary/', state: { data, id: match.params.id }}}>
              <Button text={languageText.recordForm.summary} />
            </Link>
          </div>
        )}

        <Buttons>
          <Button
            onClick={() => this.changeTab('prev')}
            disabled={currentTab === this.firstTab}
            text="<"
          />
          <p> {languageText.recordForm.migraineRecord}</p>
          <Button
            onClick={() => this.changeTab('next')}
            disabled={currentTab === this.lastTab}
            text=">"
          />
        </Buttons>
      </Container>
    );
  }
}

export default withRouter(RecordForm);
