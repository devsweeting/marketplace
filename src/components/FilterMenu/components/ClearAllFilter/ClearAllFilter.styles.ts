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
      ['@media (max-width:900px)']: {
        paddingRight: 0,
      },
    },
    closeButton: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    arrowIcon: {
      cursor: 'pointer',
      paddingRight: theme.spacing(1),
      fontSize: '46px',
      ['@media (min-width:900px)']: {
        display: 'none',
      },
    },
  }),
  { name: 'clearAllFilter' },
);
