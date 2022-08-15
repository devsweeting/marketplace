import { makeStyles } from '@mui/styles';

export const useHeaderStyles = makeStyles(
  (theme) => ({
    container: {
      maxWidth: `calc(1440px - ${theme.spacing(1)})`,
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
      padding: `0 15px`,
      boxSizing: 'border-box',
      borderImageSlice: 1,
      color: theme.palette.primary.light,
      '@media (max-width: 900px)': {
        padding: `0 41px`,
      },
      '& .MuiToolbar-root': {
        boxShadow: '0px rgba(0, 0, 0, 0)',
        '@media (min-width: 600px)': {
          paddingRight: 0,
        },
      },
    },
    logoWrapper: {
      position: 'relative',
      width: 134,
      height: 33,
      [theme.breakpoints.down('md')]: {
        width: 97,
        height: 23,
      },
    },
    nftTextWrapper: {
      fontSize: 40,
      textAlign: 'center',
      marginLeft: '5px',
      fontWeight: 900,
      '@media (max-width: 900px)': {
        fontSize: 30,
      },
    },
    anchorWrapper: {
      display: 'flex',
      color: 'black',
      alignItems: 'center',
      textDecoration: 'none',
    },
    vertivalDivider: {
      paddingLeft: '20px',
      '@media (max-width: 900px)': {
        display: 'none',
        marginRight: 'auto',
      },
    },
    searchBoxContainer: {
      width: '100%',
      margin: `0 ${theme.spacing(1)}`,
      '@media (max-width: 1200px)': {
        margin: `0 0 0 ${theme.spacing(3)}`,
      },
      '@media (max-width: 900px)': {
        display: 'none',
      },
    },
  }),
  { name: 'header' },
);
