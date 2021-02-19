import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { GlobalStyles } from './globalStyles.js';
import { lightTheme, darkTheme } from './Themes.js';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [clicked, setClicked] = useState(false);
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  let start2,
    end2,
    delta2 = 0.6;

  const measureClick2 = (e) => {
    let button2 = document.getElementById(e.target.id);
    button2.addEventListener('mousedown', () => {
      start2 = new Date();
    });
    button2.addEventListener('mouseup', () => {
      end2 = new Date();
      delta2 = (end2 - start2) / 1000.0;
    });
    if (delta2 > 0.2) {
      e.preventDefault();
    }
  };

  const copyHandler = (e) => {
    let copyText = document.getElementById('email');
    let data = [
      new ClipboardItem({
        'text/plain': new Blob([copyText.innerText], { type: 'text/plain' }),
      }),
    ];
    navigator.clipboard.write(data).then(
      () => {
        setClicked(!clicked);
        console.log(`copied ${copyText.innerText} to clipBoard`);
      },
      () => {
        console.log('failed');
      }
    );
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Body>
        <label className='switch'>
          <input onClick={themeToggler} type='checkbox' />
          <span className='slider round'></span>
        </label>
        <Header>
          <h1>Joel Rubin</h1>
          <MainText>
            Hey there please reach out:{' '}
            <span onClick={copyHandler} id='email'>
              joelsrubin@gmail.com
            </span>
            <br></br>
            <span className={clicked ? 'display' : 'hidden'}>
              copied to clipboard!
            </span>
          </MainText>
        </Header>
        <ButtonContainer>
          <Draggable>
            <form
              id='button1'
              onSubmit={measureClick2}
              target='_blank'
              action='https://github.com/joelsrubin'
            >
              <GitHub>Github</GitHub>
            </form>
          </Draggable>
          <Draggable>
            <form
              id='button2'
              target='_blank'
              action='https://www.linkedin.com/in/joel-rubin-0529'
              onSubmit={measureClick2}
            >
              <LinkedIn>LinkedIn</LinkedIn>
            </form>
          </Draggable>
        </ButtonContainer>
      </Body>
    </ThemeProvider>
  );
}

const Header = styled.div`
  text-align: center;
  font-size: 3em;

  @media only screen and (max-device-width: 480px) {
    font-size: 5em;
  }
`;

const MainText = styled.h2`
  text-align: center;
  font-size: 1em;
  color: ${({ theme }) => theme.invisibleInk};
  span {
    color: ${({ theme }) => theme.invisibleInk};
    text-decoration: underline;
    cursor: pointer;
  }
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
  height: 400px;
`;

const LinkedIn = styled.button`
  border-radius: 30px;
  height: 400px;
  width: 400px;
  position: absolute;
  z-index: 9;
  box-shadow: 10px 5px 5px ${({ theme }) => theme.shadow};
  outline: none;
  border: none;
  background-color: ${({ theme }) => theme.button2};
  cursor: pointer;
  animation: ${rotate} 10s linear infinite;
  transition: all 0.2s linear;
  animation-play-state: paused;
  color: ${({ theme }) => theme.buttonText};
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 30px;

  :active {
    background-color: ${({ theme }) => theme.button2Active};
    animation-play-state: paused;
  }

  :hover {
    cursor: move;
    animation-play-state: running;
  }
`;

const GitHub = styled.button`
  border-radius: 30px;
  font-size: 30px;
  height: 400px;
  width: 400px;
  position: absolute;
  z-index: 9;
  border: none;
  box-shadow: 10px 5px 5px ${({ theme }) => theme.shadow};
  outline: none;
  background-color: ${({ theme }) => theme.button1};
  cursor: pointer;
  animation: ${antiRotate} 10s linear infinite;
  animation-play-state: paused;
  color: ${({ theme }) => theme.buttonText};
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  transition: all 0.2s linear;
  :active {
    background-color: ${({ theme }) => theme.button1Active};
  }

  :hover {
    cursor: move;
    animation-play-state: running;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 20vh;
  width: 50%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-device-width: 480px) {
    display: flex;
    flex-direction: column;

    justify-content: space-around;
  }
`;

const Toggle = styled.button`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  outline: none;
  }
`;
