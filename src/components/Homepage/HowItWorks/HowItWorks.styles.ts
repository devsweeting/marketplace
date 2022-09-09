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
    hero: {},
  }),
  { name: 'howItWorks' },
);
