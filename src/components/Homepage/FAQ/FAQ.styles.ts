import { makeStyles } from '@mui/styles';

export const useFAQStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '30px 0',
    minHeight: '60vh',
    [theme.breakpoints.down('sm')]: {
      minHeight: '50vh',
    },
  },
  container: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    margin: '40px auto',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
    },
  },
  header: {
    marginBottom: '40px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
      marginBottom: '20px',
    },
  },
}));
