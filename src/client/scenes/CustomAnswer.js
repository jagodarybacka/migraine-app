import React, { Component } from 'react';
import styled from 'styled-components'
import Button from '../components/Button'
import ExitIcon from '../assets/exit.png'
import {languageText} from '../languages/MultiLanguage.js';

export const CustomAnswerComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: stretch;
  width: 100%;
  height: 80%;
  text-align: center;
  .custom__cancel {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }
  .custom__header {
    margin: 1em 0 0;
  }
`

export const Input = styled.input`
  display: block;
  width: auto;
  padding: 10px 5%;
  background: transparent;
  border: none;
  border-bottom: solid 1px #4c5062;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 30px;
`

class CustomAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      answerType: props.answerType,
      valid: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentDidMount() {
    this.validate(this.state);
  }

  handleChange(ev) {
    const { value, name } = ev.target;
    this.setState((prevState) => ({
      ...prevState,
      answer: value
    }), () => this.validate(this.state))
  }

  validate(state) {
    if (!state.answer) {
      this.setState({valid: false});
      return;
    } else if (state.answer) {
      this.setState({valid: true});
      return;
    }
    this.setState({valid: false});
  }

  render() {
    const confirm = this.state.valid ? (
      <Button small text={languageText.reportsSummary.confirm} onClick={() => this.props.onConfirmFn(this.state)}/>
    ) : (
      <Button small text={languageText.reportsSummary.confirm} disabled/>
    )
    const placeholder = languageText.settings.customAnswerModal.placeholder + this.props.current.placeholder.toLowerCase();
    const header = languageText.settings.customAnswerModal.header + this.props.current.placeholder.toLowerCase();
    return (
        <CustomAnswerComponent id="#custom-answer">
          <h3 className="custom__header">{header}</h3>
          <img className="custom__cancel" src={ExitIcon} alt="exit" onClick={() => this.props.onConfirmFn({...this.state, cancel: true})}/>
          <Input 
              type="text"
              name="answer"
              placeholder={placeholder}
              value={this.state.answer}
              onChange={this.handleChange}/>
          { confirm }
        </CustomAnswerComponent>
      )
  }
}

export default CustomAnswer;
