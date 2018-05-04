import React, {Component} from 'react';
import styled from 'styled-components';

import Checkbox from '../../components/Checkbox'


const MultipleChoice = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <Checkbox small text="Yes"/>
      <Checkbox small text="Coming Soon"/>
      <Checkbox small text="No"/>
    </div>
  );
}


export default MultipleChoice;
