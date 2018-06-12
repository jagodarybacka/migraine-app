import React, {Component} from 'react';
import styled from 'styled-components';

import Checkbox from '../../components/Checkbox'


const MultipleChoice = (props) => {
  const answers = props.answers;
  const items = answers.map((answer, index) => {
    return (
      <Checkbox
        small={props.small}
        text={answer}
        key={index}
        value={answer}
        name={props.name}
        onChange={props.onChange}
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
