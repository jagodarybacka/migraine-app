import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import styled from 'styled-components';

const CheckboxGroupComponent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`

const CheckboxGroup = (props) => {
    const answers = props.answers;
    let values = []
    if (props.values && Array.isArray(props.values)) {
      values = props.values
    }
  
    const items = answers.map((answer, index) => {
      return (
        <Checkbox
          small = {props.small}
          text={answer.text}
          key={index}
          value={answer.value}
          checked={values.includes(answer.value)}
          name={props.name}
          onChange={props.onChange}
          color={props.color}
          img={props.img}
          imgColor={props.imgColor}
        />
      )
    })
    return (
      <CheckboxGroupComponent>
        <h2>{props.title}</h2>
        {items}
      </CheckboxGroupComponent>
    );
}

export default CheckboxGroup;