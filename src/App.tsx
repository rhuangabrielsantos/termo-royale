import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ContextProvider } from './context';
import { Router } from './Router';
import GlobalStyle from './styles/globalStyle';
import { theme } from './styles/theme';

function App() {
  return (
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Router />
      </ThemeProvider>
    </ContextProvider>
  );
}

export default App;
