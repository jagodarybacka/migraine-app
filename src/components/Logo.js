import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import logo from '../svg/logo.svg'

const LogoImg = styled.img `
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'}
  margin: ${props => props.margin || '0'};
`;

const Logo = (props) => {
  return (
    <LogoImg size={props.size}
             margin={props.margin}
             src={logo}></LogoImg>
  )
}

Logo.propTypes = {
  size: PropTypes.string,
  margin: PropTypes.string
}

export default Logo
