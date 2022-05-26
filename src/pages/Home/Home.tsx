import { useContext, useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Text } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { GameService } from '../../service/GameService';
import { WordsService } from '../../service/WordsService';
import { theme } from '../../styles/theme';
import {
  registerEvent,
  registesPageView,
} from '../../utils/LogUtils';
import { Box } from './HomeStyle';
import animationData from '../../assets/animations/loading.json';

export function Home() {
  const history = useNavigate();
  const { user, signInWithGoogle } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleCreateOfflineGame = () => {
    registerEvent('play_offline');
    history('/game');
  };

  const handleCreateOnlineGame = async () => {
    setLoading(true);

    if (!user) {
      await signInWithGoogle();
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

    setLoading(false);
    registerEvent('play_online');
    history(`${game.key}/lobby`);
  };

  useEffect(() => {
    registesPageView('/');
  }, []);

  return loading ? (
    <Container>
      <Lottie options={defaultOptions} height={300} width={300} />
    </Container>
  ) : (
    <Container>
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
