import { KeyboardProvider } from './KeyboardContext';
import { WordsProvider } from './WordsContext';

interface IContextProvider {
  children: React.ReactNode;
}

export function ContextProvider({ children }: IContextProvider) {
  return (
    <WordsProvider>
      <KeyboardProvider>{children}</KeyboardProvider>
    </WordsProvider>
  );
}

export { WordsContext } from './WordsContext';
