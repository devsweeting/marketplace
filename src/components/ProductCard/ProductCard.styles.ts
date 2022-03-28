import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useProductStyles = makeStyles(
  () => ({
    porductTitle: {
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '32px',
    },
    productWatchList: {
      color: theme.palette.customBlue.main,
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16.59px',
    },
    watchNumber: {
      color: theme.palette.primary.main,
    },
    price: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16.59px',
    },
    priceCryptoValue: {
      fontWeight: 600,
      fontSize: '24px',
      lineHeight: '28px',
    },
    priceDollarValue: {
      fontFamily: 'Rubik',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '17px',
    },
    cardActions: {
      padding: '0',
      marginTop: 21,
    },
    brandContainer: {
      textAlign: 'right',
    },
    brandName: {
      color: theme.palette.customBlue.main,
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '22px',
      letter: 0.1,
    },
  }),
  { name: 'productCard' },
);
