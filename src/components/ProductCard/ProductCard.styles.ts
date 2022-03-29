import { makeStyles } from '@mui/styles';
import theme from '../../../styles/theme';

export const useProductStyles = makeStyles(
  () => ({
    productContainer: {
      boxShadow: 'none',
    },
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
      marginBottom: theme.spacing(1.6),
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    brandName: {
      color: theme.palette.customBlue.main,
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '22px',
      letter: 0.1,
    },
    brandVerification: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '120px',
      paddingTop: theme.spacing(1.5),
    },
  }),
  { name: 'productCard' },
);
