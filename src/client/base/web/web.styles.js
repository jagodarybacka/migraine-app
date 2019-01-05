import styled from 'styled-components'
import bg from '../../svg/bg.svg'

export const Page = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  background-image: url(${bg});
`

export const Header = styled.header`
  height: 100%;
  padding: 3em 0;

  .header__title {
    font-size: 4em;
    text-align: center;
    margin-bottom: 0;
  }

  .header__subtitle {
    opacity: 0.5;
    font-weight: 400;
  }

  .header__logo {
    width: 7em;
    left: calc(50% - 3.5em);
    position: relative;
  }

  .header__qr {
    width: 40%;
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
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`
