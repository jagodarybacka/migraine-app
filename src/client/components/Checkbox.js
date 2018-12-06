import React, {Component} from 'react';
import styled from 'styled-components';

const Check = styled.label`
  color: white;
  display: flex;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 0.5rem;
  position: relative;
  cursor: pointer;

  p {
    font-weight: 400;
    text-transform: none !important;
    font-size: 1.2rem;
    color: ${props => props.color};
  }

  img {
    width: 24px;
    height: 24px;
  }

  input {
    display: none;
  }

  input:checked ~ div{
    background-color: ${props => props.color};
    border: none;
  }
  input:checked ~ p{
    color: white;
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

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: false,
      addAnswer: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log(this.state);
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
    if(this.props.value == "Other"){
      console.log("other")
      this.setState(prevState => ({
        addAnswer: !prevState.addAnswer
      }))
    }
  }

  render() {
    return (
      <Check class="Check" color={this.props.color}>
        <input
          name={this.props.name}
          type="checkbox"
          value={this.props.value}
          onChange={this.props.onChange}
          onClick={this.handleClick}
          />
        <FauxBg class="bg" color={this.props.color}/>
        <img src={
            this.state.isActive ? this.props.img : this.props.imgColor
          } />
        <p>{this.props.text}</p>
      </Check>
    )
  }
}


export default Checkbox;
