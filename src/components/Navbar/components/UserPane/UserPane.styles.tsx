import makeStyles from '@mui/styles/makeStyles';

export const useUserPaneStyles = makeStyles(
  (theme) => ({
    image: {
      height: '32px',
      width: '32px',
    },

    userPanelText: {
      color: theme.palette.primary.main,
    },
  }),
  { name: 'userPane' },
);
