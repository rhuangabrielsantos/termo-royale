import React, { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import animationDataWinner from '../../assets/animations/winner.json';
import animationDataLoser from '../../assets/animations/loser.json';

import {
  Box,
  Button,
  Container,
  Header,
  Loading,
  Text,
} from '../../components';
import { IGame } from '../../interfaces/IGame';
import { database } from '../../service/FirebaseService';
import { GameService } from '../../service/GameService';
import { theme } from '../../styles/theme';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { WordsService } from '../../service/WordsService';
import { registerEvent } from '../../utils/LogUtils';
import styled from 'styled-components';
import { IPlayer } from '../../interfaces/IPlayer';

export function Result() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [game, setGame] = useState<IGame>();
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [currentPlayerId, setCurrentPlayerId] = useState<number>(0);

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

  const handleReadyGame = async () => {
    if (!user) {
      toast.dark(t('result:error.unLogged'));
      return;
    }

    const newPlayers = [...(game?.players || [])];
    newPlayers[currentPlayerId] = {
      id: user.id,
      name: user.name,
      photoURL: user.photoURL,
      letters: WordsService.makeInitialWordsState(),
      ready: true,
    };

    const gameService = new GameService();

    if (newPlayers[0].ready && newPlayers[1].ready) {
      await gameService.updateGame(id || '', {
        adminId: game?.adminId || '',
        correctWord: WordsService.getRandomWord(),
        players: newPlayers,
        status: 'playing',
        createdAt: game?.createdAt || new Date().toString(),
      });
      return;
    }

    await gameService.updateGame(id || '', {
      adminId: game?.adminId || '',
      correctWord: game?.correctWord || '',
      players: newPlayers,
      status: 'waiting',
      createdAt: game?.createdAt || new Date().toString(),
    });
  };

  const handlExitGame = async () => {
    if (!user) {
      toast.dark(t('result:error.unLogged'));
      return;
    }

    const newPlayers = [...(game?.players || [])];
    newPlayers[currentPlayerId] = {
      id: user.id,
      name: user.name,
      photoURL: user.photoURL,
      letters: WordsService.makeInitialWordsState(),
      ready: false,
    };

    const gameService = new GameService();
    await gameService.updateGame(id || '', {
      adminId: game?.adminId || '',
      correctWord: game?.correctWord || '',
      players: newPlayers,
      status: 'waiting',
      createdAt: game?.createdAt || new Date().toString(),
    });
  };

  useEffect(() => {
    const gameRef = database.ref(`games/${id}`);

    gameRef.on('value', (snapshot) => {
      const game = snapshot.val();

      if (!game.adminId) {
        history('/');
        return;
      }

      setCurrentPlayerId(
        game.players.findIndex(
          (player: IPlayer) => player.id === user?.id
        )
      );

      if (game.status === 'playing') {
        registerEvent('play_online_again');
        history(`/${id}/versus`);
      }

      setGame(game);
    });

    return () => {
      gameRef.off();
    };
  }, [id, history, user]);

  return !game ? (
    <Loading />
  ) : (
    <Container>
      <Header home />

      {game.winner ? (
        <>
          <Lottie
            options={winnerConfigs}
            height={200}
            width={200}
            isClickToPauseDisabled
          />
          <Text>
            {game.winner.name}
            {t('result:message.winner')}
          </Text>
          <Text fontWeight="bold">
            <br />
            {t('result:message.wordIs')}
            {game.correctWord.toUpperCase()}
          </Text>
        </>
      ) : (
        <>
          <Lottie
            options={loserConfigs}
            height={200}
            width={200}
            isClickToPauseDisabled
          />
          <Text>{t('result:message.loser')}</Text>
          <Text fontWeight="bold">
            <br />
            {t('result:message.wordIs')}
            {game.correctWord.toUpperCase()}
          </Text>
        </>
      )}

      <Box
        flexDirection="row"
        gap="1rem"
        style={{ marginTop: '1rem' }}
      >
        {!game.players[currentPlayerId]?.ready ? (
          <Button
            color={theme.colors.letter.correctPlace}
            onClick={handleReadyGame}
            style={{ marginRight: '1rem', minWidth: '18rem' }}
          >
            {t('result:button.again')}
          </Button>
        ) : (
          <Button
            color={theme.colors.letter.nonExisting}
            onClick={handlExitGame}
            style={{ marginRight: '1rem', minWidth: '18rem' }}
          >
            {t('result:button.exit')}
          </Button>
        )}

        {game.players.map((player) => (
          <Avatar src={player.photoURL} awaiting={!player.ready} />
        ))}
      </Box>
    </Container>
  );
}

interface AwaiginProps {
  awaiting?: boolean;
}

const Avatar = styled.img<AwaiginProps>`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;

  transition: all 0.2s ease-in-out;

  filter: ${({ awaiting }) =>
    awaiting ? 'grayscale(70%)' : 'grayscale(0%)'};

  box-shadow: ${({ awaiting }) =>
    awaiting ? '0 0 12px 2px red' : '0 0 12px 2px green'};
`;
