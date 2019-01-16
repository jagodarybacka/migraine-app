import React from 'react';
import styled from 'styled-components';

const Check = styled.label`
  color: white;
  display: flex;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.small ? '0' : '5px 10px'};
  border-radius: 10px;
  margin: 0.5rem;
  position: relative;
  cursor: pointer;

  p {
    font-weight: 400;
    text-transform: none !important;
    font-size:  ${props => props.small ? '1em' : '1.2rem'};
    color: ${props => props.color || '#000'};
  }

  img {
    width: 24px;
    height: 24px;
  }

  input {
    display: none;
  }

  input:checked ~ div{
    background-color: ${props => props.color || '#000'};
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
  border: 2px solid ${props => props.color || '#000'};
  z-index: -1;
`

class Checkbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isActive: props.checked || false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }))
  }

  render() {
    return (
      <Check className="Check" color={this.props.color} small={this.props.small}>
        <input
          checked={this.props.checked}
          name={this.props.name}
          type="checkbox"
          value={this.props.value}
          onChange={this.props.onChange}
          onClick={this.handleClick}
          />
        <FauxBg className="bg" color={this.props.color}/>
        {
          this.props.img && (
            <img src={
              this.props.checked ? this.props.img : this.props.imgColor
            } alt=''/>
          )
        }
        <p>{this.props.text}</p>
      </Check>
    )
  }
}


export default Checkbox;
