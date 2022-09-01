import { makeStyles } from '@mui/styles';

export const useClearAllFilter = makeStyles(
  (theme) => ({
    container: {
      width: '180px',
      paddingLeft: 0,
      paddingRight: theme.spacing(2.5),
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      [theme.breakpoints.down('sm')]: {
        width: '140px',
        paddingRight: '0px',
        justifyContent: 'center',
        marginRight: '5px',
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
