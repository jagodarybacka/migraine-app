import React, { Component } from 'react';
import styled from 'styled-components';
// import { withTheme } from "@callstack/react-theme-provider";

import accept from '../assets/accept.png'
import cancel from '../assets/cancel.png'
import {languageText} from '../languages/MultiLanguage.js';

const QuestionContainer = styled.div`
    height: 100%;
`
const TextContainer = styled.span`
font-weight: 700;
`
const ConfirmComponent = styled.button`
  background-color: ${props => props.positive ? 'limegreen' : 'darkred'};
  border: none;
  width: 34px;
  height: 34px;
  border-radius: 32px; 
  margin: 0 0 3rem 0;
  box-shadow: 0px 1px 12px 0px rgba(0,0,0,0.5);
  outline: none;
  cursor: pointer;
  margin-left: 5px;
  img {
    width: 18px;
    height: 18px;
  }
`
const Input = styled.input`
width:70px;
margin-left: 10px;
  padding: 10px 5%;
  background: transparent;
  border: none;
  border-bottom: solid 1px #4c5062;
  font-weight: 300;

  background-color: #FAF8F1;
  color: #212121;
`;
const ConfirmButton = (props) => {
    return (
        <ConfirmComponent positive={props.positive}
            onClick={props.onClick}
        >
            <img src={props.positive ? accept : cancel} />
        </ConfirmComponent>
    )
}

const QuestionState = Object.freeze({
    YES: 1,
    NO: -1,
    INIT: 0
});

class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            questionState: QuestionState.INIT,
            previousValue: null
        };
    }

    componentDidMount() {
        this.findPreviousValue();
    }

    confirmClick = () => {
        this.setState({ questionState: QuestionState.YES });

        if (!this.props.numericInput)
            this.props.changeHandler(this.props.name, true);
    }

    declineClick = () => {
        this.setState({ questionState: QuestionState.NO });

        if (!this.props.numericInput)
            this.props.changeHandler(this.props.name, false);
        else
            this.props.changeHandler(this.props.name, 0);
    }

    valueChanged = (e) => {
        let val = e.target.value;
        this.setState({ inputValue: val });
        this.props.changeHandler(this.props.name, val);
    }

    findPreviousValue() {
        let name = this.props.name;
        let previousValue = this.props.previousValues == undefined ? undefined : this.props.previousValues.find(v => v.name === name);
        let result = 0;
        if (previousValue == undefined) {
            result = null;
            this.setState({ previousValue: null });
        } else {
            result = previousValue.value;
            this.setState({ previousValue: result });
        }
        this.props.changeHandler(name, result);
        return result;
    }

    showPreviousValue() {
        let beginText = `Poprzednio: ${this.props.displayName.toLowerCase()}`;
        if (this.props.numericInput) {
            if (this.state.previousValue === 0)
                return <TextContainer>{beginText} {languageText.questionAnswered.didntWork}.</TextContainer>
            else
                return <TextContainer>{beginText} {languageText.questionAnswered.workedFor}: {this.state.previousValue}h.</TextContainer>
        } else {
            if (this.state.previousValue === true)
                return <TextContainer>{beginText} {languageText.questionAnswered.didWork}!</TextContainer>
            else
                return <TextContainer>{beginText} {languageText.questionAnswered.didntWork}!</TextContainer>
        }
    }

    render() {
        return (
            <QuestionContainer>
                {this.state.questionState == QuestionState.INIT &&
                    <span>
                        {this.state.previousValue != null && <div>{this.showPreviousValue()}</div>}
                        <TextContainer> {languageText.question.didItWorked + this.props.displayName.toLowerCase() + '?'}</TextContainer>
                        <ConfirmButton onClick={this.confirmClick} positive={true} />
                        <ConfirmButton onClick={this.declineClick} positive={false} />
                    </span>
                }
                {this.state.questionState == QuestionState.YES &&
                    this.props.numericInput &&
                    <span>
                        <TextContainer>{languageText.question.duration + this.props.displayName.toLowerCase() + '? ' + this.props.placeholder}</TextContainer>
                        <Input
                            type={"number"}
                            placeholder={this.props.placeholder}
                            value={this.state.inputValue}
                            onChange={this.valueChanged}
                        />
                    </span>
                }
                {this.state.questionState == QuestionState.YES &&
                    !this.props.numericInput &&
                    <span>
                        <TextContainer>{languageText.question.saved + ' ' + this.props.displayName.toLowerCase() + ' ' + languageText.question.worked + '.'}</TextContainer>
                    </span>
                }
                {this.state.questionState == QuestionState.NO &&
                    <span>
                        <TextContainer>{languageText.question.saved + ' ' + this.props.displayName.toLowerCase() + ' ' + languageText.question.notWorked + '.'}</TextContainer>
                    </span>
                }
            </QuestionContainer>
        )
    }
}


export default Question;