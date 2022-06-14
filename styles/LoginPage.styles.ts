import { makeStyles } from '@mui/styles';

export const useLoginPageStyles = makeStyles(() => ({
  loginSuccessBox: {
    maxWidth: '500px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow:
      'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px, 0 3px 10px rgb(0 0 0 / 0.2)',
    display: 'flex',
    flexFlow: 'column',
    height: '25%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    border: '1px solid rgb(0 0 0 / 0.1)',
  },
  loginSuccessText: {
    color: '#4caf50',
    fontSize: '2rem',
    marginTop: '1rem',
    textShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
  },
  loginFailText: {
    color: '#f44336',
  },
  loginFailSubtext: {
    fontSize: '1.5rem',
    textAlign: 'center',
    width: '80%',
  },
  loginSuccessButton: {
    width: '50%',
    height: '20%',
  },
}));
