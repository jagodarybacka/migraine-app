import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import axios from'axios';
import { Link } from 'react-router-dom'

import { validatePassword } from '../utils/Validators';
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const FormComp = styled.form`
  text-align: center;
`

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        password: {
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
    const { password } = fields;

    if (!validatePassword(password.value)) {
        isValid = false;
        fields = this.changeValidation(fields, 'password', false, 'This field must be greater than 8 characters and contains at least one uppercase letter, one lowercase letter, one digit and one special symbol');
      } else {
        fields = this.changeValidation(fields, 'password', true);
      }
    this.setState({ fields }, () => {
        if(isValid){
            const url = '/api/' + window.location.pathname;
            axios.post(url, {
                password: password.value
            })
            .then(res => {
                if(res.status == 404){
                    console.log("404");
                    alert('Email not found');
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
    const { password } = this.state.fields;

    return (
      <FormComp name="Reset password" submit="Reset" onSubmit={this.handleSubmit}>
        <h1>Reset password</h1>
        <TextInput
          type="password"
          id="password"
          name="Password"
          value={password.value}
          isValid={password.isValid}
          errorMsg={password.errorMsg}
          onChange={this.handleChange}
        />
        <Button type="submit" text="Reset" />
      </FormComp>
    )
  }
}


export default withRouter(ResetPassword);
