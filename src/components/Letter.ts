import styled from 'styled-components';

interface LetterProps {
  color?: ColorOptions;
  animate?: boolean;
  isWritting?: boolean;
}

export type ColorOptions =
  | 'transparent'
  | 'correctPlace'
  | 'incorrectPlace'
  | 'nonExisting'
  | 'unvailable';

export const Letter = styled.div<LetterProps>`
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 2rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) =>
    props.theme.colors.letter[props.color || 'nonExisting']};

  text-transform: uppercase;
  outline: 0;

  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3.5rem;
  height: 3.5rem;

  animation: ${(props) =>
    props.animate
      ? '0.15s ease-out 0s 1 normal none running popup'
      : 'none'};

  border: ${(props) =>
    props.color === 'transparent'
      ? `0.125em solid ${props.theme.colors.keyboard.available}`
      : 'none'};

  cursor: ${(props) =>
    props.color === 'transparent' ? 'pointer' : 'default'};

  ${(props) =>
    props.isWritting &&
    `border-bottom: 0.25em solid ${props.theme.colors.keyboard.available}`};

  .flip {
    animation: 0.45s linear flip 0s forwards;
  }
`;
