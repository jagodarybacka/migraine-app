import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import RecordCard from '../../components/RecordCard'

import Header from '../../components/Header';
import Menubar from '../../components/Menubar';

const HistoryComponent = styled.section`
  display: block;
  padding: 6rem 0;
  margin: 0;
  h2 {
    text-transform: uppercase;
    font-weight: 300;
    margin: 1rem 0;
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
      margin: 0 10%;
      margin-bottom:1rem;
      width: 100%;
    }
`

const History = () => {
  return (
    <HistoryComponent >
      <Header />
      <h2>Recent migraines</h2>
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
