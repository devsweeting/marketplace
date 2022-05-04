import { makeStyles } from '@mui/styles';
import { darken } from '@mui/material';

export const useProductStyles = makeStyles(
  (theme) => ({
    productContainer: {
      maxWidth: 493,
      margin: '72px auto 0',
      boxShadow: 'none',
      background: 'none',
      // paddingBottom: theme.spacing(0.7),
      paddingBottom: '50px',
      [theme.breakpoints.down('md')]: {
        maxWidth: 'none',
        marginTop: theme.spacing(4.5),
      },
    },
    shareWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
    },
    flexWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      // [theme.breakpoints.down('md')]: {
      //   flexDirection: 'column',
      // },
    },
    centerOnMobile: {
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
      },
    },
    label: {
      width: '145px',
      height: '32px',
      background: theme.palette.accent.main,
      borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} ${theme.spacing(0)}  ${theme.spacing(
        0,
      )}`,
      textAlign: 'center',
    },
    labelText: {
      fontSize: '16px',
      lineHeight: '32px',
      textDecoration: 'none',
      [theme.breakpoints.down('md')]: {
        fontSize: '16px',
        fontWeight: 400,
        lineHeigt: '28px',
      },
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
    porductTitle: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(6),
      color: theme.palette.secondary.main,
      [theme.breakpoints.down('md')]: {
        fontSize: '24px',
        fontWeight: 700,
      },
    },
    priceWrapper: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      borderRadius: `${theme.spacing(0)} ${theme.spacing(1)} ${theme.spacing(1)}  ${theme.spacing(
        1,
      )}`,
    },
    priceContainer: {
      padding: theme.spacing(2),
      background: theme.palette.secondary.main,
      borderRadius: theme.spacing(1),
    },
    cryptoValueWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    priceCryptoValue: {
      paddingLeft: theme.spacing(2),
    },
    priceDollarValue: {
      fontSize: '16px',
      textDecoration: 'none',
    },
    cardActions: {
      padding: '8px 0',
    },
    button: {
      width: 214.5,
      height: 55,
      fontSize: 16,
      justifyContent: 'center',
      marginTop: theme.spacing(2.5),
    },
    watchListWrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginTop: theme.spacing(5),
    },
    productWatchList: {
      color: theme.palette.secondary.main,
      paddingRight: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      textDecoration: 'none',
      fontSize: '12px',
      fontWeight: 700,
      letter: '5%',
    },
    watchNumber: {
      fontFamily: 'Rubik',
      color: darken(theme.palette.secondary.main, 0.3),
    },

    brandName: {
      textDecoration: 'none',
      color: theme.palette.secondary.main,
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: 12,
      textTransform: 'uppercase',
    },
  }),
  { name: 'productCard' },
);
