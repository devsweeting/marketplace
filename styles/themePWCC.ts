import { createTheme } from '@mui/material/styles';
import type {} from '@mui/lab/themeAugmentation';

export const themePWCC = createTheme({
  palette: {
    primary: {
      main: '#000',
      light: 'rgba(0, 0, 0, 0.23)',
    },
    secondary: {
      main: '#fff',
    },
    accent: {
      main: '#ffdf00',
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
      '@media (max-width:900px)': {
        fontSize: '18px',
        fontWeight: 400,
        fontFamily: 'League Gothic',
      },
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
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: '#8f9094 #e5e5e5',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            backgroundColor: '#e5e5e5',
            borderRadius: 8,
            width: '10px',
            height: '10px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#8f9094',
            minHeight: 8,
            // border: '3px solid #2b2b2b',
          },
          '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#959595',
          },
          '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
            backgroundColor: '#2b2b2b',
          },
        },
      },
    },
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
        },
        outlinedSizeSmall: {
          border: '2px solid rgba(0,0,0,0.5)',
        },
        outlinedSizeMedium: {
          width: 139.5,
          height: 45,
          borderRadius: '34px',
          fontFamily: 'Montserrat',
          fontSize: 14,
          lieHeight: 17,
          fontWeight: 700,
          backgroundColor: 'transparent',
          boxSizing: 'border-box',
          color: '#000',
          padding: '0 13px',
          border: '2px solid #FFDD00',
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
          '&:hover': {
            backgroundColor: 'rgba(255, 221, 0, 0.8)',
            borderColor: 'rgba(255, 221, 0, 0.8)',
          },
        },
        containedSizeLarge: {
          width: 280,
        },
        containedSizeMedium: {
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '22px',
          borderRadius: '4px',
          width: 280,
          height: 34,
          padding: '6px 16px',
          justifyContent: 'space-between',
        },
        containedSizeSmall: {
          width: 139.5,
          height: 45,
          fontWeight: 700,
          fontSize: 14,
          lineHeight: '150%',
          letterSpacing: '0.15px',
          borderRadius: '44px',
          display: 'flex',
          justifyContent: 'space-between',
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
        },
        selectLabel: {
          fontFamily: 'Rubik',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '14px',
          letterSpacing: '0.4px',
          textDecoration: 'none',
          color: 'rgba(0,0,0,0.6)',
        },
        displayedRows: {
          fontFamily: 'Rubik',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '14px',
          letterSpacing: '0.4px',
          textDecoration: 'none',
          color: 'rgba(0,0,0,0.87)',
        },
        selectRoot: {
          fontSize: '12px',
        },
      },
    },
  },
});
