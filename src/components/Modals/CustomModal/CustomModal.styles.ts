import { makeStyles } from '@mui/styles';

export const useCustomModalStyles = makeStyles(() => ({
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
    color: '#666',
  },
  modal: {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    right: '50%',
    bottom: '50%',

    width: 600,
    height: 180,
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow:
      '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    p: 4,
    outline: 'none !important',

    '@media (max-width:900px)': {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 500,
      width: '100%',
      height: 220,
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
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  right: '50%',
  bottom: '50%',

  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 180,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow:
    '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  p: 2,
  outline: 'none !important',
  '@media (max-width:900px)': {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500,
    width: '100%',
    height: 220,
  },
};

export const title = {
  color: 'black',
};
