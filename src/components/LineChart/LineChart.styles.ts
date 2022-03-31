import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useLineChartStyles = makeStyles(
  () => ({
    chartContainer: {
      padding: `${theme.spacing(2)} ${theme.spacing(5)}`,
    },
    soldPriceLabel: {
      color: theme.palette.customGray.dark,
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17px',
    },
    soldPriceValue: {
      color: theme.palette.customBlue.dark,
      fontFamily: 'Roboto',
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '28px',
      marginTop: theme.spacing(0.5),
    },
    dateRangeButton: {
      color: theme.palette.customGray.dark,
    },
  }),
  { name: 'lineChart' },
);
