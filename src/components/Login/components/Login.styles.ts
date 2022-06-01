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
      outline: 'none !important',
  },
}));
