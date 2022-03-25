import { createTheme } from '@mui/material/styles';
declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customGray: Palette['primary'];
  }
  interface PaletteOptions {
    customGray: PaletteOptions['primary'];
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
    customGray: {
      main: '#ededed',
    },
  },
});

export default theme;
