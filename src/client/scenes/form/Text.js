import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { languageText } from '../../languages/MultiLanguage';

const Input = styled.input`
  width: 50%;
  padding: 10px 5%;
  background: #fff;
  border: none;
  font-weight: 300;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
`;


const Text = (props) => {
    const text = languageText.text.enter + ` ${props.title.toLowerCase()}`
    const subtitle = props.subtitle && ( <h3 style={{opacity: "0.8"}}>{props.subtitle}</h3>)

    return (
        <div>
            <h2>{props.title}</h2>
            { subtitle }
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
