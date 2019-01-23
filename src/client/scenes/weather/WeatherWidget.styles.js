import styled from 'styled-components';

export const Widget = styled.section`
width: 90%;
margin: 1rem 5% 0 5%;
display: flex;
flex-direction: column;
position: relative;
color: #363636;
background-color: white;
padding: 0;
margin-bottom: 4rem;
box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.3);
`

export const Header = styled.div`
display: flex;
justify-content: center;
align-items: center;
position: relative;
padding: 2.7rem 0 0 0;

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

export const City = styled.section`
width: 90%;
margin: 1rem 5% 0 5%;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
align-content: stretch;
position: relative;
color: #363636;
background-color: white;
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
`;
