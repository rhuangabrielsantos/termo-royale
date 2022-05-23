import styled from 'styled-components';

interface ButtonProps {
  color?: string;
}

export const Button = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.color || props.theme.colors.letter.nonExisting};
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.colors.text};

  padding: 0.5rem 1rem;

  cursor: pointer;

  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 600;
  font-size: 1.5rem;

  min-width: 200px;

  transition: scale 0.2s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    scale: 1.05;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
