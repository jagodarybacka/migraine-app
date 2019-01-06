import React, { Component } from 'react';
import _ from 'lodash'
import { OftenTogetherComponent, Select, TogetherField } from './styles'
import {languageText} from '../../../languages/MultiLanguage.js'
import { lang } from 'moment';

class OftenTogether extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const selectables = languageText.oftenTogether.painOptions.map((element, i) => (
      <option key={i} value={element.value}>{element.text}</option>
    ))
    const sections = [{
      header: languageText.oftenTogether.weather,
      fields: languageText.oftenTogether.weatherOptions
    }, {
      header: languageText.oftenTogether.triggers,
      color: '#2196f3',
      fields: languageText.oftenTogether.triggersOptions
    }].map((section, i) => (
      <div className="together__section" key={i}>
        <h3 className="together__header">{section.header}</h3>
        <div className="together__fields">
          {section.fields.map((field, j) => (<TogetherField color={section.color} key={j}>{field.text}</TogetherField>))}
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