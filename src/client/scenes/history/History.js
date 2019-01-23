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
      history: {},
      order: [],
      rawData: [],
      localizations: {}, 
      intensity: {},
      data: []
    }

    this.getIntensity = this.getIntensity.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
    this.editReport = this.editReport.bind(this);
    this.parseHistory = this.parseHistory.bind(this);
    this.formatDuration = this.formatDuration.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleChangeFilter2 = this.handleChangeFilter2.bind(this);

  }

  componentDidMount() {
    axios.get('/api/reports')
      .then(({ data }) => {
        this.setState({ data });
      })
      .catch((err) => console.log(err));

    axios.get('/api/users/answer')
    .then((res) => {
      if(res.status === 204){
        console.log("No content");
      } else {
        const answerLocalization = res.data.localization
        this.fieldsLocalization = [...this.fieldsLocalization, ...answerLocalization]
     }
    })
    .catch((err) => {console.log(err);})
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

//   if filterLocalizations.length to filters = { localization: filterLocalizations }, i potem
// if filterIntensity.length to filters = { ...filters, intensity: filterIntensity }
// i na koniec data = filter(data, null, filters)

  parseHistory() {
    let history = {};
    let order = [];
    let data = this.state.data;

    const localizations = this.state.localizations;
    const keyLocalizations = Object.keys(localizations)

    const intensity = this.state.intensity;
    const keyIntensity = Object.keys(intensity)
   
    const filterLocalizations = keyLocalizations.filter( key => localizations[key] === true)
    const filterIntensity = keyIntensity.filter( key => intensity[key] === true)

    var filters ={}
    if( filterLocalizations.length > 0){
      filters = { localization: filterLocalizations }

      if(filterIntensity.length > 0) {
        filters = { ...filters, pain: filterIntensity }
      }
    }
    else if(filterIntensity.length > 0){
      filters = { pain: filterIntensity }
    }
    data = filter(data, null, filters)

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
      
  return {history, order}
  }

    //this.setState({ order }
    //this.setState({ order, rawData: data }
      // () => {
      //   const results = filter(this.state.rawData, 
      //     {start: new Date('2019-01-01'), end: new Date('2019-02-01')},
      //     // {pain:"Mild"});
      //     //{localization:["Outside","Work"],triggers:"Sport"});
      //     {localization:["Outside","Work"]});
      //     // {localization:"Outside",triggers:["Sport","Stress"]});
      //   console.log(results);
      // }
     // );
  handleChangeFilter(e) {
  const item = e.target.name;
  const isChecked = e.target.checked;
  
  this.setState(prevState => ({ 
    localizations:{ ...prevState.localizations, [item]: isChecked }}))
}

  handleChangeFilter2(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    
    this.setState(prevState => ({ 
      intensity:{ ...prevState.intensity, [item]: isChecked }}))
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

    const { history, order } = this.parseHistory() 

    return (
      <HistoryComponent >
        <Header />
        <h2>{languageText.history.title}
        {/* <CustomIcon src={customImg} onClick={() => this.setState({customPeriodVisible: true})}/> */}
        </h2>
        <div style={{ width: '100%' }}>
        <h3>Localization</h3>
         <div>
          {
            this.fieldsLocalization.map((field) => (
              <Checkbox
                key={field}
                small
                text={field}
                name={field}
                onChange={this.handleChangeFilter}
              />
            ))
          }
          </div>
          <h3>Pain intensity</h3>
          <div>
          {
            this.fieldsPain.map((field) => (
              <Checkbox
              key={field}
              small
              text={field}
              name={field}
              onChange={this.handleChangeFilter2}
              />
            ))
          }
        </div>

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
