import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withTheme } from "@callstack/react-theme-provider";

import {languageText} from '../languages/MultiLanguage.js';

const Input = styled.input`
  display: block;

  width: 90%;

  padding: 10px 5%;
  background: transparent;

  border: none;
  border-bottom: solid 1px #4c5062;

  font-weight: 300;
  border-color: ${props => props.theme.inputColor};
  color: ${props => props.theme.inputColor};
`;

const Label = styled.label`
  text-transform: uppercase;
  left: 0;
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
    color: ${props => (!props.isValid ? "red" : props.theme.fontColor)};
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
  const { id, type, name, value, placeholder, isValid, errorMsg, onChange, theme } = props;
  const text = languageText.textInput.enterYour + ` ${placeholder.toLowerCase()}`
  const hasError = !isValid && !!errorMsg;

  return (
    <Field isValid={!hasError}>
      <Label htmlFor={id}>{name}</Label>
      <Input
        theme={theme}
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

export default withTheme(TextInput);
