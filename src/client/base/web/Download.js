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
import iphone1Pl from './assets/iphone1-pl.png'
import iphone2Pl from './assets/iphone2-pl.png'
import iphone3Pl from './assets/iphone3-pl.png'
import iphone1Eng from './assets/iphone1-eng.jpg'
import iphone2Eng from './assets/iphone2-eng.jpg'
import iphone3Eng from './assets/iphone3-eng.jpg'

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
    let ImgIphone1;
    let ImgIphone2;
    let ImgIphone3;
    if (localStorage.lang === "eng") {
      ImgInstall = ImgInstallEng;
      ImgAdd = ImgAddEng;
      ImgIphone1 = iphone1Eng;
      ImgIphone2 = iphone2Eng;
      ImgIphone3 = iphone3Eng;
    } else {
      ImgInstall = ImgInstallPl;
      ImgAdd = ImgAddPl;
      ImgIphone1 = iphone1Pl;
      ImgIphone2 = iphone2Pl;
      ImgIphone3 = iphone3Pl;
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
              <h3 className="header__text">{languageText.web.installApp.android}</h3>
              <img className="header__img" src={ImgInstall} alt="install" />
              <img className="header__img" src={ImgAdd} alt="install" />
            </div>
            <div className="header__contaier">
              <h3 className="header__text">{languageText.web.installApp.iphone}</h3>
              <img className="header__img-iphone" src={ImgIphone1} alt="install"/>
              <img className="header__img-iphone" src={ImgIphone2} alt="install"/>
              <img className="header__img-iphone" src={ImgIphone3} alt="install"/> 
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
