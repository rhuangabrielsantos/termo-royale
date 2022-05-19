import styled from 'styled-components';

export const Container = styled.div<{ gap?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.gap || 0};

  width: 100vw;
  height: 100vh;
`;
