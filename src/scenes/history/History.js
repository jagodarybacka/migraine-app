import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import RecordCard from '../../components/RecordCard'

import Header from '../../components/Header';
import Menubar from '../../components/Menubar';

const HistoryComponent = styled.section`
  display: block;
  padding: 7rem 0;
  margin: 0;
  h3 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 1rem 0;
  }

`

const Records = styled.ul`
    display:block;
    width: 100%;
    margin: 0;
    margin-bottom: 7rem;
    padding: 0;

    li {
      margin-bottom:1rem;
    }
`

const History = () => {
  return (
    <HistoryComponent >
      <Header />
      <h3>Recent migraine</h3>
      <Records>
        <li>
        <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" strength="Mild"/>
        </li>
      </Records>
      <Menubar />
    </HistoryComponent>
  );
}


export default History;
