import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useSelectInput = makeStyles(
  (theme) => ({
    wrapper: {
      position: 'sticky',
      top: '0',
      height: '50px',
      marginBottom: 0,
      justifyContent: 'center',
    },
    fixedWrapper: {
      background: '#2c2c2c',
      color: theme.palette.secondary.main,
      width: '100vw',
      justifyContent: 'flex-start',
    },
    fixedSelectLeftPart: {
      width: '80px',
      padding: `0 ${theme.spacing(2)}`,
      border: 'none',
      boxSizing: 'border-box',
      borderRight: `2px solid ${theme.palette.customGray.dark}`,
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
    selectIcon: {},
    fixedSelectRightPart: {
      flex: 1,
      '& .MuiOutlinedInput-root': {
        marginTop: 0,
        textAlign: 'left',
        flex: 1,
        padding: `0 ${theme.spacing(2)}`,
        border: 'none',
      },
      '& .MuiFormControl-root': {
        width: '100%',
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        padding: 0,
      },
      '& .MuiSelect-select': {
        padding: 0,
        color: theme.palette.secondary.main,
        fontFamily: 'Montserrat',
        fontWeight: 700,
        fontSize: '16px',
        letter: '0.25',
        textTransform: 'uppercase',
      },
    },
    fixedSelectIcon: {
      color: theme.palette.accent.main,
      marginRight: theme.spacing(2),
    },
  }),
  { name: 'selectInput' },
);
