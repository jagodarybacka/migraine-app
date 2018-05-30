import React, {Component} from 'react';
import styled from 'styled-components';
import { Route, Switch } from "react-router-dom";

import Button from '../components/Button'
import Header from '../components/Header';
import {
  Start,
  End,
  Menstruation,
  Localization,
  Mood,
  Pain,
  Medicines,
  Triggers
} from './form/AddForm';


const RecordForm = styled.article`
  h2 {
    text-transform: uppercase;
    font-weight: 900;
    text-align: center;
  }

  p {
    text-transform: uppercase;
    font-size: 1rem;

  }
`

const Buttons = styled.div `
  position: absolute;
  bottom: 0;
  display: flex;
  width: 90%;
  max-width: 860px;
  justify-content: space-between;
  align-items: center;
  > button {
    min-width: auto;
    font-size: 1rem;
    padding: 10px 15px;
    background-color: #f0908b80;
  }
  > button:hover {
    background-color: #f0908b;
  }
`
const Hello = () => (<h1>Record new Migraine</h1>)
const Bye = () => (<h1>Added new Migraine</h1>)

const Form = () => {
  let n = 0;
  return (
    <RecordForm className="Form">
      <Header />
      <form>
      {  n == 1 ?  <Start /> : <Hello /> }
      </form>
      <Buttons>
        <Button text='<'/>
        <p> Migraine Record</p>
        <Button text=">"/>
      </Buttons>
    </RecordForm>
  );
}

/*
<Hello />
<Start />
<End />
<Pain />
<Mood />
<Medicines />
<Localization />
<Menstruation />
<Triggers />
<Bye />
*/


export default Form;
