import * as RadixSwitch from '@radix-ui/react-switch';
import i18next from 'i18next';
import styled from 'styled-components';

import brazilFlag from '../assets/images/brazil.png';
import englishFlag from '../assets/images/usa.png';

export function LanguageSwitch(props: RadixSwitch.SwitchProps) {
  const handleOnClick = () => {
    i18next.changeLanguage(
      i18next.language === 'enUS' ? 'ptBR' : 'enUS'
    );
  };

  return (
    <Container>
      <LanguageImage src={brazilFlag} />

      <Box>
        <SwitchRoot onClick={handleOnClick} {...props}>
          <SwitchThumb {...props} />
        </SwitchRoot>
      </Box>

      <LanguageImage src={englishFlag} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  margin-right: 1rem;
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LanguageImage = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

const SwitchRoot = styled(RadixSwitch.Root)`
  all: unset;
  width: 42px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: 9999px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  position: relative;
  border: none;
  cursor: pointer;
`;

const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease-in-out;
  transform: translateX(2px);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(19px);
  }
`;
