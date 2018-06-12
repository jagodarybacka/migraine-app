import React, {Component} from 'react';
import styled from 'styled-components';


const RadioComponent = styled.div`
  color: ${props => props.color};
  display: flex;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-left: 0;
  border-radius: 10px;
  margin: 0.5rem;
  position: relative;

  label {
    cursor: pointer;
    font-weight: 400;
    text-transform: none !important;
    font-size: 1.2rem;
    color: ${props => props.color};
    padding: 15px 20px;
    display: flex;
    align-items: center;
    position: relative;
    img {
      width: 24px;
      height: 24px;
      margin-right: 0.5rem;
    }
    .imgChecked {
      position: absolute;
      opacity: 0;
    }
  }



`
const FauxBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  border: 2px solid ${props => props.color};
  z-index: -1;
`

const Radio = styled.input`
  appearance: none;
  display: none;
  &:checked ~ div {
    background-color: ${props => props.color};
    border: none;
  }
  &:checked ~ label {
    color: white;
  }
  &:checked ~ label .imgChecked {
    opacity: 1;
  }
`

class RadioButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <RadioComponent small={this.props.small} color={this.props.color}>
        <Radio
          type="radio"
          small={this.props.small}
          id={this.props.id}
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          color={this.props.color}
          />
        <FauxBg class="bg" color={this.props.color}/>
        <label htmlFor={this.props.id}>
          <img src={this.props.imgColor} />
          <img className="imgChecked" src={this.props.img} />
          {this.props.text}
        </label>
      </RadioComponent>
    )
  }
}


export default RadioButton;
