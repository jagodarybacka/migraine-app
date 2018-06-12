import React, {Component} from 'react';
import styled from 'styled-components';


const Input = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: solid 1px #4c5062;
  font-size: 3.2rem;
  width: 80%; // 100% for type="time"
  display: block;
  text-align: center;
`;
const InputDate = Input.extend`
  font-size: 1.8rem;
  color: #4C5062;
`

const DateTime = (props) => {
  const el = props.date ? (
    <InputDate
      name={`${props.name}_date`}
      type="date"
      placeholder="dd:mm:rr"
      onChange={props.onChange}
    />
  ) : (
    <Input
      name={`${props.name}_time`}
      type="time"
      placeholder="12:00"
      onChange={props.onChange}
    />
  );

  return el;
}


export default DateTime;
