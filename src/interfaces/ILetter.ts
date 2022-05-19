export type ColorOptions =
  | 'transparent'
  | 'correctPlace'
  | 'incorrectPlace'
  | 'nonExisting'
  | 'unvailable';

export interface ILetter {
  text: string;
  color: ColorOptions;
}
