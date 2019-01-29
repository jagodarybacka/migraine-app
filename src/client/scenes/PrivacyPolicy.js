import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { languageText } from '../languages/MultiLanguage';
import closeIcon from '../assets/exit.png'
import closeIconWhite from '../assets/exit-white.png'
import {getTheme} from '../themes/ThemeHandler.js';



const ExitIcon = styled.img`
  clear: both;
  width: 20px;
  height: auto;
  top: 1em;
  right: 1em;
  position: absolute;
  opacity: 0.6;
`

const PrivacyPolicy2 =  styled.div`
  font-weight: 300;
  justify-content: left;
  padding: 0 5%;
  height: 100vh;
  text-align: justify;
  list-style-type: none;
  h4 {
    margin: 10px;
  }
`;


const PrivacyPolicy = () => {
    
    return (
        <PrivacyPolicy2>
          <Link to="/register" >
            <ExitIcon src={getTheme()=="DarkTheme" ? closeIconWhite : closeIcon} /> 
          </Link>
          <h1>{languageText.privacyPolicy.privacyPolicy2}</h1>

          <p>{languageText.privacyPolicy.generalParagraph1}</p>

          <p>{languageText.privacyPolicy.generalParagraph2}</p>

          <h2>{languageText.privacyPolicy.informationCollection}</h2>

            <p>{languageText.privacyPolicy.informationCollectionParagraph}</p>

            <h3>{languageText.privacyPolicy.types}</h3>

            <li><h4>{languageText.privacyPolicy.personal}</h4></li>
              <p>{languageText.privacyPolicy.personalParagraph}</p>

            <li><h4>{languageText.privacyPolicy.record}</h4></li>
              <p>{languageText.privacyPolicy.recordParagraph}</p>

            <li><h4>{languageText.privacyPolicy.location}</h4></li>
             <p>{languageText.privacyPolicy.locationParagraph}</p>

          <h2>{languageText.privacyPolicy.disclosure}</h2>

            <h3>{languageText.privacyPolicy.legal}</h3>
            <p>{languageText.privacyPolicy.legalParagraph}</p>
            <ul>
              <li>{languageText.privacyPolicy.legalLi1}</li>
              <li>{languageText.privacyPolicy.legalLi2}</li>
              <li>{languageText.privacyPolicy.legalLi3}</li>
              <li>{languageText.privacyPolicy.legalLi4}</li>
              <li>{languageText.privacyPolicy.legalLi5}</li>
            </ul>


          <h2>{languageText.privacyPolicy.security}</h2>
            <p>{languageText.privacyPolicy.securityParagraph}</p>

          <h2>{languageText.privacyPolicy.use}</h2>
            <p>{languageText.privacyPolicy.useParagraph}</p>

          <h2>{languageText.privacyPolicy.modification}</h2>
            <p>{languageText.privacyPolicy.modificationParagraph}</p>

          <h2>{languageText.privacyPolicy.children}</h2>
            <p>{languageText.privacyPolicy.childrenParagraph}</p>

          <h2>{languageText.privacyPolicy.note}</h2>
            <p>{languageText.privacyPolicy.noteParagraph}</p>


          <h2>{languageText.privacyPolicy.contact}</h2>
            <p>{languageText.privacyPolicy.contactParagraph}</p>
              <h4>E-mail: migraine.app@vp.pl</h4>     

         </PrivacyPolicy2>
    )
}


export default PrivacyPolicy
