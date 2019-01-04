import React, {Component} from 'react';
import styled from 'styled-components';

import Logo from './Logo';

const TopHeader = styled.header`
  position: fixed;
  top: 0;
  padding: 0.5rem 0;
  width: 100%;
  border-bottom: solid 1px #9e9e9e4f;
  display: flex;
  justify-content: center;
  z-index: 1000000;
  background-color: #FAF8F1;

`


const Header = () => {
  return (
    <TopHeader className="Header">
      <Logo size="50px"></Logo>
    </TopHeader>
  );
}


export default Header;
