import styled from 'styled-components';
import { ColorOptions } from '../interfaces';

export const Key = styled.button<{ color?: ColorOptions }>`
  ${(props) => {
    switch (props.color) {
      case 'correctPlace':
        return `background-color: ${props.theme.colors.letter.correctPlace};`;
      case 'incorrectPlace':
        return `background-color: ${props.theme.colors.letter.incorrectPlace};`;
      case 'nonExisting':
        return `background-color: ${props.theme.colors.keyboard.unavailable};`;
      default:
        return `background-color: ${props.theme.colors.keyboard.available};`;
    }
  }}

  transition: background-color 0.2s ease-in-out;

  border: none;
  border-radius: 8%;
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.fontFamily};
  font-size: 5vh;
  line-height: 1em;
  font-weight: 500;
  cursor: pointer;

  padding: 2vh 2.5vh;

  grid-column: span 3;
  display: flex;
  justify-content: center;
  align-items: center;

  outline: none;
`;
