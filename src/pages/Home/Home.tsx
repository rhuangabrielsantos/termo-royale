import { Box, Button, Container, Text } from '../../components';
import { theme } from '../../styles/theme';

export function Home() {
  return (
    <Container>
      <Text fontWeight="bold" fontSize="3rem">
        TERMO ROYALE
      </Text>

      <Text fontSize="1rem" margin="0 0 5rem 0">
        Um battle royale para você desafiar seus amigos e descobrir
        quem é o mais rápido a descobrir o termo!
      </Text>

      <Box flexDirection="row" gap="1rem">
        <Button color={theme.colors.letter.incorrectPlace}>
          CRIAR CONTA
        </Button>

        <Button color={theme.colors.letter.correctPlace}>
          ENTRAR
        </Button>
      </Box>
    </Container>
  );
}
