import { makeStyles } from '@mui/styles';

export const useTextfieldStyles = makeStyles(
  () => ({
    root: {
      '& .MuiFormLabel-root.Mui-error': {
        color: '#b04995',
      },
      '& input': {
        color: 'black',
        fontSize: 20,
        fontWeight: 600,
        marginLeft: 20,
      },
      '& .MuiFormLabel-filled + .MuiInputBase-root input': {
        padding: '35px 12px 14px',
      },
      '& .Mui-focused input': {
        padding: '35px 12px 14px',
      },
      '& .MuiFormHelperText-root.Mui-error': {
        color: '#b04995',
        fontFamily: 'Muli',
        fontSize: 12,
      },
    },
  }),
  { name: 'subscribe' },
);
