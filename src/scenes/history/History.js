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
      margin: 0 10%;
      margin-bottom:1rem;
      width: 100%;
    }
`

const DividerComponent = styled.h3`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0.5;
  width: 100%;
  padding-top: 1rem;
  border-top: 2px solid #eee;
`

const Divider = (props) => {
  return (
    <DividerComponent>{props.text}</DividerComponent>
  )
}

const History = () => {
  const HistoryList = [
    {
      month: "June",
      entries: [
        { date: "20 June", duration: 10, intensity: 2},
        { date: "6 June", duration: 5, intensity: 1},
        { date: "5 June", duration: 7, intensity: 5}
      ]
    },
    {
      month: "May",
      entries: [
        { date: "12 May", duration: 3, intensity: 1},
        { date: "10 May", duration: 5, intensity: 4}
      ]
    },
    {
      month: "March",
      entries: [
        { date: "19 March", duration: 3, intensity: 3},
        { date: "14 March", duration: 7, intensity: 1},
        { date: "9 March", duration: 5, intensity: 4}
      ]
    }
  ]
  return (
    <HistoryComponent >
      <Header />
      <h2>Recent migraines</h2>
      <Records>

        <li>
          <Divider text="May" />
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" intensity="1"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" intensity="4"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" intensity="5"/>
        </li>
        <li>
          <Divider text="March" />
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" intensity="3"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" intensity="2"/>
        </li>
        <li>
        <RecordCard date="12 May" duration="3 hours" intensity="1"/>
        </li>
        <li>
          <Divider text="No more entries" />
        </li>
      </Records>
      <Menubar />
    </HistoryComponent>
  );
}


export default History;
