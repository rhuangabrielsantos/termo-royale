import { words } from '../data/words';
import { ILetter } from '../interfaces';

export class WordsService {
  public static makeInitialWordsState(): ILetter[][] {
    return [
      [
        { text: '', color: 'transparent' },
        { text: '', color: 'transparent' },
        { text: '', color: 'transparent' },
        { text: '', color: 'transparent' },
        { text: '', color: 'transparent' },
      ],
      [
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
      ],
      [
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
      ],
      [
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
      ],
      [
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
      ],
      [
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
        { text: '', color: 'unvailable' },
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
    return words.includes(word);
  }
}
