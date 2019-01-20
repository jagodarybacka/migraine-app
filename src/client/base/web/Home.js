import React, { Component } from 'react';
import {Link} from "react-router-dom";
import pl from '../../assets/lang/plIcon.png';
import eng from '../../assets/lang/engIcon.png';
import { Page, Language, HeaderParalax, Footer } from './web.styles';
import {languageText, setLanguage} from '../../languages/MultiLanguage.js';

import ImgForm from './assets/page-form.png'
import ImgHistory from './assets/page-history.png'
import ImgSummary from './assets/page-summary.png'
import ImgPressure from './assets/page-pressure.png'
import ImgSummaryReport from './assets/page-summary-report.png'
import ImgTogether from './assets/page-together.png'
import ImgHeader from './assets/header.png'


class Home extends Component {
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
        <div className="web__container">
          <HeaderParalax>
            <Link to="/download">
              <img className="header__img" src={ImgHeader} alt="Migraine App" />
            </Link>
          </HeaderParalax>

          <div className="web__features">
            <p>
              <span className="web__p--brand">{languageText.infoPage.appName}</span>{languageText.infoPage.appDescription}
            </p>
            <Link to="/download">
              <button className="web__button">{languageText.infoPage.getApplication}</button>
            </Link>
          </div>

          <div className="web__features">
          <h3 className="features__header">{languageText.infoPage.featuresHeader}</h3>

            <div className="features__section">
              <h4 className="features__subheader">{languageText.infoPage.featuresSubheader}</h4>
              <p>{languageText.infoPage.featuresDescription}</p>
              <div className="features__imgs">
                <img className="features__img" alt="Form" src={ImgForm}/>
                <img className="features__img" alt="Summary" src={ImgSummary}/>
                <img className="features__img" alt="History" src={ImgHistory}/>
              </div>
            </div>

            <div className="features__section">
              <h4 className="features__subheader">{languageText.infoPage.reportsSubheader}</h4>
              <p>{languageText.infoPage.reportsDescription}</p>
              <div className="features__imgs">
                <img className="features__img" alt="Summary report" src={ImgSummaryReport}/>
                <img className="features__img" alt="Atmospheric Pressure report" src={ImgPressure}/>
                <img className="features__img" alt="Often together" src={ImgTogether}/>
              </div>
            </div>
          </div>
        </div>
        <Footer>
          <h4>Migraine App. 2018-2019</h4>
          <h4>Logo design by <a href="https://dribbble.com/laurareen">Laura Reen</a></h4>
        </Footer>
      </Page>
    )
  }
}

export default Home;
