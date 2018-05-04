import React, {Component} from 'react';
import styled from 'styled-components';

import RadioButton from '../../components/RadioButton'

const Single = styled.section`
`


const SingleChoice = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <RadioButton text="Yes"/>
      <RadioButton text="Coming Soon"/>
      <RadioButton text="No"/>
    </div>
  );
}


export default SingleChoice;
