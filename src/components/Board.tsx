import React, { useContext, useState } from 'react';
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
}

export function Board({ correctWord, words, setWords }: BoardProps) {
  const [wordControl, setWorldControl] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    'essa palavra não é aceita'
  );

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
        newKeys[keyEnum].color = 'nonExisting';
      }
    }

    const wordsWithAccent = WordsService.wordWithAccent(word);

    const newWords = [...words];
    newWords[index] = wordsWithAccent;

    setWords(newWords);
    await flipLetters(index);

    const hasGameEnded = correctWordInArray.every(
      (letter) => letter === '_'
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

    if (index >= 5) {
      setError(true);
      setErrorMessage(`o termo era "${correctWord}"`);
    }
  };

  const [animateLetterId, setAnimateLetterId] = useState<number>(0);

  const flipLetters = async (index: number) => {
    const queryId = getQueryId(index);
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

  return (
    <>
      <AlertMessage isVisible={error} message={errorMessage} />

      <Word
        letters={words[0] ?? []}
        isWritting={wordControl[0]}
        checkWord={checkWord}
        error={error}
        setError={setError}
        name="first"
      />
      <Word
        isWritting={wordControl[1]}
        checkWord={checkWord}
        letters={words[1] ?? []}
        error={error}
        setError={setError}
        name="second"
      />
      <Word
        isWritting={wordControl[2]}
        checkWord={checkWord}
        letters={words[2] ?? []}
        error={error}
        setError={setError}
        name="third"
      />
      <Word
        isWritting={wordControl[3]}
        checkWord={checkWord}
        letters={words[3] ?? []}
        error={error}
        setError={setError}
        name="fourth"
      />
      <Word
        isWritting={wordControl[4]}
        checkWord={checkWord}
        letters={words[4] ?? []}
        error={error}
        setError={setError}
        name="fifth"
      />
      <Word
        isWritting={wordControl[5]}
        checkWord={checkWord}
        letters={words[5] ?? []}
        error={error}
        setError={setError}
        name="sixth"
      />
    </>
  );
}
