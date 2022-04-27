import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    customGray: Palette['primary'];
    customBlue: Palette['primary'];
    accent: Palette['primary'];
    accentSecondary: PaletteOptions['primary'];
    textColor: Palette['primary'];
  }
  interface PaletteOptions {
    customGray: PaletteOptions['primary'];
    customBlue: PaletteOptions['primary'];
    accent: PaletteOptions['primary'];
    accentSecondary: PaletteOptions['primary'];
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
      main: '#000',
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
      main: '#000',
    },
    accentSecondary: {
      main: '#fff',
    },
    textColor: {
      main: '#000',
      light: '#000',
      dark: '#000',
    },
  },
  typography: {
    h2: {
      fontFamily: 'League Gothic',
      fontWeight: 400,
      fontSize: '60px',
      letter: '-0.5px',
    },
    h3: {
      fontFamily: 'League Gothic',
      fontWeight: 400,
      fontSize: '24px',
    },
    // navlinks
    h4: {
      fontFamily: 'League Gothic',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '19px',
      letter: '5%',
      color: '#000',
      textTransform: 'uppercase',
      '@media (max-width:900px)': {
        fontSize: '18px',
      },
    },
    h5: {
      fontFamily: 'League Gothic',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '29px',
      letterSpacing: '0.05em',
    },
    body1: {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: '14px',
      letter: '0.17px',
    },
    body2: {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '175%',
      letterSpacing: '0.15px',
      textDecoration: 'underline',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          zIndex: 100,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.6)',
          fontfamily: 'League Gothic !important',
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

    // MuiInputBase: {
    //   styleOverrides: {
    //     root: {
    //       borderRadius: '4px !important',
    //       height: '56px',
    //       fontFamily: 'League Gothic !important',
    //       color: '#000 !important',
    //       fontSize: '18px !important',
    //       fontWeight: '400 !important',
    //       lineHeight: '22 !important',
    //       letterSpacing: '0.15px !important',
    //     },
    //   },
    // },
    MuiButton: {
      styleOverrides: {
        outlined: {
          height: 41,
          fontFamily: 'League Gothic',
          fontSize: 24,
          lieHeight: 29,
          fontWeight: 400,
          backgroundColor: 'transparent',
          boxSizing: 'border-box',
          color: '#000',
          padding: '0 8px',
          border: '2px solid rgba(0,0,0,0.5) !important',
        },
        outlinedSizeMedium: {
          width: 139.5,
          height: 41,
          fontWeight: 400,
          fontSize: 24,
          lieHeight: 29,
          justifyContent: 'space-between',
          padding: '0 16px',
        },
        contained: {
          fontFamily: 'League Gothic',
          backgroundColor: '#000',
          borderColor: '#000',
          color: '#fff',
          boxShadow:
            '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
          borderRadius: 4,
          transition: 'backgroundColor 0.3s ease, color 0.3s ease',
          padding: '6px 25px',
          height: 55,
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 39,
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: 'rgba(0,0,0,0.8)',
          },
        },
        containedSizeLarge: {
          width: 280,
        },
        containedSizeMedium: {
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '29.21px',
          width: 280,
          height: 41,
          padding: '6px 16px',
          display: 'flex',
          justifyContent: 'space-between',
        },
        containedSizeSmall: {
          width: 139.5,
          height: 41,
          fontWeight: 400,
          fontSize: '24px',
          lineHeight: '29.21px',
          letterSpacing: '0.15px',
          padding: '0 16px',
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
    },
  },
});

export default theme;
