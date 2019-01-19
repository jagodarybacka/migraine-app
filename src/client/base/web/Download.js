import React, { Component } from 'react';
import {Link} from "react-router-dom";
import qr from './assets/qr.svg'
import logo from '../../svg/logo.svg'
import pl from '../../assets/lang/plIcon.png';
import eng from '../../assets/lang/engIcon.png';
import { Page, Language, Header, Footer } from './web.styles';
import {languageText, setLanguage} from '../../languages/MultiLanguage.js';
import ImgInstallEng from './assets/install1-eng.jpg'
import ImgInstallPl from './assets/install1-pl.jpg'
import ImgAddEng from './assets/install2-eng.jpg'
import ImgAddPl from './assets/install2-pl.jpg'

class Download extends Component {
  constructor(props) {
    super(props);

    this.setNewLanguage = this.setNewLanguage.bind(this);
  }

  setNewLanguage(lang) {
    setLanguage(lang);
    window.location.reload();
  }

  componentDidMount(){
    window.scroll(0,0);
  }

  render() {
    let ImgInstall;
    let ImgAdd;
    if (localStorage.lang === "eng") {
      ImgInstall = ImgInstallEng;
      ImgAdd = ImgAddEng
    } else {
      ImgInstall = ImgInstallPl;
      ImgAdd = ImgAddPl
    }
    return (
      <Page>
        <Language>
            <img className="language__button" src={pl} alt={languageText.web.plAlt} onClick={() => this.setNewLanguage('pl')} />
            <img className="language__button" src={eng} alt={languageText.web.engAlt} onClick={() => this.setNewLanguage('eng')} />
        </Language>
        <Header>
          <img className="header__logo" src={logo} alt="logo" />
          <h1 className="header__title">{languageText.web.title}</h1>
          <div className="header__box">
            <Link to="/">
              <button className="header__button">{languageText.web.headerButton}</button>
            </Link>

            <div className="header__contaier">
              <h3 className="header__text">{languageText.web.headerText}</h3>
              <img className="header__qr" src={qr} alt="qr"/>
            </div>

            <div className="header__contaier">
              <h3 className="header__text">{languageText.web.installApp}</h3>
              <img className="header__img" src={ImgInstall} alt="install" />
              <img className="header__img" src={ImgAdd} alt="install" />
            </div>
          </div>
        </Header>
        <Footer>
          <h4>Migraine App. 2018-2019</h4>
        </Footer>

      </Page>
    )
  }
}

export default Download;
