import React, {Component} from 'react';
import Checkbox from '../../components/Checkbox';
import styled from 'styled-components';
import languageText from '../../languages/MultiLanguage';
import collapseIcon from '../../assets/collapse.png'
import expandIcon from '../../assets/expand.png'
import collapseIconWhite from '../../assets/collapse-white.png'
import expandIconWhite from '../../assets/expand-white.png'

import {getTheme} from '../../themes/ThemeHandler.js';

const CheckboxGroupComponent = styled.div`
    width: 100%;
    flex-direction: column;
    display: flex;
    .checkbox__group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
    }
`

const Title = styled.h3`
  &.is-applied {
    color: #e91e63;
  }
  text-align: center;
  img {
    width: 15px;
    height: auto;
    margin-left: 5px;
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

    const collapseIconColored = getTheme()=="DarkTheme" ? collapseIconWhite : collapseIcon;
    const expandIconColored = getTheme()=="DarkTheme" ? expandIconWhite : expandIcon;

    const icon = props.visible ? collapseIconColored : expandIconColored;
    const isApplied = !!values.length;
    return (
      <CheckboxGroupComponent>
        <Title className={isApplied && 'is-applied'} onClick={() => {props.onFilterChange(props.name)}}>{props.title}
        <img src={icon} alt="arrow"/>
        </Title>
        { props.visible
          ? (<div className="checkbox__group">
          {items}
          </div>)
          : "" }
      </CheckboxGroupComponent>
    );
}

export default CheckboxGroup;
