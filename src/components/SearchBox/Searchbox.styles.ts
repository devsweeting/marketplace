import { makeStyles } from '@mui/styles';

export const useSearchboxStyles = makeStyles(({ theme }) => ({
  wrapper: {
    width: '100%',
    '& .MuiInputBase-root': {
      border: '1px solid rgba(255, 255, 255, 0.23)',
      paddingLeft: '10px',
      borderRadius: '4px !important',
      height: '56px',
      fontFamily: 'Montserrat',
      color: '#000 !important',
      fontSize: 'calc(10px + 0.4vw) !important',
      fontWeight: '400 !important',
      lineHeight: '150 !important',
      letterSpacing: '0.15px !important',
      textTransform: 'none',
    },
  },
}));
