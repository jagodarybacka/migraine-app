import React, {Component} from 'react';
import styled from 'styled-components';

import Checkbox from '../../components/Checkbox'


const MultipleChoice = (props) => {
  const answers = props.answers;
  let values = []
  if (props.values && Array.isArray(props.values)) {
    values = props.values
  }

  const items = answers.map((answer, index) => {
    return (
      <Checkbox
        text={answer}
        key={index}
        value={answer}
        checked={values.includes(answer)}
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
