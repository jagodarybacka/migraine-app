import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'


const Login = (props) => {
  return (
      <FormSimple name="Log In">
        <TextInput
          type="email"
          id="email"
          name="Email" />
        <TextInput
          type="password"
          id="Password"
          name="Password" />
      </FormSimple>
  )
}

export default Login
