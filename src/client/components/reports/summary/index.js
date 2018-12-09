import React, { Component } from 'react';
import _ from 'lodash'
import CustomPeriod from './CustomPeriod'
import Button from '../../Button'
import { SummaryComponent, Select, CustomIcon } from './styles'
import axios from 'axios';
import customImg from '../../../assets/custom-options.png'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: "30",
      options: [
        { value: '30', label: 'Last 30 days' },
        { value: '60', label: 'Last 60 days' },
        { value: '365', label: 'Last year' },
        { value: 'all', label: 'All time'}
      ],
      stats: {},
      customPeriodVisible: false,
      customPeriodApplied: false,
      customPeriod: {
        from: '',
        to: ''
      }
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  getStats() {
    let url;
    if(this.state.selectedOption == "custom"){
      url = "reports/stats/custom/" + this.state.customPeriod.from + '-' + this.state.customPeriod.to;
    }
    else {
      url = "reports/stats/" + this.state.selectedOption;
    }
      axios.get(url)
      .then((res) => {
        if(res.data) {
          this.setState({
            stats: res.data
          })
        }
        else {
          if(res.status == 204) {
            return;
          }
          alert("Something went wrong");
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

    if (!this.state.options.includes((op) => op.value == "custom")){
      this.state.options.unshift({value: 'custom', label: 'Custom period'})
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

    const customPeriod = this.state.customPeriodVisible ? (
      <CustomPeriod onConfirmFn={this.handleCustomPeriod.bind(this)}/>
    ) : '';

    const customPeriodRange = this.state.customPeriodApplied && (
      <p className="summary__period">{this.state.customPeriod.from.toDateString()}<br />{this.state.customPeriod.to.toDateString()}</p>
    )

    return (
      <SummaryComponent>
        <Select
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
        <CustomIcon src={customImg} onClick={() => this.setState({customPeriodVisible: true})}/>
        { customPeriodRange }
        <div className='summary__container summary__container--row'>
          <span className='summary__number summary__number--accent'>{attacks}</span>
          <p className='summary__text'>{attacks === 1 ? 'migraine' : 'migraines'}</p>
        </div>
        <div className='summary__row'>
          <div className='summary__container'><span className='summary__number'>{painDays}</span><p className='summary__text'>pain days</p></div>
          <span className='summary__char'>~</span>
          <div className='summary__container'><span className='summary__number'>{noPainDays}</span><p className='summary__text'>no pain days</p></div>
        </div>
        <div className='summary__row'>
          <div className='summary__container'><span className='summary__number'>{`${average}h`}</span><p className='summary__text'>average attack duration</p></div>
          <div className='summary__container'><span className='summary__number'>{`${total}h`}</span><p className='summary__text'>total attacks duration</p></div>
        </div>
        { customPeriod }
      </SummaryComponent>
    )
  }
}

export default Summary;
