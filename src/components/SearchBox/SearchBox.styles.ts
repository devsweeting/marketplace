import makeStyles from '@mui/styles/makeStyles';
import { alpha } from '@mui/material/styles';

export const useSearchBoxStyles = makeStyles(
  (theme) => ({
    searchInput: {
      // color: 'red',
      // '& .MuiOutlinedInput-root': {
      //   ...theme.typography.body1,
      //   backgroundColor: 'red',
      //   borderRadius: 32,
      //   fontWeight: theme.typography.fontWeightMedium,
      //   color: theme.palette.primary.main,
      //   padding: `0 ${theme.spacing(2)}px`,
      //   '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      //     borderColor: theme.palette.primary.main,
      //   },
      // },
      // '& .MuiOutlinedInput-input': {
      //   padding: `10px ${theme.spacing(1)}px`,
      // },
      // '& .MuiOutlinedInput-notchedOutline': {
      //   borderColor: 'red',
      // },
      // '&:hover .MuiOutlinedInput-root:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
      //   border: 'none',
      // },
      // '&:hover .MuiOutlinedInput-root:not(.Mui-focused)': {
      //   backgroundColor: 'red',
      // },
    },
    noBorder: {
      border: 'none',
    },
    searchBoxContainer: {
      width: '100%',
      height: '48px',
      position: 'relative',
      color: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
    },
    searchIconWrapper: {
      padding: theme.spacing(0, 0),
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
