import React, { Component } from 'react';
import _ from 'lodash'
import { SummaryComponent, Select } from './styles'
import axios from 'axios';

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
      stats: {}
    }

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getStats = this.getStats.bind(this);
  }

  getStats() {
    const url = "reports/stats/" + this.state.selectedOption;
      axios.get(url)
      .then((res) => {
        if(res.data) {
          this.setState({
            stats: res.data
          })
        }
        else {
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
    }, () => {
      this.getStats();
    }); 
  }

  render() {
    const { selectedOption, options, stats } = this.state;
    const attacks = stats.attacks || 0;
    const painDays = stats.painDays || 0;
    const noPainDays = stats.noPainDays || 0;
    const average = stats.average || 0;
    const total = stats.total || 0;
    return (
      <SummaryComponent>
        <Select 
          onChange={this.handleSelectChange}
          value={this.state.selectedOption}>
            {options.map((option, i) => {
              return (
              <option 
                value={option.value} 
                label={option.label}
                key={i}>
                
              </option> )
          })}
        </Select>
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
      </SummaryComponent>
    )
  }
}

export default Summary;
