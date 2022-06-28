import { lighten } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useCustomModalStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '15px 15px 15px 0',
    height: '43px',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  button: {
    marginTop: '15px',
    height: '43px',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '0 !important',

    [theme.breakpoints.down('md')]: {
      marginTop: '5px',
      marginLeft: '0',
      width: '100%',
    },
  },
  message: {
    display: 'block',
    height: 12,
    fontSize: '14px',
    color: '#666',
  },
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 180,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: `0px 2px 4px -1px ${lighten(
      theme.palette.primary.main,
      0.2,
    )}, 0px 4px 5px 0px ${lighten(theme.palette.primary.main, 0.2)}, 0px 1px 10px 0px ${lighten(
      theme.palette.primary.main,
      0.2,
    )}`,
    p: 4,
    outline: 'none !important',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 500,
      width: '100%',
      height: 245,
    },
  },
  srOnly: {
    position: 'absolute',
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
  },
  formBox: {
    display: 'flex',
    marginBottom: '5px',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  container: {
    margin: '20px',
    [theme.breakpoints.down('md')]: {
      margin: '10px',
    },
  },
}));

export const modal = {
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  p: 4,
};

export const title = {
  color: 'black',
};
