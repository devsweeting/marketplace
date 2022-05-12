import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useNavLinkStyles = makeStyles(
  (theme) => ({
    navLink: {
      cursor: 'pointer',
      marginLeft: theme.spacing(4),
      '@media (max-width:900px)': {
        color: theme.palette.accent.main,
        marginLeft: theme.spacing(3),
      },
      '&:hover': {
        color: lighten(theme.palette.primary.main, 0.3),
      },
      '&:a': {
        textDecoration: 'none',
      },
    },
    navLinkActive: {
      textDecoration: 'underline',
    },
  }),
  { name: 'navlink' },
);
