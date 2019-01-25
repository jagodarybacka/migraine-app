import React, { Component } from 'react';
import { withTheme } from "@callstack/react-theme-provider";

import DateTimeCustomPeriod from './DateTimeCustomPeriod'
import Button from './Button'
import ExitIcon from '../assets/exit.png'
import { CustomPeriodComponent } from './reports/summary/styles'
import {languageText} from '../languages/MultiLanguage.js';

class CustomPeriod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: undefined,
      to: undefined,
      valid: false
    }
  }

  componentDidMount() {
    this.validate(this.state)
  }

  handleDateChange(ev, name) {
  const state = {
      ...this.state,
      [name]: new Date(`${ev.target.value}T00:00`)
    }
    this.setState(state)
    this.validate(state)
  }

  validate(state) {
    if (!state.from || !state.to) {
      this.setState({valid: false});
      return;
    } else if (state.from - state.to < 0) {
      this.setState({valid: true});
      return;
    }
    this.setState({valid: false});
  }

  render() {
    const confirm = this.state.valid ? (
      <Button small text={languageText.reportsSummary.confirm} onClick={() => this.props.onConfirmFn(this.state)}/>
    ) : (
      <Button small text={languageText.reportsSummary.confirm} disabled/>
    )
    return (
      <CustomPeriodComponent theme={this.props.theme}>
        <h3 className="custom__header">{languageText.reportsSummary.customPeriod}</h3>
        <img className="custom__cancel" src={ExitIcon} alt="exit" onClick={() => this.props.onConfirmFn({...this.state, cancel: true})}/>
        <DateTimeCustomPeriod date label="From" onChange={(ev) => this.handleDateChange(ev, 'from')}/>
        <DateTimeCustomPeriod date label="To" onChange={(ev) => this.handleDateChange(ev, 'to')}/>
        { confirm }
      </CustomPeriodComponent>
    )
  }
}

export default withTheme(CustomPeriod);
