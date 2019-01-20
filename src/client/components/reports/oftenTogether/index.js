import React, { Component } from 'react';
import { OftenTogetherComponent, Select, TogetherField, ErrorMessage } from './styles'
import {languageText} from '../../../languages/MultiLanguage.js'
import axios from 'axios';

class OftenTogether extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: 'Moderate',
      data: {},
      error: false
    }
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    const url = "/api/reports/together/" + this.state.selectedOption;
    axios.get(url)
    .then((res) => {
      if(res.status === 204){
        this.setState((prevState) => ({
          ...prevState,
          data: {},
          error: true
        }))
        return;
      }
      if(res.data) {
        let error = false;
        if(res.data.localization.length === 0 || res.data.reliefs.length === 0 || 
            res.data.triggers.length === 0 || res.data.medicines.length === 0 ){
          error = true;
        }
        this.setState((prevState) => ({
          ...prevState,
          error: error,
          data: {
            localization: res.data.localization,
            reliefs: res.data.reliefs,
            triggers: res.data.triggers,
            medicines: res.data.medicines,
            weather: res.data.weather
          }
        }))
      }
    })
    .catch((err) => {console.log(err)})
  }

  getTranslatedValue(toTranslate, type){
    if(toTranslate === '')
      return '';
    let translationDict = languageText.oftenTogether[type+"Options"];
    let foundPair = translationDict.find(f => f.value === toTranslate);
    if(foundPair !== undefined)
      return foundPair.text;
    else
      return toTranslate;
  }

  getWeather(){
    const weather = this.state.data.weather;
    if(weather) {
      let answers = [];
      if(weather.pressure && weather.pressure.length !== 0){
        weather.pressure.forEach((value) => {
          answers.push(value + "hPa");
        })
      }
      if(weather.temperature && weather.temperature.length !== 0){
        weather.temperature.forEach((value) => {
          answers.push(value + String.fromCharCode(176) + "C")
        })
      }
      if(weather.humidity && weather.humidity.length !== 0){
        weather.humidity.forEach((value) => {
          answers.push(languageText.oftenTogether.humidity + value + '%')
        })
      }
      if(weather.description && weather.description.length !== 0){
        weather.description.forEach((value) => {
          answers.push(value)
        })
      }
    return answers;
    }
  }

  handleSelectChange(event) {
    const option = event.target.value;
    this.setState({
      selectedOption: option
    }, () => {
      this.getData();
    });
  }

  render() {
    let { selectedOption } = this.state;
    const selectables = languageText.oftenTogether.painOptions.map((element, i) => (
      <option key={i} value={element.value} label={element.text}/>
    ))
    const sections = [{
      header: languageText.oftenTogether.weather,
      value: "weather",
      fields: this.getWeather()// ['1020hPa', 'Rain']
    }, {
      header: languageText.oftenTogether.triggers,
      value: "triggers",
      color: '#2196f3',
      fields: this.state.data.triggers
    }, {
      header: languageText.oftenTogether.localization,
      value: "localization",
      fields: this.state.data.localization
    }, {
      header: languageText.oftenTogether.reliefs,
      value: "reliefs",
      color: '#2196f3',
      fields: this.state.data.reliefs
    }, {
      header: languageText.oftenTogether.medicines,
      value: "medicines",
      fields: this.state.data.medicines
    }].map((section, i) => (
      <div className="together__section" key={i}>
        <h3 className="together__header">{section.header}</h3>
        <div className="together__fields">
          { section.fields && section.fields.length !== 0 
            ? section.fields.map((field, j) => (<TogetherField color={section.color} key={j}>{this.getTranslatedValue(field,section.value)}</TogetherField>))
            : ''
          }
        </div>
      </div>
    ))
    
    const error = this.state.error 
      ? (<ErrorMessage><h5>{languageText.oftenTogether.error}</h5></ErrorMessage>) : '';
    return (
      <OftenTogetherComponent>
        <Select
          onChange={this.handleSelectChange}
          value={selectedOption}>
          {selectables}
        </Select>
        { error }
        <div>{sections}</div>
      </OftenTogetherComponent>
    )
  }
}

export default OftenTogether;
