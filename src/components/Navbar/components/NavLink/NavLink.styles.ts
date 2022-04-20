import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useNavLinkStyles = makeStyles(
  (theme) => ({
    navLink: {
      cursor: 'pointer',
      '&:hover': {
        color: lighten(theme.palette.primary.main, 0.3),
      },
    },
    navLinkActive: {
      textDecoration: 'underline',
    },
  }),
  { name: 'navlink' },
);
