import styled from 'styled-components';

export const SettingsComponent = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 8.25rem 0.25em;
  padding-bottom: 5em;
  margin: 0;
  text-align: center;
  height: auto;
  background-color:${props => props.theme.backgroundColor}
  color:${props => props.theme.fontColor}

  .chosenLang{
    color: red;
  }
`

export const SettingsCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Buttons = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 10px;
  h6 {
    margin: 5px 0 0 0;
    text-transform: uppercase;
  }
  img {
    width: 30px;
    heigth: 30px;
  }
`

export const Error = styled.div`
  display: flex;
  text-align: center;
  h5 {
    font-weight: 300;
    margin: 0;
  }
`

export const LanguageButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const List = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin: 2em 10%;
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
  justify-content: center;
  color: black;
  h4{
    margin: 5px;
    text-transform: uppercase;
    font-weight: 300;
  }
`

export const FormButtons = styled.div`
width: 100%;
display: flex;
flex-wrap: wrap;
flex-direction: row;
justify-content: space-evenly;
flex: 1;
  label {
    width: 6.5em;
    height: 2.75em;
  }
`

export const Menu = styled.ul`
  position: fixed;
  top: 4.25em;
  z-index: 1000;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color:${props => props.theme.backgroundColorSecondary}
  color:${props => props.theme.fontColor}
  list-style-type: none;
  padding: 0;
  margin: 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.12);
`

export const MenuButton = styled.li`
  margin: 0.5rem;
  opacity: 0.7;
  width: 6em;
  h6 {
    margin: 5px 0 0 0;
    text-transform: uppercase;
  }
  img {
    width: 30px;
    heigth: 30px;
  }
  &.selected {
    opacity: 1;
  }
`