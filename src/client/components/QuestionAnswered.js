import React, { Component } from 'react';
import styled from 'styled-components';

import {languageText} from '../languages/MultiLanguage.js';


const Anwser = styled.div`
font-weight: 700;
`


const QuestionAnswered = (props) => {
    let {name, isNumeric, answer} = props;
  return (
    answer === null ? null :
    <Anwser>
        {isNumeric && answer>0 &&
            <span>{name} {languageText.questionAnswered.workedFor} {answer}h.</span>
        }
        {((isNumeric && answer<=0) || (!isNumeric && !answer)) &&
            <span>{name} {languageText.questionAnswered.didntWork}.</span>
        }
        {!isNumeric && answer &&
            <span>{name} {languageText.questionAnswered.didWork}!</span>
        }
    </Anwser>
  );
}


export default QuestionAnswered;