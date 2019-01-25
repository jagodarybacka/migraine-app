import styled from 'styled-components';

export const Widget = styled.section`

width: 90%;
margin: 1rem 5% 2em 5%;
display: flex;
flex-direction: column;
position: relative;
background-color: ${props=>props.theme.backgroundColorSecondary};
color: ${props=>props.theme.fontColor};
padding: 0.5em 0;
box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);
`

export const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative;
width: 100%;
padding: 0.5em 0 0;

p {
  position: absolute;
  top: 0.5rem;
  color: #9a9a9a;
  text-transform: uppercase;
  line-height: 1rem;
  font-size: 0.9rem;
}

p.text {
  position: relative;
  top: unset;
  text-transform: unset;
  line-height: 1rem;
  font-size: 0.9rem;
}

h3 {
  text-transform: uppercase;
  font-size: 30px;
  margin: 0 1rem 0 0.5rem;
  font-weight: 300;
}
img {
  padding: 0 0.5rem 0 1rem;
  width: 60px;
  height: 60px;
}

.location {
  padding: unset;
  width: 32px;
  height: auto;
  opacity: ${props => props.localization === false ? '1' : '0.3'};
  position: absolute;
  top: 1em;
  right: 0.5em;
}

.use__localization {
  padding: unset;
  width: 32px;
  height: auto;
  opacity: ${props => props.localization === true ? '1' : '0.3'};
  position: absolute;
  top: 1em;
  left: 0.5em;
}

`

export const Element = styled.div`
display: flex;
justify-content: center;
align-items: center;

.name {
  margin: 0 0.5rem;
}

.value {
  font-weight: 700;
}
img {
  width: 24px;
  height: 24px;
}
p {
  margin: 0.5em 0;
}
`

export const Error = styled.h5`
  font-weight: 300;
  color:  #ff471a;
  margin-top: 0;
`

export const City = styled.section`
width: 90%;
margin: 1rem 5% 0 5%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
align-content: stretch;
position: relative;
background-color: ${props=>props.theme.backgroundColorSecondary};
color: ${props=>props.theme.buttonFontColor};
padding: 0;
padding-bottom: 2rem;
margin-bottom: 4rem;
box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);
`
export const Input = styled.input`
  display: block;
  width: auto;
  padding: 10px 5%;
  background: transparent;
  border: none;
  border-bottom: solid 1px #4c5062;
  font-weight: 300;
  margin-top: 10px;
  margin-bottom: 30px;
  color: ${props=>props.theme.fontColor};
`;
