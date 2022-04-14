import { darken, lighten } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useButtonStyles = makeStyles(
  (theme) => ({
    outlined: {
      height: 41,
      fontFamily: 'League Gothic',
      fontSize: 24,
      lieHeight: 29,
      fontWeight: 400,
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      color: theme.palette.primary.main,
      padding: `${theme.spacing(0)}  ${theme.spacing(2)}`,
      border: `2px solid ${lighten(theme.palette.primary.main, 0.5)}`,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    contained: {
      fontFamily: 'League Gothic',
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
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
        backgroundColor: lighten(theme.palette.primary.main, 0.2),
        borderColor: lighten(theme.palette.primary.main, 0.2),
      },
    },
    grayed: {
      backgroundColor: theme.palette.grey[200],
      borderColor: theme.palette.grey[200],
      color: theme.palette.grey[700],
      '&:disabled': {
        backgroundColor: lighten(theme.palette.grey[200], 0.8),
        borderColor: lighten(theme.palette.grey[200], 0.8),
      },
      '&:hover': {
        backgroundColor: darken(theme.palette.grey[200], 0.2),
      },
    },
    link: {
      height: 20,
      fontSize: 10,
      color: theme.palette.primary.main,
      padding: 0,
      minWidth: 'auto',
      border: 'none',
    },
    flat: {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      color: theme.palette.primary.main,
      padding: '9px 10px',

      '&:hover': {
        backgroundColor: darken(theme.palette.secondary.main, 0.2),
      },
    },
    text: {
      whiteSpace: 'normal',
      wordBreak: 'break-all',
      height: 'auto',
    },
  }),
  { name: 'button' },
);
