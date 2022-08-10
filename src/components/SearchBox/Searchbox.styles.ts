import { makeStyles } from '@mui/styles';

export const useSearchboxStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    '& .MuiInputBase-root': {
      // border: '1px solid rgba(255, 255, 255, 0.23)',
      paddingLeft: '10px',
      // borderRadius: '4px',
      height: '56px',
      fontFamily: 'Montserrat',
      color: theme.palette.primary.main,
      fontSize: 'calc(10px + 0.4vw) !important',
      fontWeight: '400 !important',
      lineHeight: '150 !important',
      letterSpacing: '0.15px !important',
      textTransform: 'none',
      '& input:-webkit-autofill::first-line': {
        fontSize: '34px !important',
      },
      '& input:-webkit-autofill::first-line, input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, textarea:-webkit-autofill, textarea:-webkit-autofill:hover, textarea:-webkit-autofill:focus, select:-webkit-autofill, select:-webkit-autofill:hover, select:-webkit-autofill:focus':
        {
          transition: 'background-color 5000s',
          '-webkit-text-fill-color': '#fff !important',
          caretColor: '#fff !important',
        },
    },
  },
}));
