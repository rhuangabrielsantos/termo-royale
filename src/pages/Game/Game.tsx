import React, { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { RiRestartLine } from 'react-icons/ri';
import { useTranslation } from 'react-i18next';

import { Button, Container, Text } from '../../components';
import { Board } from '../../components/Board';
import { Header } from '../../components/Header';
import { Keyboard } from '../../components/Keyboard';
import { Modal } from '../../components/Modal';
import { WordsContext } from '../../context';
import { WordsService } from '../../service/WordsService';
import {
  registerEvent,
  registesPageView,
} from '../../utils/LogUtils';

import animationDataWinner from '../../assets/animations/winner.json';
import animationDataLoser from '../../assets/animations/loser.json';

import { theme } from '../../styles/theme';
import { KeyboardContext } from '../../context/KeyboardContext';
import { keyboardService } from '../../service/KeyboardService';

export function Game() {
  const { t } = useTranslation();
  const { words, setWords } = useContext(WordsContext);
  const { setKeys } = useContext(KeyboardContext);
  const [correctWord, setCorrectWord] = useState('');
  const [isWinnerModalOpen, setIsWinnerModalOpen] = useState(false);
  const [isLoserModalOpen, setIsLoserModalOpen] = useState(false);

  const winnerConfigs = {
    loop: true,
    autoplay: true,
    animationData: animationDataWinner,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const loserConfigs = {
    loop: true,
    autoplay: true,
    animationData: animationDataLoser,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    setWords(WordsService.makeInitialWordsState());
    setCorrectWord(WordsService.getRandomWord());
    setKeys(keyboardService.generateEmptyKeyboard());
  }, [setKeys, setWords]);

  useEffect(() => {
    const gameWinner = words.filter((letters) => {
      return letters.every(
        (letter) => letter.color === 'correctPlace'
      );
    });

    setTimeout(() => {
      if (gameWinner.length > 0) {
        setIsWinnerModalOpen(true);
        registerEvent('game-won');
        return;
      }
    }, 4000);

    const gameLoser = words.filter((letters) => {
      return letters.every((letter) => letter.flip === true);
    });

    setTimeout(() => {
      if (gameLoser.length === 6) {
        setIsLoserModalOpen(true);
        registerEvent('game-lost');
        return;
      }
    }, 3000);
  }, [words]);

  useEffect(() => {
    registesPageView('/single/game');
  }, []);

  return (
    <Container gap="0.125em">
      <Header />

      {correctWord}

      <Board
        correctWord={correctWord}
        words={words}
        setWords={setWords}
        isMyBoard
      />

      <Keyboard />

      <Modal
        isOpen={isWinnerModalOpen}
        onClose={() => setIsWinnerModalOpen(false)}
      >
        <Lottie
          options={winnerConfigs}
          height={200}
          width={200}
          isClickToPauseDisabled
        />
        <Text>{t('game:congrats')}</Text>

        <Button
          color={theme.colors.letter.correctPlace}
          onClick={() => window.location.reload()}
        >
          <RiRestartLine style={{ marginRight: '0.5rem' }} />
          {t('game:button.again')}
        </Button>
      </Modal>

      <Modal
        isOpen={isLoserModalOpen}
        onClose={() => setIsLoserModalOpen(false)}
      >
        <Lottie
          options={loserConfigs}
          height={200}
          width={200}
          isClickToPauseDisabled
        />
        <Text>
          {t('game:wrong')} <b>{correctWord}</b>!
        </Text>

        <Button
          color={theme.colors.letter.correctPlace}
          onClick={() => window.location.reload()}
        >
          <RiRestartLine style={{ marginRight: '0.5rem' }} />
          {t('game:button.again')}
        </Button>
      </Modal>
    </Container>
  );
}
