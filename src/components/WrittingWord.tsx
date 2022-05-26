import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { KeyboardContext } from '../context/KeyboardContext';
import { ILetter } from '../interfaces';
import { WordsService } from '../service/WordsService';
import { registerEvent } from '../utils/LogUtils';
import { Box } from './Box';
import { Letter } from './Letter';

interface WrittingWordProps {
  checkWord: (word: ILetter[]) => void;
  error: boolean;
  setError: (error: boolean) => void;

  name?: string;
  isMyBoard?: boolean;
}

export function WrittingWord({
  checkWord,
  error,
  setError,
  name,
  isMyBoard,
}: WrittingWordProps) {
  const [letters, setLetters] = useState<ILetter[]>([
    { text: '', color: 'transparent', flip: false },
    { text: '', color: 'transparent', flip: false },
    { text: '', color: 'transparent', flip: false },
    { text: '', color: 'transparent', flip: false },
    { text: '', color: 'transparent', flip: false },
  ]);
  const [isWritting, setIsWritting] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);

  const boxRef = useRef<HTMLDivElement>(null);
  const { eventKey, setEventKey } = useContext(KeyboardContext);

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
    setEventKey('');

    if (boxRef.current && isMyBoard) {
      boxRef.current.focus();
    }

    if (key === 'Backspace') {
      setError(false);
      const isWrittingId = isWritting.indexOf(true);

      if (isWrittingId === -1 && letters[4].text !== '') {
        updateFocus(4);
        const newLetters = [...letters];
        newLetters[4] = {
          ...newLetters[4],
          text: '',
        };

        setLetters(newLetters);
        return;
      }

      if (isWrittingId === -1) {
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
    registerEvent('virtual_keyboard_click');
    handleOnKeyDown({ key: eventKey });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventKey]);

  useEffect(() => {
    if (boxRef.current && isMyBoard) {
      setIsWritting([true, false, false, false, false]);
      boxRef.current.focus();
    }
  }, [isMyBoard]);

  return (
    <Box
      flexDirection="row"
      gap="0.125em"
      onKeyDown={(event) => {
        if (isMyBoard) {
          handleOnKeyDown(event);
          registerEvent('real_keyboard_click');
        }
      }}
      tabIndex={0}
      ref={boxRef}
      animationError={error}
    >
      <Letter
        color={isMyBoard ? letters[0]?.color : 'unvailable'}
        isWritting={isWritting[0]}
        onClick={() => updateFocus(0)}
        animate={letters[0].text !== ''}
        className={name}
      >
        {isMyBoard ? letters[0]?.text : ' '}
      </Letter>
      <Letter
        color={isMyBoard ? letters[1]?.color : 'unvailable'}
        isWritting={isWritting[1]}
        onClick={() => updateFocus(1)}
        animate={letters[1].text !== ''}
        className={name}
      >
        {isMyBoard ? letters[1]?.text : ' '}
      </Letter>
      <Letter
        color={isMyBoard ? letters[2]?.color : 'unvailable'}
        isWritting={isWritting[2]}
        onClick={() => updateFocus(2)}
        animate={letters[2].text !== ''}
        className={name}
      >
        {isMyBoard ? letters[2]?.text : ' '}
      </Letter>
      <Letter
        color={isMyBoard ? letters[3]?.color : 'unvailable'}
        isWritting={isWritting[3]}
        onClick={() => updateFocus(3)}
        animate={letters[3].text !== ''}
        className={name}
      >
        {isMyBoard ? letters[3]?.text : ' '}
      </Letter>
      <Letter
        color={isMyBoard ? letters[4]?.color : 'unvailable'}
        isWritting={isWritting[4]}
        onClick={() => updateFocus(4)}
        animate={letters[4].text !== ''}
        className={name}
      >
        {isMyBoard ? letters[4]?.text : ' '}
      </Letter>
    </Box>
  );
}
