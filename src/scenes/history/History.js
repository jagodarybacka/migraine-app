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
  // TODO: What date format will front receive?
  const HistoryList = [
    {
      month: "June",
      entries: [
        { date: new Date('20 June 2018'), duration: 10, intensity: 2},
        { date: new Date('6 June 2018'), duration: 5, intensity: 1},
        { date: new Date('5 June 2018'), duration: 7, intensity: 5}
      ]
    },
    {
      month: "May",
      entries: [
        { date: new Date('12 May 2018'), duration: 3, intensity: 1},
        { date: new Date('10 May 2018'), duration: 5, intensity: 4}
      ]
    },
    {
      month: "March",
      entries: [
        { date: new Date('19 March 2018'), duration: 3, intensity: 3},
        { date: new Date('14 March 2018'), duration: 7, intensity: 1},
        { date: new Date('9 March 2018'), duration: 5, intensity: 4}
      ]
    }
  ]
  let index = 0;
  const records = HistoryList.map(e => {
    let divider = <li key={index++}><Divider text={e.month}/></li>
    let entries = e.entries.map(m => {
      return (
        <li key={index++}>
          <RecordCard date={m.date.toLocaleDateString()}
                      duration={m.duration + "h"}
                      intensity={m.intensity}/>
        </li>
      )
    })
    return (
      <div key={index++} style={{width: '100%'}}>
        {divider}
        {entries}
      </div>
    )
  })

  return (
    <HistoryComponent >
      <Header />
      <h2>Recent migraines</h2>
      <Records>
        {records}
        <li key="9999">
          <Divider text="No more entries" />
        </li>
      </Records>
      <Menubar />
    </HistoryComponent>
  );
}


export default History;
