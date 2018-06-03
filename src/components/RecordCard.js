import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Card = styled.div`
  background-color: ${props => props.color};
  color: #fff;
  border-radius: 2px 20px 20px 20px;
  padding: 0.5rem;
  position: relative;
  margin: 0 10%;

  time {
    position: absolute;
    right: 1.5rem;
    top: 1rem;
  }
  h4 {
    margin: 0.5rem;
    text-transform: uppercase;
  }
  p {
    margin: 0.5rem;
  }
`

const RecordCard = (props) => {
  const colorList = ['#AADD6D', '#A7C651', '#EAB933', '#ED8836', '#EF6F5A']
  const color = colorList[props.intensity-1] || colorList[0] ;
  const strengthList = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum']
  const strength = strengthList[props.intensity-1];
  return (
    <Card className="RecordCard" color={color}>
      <time>{props.date}</time>
      <h4>{props.type ? props.type : "Migraine"}</h4>
      <p>{props.duration}  {strength}</p>
    </Card>
  );
}


export default RecordCard;
