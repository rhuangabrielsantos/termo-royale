import { ILetter } from './ILetter';

export interface IPlayer {
  id: string;
  name: string;
  photoURL: string;
  letters: ILetter[][];
}
