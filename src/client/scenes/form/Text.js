import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { languageText } from '../../languages/MultiLanguage';

const Input = styled.input`
  display: block;
  width: 90%;
  padding: 10px 5%;
  background: transparent;
  border: none;
  border-bottom: solid 1px #4c5062;
  font-weight: 300;
`;

const Field = styled.div`
  margin-top: 10px;
  margin-bottom: 30px;
`;

const Text = (props) => {
    const text = languageText.text.enter + ` ${props.title.toLowerCase()}`
    return (
        <div>
            <h2>{props.title}</h2>
            <Input
                type={props.type}
                name={props.name}
                placeholder={text}
                value={props.valueData}
                onChange={props.onChange}
            />
        </div>
    )
}

Text.propTypes = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    title: PropTypes.string
}

export default Text