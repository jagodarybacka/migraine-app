import React from 'react';
import styled from 'styled-components';


const DividerComponent = styled.h3`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 3px;
  opacity: 0.5;
  width: 100%;
  padding-top: 1rem;
  border-top: 2px solid #eee;
`

const Divider = (props) => {
  return (
    <DividerComponent>{props.text}</DividerComponent>
  )
}

export default Divider;
