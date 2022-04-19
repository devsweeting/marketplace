import { makeStyles } from '@mui/styles';

export const useClearAllFilter = makeStyles(
  (theme) => ({
    container: {
      height: '88px',
      paddingLeft: 0,
      paddingRight: theme.spacing(2.5),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }),
  { name: 'clearAllFilter' },
);
