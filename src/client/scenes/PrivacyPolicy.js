import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
//import { languageText } from '../../languages/MultiLanguage';
import closeIcon from '../assets/exit.png'
import closeIconWhite from '../assets/exit-white.png'
import {getTheme} from '../themes/ThemeHandler.js';



const ExitIcon = styled.img`
  clear: both;
  width: 20px;
  height: auto;
  right: 1.2rem;
  position: fixed;
  opacity: 0.7;
`

const PrivacyPolicy2 =  styled.p`
  font-weight: 300;
  justify-content: left;
  padding: 0 5%;
  height: 100vh;
`;


const PrivacyPolicy = () => {
    
    return (
        <PrivacyPolicy2>
          <Link to="/register" >
            <ExitIcon src={getTheme()=="DarkTheme" ? closeIconWhite : closeIcon} /> 
          </Link>
            <p>Privacy Policy </p>
        </PrivacyPolicy2>
    )
}


export default PrivacyPolicy
