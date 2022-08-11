import { lighten } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

export const useNavLinkStyles = makeStyles(
  (theme) => ({
    navLink: {
      color: theme.palette.primary.main,
      cursor: 'pointer',
      marginRight: theme.spacing(2),
      '@media (max-width:900px)': {
        // color: theme.palette.accent.main,
        marginLeft: theme.spacing(1),
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
