import React, {Component} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

import RecordCard from '../../components/RecordCard'

import Header from '../../components/Header';
import Menubar from '../../components/Menubar';
import Divider from '../../components/Divider';
import { filter } from '../../utils/Filter';
import {languageText} from '../../languages/MultiLanguage.js';
import Checkbox from '../../components/Checkbox';
import customImg from '../../assets/custom-options.png'
import { check } from 'express-validator/check';
import CheckboxGroup from './CheckboxGroup';

const HistoryComponent = styled.section`
  display: block;
  padding: 7rem 0;
  margin: 0;
  h2 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 0 0 2rem 0;
    text-align: center;
  }
  h3 {
    margin-left: 1rem;
  }

`
const CustomIcon = styled.img`
  width: 40px;
  height: auto;
  right: 1rem;
  position: absolute;
  margin-top: 2rem;
`

const Records = styled.ul`
    display:flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    list-style-type: none;

    li {
      margin-bottom:1rem;
      width: 100%;
    }
`
const NoMoreStyle = styled.ul`
    padding: 0;
    margin-bottom: 5rem;
`


class History extends Component {
  constructor(props) {
    super(props);

    this.fieldsLocalization= ['Home', 'Outside','Transit', 'Work', 'Bed','School']
    this.fieldsPain= ['No Pain','Mild','Moderate','Intense','Maximum']

    this.state = {
      customAnswers: {},
      history: {},
      order: [],
      rawData: [],
      checkboxData: { },
      data: [],
      filters: {}
    }

    this.getIntensity = this.getIntensity.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
    this.editReport = this.editReport.bind(this);
    this.parseHistory = this.parseHistory.bind(this);
    this.formatDuration = this.formatDuration.bind(this);
    // this.handleChangeFilter = this.handleChangeFilter.bind(this);
    // this.handleChangeFilter2 = this.handleChangeFilter2.bind(this);
    this.parseCustomAnswers = this.parseCustomAnswers.bind(this);
    this.fetchAnswers = this.fetchAnswers.bind(this);
    this.getCustomAnswers = this.getCustomAnswers.bind(this);
    this.onFiltersChange = this.onFiltersChange.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
  }

  componentDidMount() {
    axios.get('/api/reports')
      .then(({ data }) => {
        // this.setState({ data });
        this.setState((prevState) => ({
          ...prevState,
          rawData: data
        }), () => this.parseHistory(data))
      })
      .catch((err) => console.log(err));
    this.getCustomAnswers();
    this.fetchAnswers();
  }

  getCustomAnswers() {
    axios.get('/api/users/answer')
    .then((res) => {
      if(res.status === 204){
        console.log("No content");
        this.fetchAnswers();
      } else {
        const data = this.parseCustomAnswers(res.data);
        this.setState((prevState) => ({
          ...prevState,
          customAnswers: data
        }), () => this.fetchAnswers())
      }
    })
    .catch((err) => {console.log(err);})
  }

  fetchAnswers() {
    const data = languageText.addForm;
    for(let option in data){
      if(option.includes("Answers")){
        const op = option.replace('Answers','');
        const answers = data[option].map((answer) => {
          return ({
            value: answer.value,
            text: answer.text
          })
        })
        const allAnswers = this.state.customAnswers[op] 
        ? answers.concat(this.state.customAnswers[op]) : answers;
        this.setState((prevState) => ({
          ...prevState,
          checkboxData: {
            ...prevState.checkboxData,
            [op]: allAnswers
          }
        }))
      }
    }
  }

  parseCustomAnswers(answers) {
    for(var op in answers) {
      if(answers[op].length > 0){
        answers[op] = this.mapValues(answers[op]);
      }
    }
    return answers;
  }

  mapValues(values) {
    return values.map((value) => {
      return {
        text: value,
        value: value
      }
    })
  }

  getIntensity(key) {
    const options = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'];
    return options.indexOf(key) + 1;
  }

  editReport(evt) {
    evt.stopPropagation()
    const { history } = this.props
    const { id } = evt.target
    if (id) {
    history.push(`edit/${id}/`)
    }
  }

  summaryReport(item) {
    const { history } = this.props
    history.push(`summary/`, {data: item, preview: true})
  }

  deleteReport(evt){
    evt.stopPropagation()
    if(evt.target.id){
      const id = evt.target.id;
      const url = "/api/reports/" + id;
      axios.delete(url)
      .then((res) => {
        this.componentDidMount();
      })
      .catch((err) => console.log(err));
    }

  }

  parseHistory(data) {
    let history = {};
    let order = [];

    if (data.length) {
      data.forEach((item) => {
        const key = moment(item.start_date).format('YYYYMM');
        const month = history[key] || [];
        history = {
          ...history,
          [key]: [
            ...month,
            item,
          ]
        };
      })

      order = Object.keys(history).sort((objA, objB) => {
        return objB - objA;
      });
    }

    this.setState((prevState) => ({ 
      ...prevState,
      history : history,
      order: order}));
  }

  onFiltersChange(evt) {
    const { filters } = this.state;
    const { name, value } = evt.target;
    let result;
    result = filters[name] || [];
    const shouldUncheck = result.indexOf(value);
    if (shouldUncheck >= 0) {
      result.splice(shouldUncheck, 1);
    } else {
      result = [
        ...result,
        value,
      ];
    }
    this.setState((prevState) => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        [name]: result
      }
    }), () => this.filterData())
  }

  filterData() {
    const { rawData } = this.state;
    const query = this.makeQuery();
    const results = filter(rawData, 
      {start: new Date('2019-01-01'), end: new Date('2019-02-01')},
      query)
    this.parseHistory(results);
  }

  makeQuery() {
    const {filters} = this.state;
    let query = {};
    for(let option in filters){
      if(filters[option].length > 0){
        query[option] = [];
        filters[option].forEach((answer) => {
          query[option].push(answer);
        })
      }
    }
    return query;
  }

  formatDuration(duration) {
    let text = "";
    if(duration.days() > 0){
      text+=duration.days() + "d ";
    }
    if(duration.hours() > 0){
      text+=duration.hours() + "h ";
    }
    if(duration.minutes() > 0){
      if(duration.days() === 0){
        text+=duration.minutes() + "m";
      }
    }
    return text;
  }

  render() {

    const { history, order, checkboxData, filters } = this.state;
    const fields = ['pain','medicines', 'triggers','reliefs', 'localization', 'aura','mood', 'menstruation'];
    const Checkboxes = checkboxData ? fields.map((field,id) => {
      return(
        <CheckboxGroup 
          key={id}
          small
          answers={checkboxData[field] ? checkboxData[field] : []}
          values={filters[field]}
          title={field}
          name={field}
          onChange={this.onFiltersChange}
          />
      )
    }) : '';
    return (
      <HistoryComponent >
        <Header />
        <h2>{languageText.history.title}
        {/* <CustomIcon src={customImg} onClick={() => this.setState({customPeriodVisible: true})}/> */}
        </h2>
        <div style={{ width: '100%' }}>
        { Checkboxes }
        <Records>
          {!!order.length && order.map((chunk) => {
            const month = chunk.substring(4);
            const monthName = languageText.dateTime.monthNames[moment(month, 'MM').format('M') -1]

            return (
              <li key={chunk}>
                <Records>
                  <Divider text={monthName} />
                  {history[chunk].map((item) => {
                    const startDate = moment(item.start_date, 'YYYY-MM-DDTHH:mm:ss');
                    const endDate =  item.end_date ? moment(item.end_date,'YYYY-MM-DDTHH:mm:ss') : moment(new Date(),'ddd MMM DD YYYY HH:mm:ss');
                    const duration = moment.duration(endDate.diff(startDate));
                    const formattedDuration = this.formatDuration(duration);
                    return (
                      <li key={item._id}>
                        <RecordCard handleClick={() => this.summaryReport(item)} date={startDate.format('DD.MM.YYYY')}
                          duration={formattedDuration}
                          intensity={this.getIntensity(item.pain)}
                          isRecent={false}
                          id={item._id}
                          handleDelete={this.deleteReport}
                          handleEdit={this.editReport}
                          hasEnd={!!item.end_date}
                          />
                      </li>
                    )
                  })}
                </Records>
              </li>
            );
          })}
          <li key="9999">
            <NoMoreStyle>
              <Divider text={languageText.history.noMore} />
            </NoMoreStyle>
          </li>
        </Records>
        </div>
        <Menubar />
      </HistoryComponent>
    );
  }
}

export default withRouter(History);
