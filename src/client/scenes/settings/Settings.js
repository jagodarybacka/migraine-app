import React, {Component} from 'react';
import { validatePassword, validateLength, validateEmail } from '../../utils/Validators';
import { withTheme } from "@callstack/react-theme-provider";

import { generatePdf } from '../../utils/pdfGeneration';
import CustomAnswer from './CustomAnswer';
import Header from '../../components/Header';
import Menubar from '../../components/Menubar';
import Button from '../../components/Button';
import Divider from '../../components/Divider';
import Checkbox from '../../components/Checkbox';
import localizationIcon from '../../assets/localization.png'
import medicinesIcon from '../../assets/medicine.png'
import questionmarkIcon from '../../assets/questionmark.png'
import auraIcon from '../../assets/eye.png'
import user from '../../assets/user-male.png'
import form from '../../assets/form.png'
import app from '../../assets/app.png'
import {languageText, setLanguage, getLanguage} from '../../languages/MultiLanguage.js';
import axios from 'axios';
import TextInput from '../../components/TextInput';
import { SettingsComponent, SettingsCard, Buttons, Error, 
  LanguageButtons, List, FormButtons, Menu, MenuButton } from './styles';
import {setTheme, getTheme, toggleAutomaticThemeStatus, getAutomaticThemeStatus} from '../../themes/ThemeHandler.js';


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
      current: {},
      customAnswers: {},
      currentTab: "form",
      customAnswerError: ''
    }
    this.baseFieldsState = this.state.fields;

    this.toggleUserFormField = this.toggleUserFormField.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.handleChangeTab = this.handleChangeTab.bind(this);
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
    window.scrollTo(0, 0);
    this.getAnswers();
  };

  getAnswers() {
    axios.get('/api/users/answer')
    .then((res) => {
      if(res.status === 204){
        console.log("No content");
      } else {
        const data = this.parseCustomAnswers(res.data);
        this.setState((prevState) => ({
          ...prevState,
          customAnswers: data
        }))
     }
    })
    .catch((err) => {console.log(err);})
  }

  parseCustomAnswers(answers) {
    for(var op in answers) {
      if(answers[op].length > 0){
        answers[op] = this.mapValues(answers[op]);
      }
    }
    return answers;
  }

  mapValues(values) {
    return values.map((value) => {
      return {
        text: value,
        value: value
      }
    })
  }

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
          if(res.status === 401){
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
          if(res.status === 401){
            alert(languageText.settings.sthWentWrong);
            return;
          } else {
            if(res.data.errors) {
              alert(res.data.errors);
              return;
            }
            if(res.data.user.email){
              localStorage.setItem('userMail',res.data.user.email)
            }
            if(res.data.user.username){
              localStorage.setItem('userName',res.data.user.username)
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

  setNewTheme(theme) {
    setTheme(theme, true);
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
      customAnswerError: "",
      ifCustomAnswer: false,
      answerType: option.field,
      current: option
    }), () => {
      this.setState((prevState) => ({
        ...prevState,
        ifCustomAnswer: true
      }))
    })
  }

  handleCustomAnswer(data,cancel){
    if(data.answer && data.answerType){
      if(!this.checkIfExist(data.answer, data.answerType)){
        const option = {option: data.answerType, value: data.answer};
        axios.post('/api/users/answer',option)
        .then((res) => {
          if(res.data.info){
            this.setState((prevState) => ({
              ...prevState,
              customAnswerError: languageText.settings.customAnswerError
            }))
          } else {
            this.setState((prevState) => ({
              ...prevState,
              customAnswerError: '',
              ifCustomAnswer: false,
              answerType: ''
            }), () => this.getAnswers())
          }
        })
        .catch((err) => {
          console.log(err)
        });
      } else {
        this.setState((prevState) => ({
          ...prevState,
          customAnswerError: languageText.settings.customAnswerError
        }))
      }
    } else {
      this.setState((prevState) => ({
        ...prevState,
        customAnswerError: '',
        ifCustomAnswer: false,
        answerType: ''
      }))
      
    }
  }

  checkIfExist(toTranslate, type) {
    if(toTranslate === '')
      return true;
    let translationDict = languageText.addForm[type+"Answers"];
    let foundPair = translationDict.find(f => f.value.toLowerCase() === toTranslate.toLowerCase() 
      || f.text.toLowerCase() === toTranslate.toLowerCase());
    if(foundPair !== undefined)
      return true;
    else
      return false;
  }

  getPdf() {
    axios.get("/api/pdf")
    .then((res) => {
        generatePdf(res.data);
    })
    .catch((err) => console.log(err))
  }

  handleChangeTab(name) {
    this.setState((prevState) => ({
      ...prevState,
      currentTab: name
    }))
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

    const answersList = this.state.ifCustomAnswer
      ? languageText.addForm[this.state.answerType + `Answers`].concat(this.state.customAnswers[this.state.answerType] ? this.state.customAnswers[this.state.answerType] : [])
      : [];

    const Answers = answersList.length > 0 ? (
      answersList.map((answer, index) => (
        <h4 key={index}>{answer.text}</h4>
      ))
    ) : '';

    const customError = this.state.customAnswerError.length > 0 
      ? (<Error><h5>{this.state.customAnswerError}</h5></Error>)
      : "";

    let currentLang = getLanguage();
    let currentTheme = getTheme();
    let automaticThemeStatus =getAutomaticThemeStatus();
    const CurrentSettings = this.state.currentTab === "form"
    ? (
      <SettingsCard>
        <Divider text={languageText.settings.formFields}/>
        <FormButtons>
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
        </FormButtons>
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
              img= {option.field === 'localization'
                ? localizationIcon
                : option.field === "aura"
                  ? auraIcon
                  : option.field === "medicines"
                    ? medicinesIcon
                    : option.field === "triggers"
                      ? questionmarkIcon
                      : questionmarkIcon}/>
              <h6>{option.text}</h6>
              </div>
            ))
          }
        </Buttons>
        { this.state.ifCustomAnswer 
          ? (
              <List>
              { Answers }
              </List>
            ) 
          : "" }
        { this.state.ifCustomAnswer ? ( customError ) : "" }
        { customAnswer }
        <Divider text={languageText.settings.exportData}/>
          <Button onClick={this.getPdf} text={languageText.settings.generatePdf}/>
      </SettingsCard>
    )
    : this.state.currentTab === "app"
      ? (
        <SettingsCard>
          <Divider text={languageText.settings.chooseTheme}/>
            <Button onClick={() => this.setNewTheme('DarkTheme')} text={languageText.settings.dark} primary={currentTheme == "DarkTheme" && !automaticThemeStatus ? false : true} />
            <Button onClick={() => this.setNewTheme('LightTheme')} text={languageText.settings.light} primary={currentTheme == "LightTheme" && !automaticThemeStatus ? false : true} />
            <Button onClick={() => toggleAutomaticThemeStatus()} text={languageText.settings.automatic} primary={automaticThemeStatus == true ? false : true} />
          <Divider text={languageText.settings.chooseLanguage}/>
          <LanguageButtons>
          <Button onClick={() => this.setNewLanguage('eng')} text={languageText.settings.eng} primary={currentLang === "eng" ? false : true} />
          <Button onClick={() => this.setNewLanguage('pl')} text={languageText.settings.pol} primary={currentLang === "pl" ? false : true} />
          </LanguageButtons>
        </SettingsCard>
      )
      : this.state.currentTab === "user"
        ? (
          <SettingsCard>
            <Divider text={languageText.settings.logout}/>
            <Button type="submit" onClick={this.handleLogOut} text={languageText.settings.logout} primary />
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
          </SettingsCard>
        )
        : "";

    return (
      <SettingsComponent theme={this.props.theme} className="Settings">
          <Header />
          { CurrentSettings }
          <Menu theme={this.props.theme}>
            <MenuButton className={this.state.currentTab === 'form' && 'selected'} onClick={() => this.handleChangeTab("form")}>
              <img src={form} alt="form" />
              <h6>{languageText.settings.formCard}</h6>
            </MenuButton>
            <MenuButton className={this.state.currentTab === 'app' && 'selected'} onClick={() => this.handleChangeTab("app")}>
              <img src={app} alt="app" />
              <h6>{languageText.settings.appCard}</h6>
            </MenuButton>
            <MenuButton className={this.state.currentTab === 'user' && 'selected'} onClick={() => this.handleChangeTab("user")}>
              <img src={user} alt="user" />
              <h6>{languageText.settings.userCard}</h6>
            </MenuButton>
          </Menu>
          <Menubar />
      </SettingsComponent>

    );
  }
}


export default withTheme(Settings);
