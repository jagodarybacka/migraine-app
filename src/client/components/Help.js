import React from 'react';
import ExitIcon from '../assets/exit.png'
import { CustomPeriodComponent } from './reports/summary/styles'
import {languageText} from '../languages/MultiLanguage.js';
import styled from 'styled-components'
import { withTheme } from "@callstack/react-theme-provider";

const HelpComponent = styled(CustomPeriodComponent)`
  padding: 10px;
  box-sizing: border-box;
  background: ${props=>props.theme.iconBackgroundColor};
`

const Help = (props) => {
  const type = props.type;
  const content = {
    summary: {
      header: `${languageText.reports.report} - ${languageText.reports.summary.toLowerCase()}`,
      description: languageText.reports.summaryDescription
    },
    oftenTogether: {
      header: `${languageText.reports.report} - ${languageText.reports.oftenTogether.toLowerCase()}`,
      description: languageText.reports.oftenTogetherDescription
    },
    atmosphericPressure: {
      header:  `${languageText.reports.report} - ${languageText.reports.pressure.toLowerCase()}`,
      description: languageText.reports.pressureDescription
    }
  }
  return (
    <HelpComponent theme={props.theme}>
      <h3 className="custom__header">{ content[type].header }</h3>
      <img className="custom__cancel" src={ExitIcon} alt="exit" onClick={() => props.onConfirmFn()}/>
      <p>{ content[type].description }</p>
    </HelpComponent>
  )
}


export default withTheme(Help);
