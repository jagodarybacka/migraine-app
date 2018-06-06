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
  display: none;
`;
const InputDate = Input.extend`
  font-size: 1.8rem;
  color: #4C5062;
`
const Placeholder = styled.p`
  font-size: 1.2rem !important;
  text-transform: none !important;
  margin: 0.2rem 0.8rem;
  font-weight: 400;
`


const DateTime = (props) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const time = `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}
                :
                ${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`;
  const date = `${new Date().getDate()} ${monthNames[new Date().getMonth()]} ${new Date().getFullYear()}`;

  const el = props.date ? (
    <div>
      <Placeholder
        onClick={() => {
          document.querySelector(`#${props.id}`).click();
        }}>{date}</Placeholder>
      <InputDate
        name={`${props.name}_date`}
        type='date'
        id={props.id}
        onChange={props.onChange}
      />
    </div>
  ) : (
    <div>
      <Placeholder
        onClick={() => {
          document.querySelector(`#${props.id}`).click();
        }}>{time}</Placeholder>
      <Input
        name={`${props.name}_time`}
        type="time"
        id={props.id}
        onChange={props.onChange}
      />
    </div>
  );

  return el;
}


export default DateTime;
