import { FormControl, styled } from '@mui/material';

export const Wrapper = styled(FormControl)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    paddingLeft: '10px',
    height: '56px',
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
}));
