import React from 'react';
import styled from 'styled-components';
import deleteIcon from '../assets/trash.png';
import editIcon from '../assets/edit.png';
import {languageText} from '../languages/MultiLanguage.js';

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
  const strengthList = languageText.addForm.painAnswers.map(a => a.text);
  const strength = strengthList[props.intensity-1];
  const Img = props.isRecent ? "" : <div className="img"><img src={deleteIcon} alt="delete" id={props.id} onClick={props.handleDelete}></img></div> ;
  const Img2 = props.isRecent ? "" : <div className="img2"><img src={editIcon} alt="edit" id={props.id} onClick={props.handleEdit}></img></div>;

  if (props.isMock) {
    return (
      <Card className="RecordCard" color={colorList[3]} onClick={props.handleClick}>
        <h4>No migraines yet</h4>
      </Card>
    )
  }
  return (
    <Card className="RecordCard" color={color} onClick={props.handleClick}>
      <time>{props.date}</time>
      <h4>{props.type ? props.type : languageText.recordCard.migraine}</h4>
      <p>{props.duration}  {strength}</p>
      {Img}
      {Img2}
    </Card>
  );
}


export default RecordCard;
