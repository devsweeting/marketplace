import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useNavLinkStyles = makeStyles(
  (theme) => ({
    navLink: {
      cursor: 'pointer',
      marginRight: '36px',
      '@media (max-width:900px)': {
        color: theme.palette.accent.main,
        marginRight: '24px',
      },
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
