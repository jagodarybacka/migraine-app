import React, { Component } from 'react';
import _ from 'lodash'
import { OftenTogetherComponent, Select, TogetherField } from './styles'

class OftenTogether extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const selectables = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'].map((element, i) => (
      <option key={i} value={element}>{element}</option>
    ))
    const sections = [{
      header: 'Weather',
      fields: ['Storm','1018 hPa', 'Rain']
    }, {
      header: 'Triggers',
      color: '#2196f3',
      fields: ['Dehydration', 'Stress', 'Strong smell', 'Depression']
    }].map((section, i) => (
      <div className="together__section" key={i}>
        <h3 className="together__header">{section.header}</h3>
        <div className="together__fields">
          {section.fields.map((field, j) => (<TogetherField color={section.color} key={j}>{field}</TogetherField>))}
        </div>
      </div>
    ))

    return (
      <OftenTogetherComponent>
        <Select>
          {selectables}
        </Select>
        <div>{sections}</div>
      </OftenTogetherComponent>
    )
  }
}

export default OftenTogether;
