import React from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal(props: ModalProps) {
  return (
    <Overlay visible={props.isOpen} onClick={props.onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {props.children}
      </ModalContainer>
    </Overlay>
  );
}

interface OverlayProps {
  visible: boolean;
}

const Overlay = styled.div<OverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;

  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};

  transition: visibility 0.3s, opacity 0.3s;
`;

const ModalContainer = styled.div`
  width: 50%;
  height: 50%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 10px;
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  z-index: 11;

  @media (max-width: 768px) {
    width: 90%;
    height: 80%;
  }
`;
