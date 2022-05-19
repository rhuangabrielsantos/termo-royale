import React, { useState } from 'react';
import { ILetter } from '../interfaces';
import { AlertMessage } from './AlertMessage';
import { Container } from './Container';
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

  const checkWord = (word: ILetter[]) => {
    const correctWordInArray = correctWord.toUpperCase().split('');
    const wordInArray = word.map((letter) => letter.text);
    const index = wordControl.indexOf(true);

    for (let i = 0; i < correctWordInArray.length; i++) {
      if (correctWordInArray[i] === wordInArray[i]) {
        word[i].color = 'correctPlace';
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
        correctWordInArray[indexOf] = '_';
        wordInArray[i] = '_';
        word[i].color = 'incorrectPlace';

        continue;
      }

      word[i].color = 'nonExisting';
    }

    const newWords = [...words];
    newWords[index] = word;

    setWords(newWords);

    const hasGameEnded = correctWordInArray.every(
      (letter) => letter === '_'
    );

    if (hasGameEnded) {
      return;
    }

    newWords[index + 1] = [
      { text: '', color: 'transparent' },
      { text: '', color: 'transparent' },
      { text: '', color: 'transparent' },
      { text: '', color: 'transparent' },
      { text: '', color: 'transparent' },
    ];

    setWords(newWords);

    const newWorldControl = [...wordControl];
    newWorldControl[index] = false;
    newWorldControl[index + 1] = true;

    setWorldControl(newWorldControl);

    if (index >= 5) {
      setError(true);
      setErrorMessage(`o termo era "${correctWord}"`);
    }
  };

  return (
    <Container gap="0.125em">
      <AlertMessage isVisible={error} message={errorMessage} />

      <Word
        letters={words[0] ?? []}
        isWritting={wordControl[0]}
        checkWord={checkWord}
        error={error}
        setError={setError}
      />
      <Word
        isWritting={wordControl[1]}
        checkWord={checkWord}
        letters={words[1] ?? []}
        error={error}
        setError={setError}
      />
      <Word
        isWritting={wordControl[2]}
        checkWord={checkWord}
        letters={words[2] ?? []}
        error={error}
        setError={setError}
      />
      <Word
        isWritting={wordControl[3]}
        checkWord={checkWord}
        letters={words[3] ?? []}
        error={error}
        setError={setError}
      />
      <Word
        isWritting={wordControl[4]}
        checkWord={checkWord}
        letters={words[4] ?? []}
        error={error}
        setError={setError}
      />
      <Word
        isWritting={wordControl[5]}
        checkWord={checkWord}
        letters={words[5] ?? []}
        error={error}
        setError={setError}
      />
    </Container>
  );
}
