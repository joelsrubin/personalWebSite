import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>Joel Rubin</h1>
      </Header>
      <Body>
        <ButtonContainer>
          <form target='_blank' action='https://github.com/joelsrubin'>
            <Button github>Github</Button>
          </form>
          <form
            target='_blank'
            action='https://www.linkedin.com/in/joel-rubin-0529'
          >
            <Button>LinkedIn</Button>
          </form>
        </ButtonContainer>
      </Body>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    background-color: cornflowerblue;
    color: #c6d4df;
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  }
`;

const Header = styled.div`
  text-align: center;
  font-size: 3em;
`;

const Body = styled.div`
  height: 100vh;
`;

const Button = styled.button`
  border-radius: 30px;
  height: 100px;
  width: 100px;
  /* border: none; */
  outline: none;
  background-color: ${(props) =>
    props.github ? 'rgb(172 114 111)' : 'rgb(107 165 75)'};

  :active {
    background-color: ${(props) => (props.github ? '#9a4747' : '#357b35')};
  }
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
`;

const ButtonContainer = styled.div`
  width: 50%;

  margin: auto;
  display: flex;
  justify-content: space-evenly;
`;
