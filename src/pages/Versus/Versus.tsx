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
  const [firstPlayerWords, setFirstPlayerWords] = useState<
    ILetter[][]
  >([]);
  const [secondPlayerWords, setSecondPlayerWords] = useState<
    ILetter[][]
  >([]);
  const { user } = useContext(AuthContext);
  const gameService = new GameService();
  const { setKeys } = useContext(KeyboardContext);

  const handleUpdatePlayerWords = async (
    player: string,
    words: ILetter[][]
  ) => {
    if (!game) {
      return;
    }

    const newPlayers = game?.players || [];
    newPlayers[player === 'first' ? 0 : 1].letters = words;

    await gameService.updateGame(id || '', {
      adminId: game?.adminId || '',
      correctWord: game?.correctWord || '',
      status: game?.status || '',
      players: newPlayers,
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
      setFirstPlayerWords(game.players[0].letters);
      setSecondPlayerWords(game.players[1].letters);

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
    });
  }, [game, id]);

  return !game || !user ? (
    <Loading />
  ) : (
    <Container>
      <Header />

      <Box flexDirection="row" gap="4rem">
        <Box flexDirection="column" gap="0rem">
          <Board
            correctWord={game?.correctWord}
            words={firstPlayerWords}
            setWords={(words) =>
              handleUpdatePlayerWords('first', words)
            }
            isMyBoard={game.players[0].id === user.id}
            playerInfo="first"
            player={game.players[0]}
          />
        </Box>

        <Box flexDirection="column" gap="0rem">
          <Board
            correctWord={game?.correctWord}
            words={secondPlayerWords}
            setWords={(words) =>
              handleUpdatePlayerWords('second', words)
            }
            isMyBoard={game.players[1].id === user.id}
            playerInfo="second"
            player={game.players[1]}
          />
        </Box>
      </Box>

      <Keyboard />
    </Container>
  );
}
