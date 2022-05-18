export const theme = {
  colors: {
    background: '#6e5c62',
    text: '#FAFAFF',
    letter: {
      correctPlace: '#46A394',
      incorrectPlace: '#D3AD69',
      nonExisting: '#312A2C',
    },
    keyboard: {
      available: '#4C4347',
      unavailable: '#594B4F',
    },
  },
  fontFamily: 'Mitr',
};

export type ThemeType = typeof theme;
