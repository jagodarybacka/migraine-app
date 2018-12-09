import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import {languageText} from '../languages/MultiLanguage.js';

import Button from '../components/Button'
import Header from '../components/Header';
import {
  Start,
  End,
  Menstruation,
  Localization,
  Mood,
  Pain,
  Medicines,
  Triggers
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
  }

  .record-tab {
    margin: 0 auto;
    max-width: 400px;
  }
`;

const Buttons = styled.div `
  position: absolute;
  bottom: 0;
  display: flex;
  width: 90%;
  max-width: 860px;
  justify-content: space-between;
  align-items: center;

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

const Hello = () => (<h1>{languageText.recordForm.title}</h1>)

class RecordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      data: {}
    };

    this.firstTab = 0;
    this.lastTab = 8;

    this.changeTab = this.changeTab.bind(this);
    this.handleChangeTabValue = this.handleChangeTabValue.bind(this);
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
      data.pain &&
      data.menstruation &&
      data.mood &&
      data.localization &&
      (data.medicines && !!data.medicines.length) &&
      (data.triggers && !!data.triggers.length)      
    )
  }

  render() {
    const { currentTab, data } = this.state;

    return (
      <Container className="Form">
        <Header />
        <form>
          <SwipeableViews index={currentTab}>
            <div className="record-tab">
              <Hello />
            </div>
            <div className="record-tab">
              <Start onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <End onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Menstruation onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Localization onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Mood onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Pain onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Medicines onChange={this.handleChangeTabValue} />
            </div>
            <div className="record-tab">
              <Triggers onChange={this.handleChangeTabValue} />
            </div>
          </SwipeableViews>
        </form>

        {this.isComplete() && (
          <div>
            <Link to={{ pathname: '/summary', state: { data }}}>
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

export default RecordForm;
