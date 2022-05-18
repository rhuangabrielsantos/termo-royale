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
`;

export default GlobalStyle;
