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

  name?: string;
  isMyBoard?: boolean;
}

export function Word({
  letters,
  isWritting,
  checkWord,
  error,
  setError,
  name,
  isMyBoard,
}: WordProps) {
  return isWritting ? (
    <WrittingWord
      checkWord={checkWord}
      error={error}
      setError={setError}
      name={name}
      isMyBoard={isMyBoard}
    />
  ) : (
    <Container>
      {letters?.map((letter, index) => (
        <Letter
          key={index}
          color={
            !isMyBoard && letter.color !== 'transparent'
              ? letter.color
              : !isMyBoard && letter.color === 'transparent'
              ? 'opponent'
              : letter.color
          }
          className={name}
          fliped={letter.flip}
        >
          {isMyBoard ? letter.text : ' '}
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
