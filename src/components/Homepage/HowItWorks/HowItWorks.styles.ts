import { makeStyles } from '@mui/styles';

export const useHowItWorks = makeStyles(
  (theme) => ({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
    },
    howItWorksHeader: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '160px',
      marginBottom: '80px',
      [theme.breakpoints.down('sm')]: {
        marginTop: '80px',
        marginBottom: '20px',
      },
    },
    text: {
      fontSize: '2rem',
      margin: '20px',
      width: '70%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        width: '90%',
      },
    },
    heroWrapper: {
      width: '50%',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.2rem',
        width: '100%',
      },
    },
    heroBoxContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
    },
    heroBox: {
      margin: '0 100px',
      [theme.breakpoints.down('sm')]: {
        margin: '0 20px',
        padding: '30px 0',
      },
    },
    heroTitle: {
      fontSize: '3rem',
      margin: '0 0 25px 0',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        align: 'center',
        margin: 0,
        justifyContent: 'center',
        padding: '30px 0',
      },
    },
    imageWrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '15%',
      width: '50vw',
      height: '50vw',
      [theme.breakpoints.down('sm')]: {
        width: '100vw',
        height: '100vw',
      },
    },
    nextImageHolder: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    button: {
      borderRadius: '50px',
      width: '200px',
      height: '55px',
      marginTop: '25px',
      fontSize: '1.3rem',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        margin: '25px auto 5px auto',
      },
    },
    right: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  { name: 'howItWorks' },
);
