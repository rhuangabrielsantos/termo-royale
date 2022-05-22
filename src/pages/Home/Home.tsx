import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Text } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../styles/theme';
import {
  registerEvent,
  registesPageView,
} from '../../utils/LogUtils';

export function Home() {
  const history = useNavigate();
  const { signInWithGoogle } = useContext(AuthContext);

  const handleSignInWithGoogle = async () => {
    await signInWithGoogle();
  };

  useEffect(() => {
    registesPageView('/');
  }, []);

  return (
    <Container>
      <Text fontWeight="bold" fontSize="3rem">
        TERMO ROYALE
      </Text>

      <Text fontSize="1rem" margin="0 3rem 5rem 3rem">
        Um battle royale para você desafiar seus amigos e descobrir
        quem é o mais rápido a descobrir o termo!
      </Text>

      <Box flexDirection="row" gap="1rem">
        <Button
          color={theme.colors.letter.nonExisting}
          onClick={() => {
            history('/single/game');
            registerEvent('play_offline');
          }}
        >
          JOGAR OFFLINE
        </Button>

        <Button
          disabled
          color={theme.colors.letter.correctPlace}
          onClick={() => {
            handleSignInWithGoogle();
            registerEvent('play_online');
          }}
          title="Em breve!"
        >
          JOGAR ONLINE
        </Button>
      </Box>
    </Container>
  );
}
