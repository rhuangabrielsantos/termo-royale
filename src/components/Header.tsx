import React from 'react';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { Text } from './Text';
import { registerEvent } from '../utils/LogUtils';

export function Header() {
  return (
    <HeaderContainer>
      <IoMdArrowRoundBack
        style={{
          position: 'fixed',
          left: '1rem',
          top: '1rem',
          fontSize: '2rem',
          cursor: 'pointer',
        }}
        onClick={() => {
          window.history.back();
          registerEvent('back_button');
        }}
      />

      <Text fontWeight="bold">TERMO ROYALE</Text>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
`;
