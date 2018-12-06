import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import moment from 'moment';

import RecordCard from '../../components/RecordCard'


const Widget = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 10%;
  text-align: initial;

  h3 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 1rem 0;
    align-self: flex-start;
  }
  a {
    margin: 1rem;
    align-self: flex-end;
    font-weight: 300;

  }


`
class HistoryWidget extends Component {
  constructor(props) {
    super(props);

    this.getIntensity = this.getIntensity.bind(this);
  }

  getIntensity(key) {
    const options = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'];
    return options.indexOf(key) + 1;
  }

  render() {
    const item = this.props.item;
    if(item){
      const startDate = moment(item.start_date);
      const endDate = moment(item.end_date);
      const duration = moment.duration(endDate.diff(startDate));
      const formattedDuration = duration.asHours().toFixed(1).replace(/\.0$/, '');
      return (
        <Widget >
          <h3>Recent migraine</h3>
          {item && (
            <RecordCard 
              date={`${moment(item.start_date).format('DD.MM.YYYY')}`} 
              duration={formattedDuration + "h"}
              intensity={this.getIntensity(item.pain)} 
              isRecent={true}
            />        
          )}
          <Link to="/history">See all...</Link>
        </Widget>
      );
    }
    else {
      return (
        <Widget >
          <h3>Recent migraine</h3>
          <Link to="/history">See all...</Link>
        </Widget>
      )
    }  
  }
}

export default HistoryWidget;
