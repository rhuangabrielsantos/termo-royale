import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Board } from '../../components/Board';
import { IGame } from '../../interfaces/IGame';
import { database } from '../../service/FirebaseService';
import { ILetter } from '../../interfaces';

import { AuthContext } from '../../context/AuthContext';
import { Keyboard } from '../../components/Keyboard';
import { Box, Container, Header, Loading } from '../../components';

import { GameService } from '../../service/GameService';
import { KeyboardContext } from '../../context/KeyboardContext';
import { keyboardService } from '../../service/KeyboardService';

export function Versus() {
  const { id } = useParams();
  const history = useNavigate();
  const [game, setGame] = useState<IGame>();

  const { user } = useContext(AuthContext);
  const gameService = new GameService();
  const { setKeys } = useContext(KeyboardContext);

  const handleUpdatePlayerWords = async (
    player: number,
    words: ILetter[][]
  ) => {
    if (!game) {
      return;
    }

    const newPlayers = game?.players || [];
    newPlayers[player].letters = words;

    await gameService.updateGame(id || '', {
      adminId: game?.adminId || '',
      correctWord: game?.correctWord || '',
      status: game?.status || '',
      players: newPlayers,
      createdAt: game?.createdAt || new Date().toString(),
    });

    setTimeout(() => {
      const gameWinner = words.filter((letters) => {
        return letters.every(
          (letter) => letter.color === 'correctPlace'
        );
      });

      if (gameWinner.length > 0) {
        gameService.updateGame(id || '', {
          adminId: game?.adminId || '',
          correctWord: game?.correctWord || '',
          players: newPlayers,
          status: 'finished',
          winner: {
            id: user?.id || '',
            name: user?.name || '',
            photoURL: user?.photoURL || '',
            letters: [],
            ready: true,
          },
          createdAt: game?.createdAt || new Date().toString(),
        });

        return;
      }

      const firstPlayerLose = game.players[0].letters.filter(
        (letters) => {
          return letters.every((letter) => letter.flip === true);
        }
      );

      const secondPlayerLose = game.players[1].letters.filter(
        (letters) => {
          return letters.every((letter) => letter.flip === true);
        }
      );

      if (
        firstPlayerLose.length === 6 &&
        secondPlayerLose.length === 6
      ) {
        gameService.updateGame(id || '', {
          adminId: game?.adminId || '',
          correctWord: game?.correctWord || '',
          players: newPlayers,
          status: 'finished',
          winner: undefined,
          createdAt: game?.createdAt || new Date().toString(),
        });
      }
    }, 4000);
  };

  useEffect(() => {
    const gameRef = database.ref(`games/${id}`);

    gameRef.on('value', (snapshot) => {
      const game = snapshot.val();

      if (!game.adminId) {
        history('/');
        return;
      }

      setGame(game);

      if (game.status === 'finished') {
        history(`/${id}/result`);
        return;
      }
    });

    return () => {
      gameRef.off();
    };
  }, [id, history]);

  useEffect(() => {
    setKeys(keyboardService.generateEmptyKeyboard());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!game) {
      return;
    }

    const playersReadyFalse = game?.players.map((player) => {
      return {
        ...player,
        ready: false,
      };
    });

    const gameService = new GameService();
    gameService.updateGame(id || '', {
      adminId: game?.adminId || '',
      correctWord: game?.correctWord || '',
      players: playersReadyFalse || [],
      status: game?.status || '',
      createdAt: game?.createdAt || new Date().toString(),
    });
  }, [game, id]);

  return !game || !user ? (
    <Loading />
  ) : (
    <Container>
      <Header />

      <Box flexDirection="row" gap="4rem">
        {game.players.map((player, index) => (
          <Box flexDirection="column" gap="0rem" key={index}>
            <Board
              correctWord={game?.correctWord}
              words={player.letters}
              setWords={(words) =>
                handleUpdatePlayerWords(index, words)
              }
              isMyBoard={player.id === user.id}
              playerInfo={index.toString()}
              player={player}
            />
          </Box>
        ))}
      </Box>

      <Keyboard />
    </Container>
  );
}
