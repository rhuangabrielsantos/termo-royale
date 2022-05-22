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

    return words[randomIndex];
  }

  public static wordIsReal(word: string): boolean {
    const valibleWordsWithoutAccents = Object.keys(valibleWords);

    if (valibleWordsWithoutAccents.includes(word)) {
      return true;
    }

    return words.includes(word);
  }

  public static wordWithAccent(letters: ILetter[]): ILetter[] {
    const word = letters
      .map((letter) => letter.text.toLowerCase())
      .join('');

    const valibleWordsWithoutAccents = Object.keys(valibleWords);

    if (valibleWordsWithoutAccents.includes(word)) {
      const wordAccent =
        Object.values(valibleWords)[
          valibleWordsWithoutAccents.indexOf(word)
        ];
      const wordWithAccentLetters = wordAccent.split('');

      return wordWithAccentLetters.map((letter, index) => ({
        text: letter,
        color: letters[index].color,
        flip: letters[index].flip,
      }));
    }

    if (words.includes(word)) {
      const wordAccent = Object.values(words)[words.indexOf(word)];
      const wordWithAccentLetters = wordAccent.split('');

      return wordWithAccentLetters.map((letter, index) => ({
        text: letter,
        color: letters[index].color,
        flip: letters[index].flip,
      }));
    }

    return letters;
  }
}
