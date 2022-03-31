import { createTheme } from '@mui/material/styles';

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
      dark: '#3072ce',
    },
    customGray: {
      main: '#ededed',
      light: '#e5e5e5',
      dark: '#8f9094',
    },
  },
});

export default theme;
