import React from 'react';
import styled from 'styled-components';

import { Text } from './Text';

export function Header() {
  return (
    <HeaderContainer>
      <Text fontWeight="bold">TERMO ROYALE</Text>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
`;
