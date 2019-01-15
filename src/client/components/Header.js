import React, {Component} from 'react';
import styled from 'styled-components';
import BackImg from '../assets/back-arrow.png'
import SaveImg from '../assets/save.png'
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
  background-color: #FAF8F1;

  .header-img {
    width: 33px;
    height: 33px;
    margin: 0 1em;
    opacity: 0.5;
  }

  .hidden {
    opacity: 0;
  }
`


const Header = (props) => {
  const classes = props.isForm ? 'header-img' : 'header-img hidden'
  return (
    <TopHeader className="Header">
      <Link to="/home" className={!props.isForm ? "hidden" : ''}>
        <img
          className={classes}
          src={BackImg}
          alt="back"
        />
      </Link>
      <Logo size="50px"></Logo>
      <Link to={props.saveLink || '/home'} className={!props.isForm ? "hidden" : ''}>
        <img
          className={classes}
          src={SaveImg}
          alt="save"
        />
      </Link>
    </TopHeader>
  );
}


export default Header;
