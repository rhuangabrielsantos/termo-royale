import React, { useEffect, useRef, useState } from 'react';
import { ILetter } from '../interfaces';
import { WordsService } from '../service/WordsService';
import { Box } from './Box';
import { Letter } from './Letter';

interface WrittingWordProps {
  checkWord: (word: ILetter[]) => void;
  error: boolean;
  setError: (error: boolean) => void;
}

export function WrittingWord({
  checkWord,
  error,
  setError,
}: WrittingWordProps) {
  const [letters, setLetters] = useState<ILetter[]>([
    { text: '', color: 'transparent' },
    { text: '', color: 'transparent' },
    { text: '', color: 'transparent' },
    { text: '', color: 'transparent' },
    { text: '', color: 'transparent' },
  ]);
  const [isWritting, setIsWritting] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);

  const boxRef = useRef<HTMLDivElement>(null);

  const updateFocusByEvent = (index: number) => {
    if (index > 4) {
      const firstEmptyLetter = letters.findIndex(
        (letter) => letter.text === ''
      );

      if (firstEmptyLetter !== -1) {
        updateFocusByEvent(firstEmptyLetter);
      }

      return;
    }

    if (letters[index].text !== '') {
      updateFocusByEvent(index + 1);
      return;
    }

    updateFocus(index);
  };

  const updateFocus = (index: number) => {
    const newState = [false, false, false, false, false];
    newState[index] = !newState[index];

    setIsWritting(newState);
  };

  const updateLetter = (letter: string) => {
    const isWrittingId = isWritting.indexOf(true);

    const newLetters = [...letters];
    newLetters[isWrittingId] = {
      ...newLetters[isWrittingId],
      text: letter,
    };

    setLetters(newLetters);
  };

  const handleOnKeyDown = (event: any) => {
    const { key } = event;

    if (key === 'Backspace') {
      setError(false);
      const isWrittingId = isWritting.indexOf(true);

      if (isWrittingId === -1) {
        updateFocus(4);
        const newLetters = [...letters];
        newLetters[4] = {
          ...newLetters[4],
          text: '',
        };

        setLetters(newLetters);
        return;
      }

      if (letters[isWrittingId].text === '') {
        updateFocus(isWrittingId - 1);
        const newLetters = [...letters];
        newLetters[isWrittingId - 1] = {
          ...newLetters[isWrittingId - 1],
          text: '',
        };

        setLetters(newLetters);
        return;
      }

      const newLetters = [...letters];
      newLetters[isWrittingId] = {
        ...newLetters[isWrittingId],
        text: '',
      };

      setLetters(newLetters);
      return;
    }

    if (key === 'Enter') {
      const wordInString = letters
        .map((letter) => letter.text.toLowerCase())
        .join('');

      if (!WordsService.wordIsReal(wordInString)) {
        setError(true);
        return;
      }

      checkWord(letters);
      return;
    }

    if (key.length > 1) {
      return;
    }

    if (key.match(/[a-z]/i)) {
      const letter = key.toUpperCase();
      updateLetter(letter);
      updateFocusByEvent(isWritting.indexOf(true) + 1);
      setError(false);
    }
  };

  useEffect(() => {
    const allFieldsAreLetters = letters.every(
      (letter: ILetter) => letter.text !== ''
    );

    if (allFieldsAreLetters) {
      setIsWritting([false, false, false, false, false]);
      return;
    }
  }, [letters]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.focus();
    }
  }, []);

  return (
    <Box
      flexDirection="row"
      gap="0.125em"
      onKeyDown={handleOnKeyDown}
      tabIndex={0}
      ref={boxRef}
      animationError={error}
    >
      <Letter
        color={letters[0]?.color}
        isWritting={isWritting[0]}
        onClick={() => updateFocus(0)}
        animate={letters[0].text !== ''}
      >
        {letters[0]?.text}
      </Letter>
      <Letter
        color={letters[1]?.color}
        isWritting={isWritting[1]}
        onClick={() => updateFocus(1)}
        animate={letters[1].text !== ''}
      >
        {letters[1]?.text}
      </Letter>
      <Letter
        color={letters[2]?.color}
        isWritting={isWritting[2]}
        onClick={() => updateFocus(2)}
        animate={letters[2].text !== ''}
      >
        {letters[2]?.text}
      </Letter>
      <Letter
        color={letters[3]?.color}
        isWritting={isWritting[3]}
        onClick={() => updateFocus(3)}
        animate={letters[3].text !== ''}
      >
        {letters[3]?.text}
      </Letter>
      <Letter
        color={letters[4]?.color}
        isWritting={isWritting[4]}
        onClick={() => updateFocus(4)}
        animate={letters[4].text !== ''}
      >
        {letters[4]?.text}
      </Letter>
    </Box>
  );
}
