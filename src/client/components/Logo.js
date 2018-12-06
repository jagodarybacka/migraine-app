import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from "react-router-dom";

import logo from '../svg/logo.svg'

const LogoImg = styled.img `
  width: ${props => props.size || '100px'};
  height: ${props => props.size || '100px'}
  margin: ${props => props.margin || '0'};
`;

const Logo = (props) => {
  const linking = props.notlink ?
     <LogoImg size={props.size}
              margin={props.margin}
              src={logo}></LogoImg>
    :
    (<Link to="/home">
        <LogoImg size={props.size}
          margin={props.margin}
          src={logo}></LogoImg>
      </Link>)
    return linking
}

Logo.propTypes = {
  size: PropTypes.string,
  margin: PropTypes.string
}

export default Logo
