import { makeStyles } from '@mui/styles';

export const usePriceChartStyles = makeStyles(
  (theme) => ({
    wrapper: {
      [theme.breakpoints.down('md')]: {
        paddingTop: theme.spacing(6),
      },
    },
    chartContainer: {
      maxHeight: 400,
      boxShadow: 'none',
      borderRadius: 0,
    },

    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `0 ${theme.spacing(2)}`,
    },
    priceContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    soldPriceLabel: {
      color: theme.palette.primary.main,
      fontFamily: 'Montserrat',
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '17px',
    },
    soldPriceValue: {
      color: theme.palette.customBlue.main,
      fontFamily: 'Roboto',
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '28px',
      marginTop: theme.spacing(0.5),
    },
    dateRangeButton: {
      color: theme.palette.customGray.dark,
      paddingLeft: theme.spacing(2),
    },
    tabelWrapper: {
      borderLeft: '1px solid #efefef',
      borderBottom: '1px solid #efefef',
      width: '100%',
      height: 300,
    },
    active: {
      textDecoration: 'underline',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  }),
  { name: 'priceChart' },
);
