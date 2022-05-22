import React, { createContext, useState } from 'react';
import { IKey } from '../interfaces';

interface IKeyboardContext {
  keys: IKey[];
  setKeys: (keys: IKey[]) => void;

  eventKey: string;
  setEventKey: (eventKey: string) => void;
}

export const KeyboardContext = createContext<IKeyboardContext>({
  keys: [],
  setKeys: () => {},
  eventKey: '',
  setEventKey: () => {},
});

interface IKeyboardProviderProps {
  children: React.ReactNode;
}

export function KeyboardContextProvider(
  props: IKeyboardProviderProps
) {
  const [keys, setKeys] = useState<IKey[]>([
    { key: 'Q' },
    { key: 'W' },
    { key: 'E' },
    { key: 'R' },
    { key: 'T' },
    { key: 'Y' },
    { key: 'U' },
    { key: 'I' },
    { key: 'O' },
    { key: 'P' },
    { key: 'A' },
    { key: 'S' },
    { key: 'D' },
    { key: 'F' },
    { key: 'G' },
    { key: 'H' },
    { key: 'J' },
    { key: 'K' },
    { key: 'L' },
    { key: 'Z' },
    { key: 'X' },
    { key: 'C' },
    { key: 'V' },
    { key: 'B' },
    { key: 'N' },
    { key: 'M' },
  ]);
  const [eventKey, setEventKey] = useState<string>('');

  return (
    <KeyboardContext.Provider
      value={{ keys, setKeys, eventKey, setEventKey }}
    >
      {props.children}
    </KeyboardContext.Provider>
  );
}
