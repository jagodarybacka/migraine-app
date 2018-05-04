import React, {Component} from 'react';
import styled from 'styled-components';

import Button from '../components/Button'
import Header from '../components/Header';
import Date from './form/Date';


const RecordForm = styled.article`
  h2 {
    text-transform: uppercase;
    font-size: 1.2rem;
    font-weight: 900;
  }

`

const Buttons = styled.div `
  position: absolute;
  bottom: 0;
  display: flex;
  width: 90%;
  justify-content: space-between;
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
const Form = () => {
  return (
    <RecordForm className="Form">
      <Header />
      <form>
        <Date end/>
      </form>
      <Buttons>
        <Button text="<"/>
        <Button text=">"/>
      </Buttons>
    </RecordForm>
  );
}


export default Form;
