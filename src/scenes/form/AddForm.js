import React, {Component} from 'react';
import styled from 'styled-components';

import Date from './Date';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';

const Start = props => {
  return (
    <Date
      name="start"
      onChange={props.onChange}
      id='start'
    />
  )
}

const End = props => {
  return (
    <Date
      name="end"
      onChange={props.onChange}
      id='end'
      end
    />
  )
}

const Menstruation = props => {
  const answers = ['Yes', 'Coming Soon', 'No']
  return (
    <SingleChoice
      title="Menstruation"
      name="menstruation"
      answers={answers}
      onChange={props.onChange}
    />
  );
}

const Localization = props => {
  const answers = ['Home', 'Outside', 'Transit', 'Work', 'Bed','School']
  return (
    <SingleChoice
      title="Localization"
      name="localization"
      answers={answers}
      onChange={props.onChange}
    />
  );
}

const Mood = props => {
  const answers = ['Very Good', 'Good', 'Ok', 'Bad', 'Very Bad']
  return (
    <SingleChoice
      title="Mood"
      name="mood"
      answers={answers}
      onChange={props.onChange}
    />
  );
}

const Pain = props => {
  const answers = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum']
  return (
    <SingleChoice
      title="Pain Intensity"
      name="pain"
      answers={answers}
      onChange={props.onChange}
    />
  );
}

const Medicines = props => {
  const answers = ['Ibuprofen', 'Paracetamol', 'Codeine', 'Triptans']
  return (
    <MultipleChoice
      title="Medicines"
      name="medicines"
      answers={answers}
      onChange={props.onChange}
    />
  );
}

const Triggers = props => {
  const answers = ['Alcohol', 'Stress', 'Tiredness', 'Dehydration', 'Hunger', 'Sport']
  return (
    <MultipleChoice
      title="Possible Triggers"
      name="triggers"
      answers={answers}
      onChange={props.onChange}
      small
    />
  );
}


export {
  Start,
  End,
  Menstruation,
  Localization,
  Mood,
  Pain,
  Medicines,
  Triggers
}
