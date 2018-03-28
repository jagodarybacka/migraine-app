import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import logo from '../logo.svg'

const LogoImg = styled.img `
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'};
`;

const Logo = (props) => {
  return (
    <LogoImg size={props.size} src={logo}></LogoImg>
  )
}

export default Logo
