import styled from 'styled-components';
import { ILetter } from '../interfaces';
import { Letter } from './Letter';
import { WrittingWord } from './WrittingWord';

interface WordProps {
  letters?: ILetter[];
  isWritting?: boolean;
  checkWord: (word: ILetter[]) => void;

  error: boolean;
  setError: (error: boolean) => void;
}

export function Word({
  letters,
  isWritting,
  checkWord,
  error,
  setError,
}: WordProps) {
  return isWritting ? (
    <WrittingWord
      checkWord={checkWord}
      error={error}
      setError={setError}
    />
  ) : (
    <Container>
      {letters?.map((letter, index) => (
        <Letter key={index} color={letter.color}>
          {letter.text}
        </Letter>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 0.125em;
`;
