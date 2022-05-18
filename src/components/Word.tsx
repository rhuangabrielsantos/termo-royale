import styled from 'styled-components';
import { ColorOptions, Letter } from './Letter';

interface Props {
  word: string;
}

export function Word({ word }: Props) {
  function renderLetters() {
    return word.split('').map((letter, index) => {
      const color = randomColor();

      return (
        <Letter
          key={index}
          color={color}
          animate={color !== 'nonExisting'}
        >
          {letter}
        </Letter>
      );
    });
  }

  function randomColor(): ColorOptions {
    const colors: ColorOptions[] = [
      'correctPlace',
      'incorrectPlace',
      'nonExisting',
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  }

  return <Container>{renderLetters()}</Container>;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  gap: 0.125em;
`;
