import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import { validatePassword } from '../utils/Validators';

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button';
import axios from 'axios';
import TextInput from '../components/TextInput';

const SettingsComponent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 7rem 0;
  margin: 0;
  text-align: center;
`

class Settings extends Component {
  constructor(props){
    super(props);

    const isLoggedIn = localStorage.getItem('isLogged');
    this.state = {
      isLogged: isLoggedIn === 'true',
      message: 'Waiting to log out',
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
        oldPassword: {
          value: '',
          isValid: false,
          errorMsg: '',
        },
        email: {
          value: '',
          isValid: false,
          errorMsg: '',
        }
      }
    }
    this.baseFieldsState = this.state.fields;

    this.clearFields = this.clearFields.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }  

  logout(){
    localStorage.setItem('isLogged',false);
    this.setState((prevState) =>(
      {
        isLogged: false
      }
    ))
    console.log(this.state)
  }

  handleLogOut() {
    axios.get('/logout').then(res => {
      console.log(this.state.message); 
      this.setState({message: res.data.message});
      this.logout();
      window.location = '/';
		}).catch(err =>{
			console.log(err);
			this.setState({message: "Failed to log out!"});
		});
  };
  
  componentDidMount() {
    window.scrollTo(0, 0)
  };

  componentWillMount(){
    const isLoggedIn = localStorage.getItem('isLogged');
    this.setState((prevState) => (
      {
        isLogged: isLoggedIn === 'true'
      }
    ))
    console.log(this.state.isLogged)
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

  clearFields() {
    this.setState((prevState) => ({
      fields: {
        ...this.baseFieldsState
      }
    }))
  }

  handlePasswordChange(e) {
    e.preventDefault();
    let isValid = true;
    let fields = this.state.fields;
    const { username, email, oldPassword, password} = fields;

    if (!validatePassword(password.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'password', false, 'This field must be greater than 8 characters and contains at least one uppercase letter, one lowercase letter, one digit and one special symbol');
    } else {
      fields = this.changeValidation(fields, 'password', true);
    }

    this.setState({ fields }, () => {
      if(isValid) {
        axios.put("/password", {
          oldPassword: oldPassword.value,
          password: password.value
        })
        .then(res => {
          if(res.status == 404){
            alert('Something went wrong');
            return;
          } else if(res.status == 204){
            alert("Old password incorrect");
            return;
          } else {
            if(res.data.errors) {
              alert(res.data.errors);
              return;
            }
            alert('Password changed');
            this.clearFields();
          }
        })
        .catch((err) => console.log(err))
      }
    })
  }

  render() {
    const { username, email, oldPassword, password } = this.state.fields;

    return (
      <SettingsComponent className="Settings">
        <Header />
          {/* <TextInput
            type="text"
            id="username"
            name="Username"
            value={username.value}
            isValid={username.isValid}
            errorMsg={username.errorMsg}
            onChange={this.handleChange}
          />
          <TextInput
            type="email"
            id="email"
            name="Email"
            value={email.value}
            isValid={email.isValid}
            errorMsg={email.errorMsg}
            onChange={this.handleChange}
          /> */}
          <TextInput
            type="password"
            id="oldPassword"
            name="Old Password"
            value={oldPassword.value}
            isValid={oldPassword.isValid}
            errorMsg={oldPassword.errorMsg}
            onChange={this.handleChange}
          />
          <TextInput
            type="password"
            id="password"
            name="New Password"
            value={password.value}
            isValid={password.isValid}
            errorMsg={password.errorMsg}
            onChange={this.handleChange}
          />
          <Button type="submit" onClick={this.handlePasswordChange} text="Change" primary />
          <Button type="submit" onClick={this.handleLogOut} text="Log out" primary />
        <Menubar />
      </SettingsComponent>
    );
  }
}


export default Settings;
