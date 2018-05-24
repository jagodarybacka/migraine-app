import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";

const Card = styled.div`
  background-color: #f45757;
  color: #fff;
  width: 80%;
  border-radius: 2px 20px 20px 20px;
  padding: 0.5rem;
  position: relative;

  time {
    position: absolute;
    right: 1.5rem;
    top: 1rem;
  }
  h4 {
    margin: 0.5rem;
    text-transform: uppercase;
  }
  p {
    margin: 0.5rem;
  }
`

const RecordCard = (props) => {
  return (
    <Card >
      <time>{props.date}</time>
      <h4>{props.type ? props.type : "Migraine"}</h4>
      <p>{props.duration}, {props.strength}</p>
    </Card>
  );
}


export default RecordCard;
