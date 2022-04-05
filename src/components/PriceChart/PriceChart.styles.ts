import { makeStyles } from '@mui/styles';

export const usePriceChartStyles = makeStyles(
  (theme) => ({
    chartContainer: {
      padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
      maxHeight: 400,
    },
    labelsContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `0 ${theme.spacing(2)}`,
    },
    soldPriceLabel: {
      color: theme.palette.customGray.dark,
      fontFamily: 'Roboto',
      fontWeight: 500,
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
    },
    active: {
      textDecoration: 'underline',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  }),
  { name: 'priceChart' },
);
