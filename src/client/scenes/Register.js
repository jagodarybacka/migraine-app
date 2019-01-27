import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import { withTheme } from "@callstack/react-theme-provider";
import { Link } from 'react-router-dom'


import { validateEmail, validateLength, validatePassword } from '../utils/Validators';
import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'
import {languageText} from '../languages/MultiLanguage.js';

const RegisterContainer = styled.div`
  background-color: ${props=>props.theme.backgroundColor};
  color: ${props=>props.theme.fontColor};

`;
const Rodo = styled.div`
    margin-bottom: 1rem;
    text-align: center;
    span{
      display: inline-block;
      margin-left: 6px;
      text-decoration: underline;
    }

`

class Register extends Component {
	constructor(props) {
    super(props);
    
    if (window.localStorage.getItem('isLogged') === 'true') {
      props.history.push('/home');
    }

		this.state = {
      isActive: false,
      fields: {
        username: {
          value: localStorage.getItem('username') || '',
          isValid: false,
          errorMsg: '',
        },
        password: {
          value: '',
          isValid: false,
          errorMsg: '',
        },
        email: {
          value: localStorage.getItem('email') || '',
          isValid: false,
          errorMsg: '',
        }
      },
      errors: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
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
    const active = this.state.isActive;
    if(active === false)
    { return}
    if(active ===true){
  
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
      axios.post("/api/users", {
        username: username.value,
        email: email.value,
        password: password.value,
      }).then(response => {
        if (response.data.redirectURL) {
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
          window.location = response.data.redirectURL;
        } else {
          _this.state.errors = [];
          _this.state.errors.push(...response.data.errors);
          alert(_this.state.errors);
        }
      }).catch(error => {
        console.log(error);
      });

      localStorage.removeItem('username');
      localStorage.removeItem('email');

      }
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
      <RegisterContainer theme={this.props.theme}>
        <FormSimple active={this.state.isActive} name={languageText.register.signUp} submit={languageText.register.getStarted} onSubmit={this.handleSubmit}>
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
        <Rodo>
          <label>
            {languageText.privacyPolicy.information}
            <Link to="/privacypolicy"  onClick={ () => {localStorage.setItem('username', this.state.fields.username.value); localStorage.setItem('email', this.state.fields.email.value) }}>
              <span>
                {languageText.privacyPolicy.privacyPolicy}
              </span>
            </Link>
            <input 
              type="checkbox" 
              name="name" 
              checked={this.state.isActive}
              onChange={this.handleClick}
              />
          </label>
        </Rodo>
      </FormSimple>
    </RegisterContainer>
		);
	}
}


export default withTheme(Register);
