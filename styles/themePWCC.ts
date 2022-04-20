import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customGray: Palette['primary'];
    customBlue: Palette['primary'];
    accent: Palette['primary'];
    textColor: Palette['primary'];
  }
  interface PaletteOptions {
    customGray: PaletteOptions['primary'];
    customBlue: PaletteOptions['primary'];
    accent: PaletteOptions['primary'];
    textColor: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
      light: 'rgba(0, 0, 0, 0.23)',
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
    accent: {
      main: 'rgba(255, 221, 0, 1)',
    },
    textColor: {
      main: '#000',
      light: '#000',
      dark: '#000',
    },
  },
  typography: {
    h2: {
      fontFamily: 'Montserrat',
      fontWeight: 800,
      fontSize: '48px',
      letter: '-0.5px',
    },
    h3: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '27px',
      letter: '0.15px',
    },
    // navlinks
    h4: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '28px',
      letterSpacing: '0.05em',
      color: '#fff',
      textTransform: 'uppercase',
    },
    h5: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '29px',
      letterSpacing: '0.05em',
    },
    body1: {
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '14px',
      letter: '0.17px',
    },
    body2: {
      fontFamily: 'Montserrat',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '21px',
      letterSpacing: '0.15px',
      textDecoration: 'underline',
      color: '#000',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)',
          fontfamily: 'Montserrat !important',
          fontSize: '18px',
          fontWeight: 400,
          lineHeight: '22px',
          letterspacing: 0,
          marginTop: 5,
          '& .MuiSelect-select': {
            color: '#fff',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(255, 255, 255, 0.23)',
          paddingLeft: '10px',
          borderRadius: '4px !important',
          height: '56px',
          fontFamily: 'Montserrat',
          color: '#000 !important',
          fontSize: 'calc(10px + 0.4vw) !important',
          fontWeight: '400 !important',
          lineHeight: '150 !important',
          letterSpacing: '0.15px !important',
          textTransform: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderRadius: '34px',
          height: 32,
          fontFamily: 'Montserrat',
          fontSize: 14,
          lieHeight: 17,
          fontWeight: 700,
          backgroundColor: 'transparent',
          boxSizing: 'border-box',
          color: '#000',
          padding: '0 13px',
          border: '2px solid rgba(0,0,0,0.5) !important',
        },
        contained: {
          borderRadius: '34px',
          fontFamily: 'Montserrat',
          backgroundColor: '#FFDD00',
          borderColor: '#FFDD00',
          color: '#000',
          boxShadow:
            '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
          transition: 'backgroundColor 0.3s ease, color 0.3s ease',
          padding: '6px 25px',
          height: 48,
          fontStyle: 'normal',
          fontWeight: 800,
          fontSize: 20,
          lineHeight: 24,
          '&:hover': {
            backgroundColor: 'rgba(255, 221, 0, 0.8)',
            borderColor: 'rgba(255, 221, 0, 0.8)',
          },
        },
      },
    },

    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       color: 'blue',
    //     },
    //   },
    // },
  },
});

export default theme;
