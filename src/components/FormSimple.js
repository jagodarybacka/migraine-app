import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from "react-router-dom"

import Button from '../components/Button'
import Logo from '../components/Logo'


const FormComp = styled.form`
`

const FormSimple = (props) => {
  const { name, submit, children, onSubmit } = props;

  return (
    <FormComp method="POST" onSubmit={onSubmit} noValidate="noValidate">
      <h1>{name}</h1>
      <Logo size="80px" margin="0 0 10% 0"/>
      <div>
        {children}
        <Button type="submit" text={submit} />
      </div>
    </FormComp>
  )
}

export default FormSimple
