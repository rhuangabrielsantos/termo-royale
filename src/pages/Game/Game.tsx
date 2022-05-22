import React, { useContext, useEffect, useState } from 'react';
import { Container } from '../../components';
import { Board } from '../../components/Board';
import { Header } from '../../components/Header';
import { Keyboard } from '../../components/Keyboard';
import { WordsContext } from '../../context';
import { WordsService } from '../../service/WordsService';
import { registesPageView } from '../../utils/LogUtils';

export function Game() {
  const { words, setWords } = useContext(WordsContext);
  const [correctWord, setCorrectWord] = useState('');

  useEffect(() => {
    setWords(WordsService.makeInitialWordsState());
    setCorrectWord(WordsService.getRandomWord());
  }, [setWords]);

  useEffect(() => {
    registesPageView('/single/game');
  }, []);

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
