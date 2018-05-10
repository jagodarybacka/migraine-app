// import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import React, { Component } from "react";
import axios from "axios";
import { Route, Redirect } from "react-router";

import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			email: "",
			errors: [],
			redirect: false
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);		
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
	}
	
	handleUsernameChange(e){
		this.setState({ username: e.target.value });
	}

	handleEmailChange(e){
		this.setState({ email: e.target.value });
	}

	handlePasswordChange(e){
		this.setState({ password: e.target.value });
  }
  
	handleSubmit(e) {
		e.preventDefault();
		var _this = this;
		axios.post("http://localhost:3001/api/users",
			{username: _this.state.username,
				email: _this.state.email,
				password: _this.state.password
			}).then(response => {
			console.log(response);
			if(response.data.redirectURL){
				window.location= response.data.redirectURL;
			} else{	
				_this.state.errors.push(...response.data.flashes.error);
				console.log(_this.state.errors);
				alert(_this.state.errors);
			}}).catch(error => {
			console.log(error);
		});
	}
	
	
	render() {
		return (
      <FormSimple name="Sign Up" submit="Get started" onSubmit={this.handleSubmit} link="/home">
      <TextInput
        type="text"
        id="username"
        name="Username" 
        onChange={ this.handleUsernameChange }/>
      <TextInput
        type="email"
        id="email"
        name="Email"
        onChange={ this.handleEmailChange } />
      <TextInput
        type="password"
        id="Password"
        name="Password" 
        onChange={ this.handlePasswordChange }/>
    </FormSimple>
		);
	}
}



// const Register = (props) => {
//   return (
      // <FormSimple name="Sign Up" submit="Get started" link="/home">
      //   <TextInput
      //     type="text"
      //     id="username"
      //     name="Username" />
      //   <TextInput
      //     type="email"
      //     id="email"
      //     name="Email" />
      //   <TextInput
      //     type="password"
      //     id="Password"
      //     name="Password" />
      // </FormSimple>
//   )
// }

export default Register
