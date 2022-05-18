import styled from 'styled-components';

interface LetterProps {
  color?: ColorOptions;
  animate?: boolean;
}

export type ColorOptions =
  | 'correctPlace'
  | 'incorrectPlace'
  | 'nonExisting';

export const Letter = styled.div<LetterProps>`
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) =>
    props.theme.colors.letter[props.color || 'nonExisting']};

  text-transform: uppercase;

  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 4rem;
  height: 4rem;

  animation: ${(props) =>
    props.animate
      ? '0.15s ease-out 0s 1 normal none running popup'
      : 'none'};
`;
