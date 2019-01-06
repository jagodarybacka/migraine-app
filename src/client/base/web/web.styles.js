import styled from 'styled-components'
import bg from '../../svg/bg.svg'

export const Page = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-image: url(${bg});
`

export const Language = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 0 2vw 0 2vw;

  .language__button {
    margin: 0 0.5em;
    outline: none; 
    border: none;
    padding: 0;
  }
`

export const Header = styled.header`
  height: 100%;
  padding: 0;

  .header__title {
    font-size: 4em;
    text-align: center;
    margin-bottom: 0;
  }

  .header__subtitle {
    opacity: 0.5;
    text-align: center;
    font-weight: 400;
  }

  .header__logo {
    width: 7em;
    left: calc(50% - 3.5em);
    position: relative;
  }

  .header__qr {
    height: 30vh;
    margin: 2em;
  }

  .header__button {
    margin: 2em 0;
    background: #FE8383;
    border: none;
    border-radius: 10px;
    padding: 15px 20px;
    font-size: 2em;
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;

  }

  .header__box {
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`
