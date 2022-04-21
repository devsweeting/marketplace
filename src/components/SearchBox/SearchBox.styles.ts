import makeStyles from '@mui/styles/makeStyles';
import { alpha } from '@mui/material/styles';

export const useSearchBoxStyles = makeStyles(
  (theme) => ({
    noBorder: {
      border: 'none',
    },
    searchBoxContainer: {
      width: '40vw',
      maxWidth: '545px',
      marginLeft: theme.spacing(4.5),
      marginRight: theme.spacing(9),

      position: 'relative',
      border: `2px solid ${theme.palette.primary.main}`,
      color: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.black, 0.05),
      },
      // marginRight: theme.spacing(2),
      // marginLeft: 0,
      // width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(3),
      //   width: 'auto',
      // },
    },
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
