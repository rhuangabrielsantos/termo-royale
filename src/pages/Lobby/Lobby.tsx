import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdContentCopy } from 'react-icons/md';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Box,
  Button,
  Container,
  Header,
  Loading,
  Text,
} from '../../components';
import { database } from '../../service/FirebaseService';
import { IGame } from '../../interfaces/IGame';
import { GameService } from '../../service/GameService';
import { theme } from '../../styles/theme';
import { AuthContext } from '../../context/AuthContext';
import { WordsService } from '../../service/WordsService';

export function Lobby() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [game, setGame] = useState<IGame>();
  const history = useNavigate();
  const gameService = new GameService();

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.dark(t('lobby:copy'));
  };

  const handlePlayGame = () => {
    if (!id) {
      return;
    }

    if (game?.players.length === 1) {
      toast.dark(t('lobby:error.alone'));
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
      toast.dark(t('lobby:error.unLogged'));
      return;
    }

    if (game?.players.length === 4) {
      toast.dark(t('lobby:error.full'));
      return;
    }

    await gameService.addPlayer(id || '', {
      id: user?.id || '',
      name: user?.name || '',
      photoURL: user?.photoURL || '',
      letters: WordsService.makeInitialWordsState(),
      ready: true,
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

      setGame(game);

      if (snapshot.val().status === 'playing') {
        history(`/${id}/versus`);
      }
    });

    return () => {
      gameRef.off();
    };
  }, [history, id]);

  return !game ? (
    <Loading />
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
            {t('lobby:button.start')}
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
              {t('lobby:message.await')}
              {game.players[0].name.split(' ')[0].toUpperCase()}
              {t('lobby:message.init')}
            </Text>
          ) : (
            <>
              <Button
                color={theme.colors.letter.nonExisting}
                onClick={handleEnterGame}
              >
                {t('lobby:button.join')}
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
