import styled from 'styled-components'

export const OftenTogetherComponent = styled.div`
  background: #fff;
  margin: 0 5%;
  padding: 1.5em 0;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);

  h2 {
    text-align: center;
    font-size: 1.3em;
    margin: 0 0 .5em;
  }

  .together__header {
    text-transform: uppercase;
    text-align: center;
  }
  .together__section {

  }
  .together__fields {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`

export const QuestionIcon = styled.img`
  width: 32px;
  height: auto;
  position: absolute;
  top: 1em;
  z-index: 100;
  left: 1em;
  opacity: 0.6;
`

export const Select = styled.select`
  background: transparent;
  font-size: 0.9em;
  font-weight: 300;
  border-radius: 22px;
  padding: 11px 27px;
  margin: auto;
  outline: none;
`
export const TogetherField = styled.div`
  background: ${props => (props.color || '#00bcd4')};
  color: #fff;
  text-transform: uppercase;
  margin: 5px;
  padding: 10px 10px;
  border-radius: 10px;
  text-align: center;

`

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  width: auto;
  h5 {
    font-weight: 300;
    margin: 1em;
  }
`
