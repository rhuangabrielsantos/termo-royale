import React, { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate, useParams } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Button,
  Container,
  Header,
  Text,
} from '../../components';
import { database } from '../../service/FirebaseService';
import animationData from '../../assets/animations/loading.json';
import { IGame } from '../../interfaces/IGame';
import { GameService } from '../../service/GameService';
import { theme } from '../../styles/theme';
import { AuthContext } from '../../context/AuthContext';
import { WordsService } from '../../service/WordsService';

export function Lobby() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [game, setGame] = useState<IGame>();
  const history = useNavigate();
  const gameService = new GameService();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.dark('Link copiado para a área de transferência');
  };

  const handlePlayGame = () => {
    if (!id) {
      return;
    }

    if (game?.players.length === 1) {
      toast.dark('Impossível iniciar a partida sozinho');
      return;
    }

    gameService.updateGame(id, {
      correctWord: game?.correctWord || '',
      adminId: game?.adminId || '',
      players: game?.players || [],
      status: 'playing',
    });
  };

  const handleEnterGame = async () => {
    if (!user) {
      toast.dark('Você precisa estar logado para entrar na partida');
      return;
    }

    await gameService.addPlayer(id || '', {
      id: user?.id || '',
      name: user?.name || '',
      photoURL: user?.photoURL || '',
      letters: WordsService.makeInitialWordsState(),
    });
  };

  useEffect(() => {
    const gameRef = database.ref(`games/${id}`);

    gameRef.on('value', (snapshot) => {
      setGame(snapshot.val());

      if (snapshot.val().status === 'playing') {
        history(`/${id}/versus`);
      }
    });

    return () => {
      gameRef.off();
    };
  }, [history, id]);

  return !game ? (
    <Container>
      <Lottie options={defaultOptions} height={300} width={300} />
    </Container>
  ) : (
    <Container>
      <Header />

      <Box flexDirection="row" gap="1rem">
        {game.players?.map((player) => (
          <Avatar key={player.id} src={player.photoURL} />
        ))}
      </Box>

      {game.adminId === user?.id ? (
        <Box
          flexDirection="row"
          gap="0.5rem"
          style={{ marginTop: '1rem' }}
        >
          <Button
            style={{ minWidth: '2rem', padding: '0.7rem' }}
            color={theme.colors.letter.correctPlace}
            onClick={copyUrlToClipboard}
          >
            <CopyIcon />
          </Button>

          <Button
            color={theme.colors.letter.nonExisting}
            onClick={handlePlayGame}
          >
            COMEÇAR A PARTIDA
          </Button>
        </Box>
      ) : (
        <Box
          flexDirection="row"
          gap="0.5rem"
          style={{ marginTop: '1rem' }}
        >
          {game.players.find((player) => player.id === user?.id) ? (
            <Text fontSize="1.5rem" margin="0 1rem" fontWeight="bold">
              AGUARDE{' '}
              {game.players[0].name.split(' ')[0].toUpperCase()}{' '}
              INICIAR A PARTIDA
            </Text>
          ) : (
            <>
              <Button
                color={theme.colors.letter.nonExisting}
                onClick={handleEnterGame}
              >
                ENTRAR NA PARTIDA
              </Button>
            </>
          )}
        </Box>
      )}
    </Container>
  );
}

const Avatar = styled.img`
  border-radius: 50%;
  width: 5rem;
  height: 5rem;
`;

const CopyIcon = styled(MdContentCopy)`
  color: ${({ theme }) => theme.colors.text};

  width: 2rem;
  height: 2rem;
`;
