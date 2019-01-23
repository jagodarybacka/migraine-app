import styled from 'styled-components'

 export const SummaryComponent = styled.div`
  margin: 0 5%;
  min-width: 300px;
  background-color: ${props => (props.theme.backgroundColorSecondary)};
  padding: 1.5em 0;
  position: relative;
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
  .summary__container--select {
    display: relative;
    width: 100%;
    background: #eda;
  }
  .summary__row {
    display: flex;
    margin-top: 1em;
    justify-content: center;
  }
  .summary__period {
    text-align: center;
    margin: 0.5em 0 0;
    font-size: 1em;
    opacity: 0.6;
  }
`

 export const Select = styled.select`
 background: ${props => (props.theme.backgroundColorSecondary)};
  font-size: 0.9em;
  font-weight: 300;
  border-radius: 22px;
  padding: 11px 27px;
  margin: auto;
  outline: none;
  color: ${props => (props.theme.fontColor)};
`

export const CustomIcon = styled.img`
  width: 32px;
  height: auto;
  position: absolute;
  top: 2em;
  right: 1em;
`

export const QuestionIcon = styled(CustomIcon)`
  left: 1em;
  opacity: 0.6;
`

export const CustomPeriodComponent = styled.div`
  position: absolute;
  background: ${props=>props.theme.backgroundColorSecondary};
  width: 100%;
  height: 100%;
  text-align: center;
  top: 0;
  .custom__cancel {
    position: absolute;
    top: 0.5em;
    right: 0.5em;
  }
  .custom__header {
    margin: 1em 0 0;
  }
  color: ${props=>props.theme.fontColor};
`
