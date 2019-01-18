import React, { Component } from 'react';
import DateTime from '../../DateTime'
import Button from '../../Button'
import ExitIcon from '../../../assets/exit.png'
import { CustomPeriodComponent } from './styles'
import {languageText} from '../../../languages/MultiLanguage.js';

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
      [name]: new Date(ev.target.value)
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
      <CustomPeriodComponent>
        <h3 className="custom__header">{languageText.reportsSummary.customPeriod}</h3>
        <img className="custom__cancel" src={ExitIcon} onClick={() => this.props.onConfirmFn({...this.state, cancel: true})}/>
        <DateTime date label="From" onChange={(ev) => this.handleDateChange(ev, 'from')}/>
        <DateTime date label="To" onChange={(ev) => this.handleDateChange(ev, 'to')}/>
        { confirm }
      </CustomPeriodComponent>
    )
  }
}

export default CustomPeriod;
