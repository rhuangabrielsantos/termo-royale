import React, { useContext } from 'react';
import styled from 'styled-components';
import { KeyboardContext } from '../context/KeyboardContext';
import { KeyEnum } from '../enums/KeyEnum';
import { Key } from './Key';

export function Keyboard() {
  const { keys, setEventKey } = useContext(KeyboardContext);

  return (
    <Grid>
      <Key
        color={keys[KeyEnum.Q]?.color}
        onClick={() => {
          setEventKey('Q');
        }}
      >
        Q
      </Key>
      <Key
        color={keys[KeyEnum.W]?.color}
        onClick={() => setEventKey('W')}
      >
        W
      </Key>
      <Key
        color={keys[KeyEnum.E]?.color}
        onClick={() => setEventKey('E')}
      >
        E
      </Key>
      <Key
        color={keys[KeyEnum.R]?.color}
        onClick={() => setEventKey('R')}
      >
        R
      </Key>
      <Key
        color={keys[KeyEnum.T]?.color}
        onClick={() => setEventKey('T')}
      >
        T
      </Key>
      <Key
        color={keys[KeyEnum.Y]?.color}
        onClick={() => setEventKey('Y')}
      >
        Y
      </Key>
      <Key
        color={keys[KeyEnum.U]?.color}
        onClick={() => setEventKey('U')}
      >
        U
      </Key>
      <Key
        color={keys[KeyEnum.I]?.color}
        onClick={() => setEventKey('I')}
      >
        I
      </Key>
      <Key
        color={keys[KeyEnum.O]?.color}
        onClick={() => setEventKey('O')}
      >
        O
      </Key>
      <Key
        color={keys[KeyEnum.P]?.color}
        onClick={() => setEventKey('P')}
      >
        P
      </Key>

      <Key
        color={keys[KeyEnum.A]?.color}
        onClick={() => setEventKey('A')}
        style={{ gridColumn: '2 / span 3' }}
      >
        A
      </Key>
      <Key
        color={keys[KeyEnum.S]?.color}
        onClick={() => setEventKey('S')}
      >
        S
      </Key>
      <Key
        color={keys[KeyEnum.D]?.color}
        onClick={() => setEventKey('D')}
      >
        D
      </Key>
      <Key
        color={keys[KeyEnum.F]?.color}
        onClick={() => setEventKey('F')}
      >
        F
      </Key>
      <Key
        color={keys[KeyEnum.G]?.color}
        onClick={() => setEventKey('G')}
      >
        G
      </Key>
      <Key
        color={keys[KeyEnum.H]?.color}
        onClick={() => setEventKey('H')}
      >
        H
      </Key>
      <Key
        color={keys[KeyEnum.J]?.color}
        onClick={() => setEventKey('J')}
      >
        J
      </Key>
      <Key
        color={keys[KeyEnum.K]?.color}
        onClick={() => setEventKey('K')}
      >
        K
      </Key>
      <Key
        color={keys[KeyEnum.L]?.color}
        onClick={() => setEventKey('L')}
      >
        L
      </Key>

      <Key
        style={{ gridColumn: '30 / span 3' }}
        onClick={() => setEventKey('Backspace')}
      >
        <img
          style={{ width: '1em' }}
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjkwIiBoZWlnaHQ9IjI1NSIgdmlld0JveD0iMCAwIDI5MCAyNTUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xOS44OTE0IDEyNy4yNTFMMTAzLjA2OCA0MEgyNzVWMjE2SDEwMy4xM0wxOS44OTE0IDEyNy4yNTFaIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGxpbmUgeDE9IjEzIiB5MT0iLTEzIiB4Mj0iMTMwLjk0NyIgeTI9Ii0xMyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcxMDcgMC43MDcxMDcgLTAuNzY1MzY3IDAuNjQzNTk0IDExNSA4NikiIHN0cm9rZT0iI0ZBRkFGRiIgc3Ryb2tlLXdpZHRoPSIyNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxsaW5lIHgxPSIxMyIgeTE9Ii0xMyIgeDI9IjEzMC45NDciIHkyPSItMTMiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3MTA3IC0wLjcwNzEwNyAwLjc2NTM2NyAwLjY0MzU5NCAxMzMuNDY1IDE4Ny43ODYpIiBzdHJva2U9IiNGQUZBRkYiIHN0cm9rZS13aWR0aD0iMjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K"
          alt="backspace"
        />
      </Key>

      <Key
        color={keys[KeyEnum.Z]?.color}
        onClick={() => setEventKey('Z')}
        style={{ gridColumn: '3 / span 3' }}
      >
        Z
      </Key>
      <Key
        color={keys[KeyEnum.X]?.color}
        onClick={() => setEventKey('X')}
      >
        X
      </Key>
      <Key
        color={keys[KeyEnum.C]?.color}
        onClick={() => setEventKey('C')}
      >
        C
      </Key>
      <Key
        color={keys[KeyEnum.V]?.color}
        onClick={() => setEventKey('V')}
      >
        V
      </Key>
      <Key
        color={keys[KeyEnum.B]?.color}
        onClick={() => setEventKey('B')}
      >
        B
      </Key>
      <Key
        color={keys[KeyEnum.N]?.color}
        onClick={() => setEventKey('N')}
      >
        N
      </Key>
      <Key
        color={keys[KeyEnum.M]?.color}
        onClick={() => setEventKey('M')}
      >
        M
      </Key>

      <Key
        onClick={() => setEventKey('Enter')}
        style={{ gridColumn: '25 / span 8' }}
      >
        ENTER
      </Key>
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(32, 1fr);
  grid-gap: 0.25em;
  height: min(100em/2.15, 25vh);
  max-width: 90vh;
  width: 100%;
  margin: 2rem 0 0 0;

  flex-shrink: 0;
  padding: 0 0.5em 0.3em 0.5em;
`;
