import styled from 'styled-components'
import bg from '../../svg/bg.svg'

export const Page = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  background-image: url(${bg});

  .web__container {
    width: 60%;
    min-width: 1000px;
    margin: auto;
    margin-top: 5%;
    display: flex;
    flex-direction: column;

    p {
      text-align: center;
      opacity: 0.7;
      text-align: center;
      font-weight: 400;
      max-width: 700px;
      margin: 1em auto 2em;
      line-height: 1.5em;
      letter-spacing: 0.5px;
    }

    .web__button {
      margin: 1em 0;
      background: #FE8383;
      border: none;
      border-radius: 10px;
      padding: 15px 20px;
      font-size: 1.2em;
      font-weight: 900;
      color: #fff;
      text-transform: uppercase;
      cursor: pointer;
      box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
      transition: background 0.2s ease-in-out;
      &:hover {
        background: #f92e2e;
      }
    }

    .web__p--brand {
      text-transform: uppercase;
      font-weight: 900;
      padding: 0 7px;
      font-size: 1em;
    }

    .web__features {
      margin-bottom: 4rem;
      padding: 2rem 0 4rem;
      background: #fff;
      box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
      display: flex;
      flex-direction: column;
      align-items: center;
    }


    .features__header {
      font-size: 2em;
    }

    .features__subheader {
      font-size: 1.5em;
      text-align: center;
      margin-top: 2em;
    }

    .features__imgs {
      display: flex;
      max-width: 100%;
      margin-bottom: 1rem;
    }

    .features__img {
      height: auto;
      max-height: 500px;
      width: auto;
      margin: 0 10px;
      box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.21);
    }
  }
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

  .header__text {
    font-size: 1.5em;
    text-align: center;
    margin-top: 2em;
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
    font-size: 1.5em;
    font-weight: 900;
    color: #fff;
    text-transform: uppercase;
    cursor: pointer;
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
    transition: background 0.2s ease-in-out;
    &:hover {
      background: #f92e2e;
    }
  }

  .header__box {
    display: flex;
    text-align: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }

  .header__img {
    height: auto;
    max-height: 700px;
    width: auto;
    margin: 0 10px;
    box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.21);
  }

  .header__img-iphone {
    height: auto;
    max-height: 400px;
    width: auto;
    margin: 0 10px;
    box-shadow: 0px 3px 12px 1px rgba(0, 0, 0, 0.21);
  }

  .header__contaier {
    margin-bottom: 4rem;
    padding: 2rem 0 4rem;
    background: #fff;
    box-shadow: 0px 1px 2px 0px rgba(0,0,0,0.2);
    width: 50%;
    min-width: 800px;
  }
`

export const HeaderParalax = styled.div`
  max-height: 600px;
  overflow: hidden;
  text-align: center;
  opacity: 0.9;
  transition: opacity 0.5s ease-in;
  &:hover {
    opacity: 1;
  }
  img {
    transition: transform 1s ease-in-out;
    transform: translateY(10px);
    &:hover {
      transform: translateY(0px)
    }
  }
`;

export const Footer = styled.footer`
  background: #ff9292cf;
  color: #FFF;
  text-align: center;
  text-transform: uppercase;
  padding: 2em;
  margin-top: 2em;
  a {
    text-decoration: underline;
  }
`
