import styled from 'styled-components';

export const Box = styled.div<{
  flexDirection: 'column' | 'row';
  gap: string;
  animationError?: boolean;
  isHidden?: boolean;
}>`
  align-items: center;
  justify-content: center;
  flex-direction: ${(props) => props.flexDirection};

  gap: ${(props) => props.gap};
  outline: none;

  animation: ${(props) =>
    props.animationError
      ? '0.75s ease-in-out 0s 1 normal none running rownope'
      : 'none'};

  display: ${(props) => (props.isHidden ? 'none' : 'flex')};
`;
