import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customGray: Palette['primary'];
    customBlue: Palette['primary'];
  }
  interface PaletteOptions {
    customGray: PaletteOptions['primary'];
    customBlue: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      light: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
      main: '#fff',
    },
    customBlue: {
      main: '#3070CE',
    },
    customGray: {
      main: '#ededed',
      light: '#e5e5e5',
      dark: '#8f9094',
    },
  },
  typography: {
    h3: {
      fontFamily: 'League Gothic',
      fontWeight: 400,
      fontSize: '34px',
      letter: '0.25px',
    },
  },
});

export default theme;
