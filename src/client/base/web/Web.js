import React, { Component } from 'react';
import qr from './qr.svg'
import logo from '../../svg/logo.svg'
import pl from '../../assets/lang/plIcon.png';
import eng from '../../assets/lang/engIcon.png';
import { Page, Language, Header } from './web.styles';
import {languageText, setLanguage} from '../../languages/MultiLanguage.js';

class Web extends Component {
  constructor(props) {
    super(props);

    this.setNewLanguage = this.setNewLanguage.bind(this);
  }

  setNewLanguage(lang) {
    setLanguage(lang);
    window.location.reload();
  }

  render() {
    return (
      <Page>
        <Language>
            <img className="language__button" src={pl} alt={languageText.web.plAlt} onClick={() => this.setNewLanguage('pl')} />
            <img className="language__button" src={eng} alt={languageText.web.engAlt} onClick={() => this.setNewLanguage('eng')} />
        </Language>
        <Header>
          <img className="header__logo" src={logo} alt="logo" />
          <h1 className="header__title">{languageText.web.title}</h1>
          <h2 className="header__subtitle">{languageText.web.subtitle}</h2>
          <div className="header__box">
            <h3 className="header__text">{languageText.web.headerText}</h3>
            <img className="header__qr" src={qr} alt="qr"/>
            <button className="header__button">{languageText.web.headerButton}</button>
          </div>
        </Header>
      </Page>
    )
  }
}

export default Web;
