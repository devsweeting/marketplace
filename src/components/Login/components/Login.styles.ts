import { makeStyles } from '@mui/styles';
import { error } from 'console';
import { format } from 'path';

export const useLoginStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '10px 0',
    height: '43px',
    width: '80%',

  },
  button: {
    marginTop: '10px',
    height: '43px',
    marginLeft: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '0 !important',
  },
  message: {
    display: 'block',
    fontSize: '14px',
    color: '#666',
  },
  modal: {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
    p: 4,
    outline: 'none !important',
  },
  srOnly: {
    position: 'absolute',
    left: '-10000px',
    top: 'auto',
    width: '1px',
    height: '1px',
    overflow: 'hidden',
  }
}));

export const modal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  p: 4,
};

export const title = {
  color: 'black'
}