import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useNavLinkStyles = makeStyles(
  (theme) => ({
    navLink: {
      fontFamily: 'League Gothic',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '29px',
      letterSpacing: '0.05em',
      textDecoration: 'underline',
      '&:hover': {
        color: lighten(theme.palette.primary.light, 0.3),
      },
    },
    navLinkActive: {
      fontFamily: 'League Gothic',
      fontWeight: 400,
      fontSize: '24px',
      lineHeight: '29px',
      letterSpacing: '0.05em',
      color: lighten(theme.palette.secondary.main, 0.3),
    },
  }),
  { name: 'navlink' },
);
