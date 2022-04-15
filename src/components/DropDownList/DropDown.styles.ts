import { makeStyles } from '@mui/styles';

export const useDropdownStyle = makeStyles((theme) => ({
  container: {
    width: 280,
    marginTop: theme.spacing(3),
    background: theme.palette.primary.main,
    borderRadius: theme.shape.borderRadius,
    '& .MuiSvgIcon-root': {
      color: theme.palette.secondary.main,
    },
    // '& .MuiOutlinedInput-input': {
    //   color: '#fff',
    // },

    '& .MuiInputLabel-root': {
      color: theme.palette.secondary.main,
      fontFamily: 'League Gothic',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: 24,
      lineHeight: '40px',
      marginTop: '0',
    },
    '& .MuiFormLabel-outlined': {
      marginTop: '20px',
    },
    '& .Mui-focused': {
      fontSize: '14px',
    },

    // '& .MuiSelect-select': {
    //   border: '1px solid green',
    //   paddingTop: '0 !important',
    // },
  },
}));
