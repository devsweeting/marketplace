import makeStyles from '@mui/styles/makeStyles';
import { lighten } from '@mui/material';

export const useUserPaneStyles = makeStyles(
  (theme) => ({
    image: {
      height: '32px',
      width: '32px',
    },

    userPanelText: {
      color: theme.palette.primary.main,
      '&:hover': {
        color: lighten(theme.palette.primary.main, 0.3),
      },
    },
  }),
  { name: 'userPane' },
);
