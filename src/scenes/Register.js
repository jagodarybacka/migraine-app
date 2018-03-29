import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FormSimple from '../components/FormSimple'
import TextInput from '../components/TextInput'


const Register = (props) => {
  return (
      <FormSimple name="Sign Up" submit="Get started">
        <TextInput
          type="text"
          id="username"
          name="Username" />
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

export default Register
