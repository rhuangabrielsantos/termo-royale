import { valibleWords } from '../data/valibleWords';
import { words } from '../data/words';
import { ILetter } from '../interfaces';

export class WordsService {
  public static makeInitialWordsState(): ILetter[][] {
    return [
      [
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
        { text: '', color: 'transparent', flip: false },
      ],
      [
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
      ],
      [
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
      ],
      [
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
      ],
      [
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
      ],
      [
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
        { text: '', color: 'unvailable', flip: false },
      ],
    ];
  }

  public static getRandomWord(): string {
    const wordsLength = words.length;
    const randomIndex = Math.floor(Math.random() * wordsLength);

    console.log(words[randomIndex]);

    return words[randomIndex];
  }

  public static wordIsReal(word: string): boolean {
    const valibleWordsWithoutAccents = Object.keys(valibleWords);

    if (valibleWordsWithoutAccents.includes(word)) {
      return true;
    }

    return words.includes(word);
  }
}
