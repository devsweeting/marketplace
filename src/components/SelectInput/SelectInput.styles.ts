import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useSelectInput = makeStyles(
  (theme) => ({
    wrapper: {
      position: 'sticky',
      top: '0',
      height: '50px',
      marginBottom: 0,
    },
    selectLeftPart: {
      height: '46px',
      width: '80px',
      border: `2px solid ${lighten(theme.palette.primary.main, 0.5)}`,
      borderRadius: '50px 0 0 50px',
      borderRight: 'none',
      boxSizing: 'border-box',
    },
    selectLeftText: {
      fontFamily: 'Montserrat',
      fontWeight: 700,
      fontSize: '16px',
      letter: '0.25',
      lineHeight: '46px',
    },
    selectRightPart: {
      '& .MuiOutlinedInput-root': {
        width: '200px',
        // border: '1px solid green',
        textAlign: 'left',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        boxSizing: 'border-box',
        marginTop: '3.5px',
        height: '50px',
        width: '200px',
        border: `2px solid ${lighten(theme.palette.primary.main, 0.5)}`,
        borderRadius: '0  50px 50px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      '& .MuiSelect-select': {
        color: theme.palette.primary.main,
        fontFamily: 'Montserrat',
        fontWeight: 700,
        fontSize: '16px',
        letter: '0.25',
      },
    },
  }),
  { name: 'selectInput' },
);
