import { makeStyles } from '@mui/styles';

export const useSignUpCallToActionStyles = makeStyles((theme) => ({
  CTAWrapper: {
    width: '100%',
    minWidth: '100%',
    height: '650px',
    backgroundColor: 'whitesmoke',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    marginBottom: '100px',
    [theme.breakpoints.down('sm')]: {
      height: '125vw',
    },
  },
  CTAHeader: {
    marginBottom: '15px',
    fontSize: '4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.8rem',
    },
  },
  CTASubHeader: {
    fontSize: '1.4rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2rem',
      width: '85%',
      lineBreak: 'anywhere',
    },
  },
  button: {
    color: 'white',
    backgroundColor: 'black',
    borderRadius: '50px',
    width: '175px',
    height: '55px',
    marginTop: '25px',
    fontSize: '1.3rem',
    border: '3px solid black',
  },
}));
