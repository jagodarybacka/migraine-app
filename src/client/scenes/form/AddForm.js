import React from 'react';

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
import questionmarkColor2 from '../../assets/questionmark-color2.png'
import eye from '../../assets/eye.png'
import eyeColor from '../../assets/eye-color.png'

import Text from './Text'
import Date from './Date';
import SingleChoice from './SingleChoice';
import MultipleChoice from './MultipleChoice';
import {languageText} from '../../languages/MultiLanguage.js';

const Start = props => {
  return (
    <Date
      valueDate={props.valueDate}
      valueTime={props.valueTime}
      name="start"
      onNowButtonClick={props.onNowButtonClick}
      onSubtractHourClick={props.onSubtractHourClick}
      onChange={props.onChange}
      id='start'
    />
  )
}

const End = props => {
  return (
    <Date
      valueDate={props.valueDate}
      valueTime={props.valueTime}
      name="end"
      onNowButtonClick={props.onNowButtonClick}
      onSubtractHourClick={props.onSubtractHourClick}
      onNotYetClick = {props.onNotYetClick}
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
      valueData={props.valueData}
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
      valueData={props.valueData}

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
      valueData={props.valueData}
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
      valueData={props.valueData}
    />
  );
}

const Medicines = props => {
  const answers = languageText.addForm.medicinesAnswers;//['Ibuprofen', 'Paracetamol', 'Codeine', 'Triptans']
  return (
    <MultipleChoice
      values={props.values}
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
      values={props.values}
      title={languageText.addForm.triggers}
      name="triggers"
      answers={answers}
      onChange={props.onChange}
      img={questionmark} imgColor={questionmarkColor} color='#607d8b'
    />
  );
}

const Aura = props => {
  const answers = languageText.addForm.auraAnswers;//['Nausea', 'Visual Disturbances', 'Hypersensitive To Light', 'Hypersensitive To Sound', 'Hypersensitive To Smell']
  return (
    <MultipleChoice
      values={props.values}
      title="Aura"
      name="aura"
      answers={answers}
      onChange={props.onChange}
      img={eye} imgColor={eyeColor} color='#67252e'
    />
  );
}

const Pressure = props => {
  return (
    <Text
    valueData={props.valueData}
    title = {languageText.addForm.pressure.title}
    subtitle = {languageText.addForm.pressure.subtitle}
    name="pressure"
    type= "text"
    onChange={props.onChange}
  />
  )
}

const SleepDuration = props => {
  return (
    <Text
    valueData={props.valueData}
    title = {languageText.addForm.sleepDuration.title}
    subtitle = {languageText.addForm.sleepDuration.subtitle}
    name="sleep_duration"
    type= "number"
    onChange={props.onChange}
  />
  )
}

const Reliefs = props => {
  const answers = languageText.addForm.reliefsAnswers;
  return (
    <MultipleChoice
      values={props.values}
      title={languageText.addForm.reliefs}
      name="reliefs"
      answers={answers}
      onChange={props.onChange}
      img={questionmark} imgColor={questionmarkColor2} color='#4169E1'
    />
  )
}


export {
  Start,
  End,
  Menstruation,
  Localization,
  Mood,
  Pain,
  Medicines,
  Triggers,
  Aura,
  Pressure,
  SleepDuration,
  Reliefs
}
