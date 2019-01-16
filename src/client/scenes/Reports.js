import React, { Component } from 'react'
import styled from 'styled-components'
import Menubar from '../components/Menubar';
import Header from '../components/Header';
import Button from '../components/Button'
import oftenTogetherImg from '../assets/reports/often-together.png';
import pressureImg from '../assets/reports/pressure.png';
import summaryImg from '../assets/reports/summary.png';
import AtmosphericPressure from '../components/reports/atmosphericPressure'
import Summary from '../components/reports/summary'
import OftenTogether from '../components/reports/oftenTogether'
import {languageText} from '../languages/MultiLanguage.js'

const MODE = {
  1: {
    header:languageText.reports.summary,
    component: <Summary />
  },
  2: {
    header: languageText.reports.pressure,
    component: <AtmosphericPressure />
  },
  3: {
    header: languageText.reports.oftenTogether,
    component: <OftenTogether />
  }
}

const Buttons = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
`

const ReportName = styled.h2`
  text-transform: uppercase;
  color: #9e9e9e;
  font-size: 1.2em;
`

const ReportsContainer = styled.div`
  margin: 80px 0;
  height: auto;
`

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  toggleReport(mode) {
    this.setState({
      mode
    })
  }

  render() {
    return (
      <ReportsContainer>
        <Header />
        <ReportName>{MODE[this.state.mode].header}</ReportName>
        {
          MODE[this.state.mode].component
        }
        <Buttons>
          <Button small img={summaryImg} primary={this.state.mode === 1} onClick={() => this.toggleReport(1)}/>
          <Button small img={pressureImg} primary={this.state.mode === 2} onClick={() => this.toggleReport(2)}/>
          <Button small img={oftenTogetherImg} primary={this.state.mode === 3} onClick={() => this.toggleReport(3)}/>
        </Buttons>
        <Menubar />
      </ReportsContainer>
    )
  }

}

export default Reports
