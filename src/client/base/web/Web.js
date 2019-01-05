import React, { Component } from 'react';
import qr from './qr.svg'
import logo from '../../svg/logo.svg'
import { Page, Header } from './web.styles'
const Web = () => {
  return (
    <Page>
      <Header>
        <img className="header__logo" src={logo} />
        <h1 className="header__title">MIGRAINE</h1>
        <h2 className="header__subtitle">Created to help migraineurs live without headaches and auras</h2>
        <div className="header__box">
          <h3 className="header__text">Scan QR code with your mobile phone to get the application</h3>
          <img className="header__qr" src={qr} />
          <button className="header__button">Find out more</button>
        </div>
      </Header>
    </Page>
  )
}

export default Web;
