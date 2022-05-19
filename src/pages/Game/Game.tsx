import React, { useContext, useEffect, useState } from 'react';
import { Board } from '../../components/Board';
import { WordsContext } from '../../context';
import { WordsService } from '../../service/WordsService';

export function Game() {
  const { words, setWords } = useContext(WordsContext);
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    setWords(WordsService.makeInitialWordsState());
    setCorrectWord(WordsService.getRandomWord());
  }, [setWords]);

  return (
    <Board
      correctWord={correctWord}
      words={words}
      setWords={setWords}
    />
  );
}
