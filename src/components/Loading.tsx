import React from 'react';
import Lottie from 'react-lottie';

import { Container } from './Container';
import animationData from '../assets/animations/loading.json';

export function Loading() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container>
      <Lottie
        options={defaultOptions}
        height={300}
        width={300}
        isClickToPauseDisabled
      />
    </Container>
  );
}
