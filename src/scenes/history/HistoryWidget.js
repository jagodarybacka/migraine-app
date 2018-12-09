import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import moment from 'moment';

import RecordCard from '../../components/RecordCard'
import {languageText} from '../../languages/MultiLanguage.js';

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
const HistoryWidget = ({ item }) => {
  return (
    <Widget >
      <h3>{languageText.historyWidget.title}</h3>
      {item && (
        <RecordCard 
          date={`${moment(item.start_date).format('DD.MM.YYYY')} ${moment(item.start_date).format('HH:mm')}`} 
          duration={languageText.historyWidget.duration}
          strength={item.pain} 
        />        
      )}
      <Link to="/history">{languageText.historyWidget.seeAll}</Link>
    </Widget>
  );
}


export default HistoryWidget;
