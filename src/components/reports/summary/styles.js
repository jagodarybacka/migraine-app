import styled from 'styled-components'

 export const SummaryComponent = styled.div`
  margin: 0 5%;
  background-color: #fff;
  padding: 1.5em 0;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);


  .summary__number {
    font-size: 1.8em;
    font-weight: 800;
  }
  .summary__number--accent {
    color: #e91e63
    font-size: 2em;
  }
  .summary__char {
    margin-top: 1em;
  }
  .summary__text {
    font-size: 1em;
    text-align: center;
    margin-top: 0.5em;
  }
  .summary__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .summary__container--row {
    flex-direction: row;
    align-items: baseline;
    margin-top: 1em;
  }
  .summary__row {
    display: flex;
    margin-top: 1em;
    justify-content: center;
  }
`

 export const Select = styled.select`
  background: transparent;
  font-size: 0.9em;
  font-weight: 300;
  border-radius: 22px;
  padding: 11px 27px;
  margin: auto;
`
