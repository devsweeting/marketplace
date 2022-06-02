import { makeStyles } from '@mui/styles';

export const useProductStyles = makeStyles(
  (theme) => ({
    productContainer: {
      position: 'sticky',
      top: '200px',
      maxWidth: 493,
      margin: '72px auto 0',
      boxShadow: 'none',
      background: 'none',
      paddingBottom: '50px',
      [theme.breakpoints.down('md')]: {
        maxWidth: 'none',
        marginTop: theme.spacing(4.5),
      },
    },
    shareWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItems: 'center',
      width: '100%',
    },
    shareText: {
      fontSize: '16px',
      textDecoration: 'underline',
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('md')]: {
        marginTop: theme.spacing(1),
        fontSize: '14px',
      },
    },
    shareButton: {
      color: theme.palette.secondary.main,
      textTransform: 'uppercase',
      fontSize: '12px',
      fontWeight: 700,
    },
    productTitle: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(10),
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('md')]: {
        fontSize: '24px',
        fontWeight: 700,
      },
    },
    cryptoValueWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    priceDollarValue: {
      fontSize: '16px',
      textDecoration: 'none',
    },
    cardActions: {
      padding: '0',
    },
    button: {
      width: '100%',
      height: 55,
      fontSize: 16,
      justifyContent: 'center',
      marginTop: 0,
    },
  }),
  { name: 'productCard' },
);
