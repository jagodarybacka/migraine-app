import React from 'react';
import styled from 'styled-components';

const BubbleComponent = styled.div`
  background-color: ${props => props.color};
  color: white;
  display: flex;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  border-radius: 10px;
  margin: 0.5rem;

  img {
    width: 28px;
    height: 28px;
  }

  p {
    font-weight: 400;
  }
`


const Bubble = (props) => {
  const img = props.img ? <img src={props.img} /> : "";

  return (
    <BubbleComponent color={props.color}>
      {img}
      <p>{props.text}</p>
    </BubbleComponent>
  )
}

export default Bubble;
