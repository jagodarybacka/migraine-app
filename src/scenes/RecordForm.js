import React, { Component } from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';

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

  h2 {
    text-transform: uppercase;
    font-weight: 900;
    text-align: center;
  }

  p {
    text-transform: uppercase;
    font-size: 1rem;

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
  }

  > button:hover {
    background-color: #f0908b;
  }

  > button:disabled {
    background-color: #b7b7b7;
  }
`;

class RecordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: 0,
      data: {}
    };

    this.firstTab = 0;
    this.lastTab = 7;

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

  render() {
    const { currentTab } = this.state;
    console.log(this.state.data);

    return (
      <Container className="Form">
        <Header />
        <form>
          <SwipeableViews index={currentTab}>
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

        <Buttons>
          <Button
            onClick={() => this.changeTab('prev')}
            disabled={currentTab === this.firstTab}
            text="<"
          />
          <p> Migraine Record</p>
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
