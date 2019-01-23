import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import styled from 'styled-components';
import languageText from '../../languages/MultiLanguage';

const CheckboxGroupComponent = styled.div`
    width: 100%;
    flex-direction: column;
    display: flex;
    h3{
      text-transform: capitalize;
      text-align: center;
    }
    .checkbox__group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
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
          title={languageText}
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
        <h3>{props.title}</h3>
        <div className="checkbox__group">
          {items}
        </div>
      </CheckboxGroupComponent>
    );
}

export default CheckboxGroup;