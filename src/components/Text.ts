import styled from 'styled-components';

interface TextProps {
  color?: string;
  fontSize?: string;
  fontWeight?: 'semibold' | 'bold' | 'normal';

  margin?: string;
}

export const Text = styled.h1<TextProps>`
  font-size: ${(props) => props.fontSize || '1.5rem'};
  font-weight: ${(props) => props.fontWeight || 'normal'};
  color: ${(props) => props.color || '#FFF'};

  font-family: ${(props) => props.theme.fontFamily};

  margin: ${(props) => props.margin || '0'};

  text-align: center;
`;
