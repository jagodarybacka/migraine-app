import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

import Header from '../components/Header';
import Menubar from '../components/Menubar';
import Button from '../components/Button'

const SettingsComponent = styled.div`
  justify-content: center;
  display: block;
  padding: 7rem 0;
  margin: 0;
  text-align: center;
`

const Settings = () => {
  return (
    <SettingsComponent className="Settings">
      <Header />
      <Link to="/">
        <Button text="Log out" primary />
      </Link>
      <Menubar />
    </SettingsComponent>
  );
}


export default Settings;
