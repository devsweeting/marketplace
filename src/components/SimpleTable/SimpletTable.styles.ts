import { makeStyles } from '@mui/styles';

export const useSimpleTableStyles = makeStyles(
  (theme) => ({
    wrapper: {
      [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(6),
      },
    },
    tableContainer: {
      boxShadow: 'none',
      padding: 0,
      width: '100%',
      '& 	.MuiTableCell-root': {
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        padding: 0,
        textDecoration: 'none',
        border: 0,
      },
    },
    // noBorder: {
    //   border: 0,
    // },
    boldText: {
      fontWeight: '700 !important',
      paddingRight: '20px !important',
    },
    blueText: {
      color: theme.palette.customBlue.main,
    },
  }),
  { name: 'simple-table' },
);
