import React, { Component } from 'react';
import _ from 'lodash'
import { SummaryComponent, Select } from './styles'

class Summary extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const attacks = 13;
    const painDays = 26;
    const noPainDays = 64;
    const average = 7;
    const total = 192;
    return (
      <SummaryComponent>
        <Select>
          <option value='30'>Last 30 days</option>
          <option value='90'>Last 90 days</option>
          <option value='360'>Last 360 days</option>
          <option value='all'>All time</option>
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
