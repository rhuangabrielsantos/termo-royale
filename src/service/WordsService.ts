import i18next from 'i18next';
import {
  otherValidWords,
  valibleWords,
} from '../data/ptBR/valibleWords';
import { valibleWords as valibleWordsEnUs } from '../data/enUS/valibleWords';
import { words as wordsPtBR } from '../data/ptBR/words';
import { words as wordsEnUs } from '../data/enUS/words';
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
    const isPortuguese = i18next.language === 'ptBR';

    if (isPortuguese) {
      const wordsLength = wordsPtBR.length;
      const randomIndex = Math.floor(Math.random() * wordsLength);

      return wordsPtBR[randomIndex];
    }

    const wordsLength = wordsEnUs.length;
    const randomIndex = Math.floor(Math.random() * wordsLength);

    return wordsEnUs[randomIndex];
  }

  public static wordIsReal(word: string): boolean {
    const isPortuguese = i18next.language === 'ptBR';

    if (isPortuguese) {
      const valibleWordsWithoutAccents = Object.keys(valibleWords);

      if (valibleWordsWithoutAccents.includes(word)) {
        return true;
      }

      if (otherValidWords.includes(word)) {
        return true;
      }

      return wordsPtBR.includes(word);
    }

    if (valibleWordsEnUs.includes(word)) {
      return true;
    }

    return wordsEnUs.includes(word);
  }

  public static wordWithAccent(letters: ILetter[]): ILetter[] {
    const isPortuguese = i18next.language === 'ptBR';

    if (!isPortuguese) {
      return letters;
    }

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
        text: letter.toUpperCase(),
        color: letters[index].color,
        flip: letters[index].flip,
      }));
    }

    if (wordsPtBR.includes(word)) {
      const wordAccent =
        Object.values(wordsPtBR)[wordsPtBR.indexOf(word)];
      const wordWithAccentLetters = wordAccent.split('');

      return wordWithAccentLetters.map((letter, index) => ({
        text: letter.toUpperCase(),
        color: letters[index].color,
        flip: letters[index].flip,
      }));
    }

    return letters;
  }
}
