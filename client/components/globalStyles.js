import { createGlobalStyle, keyframes } from 'styled-components';
const fade = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;
export const GlobalStyles = createGlobalStyle`
html {
  height:100vh
}
body{
  background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    position: relative;
    /* transition:  0.20s linear; */
    height: 100vh;
    overflow-x: hidden;
    overflow-y: hidden;
    /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  @media only screen and (max-device-width: 480px) {
    width: 120px;
    height: 68px;
  }
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
    .slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color:${({ theme }) => theme.buttonText};
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  @media only screen and (max-device-width: 480px) {
    width: 52px;
    height: 52px;
  }
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  @media only screen and (max-device-width: 480px) {
    -webkit-transform: translateX(52px);
  -ms-transform: translateX(52px);
  transform: translateX(52px);
  }
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.hidden {
  visibility: hidden;
}

.display {
  visibility: visible;
  animation: ${fade} 1s linear forwards;
}
`;