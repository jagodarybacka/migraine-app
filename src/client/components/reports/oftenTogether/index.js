import React, { Component } from 'react';
import { OftenTogetherComponent, Select, TogetherField, QuestionIcon } from './styles'
import {languageText} from '../../../languages/MultiLanguage.js'
import questionImg from '../../../assets/questionmark-circle.png'
import Help from '../../Help'

class OftenTogether extends Component {
  constructor(props) {
    super(props)
    this.state = {
      helpVisible: false
    }
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

    const helpModal = this.state.helpVisible ? (
      <Help type="oftenTogether" onConfirmFn={() => {this.setState({helpVisible: false})}}/>
    ) : ''

    const IconQuestion = !this.state.helpVisible ? (
      <QuestionIcon src={questionImg} onClick={() => this.setState({helpVisible: true})}/>
    ) : ''

    return (
      <OftenTogetherComponent>
        { IconQuestion }
        <h2>{languageText.addForm.pain}</h2>
        <Select>
          {selectables}
        </Select>
        <div>{sections}</div>
        { helpModal }
      </OftenTogetherComponent>
    )
  }
}

export default OftenTogether;
