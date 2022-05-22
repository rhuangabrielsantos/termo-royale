import React, { useContext, useEffect, useState } from 'react';
import { Container } from '../../components';
import { Board } from '../../components/Board';
import { Header } from '../../components/Header';
import { Keyboard } from '../../components/Keyboard';
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
    <Container gap="0.125em">
      <Header />

      <Board
        correctWord={correctWord}
        words={words}
        setWords={setWords}
      />

      <Keyboard />
    </Container>
  );
}
