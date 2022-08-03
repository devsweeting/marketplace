import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useBuyModalStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '10px 0',
    height: '43px',
    width: '80%',
    '@media (max-width:900px)': {
      width: '100%',
    },
  },
  button: {
    marginTop: '10px',
    height: '43px',
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '0 !important',

    '@media (max-width:900px)': {
      marginTop: '5px',
      marginLeft: '0',
      width: '100%',
    },
  },
  message: {
    display: 'block',
    fontSize: '14px',
    color: '#f44336',
    minHeight: '25px',
  },
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',
    margin: 'auto',
    width: 600,
    minHeight: 250,
    borderRadius: 4,
    boxShadow: `0px 2px 4px -1px ${lighten(
      theme.palette.primary.main,
      0.2,
    )}, 0px 4px 5px 0px ${lighten(theme.palette.primary.main, 0.14)}, 0px 1px 10px 0px ${lighten(
      theme.palette.primary.main,
      0.12,
    )}`,
    p: 4,
    outline: 'none !important',

    '@media (max-width:900px)': {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 500,
      width: '100%',
      minHeight: 360,
    },
  },
  content: {
    marginTop: '10px',
  },
  center: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    msTransform: 'translate(-50%, -50% )',
    width: '90%',
  },
  flex: {
    display: 'flex',
    '@media (max-width:900px)': {
      display: 'block',
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
    justifyContent: 'flex-start',
    '@media (max-width:900px)': {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  container: {
    margin: '20px',
    '@media (max-width:900px)': {
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
  marginTop: '32px',
};
