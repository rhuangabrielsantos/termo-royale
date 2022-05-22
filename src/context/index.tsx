import { AuthContextProvider } from './AuthContext';
import { KeyboardContextProvider } from './KeyboardContext';
import { WordsContextProvider } from './WordsContext';

interface IContextProvider {
  children: React.ReactNode;
}

export function ContextProvider({ children }: IContextProvider) {
  return (
    <AuthContextProvider>
      <WordsContextProvider>
        <KeyboardContextProvider>{children}</KeyboardContextProvider>
      </WordsContextProvider>
    </AuthContextProvider>
  );
}

export { WordsContext } from './WordsContext';
