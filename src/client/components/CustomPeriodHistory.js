import React, { Component } from 'react';
import DateTimeHistory from './DateTimeHistory'
import Button from './Button'
import ExitIcon from '../assets/exit.png'
import {languageText} from '../languages/MultiLanguage.js';
import styled from 'styled-components';


const CustomPeriodComponent = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;
  button {
    margin: auto;
    padding: 10px;
  }
`

class CustomPeriodHistory extends Component {
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

    const nameMap = {
      from: 'start',
      to: 'end'
    }

    const { onChangeDate } = this.props
    onChangeDate(nameMap[name], ev.target.value)
  
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
        <DateTimeHistory value={this.props.valueStart} date label="From" onChange={(ev) => this.handleDateChange(ev, 'from')}/>
        <DateTimeHistory value={this.props.valueEnd}  date label="To" onChange={(ev) => this.handleDateChange(ev, 'to')}/>
        { confirm }
      </CustomPeriodComponent>
    )
  }
}

export default CustomPeriodHistory;
