import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button, Container, Header, Text } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { GameService } from '../../service/GameService';
import { WordsService } from '../../service/WordsService';
import { theme } from '../../styles/theme';
import {
  registerEvent,
  registesPageView,
} from '../../utils/LogUtils';
import { Box } from './HomeStyle';

export function Home() {
  const history = useNavigate();
  const { user } = useContext(AuthContext);

  const handleCreateOfflineGame = () => {
    registerEvent('play_offline');
    history('/game');
  };

  const handleCreateOnlineGame = async () => {
    if (!user) {
      toast.dark('Você precisa estar logado para jogar online');
      return;
    }

    const gameService = new GameService();
    const game = await gameService.createGame({
      players: [
        {
          id: user?.id || '',
          name: user?.name || '',
          photoURL: user?.photoURL || '',
          letters: WordsService.makeInitialWordsState(),
        },
      ],
      adminId: user?.id || '',
      correctWord: WordsService.getRandomWord(),
      status: 'waiting',
    });

    registerEvent('play_online');
    history(`${game.key}/lobby`);
  };

  useEffect(() => {
    registesPageView('/');
  }, []);

  return (
    <Container>
      <Header home />

      <Text fontWeight="bold" fontSize="3rem">
        TERMO ROYALE
      </Text>

      <Text fontSize="1rem" margin="0 3rem 5rem 3rem">
        Um battle royale para você desafiar seus amigos e descobrir
        quem é o mais rápido a descobrir o termo!
      </Text>

      <Box gap="1rem">
        <Button
          color={theme.colors.letter.nonExisting}
          onClick={handleCreateOfflineGame}
        >
          JOGAR OFFLINE
        </Button>

        <Button
          color={theme.colors.letter.correctPlace}
          onClick={handleCreateOnlineGame}
        >
          JOGAR ONLINE
        </Button>
      </Box>
    </Container>
  );
}
