import React from 'react';
import RadioButton from '../../components/RadioButton'

const SingleChoice = (props) => {
  const answers = props.answers;
  let valueData = "";
  if (props.valueData) {
    valueData = props.valueData;
  }
  const items = answers.map((answer, index) => {
    return (
      <RadioButton
        text={answer.text}
        key={index}
        name={props.name}
        id={`${props.name}_${index}`}
        value={answer.value}
        checked={valueData === answer.value}
        onChange={props.onChange}
        color={props.color}
        img={props.img}
        imgColor={props.imgColor}
      />
    );
  })

  return (
    <div>
      <h2>{props.title}</h2>
      {items}
    </div>
  );
}

export default SingleChoice;
