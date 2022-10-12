import { createTheme } from '@mui/material/styles';
import type { CSSProperties } from 'react';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    accent: Palette['primary'];
  }

  interface PaletteOptions {
    accent: PaletteOptions['primary'];
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    lg: CSSProperties;
    xl: CSSProperties;
    xl2: CSSProperties;
    xl3: CSSProperties;
    xl4: CSSProperties;
    xl5: CSSProperties;
    xl6: CSSProperties;
    xl7: CSSProperties;
    xl8: CSSProperties;
    xl9: CSSProperties;
    nav: CSSProperties;
  }

  interface TypographyVariantsOptions {
    lg?: CSSProperties;
    xl?: CSSProperties;
    xl2?: CSSProperties;
    xl3?: CSSProperties;
    xl4?: CSSProperties;
    xl5?: CSSProperties;
    xl6?: CSSProperties;
    xl7?: CSSProperties;
    xl8?: CSSProperties;
    xl9?: CSSProperties;
    nav?: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    lg: true;
    xl: true;
    xl2: true;
    xl3: true;
    xl4: true;
    xl5: true;
    xl6: true;
    xl7: true;
    xl8: true;
    xl9: true;
    nav: true;
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#111827',
    },
    secondary: {
      main: '#fff',
    },
    accent: {
      main: '#ffdf00',
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    divider: '#4B5563',
  },
  shape: {
    borderRadius: 8,
  },
});

/* Typography Theme Styles
typography is mapped to values in the figmas to make implementations a bit simpler and consitent
  - xl9 -> text-9xl
  - xl8 -> text-8xl
  - xl7 -> text-7xl
  ...

  body1 -> base
  body2 -> sm
  caption -> xs
  */

export const themeJump = createTheme(theme, {
  typography: {
    fontFamily: 'Inter',
    lg: {
      fontSize: 'clamp(1rem, 0.42735042735042733vw + 0.8397435897435898rem, 1.25rem)',
      lineHeight: '1.75rem',
    },
    xl: {
      fontSize: 'clamp(1.125rem, 0.42735042735042733vw + 0.9647435897435898rem, 1.375rem)',
      lineHeight: '1.75rem',
    },
    xl2: {
      fontSize: 'clamp(1.125rem, 0.42735042735042733vw + 0.9647435897435898rem, 1.375rem)',
      lineHeight: '2rem',
    },
    xl3: {
      fontSize: 'clamp(1.375rem, 0.42735042735042733vw + 1.2147435897435896rem, 1.625rem)',
      lineHeight: '2.25rem',
    },
    xl4: {
      fontSize: 'clamp(1.625rem, 0.8547008547008547vw + 1.3044871794871795rem, 2.125rem)',
      lineHeight: '2.5rem',
    },
    xl5: {
      fontSize: 'clamp(2rem, 0.8547008547008547vw + 1.6794871794871795rem, 2.5rem)',
      lineHeight: '3rem',
    },
    xl6: {
      fontSize: 'clamp(2.75rem, 0.8547008547008547vw + 2.4294871794871793rem, 3.25rem)',
      lineHeight: '3.75rem',
    },
    xl7: {
      fontSize: 'clamp(3.375rem, 1.2820512820512822vw + 2.894230769230769rem, 4.125rem)',
      lineHeight: '4.5rem',
    },
    xl8: {
      fontSize: 'clamp(3.875rem, 1.7094017094017093vw + 3.233974358974359rem, 4.875rem)',
      lineHeight: '6rem',
    },
    xl9: {
      fontSize: 'clamp(5.5rem, 1.7094017094017093vw + 4.858974358974359rem, 6.5rem)',
      lineHeight: '8rem',
    },
    body1: {
      fontFamily: 'Inter',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '1rem',
        lineHeight: '1.5rem',
      },
      fontWeight: 400,
    },
    body2: {
      fontFamily: 'Inter',
      fontSize: '0.75rem',
      lineHeight: '1.125rem',
      fontWeight: 400,
      [theme.breakpoints.up('sm')]: {
        fontSize: '.875rem',
        lineHeight: '1.25rem',
      },
    },
    caption: {
      fontSize: '0.6rem',
      lineHeight: '0.875rem',
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
      },
    },
    button: {
      fontFamily: 'Inter',
    },
    nav: {
      fontFamily: 'Inter',
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '1.5rem',
      color: theme.palette.primary.main,
      textTransform: 'uppercase',
      '@media (max-width:900px)': {
        fontSize: '18px',
      },
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
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&::before': {
            display: 'none',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: 'Inter',
          fontWeight: 600,
          boxSizing: 'border-box',
          padding: '0.75rem 1rem',
          boxShadow: 'none',
          '&.MuiButton-containedPrimary': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: theme.palette.grey[700],
            },
          },
          '&.MuiButton-containedSecondary': {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.grey[200],
            },
          },
          '&.MuiButton-outlinedPrimary': {
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: 'transparent',
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          },
          '&.MuiButton-outlinedSecondary': {
            border: `2px solid ${theme.palette.secondary.main}`,
            backgroundColor: 'transparent',
            color: theme.palette.secondary.main,
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.primary.main,
            },
          },
          '&.MuiButton-text': {
            display: 'flex',
            fontSize: '1rem',
            textTransform: 'none',
            backgroundColor: 'transparent',
            // color: theme.palette.primary.main,
            padding: 0,
            '&.MuiButton-textSecondary': {
              '&:hover': {
                color: theme.palette.accent.main,
              },
            },
            // '&:hover': {
            //   // backgroundColor: 'inherit',
            //   // color: theme.palette.accent.main,
            // },
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.grey[200],
            color: theme.palette.grey[600],
          },
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          '&.MuiLinearProgress-determinate': {
            backgroundColor: theme.palette.grey[200],
          },
          '& > .MuiLinearProgress-bar1Determinate': {
            borderRadius: '100vw',
          },
        },
      },
    },
  },
});
