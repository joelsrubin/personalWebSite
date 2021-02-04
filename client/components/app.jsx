import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import styled, { createGlobalStyle, keyframes } from 'styled-components';

export default function App() {
  let start,
    end,
    delta = 0.6;
  let start2,
    end2,
    delta2 = 0.6;

  const measureClick = (e) => {
    let button = document.getElementById('button1');
    button.addEventListener('mousedown', () => {
      start = new Date();
    });
    button.addEventListener('mouseup', () => {
      end = new Date();
      delta = (end - start) / 1000.0;
    });
    if (delta > 0.5) {
      e.preventDefault();
    }
  };
  const measureClick2 = (e) => {
    let button2 = document.getElementById('button2');
    button2.addEventListener('mousedown', () => {
      start2 = new Date();
    });
    button2.addEventListener('mouseup', () => {
      end2 = new Date();
      delta2 = (end2 - start2) / 1000.0;
    });
    if (delta2 > 0.5) {
      e.preventDefault();
    }
  };
  return (
    <>
      <GlobalStyle />
      <Header>
        <h1>Joel Rubin</h1>
      </Header>
      <Body>
        <ButtonContainer>
          <Draggable>
            <form
              id='button1'
              onSubmit={measureClick}
              target='_blank'
              action='https://github.com/joelsrubin'
            >
              <Button2 id='mydiv' github>
                Github
              </Button2>
            </form>
          </Draggable>
          <Draggable>
            <form
              id='button2'
              target='_blank'
              action='https://www.linkedin.com/in/joel-rubin-0529'
              onSubmit={measureClick2}
            >
              <Button id='link'>LinkedIn</Button>
            </form>
          </Draggable>
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
    position: relative;
  }
`;

const Header = styled.div`
  text-align: center;
  font-size: 3em;
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}

to {
  transform: rotate(360deg);
}
`;

const antiRotate = keyframes`
from {
  transform: rotate(360deg);
}

to {
  transform: rotate(0deg);
}
`;

const Body = styled.div`
  height: 100vh;
`;

const Button = styled.button`
  border-radius: 30px;
  height: 100px;
  width: 100px;
  position: absolute;
  z-index: 9;
  /* border: none; */
  outline: none;
  background-color: ${(props) =>
    props.github ? 'rgb(172 114 111)' : 'rgb(107 165 75)'};
  cursor: pointer;

  :active {
    background-color: ${(props) => (props.github ? '#9a4747' : '#357b35')};
    animation-play-state: paused;
  }

  animation: ${rotate} 10s linear infinite;
  animation-play-state: paused;

  :hover {
    cursor: move;
    animation-play-state: running;
  }
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
`;

const Button2 = styled.button`
  border-radius: 30px;
  height: 100px;
  width: 100px;
  position: absolute;
  z-index: 9;

  /* border: none; */
  outline: none;
  background-color: ${(props) =>
    props.github ? 'rgb(172 114 111)' : 'rgb(107 165 75)'};
  cursor: pointer;

  :active {
    background-color: ${(props) => (props.github ? '#9a4747' : '#357b35')};
  }

  animation: ${antiRotate} 10s linear infinite;
  animation-play-state: paused;

  :hover {
    cursor: move;
    animation-play-state: running;
  }
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
`;

const Button3 = styled.button`
  width: 300px;
  height: 100px;
  border-radius: 30px;
  background-color: #d5da9d;
  font-size: 2em;
  color: black;
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  outline: none;
`;

const ButtonContainer = styled.div`
  width: 50%;
  margin: auto;
  margin-top: 20vh;
  display: flex;
  justify-content: space-evenly;
`;

const Container2 = styled.div`
  width: 50%;

  margin-top: 100px
  display: flex;
  justify-content: space-evenly;
`;
