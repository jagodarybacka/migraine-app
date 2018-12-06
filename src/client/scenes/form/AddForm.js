import React, {Component} from 'react';
import styled from 'styled-components';

import date from '../../assets/date.png'
import time from '../../assets/time.png'
import faceNeutral from '../../assets/face-neutral.png'
import faceSmile from '../../assets/face-smile.png'
import drop from '../../assets/drop.png'
import localization from '../../assets/localization.png'
import medicine from '../../assets/medicine.png'
import questionmark from '../../assets/questionmark.png'
import faceNeutralColor from '../../assets/face-neutral-color.png'
import faceSmileColor from '../../assets/face-smile-color.png'
import dropColor from '../../assets/drop-color.png'
import localizationColor from '../../assets/localization-color.png'
import medicineColor from '../../assets/medicine-color.png'
import questionmarkColor from '../../assets/questionmark-color.png'

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
      img={drop} imgColor={dropColor} color='#E91E63'
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
      img={localization} imgColor={localizationColor} color='#cddc39'
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
      img={faceSmile} imgColor={faceSmileColor} color='#ffc107'
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
      img={faceNeutral} imgColor={faceNeutralColor} color='#ED8836'
    />
  );
}

const Medicines = props => {
  const answers = ['Ibuprofen', 'Paracetamol', 'Codeine', 'Triptans', 'Other']
  return (
    <MultipleChoice
      title="Medicines"
      name="medicines"
      answers={answers}
      onChange={props.onChange}
      img={medicine} imgColor={medicineColor} color='#00bcd4'
    />
  );
}

const Triggers = props => {
  const answers = ['Alcohol', 'Stress', 'Tiredness', 'Dehydration', 'Hunger', 'Sport', 'Other']
  return (
    <MultipleChoice
      title="Possible Triggers"
      name="triggers"
      answers={answers}
      onChange={props.onChange}
      img={questionmark} imgColor={questionmarkColor} color='#607d8b'
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
