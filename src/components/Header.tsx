import React, { useContext } from 'react';
import styled from 'styled-components';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { HiHome } from 'react-icons/hi';
import { FaSignOutAlt } from 'react-icons/fa';

import { Text } from './Text';
import { registerEvent } from '../utils/LogUtils';
import { AuthContext } from '../context/AuthContext';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { Box } from './Box';
import { LanguageSwitch } from './LanguageSwitch';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  home?: boolean;
}

export function Header({ home }: HeaderProps) {
  const { user, signInWithGoogle, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignIn = async () => {
    await signInWithGoogle();
  };

  return (
    <HeaderContainer>
      {home ? (
        <HiHome
          style={{
            position: 'fixed',
            left: '1rem',
            top: '1rem',
            fontSize: '2rem',
            cursor: 'pointer',
          }}
          onClick={() => {
            navigate('/');
            registerEvent('home_button');
          }}
        />
      ) : (
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
      )}

      <TextMobileHidden
        fontWeight="bold"
        style={{
          position: 'fixed',
          left: '50%',
          top: '1rem',
          transform: 'translateX(-50%)',
        }}
      >
        TERMO ROYALE
      </TextMobileHidden>

      {user ? (
        <Box
          flexDirection="row"
          gap="1rem"
          style={{
            position: 'fixed',
            right: '1rem',
            top: '1rem',
          }}
        >
          <LanguageSwitch checked={i18next.language === 'enUS'} />
          <TextMobileHidden fontWeight="bold">
            {user.name.split(' ')[0].toUpperCase()}
          </TextMobileHidden>
          <Avatar src={user.photoURL} />
          <FaSignOutAlt
            onClick={signOut}
            size={30}
            style={{ cursor: 'pointer' }}
          />
        </Box>
      ) : (
        <Box
          flexDirection="row"
          gap="1rem"
          style={{
            position: 'fixed',
            right: '1rem',
            top: '1rem',
          }}
        >
          <LanguageSwitch checked={i18next.language === 'enUS'} />
          <Button onClick={handleSignIn}>
            {t('home:button.login')}
          </Button>
        </Box>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
`;

const Avatar = styled.img`
  width: 2rem;
  height: 2rem;

  border-radius: 50%;
`;

const TextMobileHidden = styled(Text)`
  @media (max-width: 600px) {
    display: none;
  }
`;
