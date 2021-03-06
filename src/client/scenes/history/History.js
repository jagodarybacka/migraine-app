import React, {Component} from 'react';
import styled from 'styled-components';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { withTheme } from "@callstack/react-theme-provider";
import {getTheme} from '../../themes/ThemeHandler.js';

import RecordCard from '../../components/RecordCard'

import Button from '../../components/Button';
import Header from '../../components/Header';
import Menubar from '../../components/Menubar';
import Divider from '../../components/Divider';
import { filter } from '../../utils/Filter';
import {languageText} from '../../languages/MultiLanguage.js';
import customImg from '../../assets/filter.png'
import customImgWhite from '../../assets/filter-white.png'
import closeIcon from '../../assets/exit.png'
import closeIconWhite from '../../assets/exit-white.png'
import expandIcon from '../../assets/expand.png'
import expandIconWhite from '../../assets/expand-white.png'
import collapseIcon from '../../assets/collapse.png'
import collapseIconWhite from '../../assets/collapse-white.png'
import clearFiltersIcon from '../../assets/nofilter.png'
import clearFiltersIconWhite from '../../assets/nofilter-white.png'
import CheckboxGroup from './CheckboxGroup';
import CustomPeriodHistory from '../../components/CustomPeriodHistory';

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
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};
  .date__header {
    text-align: center;
  }

`
const CustomIcon = styled.img`
  width: 25px;
  height: auto;
  right: calc(50% - 12.5px);
  position: absolute;
  margin-top: 2.4rem;
  opacity: 0.7;
`
const ExitIcon = styled.img`
  width: 20px;
  height: auto;
  right: 1.2rem;
  position: absolute;
  margin-top: calc(4rem);
  opacity: 0.7;
`

const ClearIcon = styled.img`
  width: 20px;
  height: auto;
  left: 1.2rem;
  position: absolute;
  margin-top: 4rem;
  opacity: 0.7;
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

const Title = styled.h3`
  &.date__header--applied {
    color: #e91e63;
  }
  img {
    width: 15px;
    height: auto;
    margin-left: 5px;
  }
`

const FiltersTitle = styled.h2`
  font-size: 1.2em;
`

const NoMoreStyle = styled.ul`
    padding: 0;
    margin-bottom: 5rem;
`
const DeleteModal = styled.div`
  position: fixed;
  top: 50%;
  left: calc(50% - 150px);
  z-index: 100;
  background: ${props=>props.theme.backgroundColor}
  text-align: center;
  width: 300px;
  padding-bottom: 1em;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);

`

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filtersVisible: false,
      customAnswers: {},
      history: {},
      order: [],
      rawData: [],
      checkboxData: { },
      data: [],
      filters: {},
      dates: {
        start: undefined,
        end: undefined
      },
      currentFilter: '',
      datesApplied: false,

      showDeleteModal: false,
      idToDelete: null
    }

    this.getIntensity = this.getIntensity.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
    this.askToDelete = this.askToDelete.bind(this);
    this.cancelDeleteModal = this.cancelDeleteModal.bind(this);
    this.editReport = this.editReport.bind(this);
    this.parseHistory = this.parseHistory.bind(this);
    this.formatDuration = this.formatDuration.bind(this);
    this.parseCustomAnswers = this.parseCustomAnswers.bind(this);
    this.fetchAnswers = this.fetchAnswers.bind(this);
    this.getCustomAnswers = this.getCustomAnswers.bind(this);
    this.onFiltersChange = this.onFiltersChange.bind(this);
    this.makeQuery = this.makeQuery.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.filterData = this.filterData.bind(this);
    this.filterVisibleChange = this.filterVisibleChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.confirmDate = this.confirmDate.bind(this);
  }

  componentDidMount() {
    axios.get('/api/reports')
      .then(({ data }) => {
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

  askToDelete(ev) {
    ev.stopPropagation()
    const id = ev.target.id
    if (id){
      this.setState({
        idToDelete: id,
        showDeleteModal: true
      })
    }
  }

  deleteReport() {
    this.setState({
      showDeleteModal: false,
    }, () => {
      const id = this.state.idToDelete;
      const url = "/api/reports/" + id;
      if (id) {
        axios.delete(url)
        .then((res) => {
          this.setState({
            idToDelete: null
          })
          this.componentDidMount();
        })
        .catch((err) => console.log(err));
      }
    })
  }

  cancelDeleteModal() {
    this.setState({
      showDeleteModal: false,
      idToDelete: null
    })
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
    const { rawData, dates } = this.state;
    const query = this.makeQuery();
    const results = filter(rawData, dates, query);
    this.parseHistory(results);
  }

  confirmDate() {
    this.setState((prevState) => ({
      ...prevState,
      currentFilter: '',
      datesApplied: true
    }), () => this.filterData())
  }

  clearFilters() {
    this.setState((prevState) => ({
      ...prevState,
      currentFilter: '',
      datesApplied: false,
      filters: {},
      dates: {
        start: undefined,
        end: undefined
      },
    }), () => {
      this.parseHistory(this.state.rawData)
    })
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

  handleDateChange(name, value) {
    this.setState(prevState => ({ 
      dates: { 
        ...prevState.dates, 
        [name]: value }
    }), () => {
      if(!this.state.dates.start && !this.state.dates.end){
        this.setState((prevState) => ({
          ...prevState,
          datesApplied: false
        }))
      }
    })
  }

  formatDuration(duration) {
    const d = moment.duration(duration).asSeconds();
    if(d < 60){
      return languageText.history.now;
    } else {
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
  }

  filterVisibleChange(filter) {
    if(this.state.currentFilter === filter) {
      this.setState((prevState) => ({
        ...prevState,
        currentFilter: ''
      }))
    } else {
      this.setState((prevState) => ({
        ...prevState,
        currentFilter: filter
      }))
    }

  }

  render() {
    const { history, order, checkboxData, filters } = this.state;
    const fields =['pain','medicines', 'triggers','reliefs', 'localization', 'aura','mood', 'menstruation'];

    const Checkboxes = checkboxData ? fields.map((field,id) => {
      return(
        <CheckboxGroup
          visible={this.state.currentFilter === field}
          key={id}
          small
          answers={checkboxData[field] ? checkboxData[field] : []}
          values={filters[field]}
          title={languageText.addForm[field]}
          name={field}
          onChange={this.onFiltersChange}
          onFilterChange={this.filterVisibleChange}
          />
      )
    }) : '';

    const collapseIconColored = getTheme()=="DarkTheme" ? collapseIconWhite : collapseIcon;
    const expandIconColored = getTheme()=="DarkTheme" ? expandIconWhite : expandIcon;

    const icon = this.state.currentFilter === "date" ? collapseIconColored : expandIconColored;
    const filtersModal = this.state.filtersVisible ? (
      <div>
      <FiltersTitle>{languageText.history.filters}</FiltersTitle>
      <Title className={"date__header " + (this.state.datesApplied ? "date__header--applied": "")} onClick={() => this.filterVisibleChange("date")}>{languageText.dateTime.date}<img src={icon} alt="arrow"/></Title>
      { this.state.currentFilter === "date" &&
        (<CustomPeriodHistory valueStart={this.state.dates.start} valueEnd={this.state.dates.end} onClick={() => this.setState({filtersVisible: false})} onChangeDate={this.handleDateChange} onConfirmFn={this.confirmDate}/>) }
      { Checkboxes }
      </div>
    ) : ''

    const deleteModal = this.state.showDeleteModal ? (
      <DeleteModal theme={this.props.theme}>
        <h3>{languageText.history.deleteMessage}</h3>
        <Button small text={languageText.history.cancel} onClick={this.cancelDeleteModal}/>
        <Button small primary text={languageText.history.delete} onClick={this.deleteReport}/>
      </DeleteModal>
    ) : "";

    return (
      <HistoryComponent theme={this.props.theme}>
        <Header />
        { deleteModal }
        <h2>{languageText.history.title}
        {this.state.filtersVisible === false
          ? <CustomIcon src={getTheme()=="DarkTheme" ? customImgWhite : customImg}  onClick={() => this.setState({filtersVisible: true})}/>
          : <ExitIcon   src={getTheme()=="DarkTheme" ? closeIconWhite : closeIcon} onClick={() => this.setState({filtersVisible: false})}/>}
        {this.state.filtersVisible === true
          ? (<ClearIcon src={getTheme()=="DarkTheme" ? clearFiltersIconWhite : clearFiltersIcon} alt="clear" onClick={this.clearFilters}/>)
          : ""}
        </h2>
        <div style={{ width: '100%' }}>
        {filtersModal}
        <Records>
          {!!order.length && order.map((chunk) => {
            const month = chunk.substring(4);
            const monthName = languageText.dateTime.monthNames[moment(month, 'MM').format('M') -1]

            return (
              <li key={chunk}>
                <Records>
                  <Divider text={monthName} />
                  {history[chunk].map((item) => {
                    const startDate = moment(new Date(item.start_date));
                    const endDate =  item.end_date ? moment(new Date(item.end_date)) :  moment(new Date(),'ddd MMM DD YYYY HH:mm:ss');
                    const duration = moment.duration(endDate.diff(startDate));
                    const formattedDuration = this.formatDuration(duration);
                    return (
                      <li key={item._id}>
                        <RecordCard handleClick={() => this.summaryReport(item)} date={startDate.format('DD.MM.YYYY')}
                          duration={formattedDuration}
                          intensity={this.getIntensity(item.pain)}
                          isRecent={false}
                          id={item._id}
                          handleDelete={this.askToDelete}
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

export default withRouter(withTheme(History));
