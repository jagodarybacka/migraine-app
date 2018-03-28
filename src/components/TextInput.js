import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  display: block;

  width: 90%;
  margin-top: 10px;
  margin-bottom: 30px;
  padding: 10px 5%;

  border: none;
  border-bottom: solid 2px #006fd2;

  font-weight: 300;
`

const Label = styled.label`
  text-transform: uppercase;

  font-weight: 700;
`

const TextInput = (props) => {
  const text = `Enter your ${props.name.toLowerCase()}`
  return (
    <div>
      <Label for={props.id}>{props.name}</Label>
      <Input type={props.type} id={props.id} placeholder={text}></Input>
    </div>
  )
}

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
}

export default TextInput
