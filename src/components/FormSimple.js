import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from "react-router-dom"

import Button from '../components/Button'
import Logo from '../components/Logo'


const FormComp = styled.form`
`

const FormSimple = (props) => {
  return (
    <FormComp>
      <h1>{props.name}</h1>
      <Logo size="80px" margin="0 0 10% 0"/>
      {props.children}
      <Link to={props.link}>
        <Button text={props.submit} />
      </Link>
    </FormComp>
  )
}

export default FormSimple
