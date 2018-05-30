import React, {Component} from 'react';
import styled from 'styled-components';

import Logo from './Logo';

import home from '../assets/home.png'
import settings from '../assets/settings.png'
import stats from '../assets/stats.png'

const Menu = styled.ul`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #fff;
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`

const MenuButton = styled.li`
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
  h6 {
    margin: 5px 0 0 0;
    text-transform: uppercase;
  }
  img {
    width: 30px;
    heigth: 30px;
  }
`

const Menubar = () => {
  return (
    <Menu>
      <MenuButton>
        <img src={home} />
        <h6>Home</h6>
      </MenuButton>
      <MenuButton>
        <img src={stats} />
        <h6>Raports</h6>
      </MenuButton>
      <MenuButton>
        <img src={settings} />
        <h6>Settings</h6>
      </MenuButton>
    </Menu>
  );
}


export default Menubar;
