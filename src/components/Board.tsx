import React, { useContext, useEffect, useState } from 'react';
import { KeyboardContext } from '../context/KeyboardContext';
import { ILetter } from '../interfaces';
import { keyboardService } from '../service/KeyboardService';
import { WordsService } from '../service/WordsService';
import { AlertMessage } from './AlertMessage';
import { Word } from './Word';

interface BoardProps {
  correctWord: string;
  words: ILetter[][];
  setWords: (words: ILetter[][]) => void;

  isMyBoard?: boolean;
  playerInfo?: string;
}

export function Board({
  correctWord,
  words,
  setWords,
  isMyBoard,
  playerInfo,
}: BoardProps) {
  const [wordControl, setWorldControl] = useState<boolean[]>(
    playerInfo && isMyBoard
      ? [true, false, false, false, false, false]
      : [false, false, false, false, false, false]
  );

  const [error, setError] = useState<boolean>(false);

  const { keys, setKeys } = useContext(KeyboardContext);

  const checkWord = async (word: ILetter[]) => {
    const correctWordWithoutAccents = correctWord
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const correctWordInArray = correctWordWithoutAccents
      .toUpperCase()
      .split('');
    const wordInArray = word.map((letter) => letter.text);
    const index = wordControl.indexOf(true);
    const newKeys = keys;

    for (let i = 0; i < correctWordInArray.length; i++) {
      if (correctWordInArray[i] === wordInArray[i]) {
        word[i].color = 'correctPlace';
        word[i].flip = true;

        const keyEnum = keyboardService.getKeyEnumByKey(
          wordInArray[i].toLowerCase()
        );

        newKeys[keyEnum].color = 'correctPlace';

        correctWordInArray[i] = '_';
        wordInArray[i] = '_';
      }
    }

    for (let i = 0; i < correctWordInArray.length; i++) {
      if (correctWordInArray[i] === '' || wordInArray[i] === '_') {
        continue;
      }

      const indexOf = correctWordInArray.indexOf(wordInArray[i]);

      if (indexOf !== -1) {
        const keyEnum = keyboardService.getKeyEnumByKey(
          wordInArray[i].toLowerCase()
        );

        newKeys[keyEnum].color =
          newKeys[keyEnum].color === 'correctPlace'
            ? 'correctPlace'
            : 'incorrectPlace';

        word[i].color = 'incorrectPlace';
        word[i].flip = true;
        correctWordInArray[indexOf] = '_';
        wordInArray[i] = '_';

        continue;
      }

      word[i].color = 'nonExisting';
      word[i].flip = true;

      const keyEnum = keyboardService.getKeyEnumByKey(
        word[i].text.toLowerCase()
      );

      if (newKeys[keyEnum]) {
        newKeys[keyEnum].color =
          newKeys[keyEnum].color === 'correctPlace' ||
          newKeys[keyEnum].color === 'incorrectPlace'
            ? newKeys[keyEnum].color
            : 'nonExisting';
      }
    }

    const wordsWithAccent = WordsService.wordWithAccent(word);

    const newWords = [...words];
    newWords[index] = wordsWithAccent;

    setWords(newWords);
    await flipLetters(index);

    const hasGameEnded = wordsWithAccent.every(
      (letter) => letter.color === 'correctPlace'
    );

    const newWorldControl = [...wordControl];

    if (!hasGameEnded) {
      newWords[index + 1] = [
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
      ];

      newWorldControl[index + 1] = true;
    }

    newWorldControl[index] = false;
    setWords(newWords);
    setWorldControl(newWorldControl);
    setKeys(newKeys);
  };

  const [animateLetterId, setAnimateLetterId] = useState<number>(0);

  const flipLetters = async (index: number) => {
    const queryId = getQueryId(index) + playerInfo;
    const letters = document.querySelectorAll(`.${queryId}`);

    setTimeout(() => {
      if (!letters[animateLetterId]) {
        setAnimateLetterId(0);
        return;
      }

      letters[animateLetterId].classList.add('flip');
      letters[animateLetterId].classList.remove(queryId);
      setAnimateLetterId((animateLetterId) => animateLetterId + 1);
      flipLetters(index);
    }, 300);

    await timeout(2200);
  };

  const getQueryId = (index: number) => {
    const queryByIndex = [
      'first',
      'second',
      'third',
      'fourth',
      'fifth',
      'sixth',
    ];

    return queryByIndex[index];
  };

  const timeout = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(() => {
    if (!playerInfo) {
      setWorldControl([true, false, false, false, false, false]);
      return;
    }

    if (isMyBoard) {
      const firstWordControl = [
        false,
        false,
        false,
        false,
        false,
        false,
      ];
      const firstAllTransparent = words.findIndex((word) =>
        word.every((letter) => letter.color === 'transparent')
      );

      firstWordControl[firstAllTransparent] = true;
      setWorldControl(firstWordControl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlertMessage
        isVisible={error}
        message="essa palavra não é aceita"
      />

      <Word
        letters={words[0] ?? []}
        isWritting={wordControl[0]}
        checkWord={checkWord}
        error={error}
        setError={setError}
        name={`first${playerInfo}`}
        isMyBoard={isMyBoard}
      />
      <Word
        isWritting={wordControl[1]}
        checkWord={checkWord}
        letters={words[1] ?? []}
        error={error}
        setError={setError}
        name={`second${playerInfo}`}
        isMyBoard={isMyBoard}
      />
      <Word
        isWritting={wordControl[2]}
        checkWord={checkWord}
        letters={words[2] ?? []}
        error={error}
        setError={setError}
        name={`third${playerInfo}`}
        isMyBoard={isMyBoard}
      />
      <Word
        isWritting={wordControl[3]}
        checkWord={checkWord}
        letters={words[3] ?? []}
        error={error}
        setError={setError}
        name={`fourth${playerInfo}`}
        isMyBoard={isMyBoard}
      />
      <Word
        isWritting={wordControl[4]}
        checkWord={checkWord}
        letters={words[4] ?? []}
        error={error}
        setError={setError}
        name={`fifth${playerInfo}`}
        isMyBoard={isMyBoard}
      />
      <Word
        isWritting={wordControl[5]}
        checkWord={checkWord}
        letters={words[5] ?? []}
        error={error}
        setError={setError}
        name={`sixth${playerInfo}`}
        isMyBoard={isMyBoard}
      />
    </>
  );
}
