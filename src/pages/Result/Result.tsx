import React, { useEffect, useState } from 'react';
import Lottie from 'react-lottie';
import { useParams } from 'react-router-dom';

import animationDataWinner from '../../assets/animations/winner.json';
import animationDataLoser from '../../assets/animations/loser.json';
import animationData from '../../assets/animations/loading.json';

import { Container, Header, Text } from '../../components';
import { IGame } from '../../interfaces/IGame';
import { database } from '../../service/FirebaseService';

export function Result() {
  const { id } = useParams();
  const [game, setGame] = useState<IGame>();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const winnerConfigs = {
    loop: true,
    autoplay: true,
    animationData: animationDataWinner,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const loserConfigs = {
    loop: true,
    autoplay: true,
    animationData: animationDataLoser,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    const gameRef = database.ref(`games/${id}`);

    gameRef.once('value', (snapshot) => {
      const game = snapshot.val();
      setGame(game);
    });

    return () => {
      gameRef.off();
    };
  }, [id]);

  return !game ? (
    <Container>
      <Lottie options={defaultOptions} height={300} width={300} />
    </Container>
  ) : (
    <Container>
      <Header home />

      {game.winner ? (
        <>
          <Lottie options={winnerConfigs} height={200} width={200} />
          <Text>{game.winner.name} ganhou a partida!</Text>
          <Text fontWeight="bold">
            <br />A palavra era {game.correctWord.toUpperCase()}
          </Text>
        </>
      ) : (
        <>
          <Lottie options={loserConfigs} height={200} width={200} />
          <Text>
            Ninguem conseguiu descobrir a palavra, QUE VERGONHAAA!{' '}
          </Text>
          <Text fontWeight="bold">
            <br />A palavra era {game.correctWord.toUpperCase()}
          </Text>
        </>
      )}
    </Container>
  );
}
