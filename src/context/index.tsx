import { WordsProvider } from './WordsContext';

interface IContextProvider {
  children: React.ReactNode;
}

export function ContextProvider({ children }: IContextProvider) {
  return <WordsProvider>{children}</WordsProvider>;
}

export { WordsContext } from './WordsContext';
