import { makeStyles } from '@mui/styles';

export const useFAQStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    [theme.breakpoints.down('sm')]: {
      minHeight: '50vh',
    },
  },
  container: { width: '90%', display: 'flex', flexDirection: 'column', margin: '40px auto' },
  header: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
      marginBottom: '20px',
    },
  },
}));
