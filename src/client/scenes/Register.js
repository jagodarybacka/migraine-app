import PropTypes from 'prop-types'
import styled from 'styled-components'
import React, { Component } from 'react';
import axios from 'axios';
import { Route, Redirect } from 'react-router';

import { validateEmail, validateLength, validatePassword } from '../utils/Validators';
import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'
import {languageText} from '../languages/MultiLanguage.js';

class Register extends Component {
	constructor(props) {
    super(props);
    
    if (window.localStorage.getItem('isLogged') === 'true') {
      props.history.push('/home');
    }

		this.state = {
      fields: {
        username: {
          value: '',
          isValid: false,
          errorMsg: '',
        },
        password: {
          value: '',
          isValid: false,
          errorMsg: '',
        },
        email: {
          value: '',
          isValid: false,
          errorMsg: '',
        }
      },
      errors: []
    };

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

	handleSubmit(e) {
    e.preventDefault();
    let isValid = true;
    let fields = this.state.fields;
    const { username, email, password } = fields;

    if (!validateLength(username.value, 4)) {
      isValid = false;
      fields = this.changeValidation(fields, 'username', false, languageText.register.error4chars);
    } else {
      fields = this.changeValidation(fields, 'username', true);
    }

    if (!validateEmail(email.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'email', false, languageText.register.invalidEmail);
    } else {
      fields = this.changeValidation(fields, 'email', true);
    }

    if (!validatePassword(password.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'password', false, languageText.register.error8chars);
    } else {
      fields = this.changeValidation(fields, 'password', true);
    }


    this.setState({ fields });

    if (isValid) {
      var _this = this;
      axios.post("/users", {
        username: username.value,
        email: email.value,
        password: password.value,
      }).then(response => {
        if (response.data.redirectURL) {
          localStorage.setItem('isLogged', true);
					localStorage.setItem('userId', response.data.userId);
					localStorage.setItem('userMail', response.data.userMail);
          localStorage.setItem('userName', response.data.userName);
          window.location = response.data.redirectURL;
        } else {
          _this.state.errors = [];
          _this.state.errors.push(...response.data.errors);
          alert(_this.state.errors);
        }
      }).catch(error => {
        console.log(error);
      });
    }
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
    const { username, email, password } = this.state.fields;

		return (
      <FormSimple name={languageText.register.signUp} submit={languageText.register.getStarted} onSubmit={this.handleSubmit}>
      <TextInput
        type="text"
        id="username"
        placeholder={languageText.register.usernamePlaceholder}
        name={languageText.register.username}
        value={username.value}
        isValid={username.isValid}
        errorMsg={username.errorMsg}
        onChange={this.handleChange}
      />
      <TextInput
        type="email"
        id="email"
        placeholder="Email"
        name="Email"
        value={email.value}
        isValid={email.isValid}
        errorMsg={email.errorMsg}
        onChange={this.handleChange}
      />
      <TextInput
        type="password"
        id="password"
        placeholder={languageText.register.password}
        name={languageText.register.password}
        value={password.value}
        isValid={password.isValid}
        errorMsg={password.errorMsg}
        onChange={this.handleChange}
      />
    </FormSimple>
		);
	}
}

export default Register
