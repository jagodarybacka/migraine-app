import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom';
import axios from'axios';
import { Link } from 'react-router-dom'

import { validateEmail } from '../utils/Validators';
import TextInput from '../components/TextInput'
import Button from '../components/Button'

const FormComp = styled.form`
  text-align: center;
`

class ForgottenPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        email: {
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
    const { email } = fields;

    if (!validateEmail(email.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'email', false, 'Invalid email address.');
    } else {
      fields = this.changeValidation(fields, 'email', true);
    }
    this.setState({ fields }, () => {
        if(isValid){
            axios.post('/forgot', {
                email: email.value
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
    const { email} = this.state.fields;

    return (
      <FormComp name="Reset password" submit="Send" onSubmit={this.handleSubmit}>
        <h1>Reset password</h1>
        <TextInput
          type="email"
          id="email"
          name="Email"
          value={email.value}
          isValid={email.isValid}
          errorMsg={email.errorMsg}
          onChange={this.handleChange}
        />
        <Button type="submit" text="Send" />
      </FormComp>
    )
  }
}


export default withRouter(ForgottenPassword);
