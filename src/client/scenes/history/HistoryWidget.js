import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import moment from 'moment';

import RecordCard from '../../components/RecordCard'
import {languageText} from '../../languages/MultiLanguage.js';

const Widget = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 5%;
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
  .RecordCard {
    margin: 0;
  }


`
class HistoryWidget extends Component {
  constructor(props) {
    super(props);

    this.getIntensity = this.getIntensity.bind(this);
    this.formatDuration = this.formatDuration.bind(this);
  }

  getIntensity(key) {
    const options = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum'];
    return options.indexOf(key) + 1;
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

  render() {
    const item = this.props.item;
    if(item){
      const startDate = moment(new Date(item.start_date),'ddd MMM DD YYYY HH:mm:ss');
                    const endDate =  item.end_date ? moment(new Date(item.end_date),'ddd MMM DD YYYY HH:mm:ss') : moment(new Date(),'ddd MMM DD YYYY HH:mm:ss');
      const duration = moment.duration(endDate.diff(startDate));
      const formattedDuration = this.formatDuration(duration);
      return (
        <Widget >
          <h3>{languageText.historyWidget.title}</h3>
          {item && (
            <RecordCard
              date={`${moment(item.start_date).format('DD.MM.YYYY')}`}
              duration={formattedDuration}
              intensity={this.getIntensity(item.pain)}
              isRecent={true}
              hasEnd={!!item.end_date}
            />
          )}
          <Link to="/history">{languageText.historyWidget.seeAll}</Link>
        </Widget>
      );
    }
    else {
      return (
        <Widget >
          <h3>{languageText.historyWidget.title}</h3>
          <RecordCard
            isMock
            isRecent={true}
          />
          <Link to="/history">{languageText.historyWidget.seeAll}</Link>
        </Widget>
      )
    }
  }
}

export default HistoryWidget;
