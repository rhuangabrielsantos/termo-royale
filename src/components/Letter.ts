import styled from 'styled-components';

interface LetterProps {
  color?: ColorOptions;
  animate?: boolean;
  isWritting?: boolean;
  fliped?: boolean;
}

export type ColorOptions =
  | 'transparent'
  | 'correctPlace'
  | 'incorrectPlace'
  | 'nonExisting'
  | 'unvailable'
  | 'opponent';

export const Letter = styled.div<LetterProps>`
  font-weight: 600;
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 5vh;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) =>
    props.color === 'unvailable'
      ? props.theme.colors.letter.unvailable
      : props.color === 'opponent'
      ? props.theme.colors.keyboard.available
      : props.fliped
      ? props.theme.colors.letter[props.color || 'nonExisting']
      : 'transparent'};

  text-transform: uppercase;
  outline: 0;

  border-radius: 10%;
  display: flex;
  justify-content: center;
  align-items: center;

  width: 8vh;
  height: 8vh;

  animation: ${(props) =>
    props.animate
      ? '0.15s ease-out 0s 1 normal none running popup'
      : 'none'};

  border: ${(props) =>
    props.color === 'unvailable' || props.fliped
      ? 'none'
      : `0.125em solid ${props.theme.colors.keyboard.available}`};

  cursor: ${(props) =>
    props.color === 'transparent' ? 'pointer' : 'default'};

  ${(props) =>
    props.isWritting &&
    `border-bottom: 0.25em solid ${props.theme.colors.keyboard.available}`};

  --color: var(--${(props) => props.color});

  &.flip {
    animation: 0.45s linear flip 0s forwards !important;

    border: none;
  }
`;
