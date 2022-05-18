import styled from 'styled-components';

export const Box = styled.div<{
  flexDirection: 'column' | 'row';
  gap: string;
}>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};
  align-items: center;
  justify-content: center;

  gap: ${(props) => props.gap};
`;
