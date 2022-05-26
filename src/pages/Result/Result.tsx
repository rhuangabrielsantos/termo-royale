import React, { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate, useParams } from 'react-router-dom';

import animationDataWinner from '../../assets/animations/winner.json';
import animationDataLoser from '../../assets/animations/loser.json';
import animationData from '../../assets/animations/loading.json';

import {
  Box,
  Button,
  Container,
  Header,
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

export function Result() {
  const { id } = useParams();
  const [game, setGame] = useState<IGame>();
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [isFirstPlayer, setIsFirstPlayer] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

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

  const handleCreateOnlineGame = async () => {
    if (!user) {
      toast.dark('Você precisa estar logado para jogar online');
      return;
    }

    const newPlayers = [...(game?.players || [])];
    newPlayers[isFirstPlayer ? 0 : 1] = {
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
      });
      return;
    }

    await gameService.updateGame(id || '', {
      adminId: game?.adminId || '',
      correctWord: game?.correctWord || '',
      players: newPlayers,
      status: 'waiting',
    });
  };

  useEffect(() => {
    const gameRef = database.ref(`games/${id}`);

    gameRef.on('value', (snapshot) => {
      const game = snapshot.val();

      setIsFirstPlayer(game?.players[0].id === user?.id || false);

      if (!game.adminId) {
        history('/');
        return;
      }

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
    <Container>
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled
      />
    </Container>
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
          <Text>{game.winner.name} ganhou a partida!</Text>
          <Text fontWeight="bold">
            <br />A palavra era {game.correctWord.toUpperCase()}
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
          <Text>
            Ninguem conseguiu descobrir a palavra, QUE VERGONHAAA!{' '}
          </Text>
          <Text fontWeight="bold">
            <br />A palavra era {game.correctWord.toUpperCase()}
          </Text>
        </>
      )}

      <Box
        flexDirection="row"
        gap="1rem"
        style={{ marginTop: '1rem' }}
      >
        {!game.players[isFirstPlayer ? 0 : 1]?.ready && (
          <Button
            color={theme.colors.letter.correctPlace}
            onClick={handleCreateOnlineGame}
          >
            JOGAR NOVAMENTE
          </Button>
        )}

        {game.players.map((player) => (
          <Avatar src={player.photoURL} awaiting={!player.ready} />
        ))}
      </Box>
    </Container>
  );
}

interface AvatarProps {
  awaiting?: boolean;
}

const Avatar = styled.img<AvatarProps>`
  border-radius: 50%;
  width: 3rem;
  height: 3rem;

  transition: all 0.2s ease-in-out;

  filter: ${({ awaiting }) =>
    awaiting ? 'grayscale(100%)' : 'grayscale(0%)'};
`;
