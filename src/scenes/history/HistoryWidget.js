import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

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
const HistoryWidget = () => {
  return (
    <Widget >
      <h3>Recent migraine</h3>
      <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
      <Link to="/history">See all...</Link>
    </Widget>
  );
}


export default HistoryWidget;
