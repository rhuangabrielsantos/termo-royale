import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Button,
  Container,
  Header,
  Text,
  Loading,
} from '../../components';
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
  const [loading, setLoading] = useState(false);

  const handleCreateOfflineGame = () => {
    registerEvent('play_offline');
    history('/game');
  };

  const handleCreateOnlineGame = async () => {
    if (!user) {
      toast.dark('Você precisa estar logado para jogar online');
      return;
    }

    setLoading(true);

    const gameService = new GameService();
    const game = await gameService.createGame({
      players: [
        {
          id: user?.id || '',
          name: user?.name || '',
          photoURL: user?.photoURL || '',
          letters: WordsService.makeInitialWordsState(),
          ready: true,
        },
      ],
      adminId: user?.id || '',
      correctWord: WordsService.getRandomWord(),
      status: 'waiting',
    });

    setLoading(false);
    registerEvent('play_online');
    history(`${game.key}/lobby`);
  };

  useEffect(() => {
    registesPageView('/');
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Container>
      <Header home />

      <Text fontWeight="bold" fontSize="3rem">
        TERMO ROYALE
      </Text>

      <Text fontSize="1rem" margin="0 2rem 3rem 2rem">
        Um battle royale para você desafiar seus amigos e descobrir
        quem é o mais rápido a descobrir o termo! <br /> Você pode
        jogar sozinho offline ou jogar online em até 4 pessoas!
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
