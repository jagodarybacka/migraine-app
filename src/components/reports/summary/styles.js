import styled from 'styled-components'

 export const SummaryComponent = styled.div`
  margin: 0 5%;
  background-color: #fff;
  height: 100%;
  padding: 1.5em 0;

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
  }
  .summary__container--row {
    flex-direction: row;
    align-items: baseline;
    margin-top: 1em;
  }
  .summary__row {
    display: flex;
    margin-top: 1em;
  }
`

 export const Select = styled.select`
  background: transparent;
  font-size: 0.9em;
  font-weight: 300;
  border-radius: 22px;
  padding: 11px 27px
`
