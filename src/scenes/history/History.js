import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';

import RecordCard from '../../components/RecordCard'

import Header from '../../components/Header';
import Menubar from '../../components/Menubar';
import Divider from '../../components/Divider';

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

`

const Records = styled.ul`
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 7rem;
    padding: 0;
    list-style-type: none;

    li {
      margin-bottom:1rem;
      width: 100%;
    }
`

class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      history: {},
      order: [],
    }
  }

  componentDidMount() {
    axios.get('/api/reports')
      .then(({ data }) => {
        this.parseHistory(data);
      })
      .catch((err) => console.log(err));
  }
  
  getIntensity(key) {
    const options = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'];
    return options.indexOf(key) + 1;
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

    this.setState({ history, order });
  }

  render() {
    const { history, order } = this.state;

    return (
      <HistoryComponent >
        <Header />
        <h2>Recent migraines</h2>
        <div style={{ width: '100%' }}>
          <Records>
            {!!order.length && order.map((chunk) => {
              const month = chunk.substring(4);
              const monthName = moment(month, 'MM').format('MMMM');

              return (
                <li key={chunk}>
                  <Records>
                    <Divider text={monthName} />
                    {history[chunk].map((item) => {
                      const startDate = moment(item.start_date);
                      const endDate = moment(item.end_date);
                      const duration = moment.duration(endDate.diff(startDate));
                      const formattedDuration = duration.asHours().toFixed(2).replace(/\.00$/, '');

                      return (
                        <li key={item._id}>
                          <RecordCard date={startDate.format('DD.MM.YYYY')}
                            duration={formattedDuration + "h"}
                            intensity={this.getIntensity(item.pain)} />
                        </li>
                      )
                    })}
                  </Records>
                </li>
              );
            })}
            <li key="9999">
              <Divider text="No more entries" />
            </li>
          </Records>
        </div>
        <Menubar />
      </HistoryComponent>
    );
  }
}

export default History;
