import makeStyles from '@mui/styles/makeStyles';
import { alpha } from '@mui/material/styles';

export const useSearchBoxStyles = makeStyles(
  (theme) => ({
    noBorder: {
      border: 'none',
    },
    searchBoxContainer: {
      width: '100%',
      height: '48px',
      margin: `0 ${theme.spacing(9)}`,
      position: 'relative',
      color: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    // placeholderField: {
    //   '& input:placeholder': {
    //     color: 'green',
    //   },
    // },
    searchIconWrapper: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputBase: {
      color: 'inherit',
      '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
      },
    },
  }),
  { name: 'searchBox' },
);
