import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import axios from'axios';
import { withTheme } from "@callstack/react-theme-provider";

import { validatePassword } from '../utils/Validators';
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import languageText from '../languages/MultiLanguage';

const FormComp = styled.form`
  text-align: center;
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};
`

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        passwordReset: {
          value: '',
          isValid: false,
          errorMsg: '',
        }
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const { value, name } = evt.target;
    this.setState((prevState) => ({
      fields: {
        ...prevState.fields,
        [name]: {
          ...prevState.fields[name],
          value: value,
        },
      }
    }))
  }

  handleSubmit(evt) {
    evt.preventDefault();
    let isValid = true;
    let fields = this.state.fields;
    const { passwordReset } = fields;

    if (!validatePassword(passwordReset.value)) {
        isValid = false;
        fields = this.changeValidation(fields, 'passwordReset', false, languageText.resetPassword.error8chars);
      } else {
        fields = this.changeValidation(fields, 'passwordReset', true);
      }
    this.setState({ fields }, () => {
        if(isValid){
            const url = '/api/' + window.location.pathname;
            axios.post(url, {
                password: passwordReset.value
            })
            .then(res => {
                if(res.status === 404){
                    console.log("404");
                    alert(languageText.resetPassword.emailNotFound);
                    return;
                }
                else {
                    if(res.data.errors) {
                        alert(res.data.errors);
                        return;
                    }
                    alert(res.data.message);
                    window.location="/login";
                }
            })
            .catch((err) => console.log(err));
        }
    });
  }

  changeValidation(fields, field, isValid, errorMsg = '') {
    return {
      ...fields,
      [field]: {
        ...fields[field],
        errorMsg,
        isValid,
      }
    };
  }

  render() {
    const { passwordReset } = this.state.fields;

    return (
      <FormComp theme={this.props.theme} name="Reset password" submit="Reset" onSubmit={this.handleSubmit}>
        <h1>{languageText.resetPassword.resetPassword}</h1>
        <TextInput
          type="password"
          id="password"
          placeholder={languageText.resetPassword.password}
          name={languageText.resetPassword.password}
          value={passwordReset.value}
          isValid={passwordReset.isValid}
          errorMsg={passwordReset.errorMsg}
          onChange={this.handleChange}
        />
        <Button type="submit" text={languageText.resetPassword.reset} />
      </FormComp>
    )
  }
}


export default withRouter(withTheme(ResetPassword));
