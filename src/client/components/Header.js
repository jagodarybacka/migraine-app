import React from 'react';
import styled from 'styled-components';
import { withTheme } from "@callstack/react-theme-provider";
import {getTheme} from '../themes/ThemeHandler.js';
import BackImg from '../assets/back-arrow.png'
import BackImgWhite from '../assets/back-arrow-white.png'
import SaveImg from '../assets/save.png'
import SaveImgWhite from '../assets/save-white.png'
import Logo from './Logo';
import { Link } from 'react-router-dom';


const TopHeader = styled.header`
  position: fixed;
  top: 0;
  padding: 0.5rem 0;
  width: 100%;
  border-bottom: solid 1px #9e9e9e4f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000000;
  background-color: ${props=>props.theme.backgroundColor};

  .header-img {
    width: 33px;
    height: 33px;
    margin: 0 1em;
    opacity: 0.6;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.2;
  }

  .hidden {
    opacity: 0;
  }
`


const Header = (props) => {
  let classes = props.isForm ? 'header-img' : 'header-img hidden';
  return (
    <TopHeader theme={props.theme} className="Header">
      <Link to="/home" className={!props.isForm ? "hidden" : ''}>
        <img
          className={classes}
          src={getTheme() == "DarkTheme" ? BackImgWhite :BackImg}
          alt="back"
        />
      </Link>
      <Logo size="50px"></Logo>
      <Link to={props.saveLink || '/home'} className={(!props.isForm ? "hidden" : '') + (!props.isValid ? ' disabled' : '')}>
        <img
          className={classes}
          src={getTheme() == "DarkTheme" ? SaveImgWhite : SaveImg}
          alt="save"
        />
      </Link>
    </TopHeader>
  );
}


export default withTheme(Header);
