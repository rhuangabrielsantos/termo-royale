import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
`;

export default GlobalStyle;
