import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LocalStorage } from '../utils/LocalStorage';

import enUS from './enUS';
import ptBR from './ptBR';

export const resources = {
  enUS: enUS,
  ptBR: ptBR,
} as const;

i18n.use(initReactI18next).init({
  lng: LocalStorage.getLanguage() ?? 'ptBR',
  ns: ['home', 'game', 'lobby', 'result'],
  interpolation: {
    escapeValue: false,
  },
  resources,
});
