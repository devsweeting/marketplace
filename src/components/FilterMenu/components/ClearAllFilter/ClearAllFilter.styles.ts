import { makeStyles } from '@mui/styles';

export const useClearAllFilter = makeStyles(
  (theme) => ({
    container: {
      background: theme.palette.secondary.main,
      padding: theme.spacing(3),
      paddingLeft: 0,
      paddingRight: theme.spacing(2.5),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  }),
  { name: 'clearAllFilter' },
);
