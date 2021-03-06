import React from 'react';
import styled from 'styled-components';
import { withTheme } from "@callstack/react-theme-provider";

import { Link } from 'react-router-dom'
import home from '../assets/home.png'
import settings from '../assets/settings.png'
import stats from '../assets/stats.png'
import {languageText} from '../languages/MultiLanguage.js';

const Menu = styled.ul`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props=>props.theme.backgroundColorSecondary};
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  z-index: 2;
  color:${props => props.theme.fontColor}
`

const MenuButton = styled.li`
  margin: 0.5rem;
  opacity: 0.6;
  width: 6em;
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h6 {
    margin: 5px 0 0 0;
    text-transform: uppercase;
  }
  img {
    width: 30px;
    heigth: 30px;
  }

  &.selected {
    opacity: 1;
  }
`

const Menubar = (props) => {
  const location = window.location.pathname;
  return (
    <Menu theme={props.theme}>
      <MenuButton className={location === '/home' && 'selected'}>
        <Link to="/home">
        <img src={home} alt="home" />
        <h6>{languageText.menuBar.home}</h6>
        </Link>
      </MenuButton>
      <MenuButton className={location === '/reports' && 'selected'}>
        <Link to="/reports">
        <img src={stats} alt="stats" />
        <h6>{languageText.menuBar.reports}</h6>
        </Link>
      </MenuButton>
      <MenuButton className={location === '/settings' && 'selected'}>
        <Link to="/settings">
          <img src={settings} alt="settings" />
          <h6>{languageText.menuBar.settings}</h6>
        </Link>
      </MenuButton>
    </Menu>
  );
}


export default withTheme(Menubar);
