import React, { Component } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import axios from'axios';

import { validateEmail } from '../utils/Validators';
import TextInput from '../components/TextInput'
import Button from '../components/Button'

import {languageText} from '../languages/MultiLanguage.js';


const FormComp = styled.form`
  text-align: center;
`

class ForgottenPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        emailReset: {
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
    const { emailReset } = fields;

    if (!validateEmail(emailReset.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'emailReset', false, languageText.forgottenPassword.invalidEmail);
    } else {
      fields = this.changeValidation(fields, 'emailReset', true);
    }
    this.setState({ fields }, () => {
        if(isValid){
            axios.post('/api/forgot', {
                email: emailReset.value
            })
            .then(res => {
                if(res.status === 404){
                    alert(languageText.forgottenPassword.emailNotFound);
                    return;
                }
                else {
                    if(res.data.errors) {
                        alert(res.data.errors);
                        return;
                    }
                    alert(res.data.message);
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
    const { emailReset} = this.state.fields;

    return (
      <FormComp name="Reset password" submit="Send" onSubmit={this.handleSubmit}>
        <h1>{languageText.forgottenPassword.resetPassword}</h1>
        <TextInput
          type="email"
          id="emailReset"
          placeholder="Email"
          name="Email"
          value={emailReset.value}
          isValid={emailReset.isValid}
          errorMsg={emailReset.errorMsg}
          onChange={this.handleChange}
        />
        <Button type="submit" text={languageText.forgottenPassword.sendEmail}/>
      </FormComp>
    )
  }
}


export default withRouter(ForgottenPassword);
