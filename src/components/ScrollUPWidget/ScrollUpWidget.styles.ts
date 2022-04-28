import { makeStyles } from '@mui/styles';

export const useScrollUpWidget = makeStyles(
  (theme) => ({
    wrapper: {
      position: 'fixed',
      bottom: -200,
      left: 0,
      width: '100vw',
      height: '211px',
      borderRadius: theme.spacing(1),
      boxShadow:
        '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
      background: theme.palette.secondary.main,
      transition: '1s',
      zIndex: 10,
      padding: ` ${theme.spacing(3)}  ${theme.spacing(5)}`,
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    visible: {
      bottom: 0,
    },
    itemType: {
      fontFamily: 'Montserrat',
      fontSize: '12px',
      lineHeight: '21px',
      fontWeight: '600',
    },
    itemTitle: {
      fontFamily: 'Montserrat',
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: '700',
    },

    priceContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: theme.spacing(1),
    },

    priceDollarValue: {
      fontFamily: 'Rubik',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '14px',
      letterSpacing: '1px',
      color: 'rgba(0, 0, 0, 0.87)',
    },
  }),
  { name: 'scroll-up-widget' },
);
