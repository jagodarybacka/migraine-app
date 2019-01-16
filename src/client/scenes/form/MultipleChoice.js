import React from 'react';
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
        text={answer.text}
        key={index}
        value={answer.value}
        checked={values.includes(answer.value)}
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
