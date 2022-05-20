import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    --correctPlace: ${(props) =>
      props.theme.colors.letter.correctPlace};
    --incorrectPlace: ${(props) =>
      props.theme.colors.letter.incorrectPlace};
    --nonExisting: ${(props) =>
      props.theme.colors.letter.nonExisting};
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  @keyframes popup {
    0% {
      opacity: 0;
      transform: scale(0);
    }
    25% {
      opacity: 1;
    }
    75% {
      transform: scale(1.15);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes rownope {
    10%  { transform: translateX(-14px); }
    20%  { transform: translateX(14px); }
    30%  { transform: translateX(-8px); }
    40%  { transform: translateX(8px); }
    50%  { transform: translateX(-4px); }
    60%  { transform: translateX(4px); }
    70%  { transform: translateX(-2px); }
    80%  { transform: translateX(2px); }
    90%  { transform: translateX(-1px); }
    100% { transform: translateX(1px); }
  }

  @keyframes happy {
    10%  { transform: translateY(calc(var(55%)*-0.3)); }
    20%  { transform: translateY(calc(var(55%)*-0.58)); }
    30%  { transform: translateY(calc(var(55%)*-0.8)); }
    40%  { transform: translateY(calc(var(55%)*-0.95)); }
    50%  { transform: translateY(calc(var(55%)*-1)); }
    60%  { transform: translateY(calc(var(55%)*-0.95)); }
    70%  { transform: translateY(calc(var(55%)*-0.8)); }
    80%  { transform: translateY(calc(var(55%)*-0.58)); }
    90%  { transform: translateY(calc(var(55%)*-0.3)); }
    100% { transform: translateY(0px); }
  }

  @keyframes flip {
    0% {
      background-color: transparent;
      border: 0.125em solid #4C4347;
      transform: perspective(200px) rotateY(0deg);
    }

    49.99999% {
      background-color: transparent;
      border: 0.125em solid #4C4347;
      transform: perspective(200px) rotateY(90deg);
    }

    50% {
      transform: perspective(200px) rotateY(-90deg);
      background-color: var(--color);
      border: none;
    }

    50.00001% {
      background-color: var(--color);
      border: none;
    }

    100% {
      transform: perspective(200px) rotateY(0deg);
      background-color: var(--color);
    }
  }

  @keyframes type {
    0% {
      transform: perspective(200px) translateZ(0);
      color: transparent;
    }

    24.99999% {
      color: transparent;
    }

    25% {
      transform: perspective(200px) translateZ(30px);
      color: #FAFAFF;
    }

    100% {
      transform: perspective(200px) translateZ(0);
      color: #FAFAFF;
    }
  }
`;

export default GlobalStyle;
