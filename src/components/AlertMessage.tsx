import React from 'react';
import styled from 'styled-components';

interface AlertMessageProps {
  message: string;
  isVisible: boolean;
}

export function AlertMessage(props: AlertMessageProps) {
  return <Alert isVisible={props.isVisible}>{props.message}</Alert>;
}

const Alert = styled.div<{ isVisible: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};

  animation: ${(props) =>
    props.isVisible
      ? '0.10s linear 0s 1 normal forwards running popup'
      : 'none'};

  background-color: #009afe;
  padding: 0.4em 1.5em;
  border-radius: 0.4em;

  font-family: ${(props) => props.theme.fontFamily};
  font-weight: 400;
  font-size: 2.5vh;

  margin: 1.6rem 0;
`;
