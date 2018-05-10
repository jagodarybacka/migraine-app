import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  display: block;

  width: 90%;

  padding: 10px 5%;
  background: transparent;

  border: none;
  border-bottom: solid 1px #4c5062;

  font-weight: 300;
`;

const Label = styled.label`
  text-transform: uppercase;

  font-weight: 700;
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`;

const Field = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;

  ${Label} {
    color: ${props => (!props.isValid ? "red" : "black")};
  }

  ${Input} {
    ${props => !props.isValid && (`
      border-color: red;
      color: red;
      &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: red;
      }
      &::-moz-placeholder { /* Firefox 19+ */
        color: red;
      }
      &:-ms-input-placeholder { /* IE 10+ */
        color: red;
      }
      &:-moz-placeholder { /* Firefox 18- */
        color: red;
      }
    `)}
  }
`;

const TextInput = (props) => {
  const { id, type, name, value, isValid, errorMsg, onChange } = props;
  const text = `Enter your ${name.toLowerCase()}`
  const hasError = !isValid && !!errorMsg;

  return (
    <Field isValid={!hasError}>
      <Label for={id}>{name}</Label>
      <Input
        type={type}
        id={id} name={id}
        placeholder={text}
        value={value}
        onChange={onChange}
      />
      {hasError && (
        <ErrorMsg>{errorMsg}</ErrorMsg>
      )}
    </Field>
  )
}

TextInput.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  isValid: PropTypes.bool,
  errorMsg: PropTypes.string,
  onChange: PropTypes.func,
}

TextInput.defaultProps = {
  isValid: true,
}

export default TextInput
