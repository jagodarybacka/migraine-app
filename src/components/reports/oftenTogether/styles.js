import styled from 'styled-components'

export const OftenTogetherComponent = styled.div`
  height: 100%;
  background: #fff;
  margin: 0 5%;
  padding: 1.5em 0;
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
    width: 300px;
  }
`

export const Select = styled.select`
  background: transparent;
  font-size: 0.9em;
  font-weight: 300;
  border-radius: 22px;
  padding: 11px 27px
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
