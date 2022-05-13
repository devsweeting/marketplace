import { makeStyles } from '@mui/styles';

export const useDescriptionTextStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(6),
    },
  },
  title: {
    marginBottom: theme.spacing(2),
    color: '#000',
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(3),
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '16px',
    },
  },
}));
