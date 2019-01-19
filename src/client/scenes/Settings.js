import React, {Component} from 'react';
import styled from 'styled-components';
import { validatePassword, validateLength, validateEmail } from '../utils/Validators';
import CustomAnswer from './CustomAnswer';
import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button';
import Divider from '../components/Divider';
import Checkbox from '../components/Checkbox';
import localizationIcon from '../assets/localization.png'
import medicinesIcon from '../assets/medicine-color.png'
import triggersIcon from '../assets/questionmark-color.png'
import reliefsIcon from '../assets/questionmark-color2.png'
import auraIcon from '../assets/eye-color.png'

import axios from 'axios';
import TextInput from '../components/TextInput';
import {languageText, setLanguage, getLanguage} from '../languages/MultiLanguage.js';

const SettingsComponent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 5rem 0.25em;
  margin: 0;
  text-align: center;
  height: auto;

  .chosenLang{
    color: red;
  }
`

const Buttons = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
  h6 {
    margin: 5px 0 0 0;
    text-transform: uppercase;
  }
  img {
    width: 30px;
    heigth: 30px;
  }
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
      },
      ifCustomAnswer: false,
      answerType: '',
      current: {}
    }
    this.baseFieldsState = this.state.fields;

    this.toggleUserFormField = this.toggleUserFormField.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
  }

  logout(){
    localStorage.setItem('isLogged',false);
    this.setState((prevState) =>(
      {
        isLogged: false
      }
    ))
  }

  handleLogOut() {
    axios.get('/api/logout').then(res => {
      this.setState({message: res.data.message});
      this.logout();
      window.location = '/';
		}).catch(err =>{
			console.log(err);
			this.setState({message: languageText.settings.failed});
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
    const { oldPassword, password } = fields;

    if (!validatePassword(password.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'password', false, languageText.register.error8chars);
    } else {
      fields = this.changeValidation(fields, 'password', true);
    }

    this.setState({ fields }, () => {
      if(isValid) {
        axios.put("/api/password", {
          oldPassword: oldPassword.value,
          password: password.value
        })
        .then(res => {
          if(res.status === 404){
            alert(languageText.settings.sthWentWrong);
            return;
          } else if(res.status === 204){
            alert(languageText.settings.oldPasswordIncorrect);
            return;
          } else {
            if(res.data.errors) {
              alert(res.data.errors);
              return;
            }
            alert(languageText.settings.passwordChanged);
            this.clearFields();
          }
        })
        .catch((err) => console.log(err))
      }
    })
  }

  handleDataChange(e) {
    e.preventDefault();
    let isValid = true;
    let fields = this.state.fields;
    const { username, email } = fields;

    if (username.value.length > 0 && !validateLength(username.value, 4)) {
      isValid = false;
      fields = this.changeValidation(fields, 'username', false, languageText.register.error4chars);
    } else {
      fields = this.changeValidation(fields, 'username', true);
    }

    if (email.value.length && !validateEmail(email.value)) {
      isValid = false;
      fields = this.changeValidation(fields, 'email', false, languageText.register.invalidEmail);
    } else {
      fields = this.changeValidation(fields, 'email', true);
    }

    this.setState({ fields }, () => {
      if(isValid) {
        axios.put("/api/users", {
          username: username.value,
          email: email.value
        })
        .then(res => {
          if(res.status === 404){
            alert(languageText.settings.sthWentWrong);
            return;
          } else {
            if(res.data.errors) {
              alert(res.data.errors);
              return;
            }
            alert(languageText.settings.dataChanged);
            this.clearFields();
          }
        })
        .catch((err) => console.log(err))
      }
    })
  }

  setNewLanguage(lang) {
    setLanguage(lang);
    window.location.reload();
  }

  toggleUserFormField(field) {
    const old = this.getUserFormField(field)
    localStorage.setItem(`form-${field}`, !old)
    this.forceUpdate();
  }

  getUserFormField(field) {
    return localStorage.getItem(`form-${field}`) === 'true' || localStorage.getItem(`form-${field}`) === null;
  }

  addAnswer(option){
    this.setState((prevState) => ({
      ...prevState,
      ifCustomAnswer: true,
      answerType: option.field,
      current: option
    }))
  }

  handleCustomAnswer(data,cancel){
    if(data.answer && data.answerType){
      const option = {option: data.answerType, value: data.answer};
      axios.post('/api/users/answer',option)
      .then((res) => {
        this.setState((prevState) => ({
          ...prevState,
          ifCustomAnswer: false,
          answerType: ''
        }))
      })
      .catch((err) => {
        console.log(err)
      });
    } else {
      this.setState((prevState) => ({
        ...prevState,
        ifCustomAnswer: false,
        answerType: ''
      }))
    }
  }

  render() {
    const customAnswer = this.state.ifCustomAnswer 
      ? (<CustomAnswer answerType={this.state.answerType} current={this.state.current} onConfirmFn={this.handleCustomAnswer.bind(this)}/>) 
      : '';
    
    const { username, email, oldPassword, password } = this.state.fields;
    const fields = languageText.settings.formFieldsOptions;
    const answers = languageText.settings.customAnswers.map((answer) => {
      return ({
        field: answer.field,
        text: answer.text,
        placeholder: answer.placeholder,
        src: answer.field + 'Icon'
      }
      )
    })

    let currentLang = getLanguage();
    return (
      <SettingsComponent className="Settings">
          <Header />
          <Divider text={languageText.settings.logout}/>
          <Button type="submit" onClick={this.handleLogOut} text={languageText.settings.logout} primary />
          <Divider text={languageText.settings.formFields}/>
          <div>
          {
            fields.map((field, index) => (
              <Checkbox
              key={index}
              small
              text={field.text}
              value={field.text}
              checked={this.getUserFormField(field.field)}
              onChange={() => this.toggleUserFormField(field.field)}
              />
            ))
          }
          </div>
          <Divider text={languageText.settings.setCustomAnswers}/>
          <Buttons>
            {
              answers.map((option, index) => (
                <div key={index}>
                <Button 
                key={index}
                small
                onClick={() => this.addAnswer(option)}
                primary={this.state.answerType ===option.field} 
                img={option.src}/>
                <h6>{option.text}</h6>
                </div>
              ))
            }
          </Buttons>
          { customAnswer }
          <Divider text={languageText.settings.chooseLanguage}/>
            <Button onClick={() => this.setNewLanguage('eng')} text={languageText.settings.eng} primary={currentLang === "eng" ? true : false} />
            <Button onClick={() => this.setNewLanguage('pl')} text={languageText.settings.pol} primary={currentLang === "pl" ? true : false} />
          <Divider text={languageText.settings.changeData}/>
          <TextInput
            type="text"
            id="username"
            placeholder={languageText.settings.usernamePlaceholder}
            name={languageText.settings.username}
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
          <Button type="submit" onClick={this.handleDataChange} small="true" text={languageText.settings.buttonText} primary />
          <Divider text={languageText.settings.changePassword}/>
          <TextInput
            type="password"
            id="oldPassword"
            placeholder={languageText.settings.oldPassword}
            name={languageText.settings.oldPassword}
            value={oldPassword.value}
            isValid={oldPassword.isValid}
            errorMsg={oldPassword.errorMsg}
            onChange={this.handleChange}
          />
          <TextInput
            type="password"
            id="password"
            placeholder={languageText.settings.newPassword}
            name={languageText.settings.newPassword}
            value={password.value}
            isValid={password.isValid}
            errorMsg={password.errorMsg}
            onChange={this.handleChange}
          />
          <Button type="submit" onClick={this.handlePasswordChange} small="true" text={languageText.settings.buttonText} primary />
        <Menubar />
      </SettingsComponent> 

    );
  }
}


export default Settings;
