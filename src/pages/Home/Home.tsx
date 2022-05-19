import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, Text } from '../../components';
import { theme } from '../../styles/theme';

export function Home() {
  const history = useNavigate();

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
        <Button color={theme.colors.letter.nonExisting}>
          CRIAR CONTA
        </Button>

        <Button
          color={theme.colors.letter.correctPlace}
          onClick={() => history('/game')}
        >
          ENTRAR
        </Button>
      </Box>
    </Container>
  );
}
