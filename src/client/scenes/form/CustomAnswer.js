import React, { Component } from 'react';
import styled from 'styled-components'
import Button from '../../components/Button'
import ExitIcon from '../../assets/exit.png'
import {languageText} from '../../languages/MultiLanguage.js';
import Text from './Text';

export const CustomAnswerComponent = styled.div`
  position: absolute;
  background: #fff;
  width: 80%;
  height: 80%;
  text-align: center;
  top: 0;
  .custom__cancel {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }
  .custom__header {
    margin: 1em 0 0;
  }
`

class CustomAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
      valid: ''
    }
  }

  componentDidMount() {
    this.validate(this.state)
  }

  handleChange(ev) {
    this.setState({
        answer: ev.target.value
    })
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
    if(this.props.show){
        return (
            <CustomAnswerComponent id="#custom-answer">
              <h3 className="custom__header">Custom answer</h3>
              <img className="custom__cancel" src={ExitIcon} alt="exit" onClick={() => this.props.onConfirmFn({...this.state, cancel: true})}/>
              <Text 
                  valueData=""
                  title="Custom answer"
                  subtitle="Remember that your answer won't be translated"
                  name="custom_answer"
                  type="text"
                  onChange={this.handleChange}/>
              { confirm }
            </CustomAnswerComponent>
          )
    } else {
        return ('')
    }
  }
}

export default CustomAnswer;
