import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { GlobalStyles } from './globalStyles.js';
import { lightTheme, darkTheme } from './Themes.js';
import { isMobile } from 'react-device-detect';

const max = 0.0075; // max speed
const acc = 0.0002; // accelleration
const acc2 = 0.0002; // accelleration2

export default function App() {
  const [theme, setTheme] = useState('light');
  const [dragging, setDragging] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [tatin, setTatin] = useState(false);
  const [tatin2, setTatin2] = useState(false);
  const [selectedRef, setSelectedRef] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [position2, setPosition2] = useState({ x: 0, y: 0 });



  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  const ref = useRef();
  const ref2 = useRef();
  const timeout = useRef();
  const timeout2 = useRef();
  const r = useRef(0); // rotation
  const dir = useRef("increase"); // increase or decrease
  const r2 = useRef(0); // rotation
  const dir2 = useRef("increase"); // increase or decrease

  useEffect(() => {
    localStorage.getItem('position') && setPosition(JSON.parse(localStorage.getItem('position')));
    localStorage.getItem('position2') && setPosition2(JSON.parse(localStorage.getItem('position2')));
  }, []);

  useEffect(() => {
    localStorage.setItem('position', JSON.stringify(position));
    localStorage.setItem('position2', JSON.stringify(position2));
  }, [position, position2]);


  useEffect(() => {
    if (tatin) {
      let c = true; // continue
      let i = 0.0005; // accel
      function rotate() {
        if (dir.current === "increase" && i < max) i += acc;
        if (dir.current === "decrease" && i > 0) i -= acc;
        r.current += i;
        ref.current.style.transform = `rotate(${r.current}turn)`;
        if (c) requestAnimationFrame(rotate);
      }
      rotate();
      return () => {
        c = false;
      };
    }
  }, [tatin]);

  useEffect(() => {
    if (tatin2) {
      let c = true; // continue
      let i = 0.0005; // accel
      function rotate() {
        if (dir2.current === "increase" && i < max) i += acc2;
        if (dir2.current === "decrease" && i > 0) i -= acc2;
        r2.current += i;
        ref2.current.style.transform = `rotate(${r2.current}turn)`;
        if (c) requestAnimationFrame(rotate);
      }
      rotate();
      return () => {
        c = false;
      };
    }
  }, [tatin2]);

  let start2,
    end2,
    delta2 = 0.6;




  const copyHandler = (e) => {
    let copyText = document.getElementById('email');
    let data = [
      new ClipboardItem({
        'text/plain': new Blob([copyText.innerText], { type: 'text/plain' }),
      }),
    ];
    navigator.clipboard.write(data).then(
      () => {
        setClicked(true);
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
        {!isMobile && (
          <label className='switch'>
            <input onClick={themeToggler} type='checkbox' />
            <span className='slider round'></span>
          </label>
        )}
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
          <Draggable
            onDrag={() => {
              setDragging(true);
            }}
            position={{ x: position.x, y: position.y }}
            onStop={(e, data) => {
              setTimeout(() => { setDragging(false); }, 10);
              setPosition({ x: data.x, y: data.y });
            }}>
            <form
              id='button1'
              onSubmit={(e) => { if (dragging) e.preventDefault(); }}
              target='_blank'
              action='https://github.com/joelsrubin'
            >
              <GitHub ref={ref} onMouseEnter={() => {
                timeout.current && clearTimeout(timeout.current);
                dir.current = "increase";
                setTatin(true);
              }}
                onMouseOut={() => {
                  dir.current = "decrease";
                  timeout.current = setTimeout(() => {
                    setTatin(false);
                  }, 1000);
                }}>Github</GitHub>
            </form>
          </Draggable>
          <Draggable
            position={{ x: position2.x, y: position2.y }}
            onDrag={() => {
              setDragging(true);
            }}
            onStop={(e, data) => {
              setTimeout(() => { setDragging(false); }, 10);
              setPosition2({ x: data.x, y: data.y });
            }}>
            <form
              id='button2'
              target='_blank'
              action='https://www.linkedin.com/in/joel-rubin-0529'
              onSubmit={(e) => {
                if (dragging) {
                  e.preventDefault();
                }
              }}
            >
              <LinkedIn ref={ref2} onMouseEnter={() => {
                timeout2.current && clearTimeout(timeout2.current);
                dir2.current = "increase";
                setTatin2(true);
              }}
                onMouseOut={() => {
                  dir2.current = "decrease";
                  timeout2.current = setTimeout(() => {
                    setTatin2(false);
                  }, 1000);
                }}>LinkedIn</LinkedIn>
            </form>
          </Draggable>
        </ButtonContainer>
        <MiniContainer>
          <form target='_blank' action='https://github.com/joelsrubin'>
            <MiniGitHub className='mini'>Github</MiniGitHub>
          </form>
          <form
            target='_blank'
            action='https://www.linkedin.com/in/joel-rubin-0529'
          >
            <MiniLinked className='mini'>LinkedIn</MiniLinked>
          </form>
        </MiniContainer>
      </Body>
    </ThemeProvider>
  );
};

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
  ${'' /* animation: ${rotate} 10s linear infinite;
  transition: all 0.2s linear;
  animation-play-state: paused; */}
  color: ${({ theme }) => theme.buttonText};
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 30px;

  :active {
    background-color: ${({ theme }) => theme.button2Active};
    ${'' /* animation-play-state: paused; */}
  }

  :hover {
    cursor: move;
    ${'' /* animation-play-state: running; */}
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
  ${'' /* animation: ${antiRotate} 10s linear infinite;
  animation-play-state: paused; */}
  color: ${({ theme }) => theme.buttonText};
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  transition: all 0.2s linear;
  :active {
    background-color: ${({ theme }) => theme.button1Active};
  }

  :hover {
    cursor: move;
    ${'' /* animation-play-state: running; */}
  }
`;

const ButtonContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-device-width: 480px) {
    display: none;
  }
`;

const MiniContainer = styled.div`
  display: none;
  @media only screen and (max-device-width: 480px) {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const MiniGitHub = styled.button`
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
  color: ${({ theme }) => theme.buttonText};
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  transition: all 0.2s linear;
  :active {
    background-color: ${({ theme }) => theme.button1Active};
  }
`;

const MiniLinked = styled.button`
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

  transition: all 0.2s linear;

  color: ${({ theme }) => theme.buttonText};
  font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono,
    DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
  font-size: 30px;

  :active {
    background-color: ${({ theme }) => theme.button2Active};
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
`;
