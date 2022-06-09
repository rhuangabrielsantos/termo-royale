import { IPlayer } from './IPlayer';

export interface IGame {
  id?: string;
  adminId: string;
  players: IPlayer[];
  winner?: IPlayer;
  correctWord: string;
  status: string;
  createdAt: string;
  language: string;
}
