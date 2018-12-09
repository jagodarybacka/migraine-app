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
import {languageText} from '../../languages/MultiLanguage.js';

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
  const answers = languageText.addForm.menstruationAnswers;//['Yes', 'Coming Soon', 'No']
  return (
    <SingleChoice
      title={languageText.addForm.menstruation}
      name="menstruation"
      answers={answers}
      onChange={props.onChange}
      img={drop} imgColor={dropColor} color='#E91E63'
    />
  );
}

const Localization = props => {
  const answers = languageText.addForm.localizationAnswers;//['Home', 'Outside', 'Transit', 'Work', 'Bed','School']
  return (
    <SingleChoice
      title={languageText.addForm.localization}
      name="localization"
      answers={answers}
      onChange={props.onChange}
      img={localization} imgColor={localizationColor} color='#cddc39'
    />
  );
}

const Mood = props => {
  const answers = languageText.addForm.moodAnswers;//['Very Good', 'Good', 'Ok', 'Bad', 'Very Bad']
  return (
    <SingleChoice
      title={languageText.addForm.mood}
      name="mood"
      answers={answers}
      onChange={props.onChange}
      img={faceSmile} imgColor={faceSmileColor} color='#ffc107'
    />
  );
}

const Pain = props => {
  const answers =languageText.addForm.painAnswers;// ['No Pain', 'Mild', 'Moderate', 'Intense', 'Maximum']
  return (
    <SingleChoice
      title={languageText.addForm.pain}
      name="pain"
      answers={answers}
      onChange={props.onChange}
      img={faceNeutral} imgColor={faceNeutralColor} color='#ED8836'
    />
  );
}

const Medicines = props => {
  const answers = languageText.addForm.medicinesAnswers;//['Ibuprofen', 'Paracetamol', 'Codeine', 'Triptans']
  return (
    <MultipleChoice
      title={languageText.addForm.medicines}
      name="medicines"
      answers={answers}
      onChange={props.onChange}
      img={medicine} imgColor={medicineColor} color='#00bcd4'
    />
  );
}

const Triggers = props => {
  const answers = languageText.addForm.triggersAnswers;//['Alcohol', 'Stress', 'Tiredness', 'Dehydration', 'Hunger', 'Sport']
  return (
    <MultipleChoice
      title={languageText.addForm.triggers}
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
