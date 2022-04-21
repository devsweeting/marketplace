import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useNavLinkStyles = makeStyles(
  (theme) => ({
    navLink: {
      fontFamily: 'Rubik',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '21px',
      color: theme.palette.primary.light,
      marginRight: '9px',
      marginLeft: 0,
      '&:hover': {
        color: lighten(theme.palette.primary.light, 0.3),
      },
    },
    navLinkActive: {
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '18px',
      lineHeight: '21px',
      color: lighten(theme.palette.secondary.main, 0.3),
    },
  }),
  { name: 'navlink' },
);
