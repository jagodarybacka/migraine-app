import React, { Component } from 'react';
import { withTheme } from "@callstack/react-theme-provider";

import CustomPeriod from '../../CustomPeriod'
import Help from '../../Help'
import { SummaryComponent, Select, CustomIcon, QuestionIcon } from './styles'
import axios from 'axios';
import customImg from '../../../assets/custom-options.png'
import questionImg from '../../../assets/questionmark-circle.png'
import {languageText} from '../../../languages/MultiLanguage.js'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: "30",
      options: [
        { value: '30', label: languageText.reportsSummary.last30Days },
        { value: '60', label: languageText.reportsSummary.last60Days },
        { value: '365', label: languageText.reportsSummary.lastYear },
        { value: 'all', label: languageText.reportsSummary.allTime}
      ],
      stats: {},
      customPeriodVisible: false,
      customPeriodApplied: false,
      customPeriod: {
        from: '',
        to: ''
      },
      helpVisible: false
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getStats = this.getStats.bind(this);
    this.handleCustomPeriod = this.handleCustomPeriod.bind(this);
  }

  getStats() {
    let url;
    if(this.state.selectedOption === "custom"){
      url = "/api/reports/stats/custom/" + this.state.customPeriod.from + '-' + this.state.customPeriod.to;
    }
    else {
      url = "/api/reports/stats/" + this.state.selectedOption;
    }
      axios.get(url)
      .then((res) => {
        if(res.data) {
          this.setState({
            stats: res.data
          })
        }
        else {
          if(res.status === 204) {
            this.setState({
              stats: {}
            })
            return;
          }
          alert(languageText.reportsSummary.sthWentWrong);
        }

      })
      .catch((err) => console.log(err));
  }

  componentWillMount() {
    this.getStats();
  }

  handleSelectChange(event) {
    const option = event.target.value;
    this.setState({
      selectedOption: option,
      customPeriodApplied: option === 'custom'
    }, () => {
      this.getStats();
    });
  }

  handleCustomPeriod({from, to, cancel}) {
    if (cancel) {
      this.setState({
        customPeriodVisible: false
      })
      return;
    }

    if (!this.state.options.includes((op) => op.value === "custom")){
      this.state.options.unshift({value: 'custom', label: languageText.reportsSummary.customPeriod})
      }
    this.setState({
      selectedOption: 'custom',
      customPeriodVisible: false,
      customPeriodApplied: true,
      customPeriod: {from: from, to: to}
    }, () => {
      this.getStats();
    })
  }

  render() {
    let { selectedOption, options, stats } = this.state;
    const attacks = stats.attacks || 0;
    const painDays = stats.painDays || 0;
    const noPainDays = stats.noPainDays || 0;
    const average = stats.average || 0;
    const total = stats.total || 0;

    const IconQuestion = <QuestionIcon src={questionImg} onClick={() => this.setState({helpVisible: true})}/>

    const helpModal = this.state.helpVisible ? (
      <Help type="summary" onConfirmFn={() => {this.setState({helpVisible: false})}}/>
    ) : ''

    const customPeriod = this.state.customPeriodVisible ? (
      <CustomPeriod onConfirmFn={this.handleCustomPeriod.bind(this)}/>
    ) : '';

    const customPeriodRange = this.state.customPeriodApplied && (
      <p className="summary__period">
        {localStorage.getItem('lang') === 'eng'
          ? this.state.customPeriod.from.toDateString()
          : this.state.customPeriod.from.toLocaleDateString() }
        <br />
        {localStorage.getItem('lang') === 'eng'
          ? this.state.customPeriod.to.toDateString()
          : this.state.customPeriod.to.toLocaleDateString() }
      </p>
    )

    return (
      <SummaryComponent theme={this.props.theme}>
        <Select
          theme={this.props.theme}
          onChange={this.handleSelectChange}
          value={selectedOption}>
            {options.map((option, i) => {
              return (
              <option
                value={option.value}
                label={option.label}
                key={i} />
              )
          })}
        </Select>
        { IconQuestion }
        <CustomIcon src={customImg} onClick={() => this.setState({customPeriodVisible: true})}/>
        { customPeriodRange }
        <div className='summary__container summary__container--row'>
          <span className='summary__number summary__number--accent'>{attacks}</span>
          <p className='summary__text'>{attacks === 1 ? languageText.reportsSummary.migraine : languageText.reportsSummary.migraines}</p>
        </div>
        <div className='summary__row'>
          <div className='summary__container'><span className='summary__number'>{painDays}</span><p className='summary__text'>{languageText.reportsSummary.painDays}</p></div>
          <span className='summary__char'>~</span>
          <div className='summary__container'><span className='summary__number'>{noPainDays}</span><p className='summary__text'>{languageText.reportsSummary.noPainDays}</p></div>
        </div>
        <div className='summary__row'>
          <div className='summary__container'><span className='summary__number'>{`${average}h`}</span><p className='summary__text'>{languageText.reportsSummary.average}</p></div>
          <div className='summary__container'><span className='summary__number'>{`${total}h`}</span><p className='summary__text'>{languageText.reportsSummary.total}</p></div>
        </div>
        { customPeriod }
        { helpModal }
      </SummaryComponent>
    )
  }
}

export default withTheme(Summary);
