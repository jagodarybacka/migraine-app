import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import deleteIcon from '../assets/trash.png';
import editIcon from '../assets/edit.png';

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
  img {
    width: 25px;
    height: auto;
  }
  .img {
    cursor: pointer;
    position: absolute;
    right: 1.5rem;
    top: 2.5rem;
  }
  .img2 {
    cursor: pointer;
    position: absolute;
    right: 4rem;
    top: 2.5rem;

  }
`

const RecordCard = (props) => {
  const colorList = ['#AADD6D', '#A7C651', '#EAB933', '#ED8836', '#EF6F5A']
  const color = colorList[props.intensity-1] || colorList[0] ;
  const strengthList = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum']
  const strength = strengthList[props.intensity-1];
  const Img = props.isRecent ? "" : <div className="img"><img src={deleteIcon} id={props.id} onClick={props.handleDelete}></img></div> ;
  const Img2 = props.isRecent ? "" : <div className="img2"><img src={editIcon} id={props.id} onClick={props.handleEdit}></img></div>;

  return (
    <Card className="RecordCard" color={color}>
      <time>{props.date}</time>
      <h4>{props.type ? props.type : "Migraine"}</h4>
      <p>{props.duration}  {strength}</p>
      {Img}
      {Img2}
    </Card>
  );
}


export default RecordCard;
