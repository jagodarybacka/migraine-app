import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
      <Button text="Submit" />
    </FormComp>
  )
}

export default FormSimple
