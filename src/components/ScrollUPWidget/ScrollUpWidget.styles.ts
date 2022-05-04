import { makeStyles } from '@mui/styles';

export const useScrollUpWidget = makeStyles(
  (theme) => ({
    wrapper: {
      position: 'fixed',
      bottom: -211,
      left: 0,
      width: '100%',
      height: '211px',
      borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0 `,
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
    favoriteBox: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: 'Montserrat',
      fontSize: '16px',
      lineHeight: '20px',
      fontWeight: '700',
    },
    cryptoValue: {
      fontFamily: 'League Ghotic',
      fontSize: '20px',
      fontWeight: '400',
    },
    buttons: {
      width: '103px',
      height: '39px',
      justifyContent: 'center',
      fontFamily: 'Montserrat',
      fontSize: '16',
      fontWeight: '700',
    },
  }),
  { name: 'scroll-up-widget' },
);
