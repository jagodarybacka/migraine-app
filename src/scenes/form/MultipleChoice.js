import React, {Component} from 'react';
import styled from 'styled-components';

import Checkbox from '../../components/Checkbox'


const MultipleChoice = (props) => {
  const answers = props.answers;
  const items = answers.map((answer, index) => {
    return (
      <Checkbox
        text={answer.text}
        key={index}
        value={answer.value}
        name={props.name}
        onChange={props.onChange}
        color={props.color}
        img={props.img}
        imgColor={props.imgColor}
      />
    )
  })
  return (
    <div>
      <h2>{props.title}</h2>
      {items}
    </div>
  );
}


export default MultipleChoice;
