import React, { createContext, useState } from 'react';
import { IKey } from '../interfaces';
import { keyboardService } from '../service/KeyboardService';

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
  const [keys, setKeys] = useState<IKey[]>(
    keyboardService.generateEmptyKeyboard()
  );
  const [eventKey, setEventKey] = useState<string>('');

  return (
    <KeyboardContext.Provider
      value={{ keys, setKeys, eventKey, setEventKey }}
    >
      {props.children}
    </KeyboardContext.Provider>
  );
}
