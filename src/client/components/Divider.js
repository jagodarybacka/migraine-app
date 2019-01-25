import React from 'react';
import styled from 'styled-components';
import { withTheme } from "@callstack/react-theme-provider";
import {currentTheme} from '../themes/ThemeHandler.js';

const DividerComponent = styled.h3`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0.5;
  width: 100%;
  padding-top: 1rem;
  border-top: 2px solid ${props => props.theme.dividerColor};
`

const Divider = (props) => {
  return (
    <DividerComponent theme={currentTheme.theme}>{props.text}</DividerComponent>
  )
}

export default withTheme(Divider);
