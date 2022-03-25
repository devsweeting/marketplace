import { darken, lighten } from '@mui/material';
import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useButtonStyles = makeStyles(
  () => ({
    outlined: {
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      color: theme.palette.primary.main,
      border: `1px solid ${theme.palette.primary.main}`,
      '&:hover': {
        backgroundColor: theme.palette.secondary.main,
      },
    },
    contained: {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      transition: 'backgroundColor 0.3s ease, color 0.3s ease',
      '&:hover': {
        backgroundColor: darken(theme.palette.primary.main, 0.2),
        borderColor: darken(theme.palette.primary.main, 0.2),
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
