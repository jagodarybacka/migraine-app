import React from 'react';
import ExitIcon from '../assets/exit.png'
import { CustomPeriodComponent } from './reports/summary/styles'
import {languageText} from '../languages/MultiLanguage.js';

const CustomPeriod = (props) => {
  const type = props.type;
  const content = {
    summary: {
      header: "Summary Report",
      description: 'description'
    },
    oftenTogether: {
      header: "oftenTogether Report",
      description: 'description'
    },
    atmosphericPressure: {
      header: "atmosphericPressure Report",
      description: 'description'
    }
  }
  return (
    <CustomPeriodComponent>
      <h3 className="custom__header">{ content[type].header }</h3>
      <img className="custom__cancel" src={ExitIcon} alt="exit" onClick={() => props.onConfirmFn()}/>
      <p>{ content[type].description }</p>
    </CustomPeriodComponent>
  )
}


export default CustomPeriod;
