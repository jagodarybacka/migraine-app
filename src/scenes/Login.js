import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import axios from'axios';

import { validateEmail, validateLength } from '../utils/Validators';
import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'


class Login extends Component {
  constructor(props) {
    super(props);

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
      fields = this.changeValidation(fields, 'email', false, 'Invalid email address.');
    } else {
      fields = this.changeValidation(fields, 'email', true);
    }

    if (!validateLength(password.value, 8)) {
      isValid = false;
      fields = this.changeValidation(fields, 'password', false, 'This field must be greater than 8 characters');
    } else {
      fields = this.changeValidation(fields, 'password', true);
    }

    this.setState({ fields });

    if (isValid) {
      // this.props.history.push('/home')
      var _this = this;
		    console.log(this);
		 axios.post("http://localhost:3001/api/login",
			{	email: email.value,
				password: password.value
			}).then(response => {
				if(response.data.redirectURL){ // save basic info on user in session for other components
					localStorage.setItem('isLogged', true);
					localStorage.setItem('userId', response.data.userId);
					localStorage.setItem('userMail', response.data.userMail);
					localStorage.setItem('userName', response.data.userName);
					console.log('redirect url to: ' + response.data.redirectURL);
					window.location=response.data.redirectURL;
        }
        else {
          _this.state.errors.push(response.data.flashes.error);
          console.log(_this.state.errors);
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
      <FormSimple name="Welcome Back" submit="Log In" onSubmit={this.handleSubmit}>
        <TextInput
          type="email"
          id="email"
          name="Email"
          value={email.value}
          isValid={email.isValid}
          errorMsg={email.errorMsg}
          onChange={this.handleChange}
        />
        <TextInput
          type="password"
          id="password"
          name="Password"
          value={password.value}
          isValid={password.isValid}
          errorMsg={password.errorMsg}
          onChange={this.handleChange}
        />
      </FormSimple>
    )
  }
}


export default withRouter(Login);
