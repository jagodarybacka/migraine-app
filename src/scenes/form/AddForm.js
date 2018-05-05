import React, {Component} from 'react';
import styled from 'styled-components';

import Date from './Date';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';

const Start = () => <Date />

const End = () => <Date end />

const Menstruation = () => {
  const answers = ['Yes', 'Coming Soon', 'No']
  return <SingleChoice title="Menstruation" answers={answers} />
}

const Localization = () => {
  const answers = ['Home', 'Outside', 'Transit', 'Work', 'Bed']
  return <SingleChoice title="Localization" answers={answers} />
}

const Mood = () => {
  const answers = ['Very Good', 'Good', 'Ok', 'Bad', 'Very Bad']
  return <SingleChoice title="Mood" answers={answers} />
}

const Pain = () => {
  const answers = ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum']
  return <SingleChoice title="Pain Intensity" answers={answers} />
}

const Medicines = () => {
  const answers = ['Ibuprofen', 'Paracetamol', 'Codeine', 'Triptans']
  return <MultipleChoice title="Medicines" answers={answers} />
}

const Triggers = () => {
  const answers = ['Alcohol', 'Stress', 'Tiredness', 'Dehydration', 'Hunger', 'Sport']
  return <MultipleChoice small title="Possible Triggers" answers={answers} />
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
