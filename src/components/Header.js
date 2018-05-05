import React, {Component} from 'react';
import styled from 'styled-components';

import Logo from './Logo';

const TopHeader = styled.header`
  position: absolute;
  top: 0;
  padding: 0.5rem 0;
  width: 100%;
  border-bottom: solid 1px #9e9e9e4f;
  display: flex;
  justify-content: center;

`


const Header = () => {
  return (
    <TopHeader className="Header">
      <Logo size="50px"></Logo>
    </TopHeader>
  );
}


export default Header;
