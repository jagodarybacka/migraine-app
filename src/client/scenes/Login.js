import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import axios from'axios';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import { withTheme } from "@callstack/react-theme-provider";

import { validateEmail, validateLength } from '../utils/Validators';
import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'
import {languageText} from '../languages/MultiLanguage.js';

const LoginContainer = styled.div`
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};
`

class Login extends Component {
  constructor(props) {
    super(props);

    if (window.localStorage.getItem('isLogged') === 'true') {
      props.history.push('/home');
    }

    this.state = {
      fields: {
        email: {
          value: '',
          isValid: false,
          errorMsg: '',
        },
        password: {
          value: '',
          isValid: false,
          errorMsg: '',
        }
      },
      errors: []
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
    const { email, password } = fields;

    if (!validateEmail(email.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'email', false, languageText.login.invalidEmail);
    } else {
      fields = this.changeValidation(fields, 'email', true);
    }

    if (!validateLength(password.value, 8)) {
      isValid = false;
      fields = this.changeValidation(fields, 'password', false, languageText.login.error8chars);
    } else {
      fields = this.changeValidation(fields, 'password', true);
    }

    this.setState({ fields });

    if (isValid) {
      // this.props.history.push('/home')
      var _this = this;
		 axios.post("/api/login",
			{	email: email.value,
				password: password.value
			}).then(response => {
        if(response.data.redirectURL){ // save basic info on user in session for other components
          if(localStorage.getItem('userId')){
            if(localStorage.getItem('userId') !== response.data.userId){
              localStorage.removeItem('forecast_time');
              localStorage.removeItem('weather_time');
              localStorage.removeItem('weather');
              localStorage.removeItem('city_name');
              localStorage.removeItem('theme');
              localStorage.removeItem('automaticTheme');
              localStorage.removeItem('use_localization');
            }
          }
					localStorage.setItem('isLogged', true);
					localStorage.setItem('userId', response.data.userId);
					localStorage.setItem('userMail', response.data.userMail);
          localStorage.setItem('userName', response.data.userName);
					window.location=response.data.redirectURL;
        }
        else {
          _this.state.errors = [];
          _this.state.errors.push(...response.data.errors);
          alert(_this.state.errors);
        }
		}).catch(error => {
			console.error(error);
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
    const { email, password } = this.state.fields;

    return (
      <LoginContainer theme={this.props.theme}>
        <FormSimple name={languageText.login.welcome} submit={languageText.login.logIn} onSubmit={this.handleSubmit}>
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
            placeholder={languageText.login.password}
            name={languageText.login.password}
            value={password.value}
            isValid={password.isValid}
            errorMsg={password.errorMsg}
            onChange={this.handleChange}
          />
        </FormSimple>
        <Link to="/forgot"><span>{languageText.login.forgottenPassword}</span></Link>
      </LoginContainer>
    )
  }
}


export default withRouter(withTheme(Login));
