import { makeStyles } from '@mui/styles';

export const useFooterStyles = makeStyles(
  (theme) => ({
    container: {
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      backgroundColor: theme.palette.primary.main,
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      padding: '60px 20px 0 20px',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
    },
    socialsAndResources: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '97%',
      flexWrap: 'wrap',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'center',
      },
    },
    socials: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      height: '100%',
      marginBottom: 70,
      [theme.breakpoints.down('sm')]: {
        alignItems: 'center',
        width: '100%',
      },
    },
    resources: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '70%',
      [theme.breakpoints.down('sm')]: {
        justifyContent: 'space-between',
        width: '100%',
      },
    },
    resourceText: {
      color: 'white',
      fontSize: 16,
      margin: '10px 0',
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        margin: '15px 0',
      },
    },
    logo: {
      position: 'relative',
      width: '113px',
      height: '56px',
      marginBottom: '10px',
      [theme.breakpoints.down('sm')]: {
        width: '150px',
        height: '69px',
      },
    },
    footer: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '97%',
      [theme.breakpoints.down('sm')]: {
        flexWrap: 'wrap-reverse',
        justifyContent: 'center',
      },
    },
    termsAndPolicy: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '20%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    text: {
      fontFamily: 'Rubik',
      color: 'white',
      fontWeight: 300,
      fontSize: '16px',
      lineHeight: '17px',
      opacity: '0.8',
      margin: '24px 0px',
    },
  }),
  { name: 'footer' },
);
