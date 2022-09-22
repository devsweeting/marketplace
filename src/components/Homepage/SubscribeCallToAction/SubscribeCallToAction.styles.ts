import { makeStyles } from '@mui/styles';

export const useTextfieldStyles = makeStyles(
  (theme) => ({
    root: {
      '& .MuiFormLabel-root.Mui-error': {
        color: '#b04995',
      },
      '& input': {
        color: 'black',
        fontSize: 20,
        fontWeight: 600,
        marginLeft: 20,
        [theme.breakpoints.down('sm')]: {
          fontSize: 18,
        },
      },
      '& .MuiFormLabel-filled + .MuiInputBase-root input': {
        padding: '35px 12px 14px',
        [theme.breakpoints.down('sm')]: {
          padding: '15px 6px 7px',
        },
      },
      '& .Mui-focused input': {
        padding: '35px 12px 14px',
        [theme.breakpoints.down('sm')]: {
          padding: '15px 6px 7px',
        },
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: '#b04995',
        fontFamily: 'Muli',
        fontSize: 12,
      },
    },
  }),
  { name: 'textfield' },
);

export const useSubscribeCTAStyles = makeStyles(
  (theme) => ({
    ctaWrapper: {
      width: '100%',
      minWidth: '100%',
      height: '300px',
      backgroundColor: 'whitesmoke',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      [theme.breakpoints.down('sm')]: {
        height: '90vw',
        padding: '0 10px',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      },
    },
    textfieldInput: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRadius: '50px',
      width: '375px',
      height: '75px',
      marginLeft: '30px',
      fontSize: '1.5rem',
      border: '2px solid grey',
      backgroundColor: 'white',
      [theme.breakpoints.down('sm')]: {
        margin: '10px 0px',
        width: '95%',
      },
    },
    submitForm: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        margin: '15px auto 20% auto',
        width: '100%',
        flexDirection: 'column',
      },
    },
    ctaHeader: {
      marginBottom: '15px',
      fontSize: '3rem',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignText: 'center',
        margin: '20% auto 0 auto',
        width: '100%',
        fontSize: '2.3rem',
      },
    },
    button: {
      color: 'white',
      backgroundColor: 'black',
      borderRadius: '50px',
      width: '175px',
      height: '75px',
      marginLeft: '30px',
      fontSize: '1.3rem',
      border: '3px solid black',
      [theme.breakpoints.down('sm')]: {
        margin: '10px auto',
      },
    },
  }),
  { name: 'subscribe' },
);
