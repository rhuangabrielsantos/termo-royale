import React, { createContext, useState } from 'react';

import { ILetter } from '../interfaces';

interface IWordsContext {
  words: ILetter[][];
  setWords: React.Dispatch<React.SetStateAction<ILetter[][]>>;
}

export const WordsContext = createContext<IWordsContext>({
  words: [],
  setWords: () => {},
});

interface IWordsProviderProps {
  children: React.ReactNode;
}

export function WordsContextProvider(props: IWordsProviderProps) {
  const [words, setWords] = useState<ILetter[][]>([]);

  return (
    <WordsContext.Provider value={{ words, setWords }}>
      {props.children}
    </WordsContext.Provider>
  );
}
