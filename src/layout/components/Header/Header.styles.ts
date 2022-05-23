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
      padding: `0 100px`,
      borderBottom: '4px solid',
      boxSizing: 'border-box',
      borderImageSlice: 1,
      color: theme.palette.primary.main,
      '@media (max-width: 900px)': {
        padding: `0 41px`,
      },
      '& .MuiToolbar-root': {
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
    searchBoxContainer: {
      width: '100%',
      margin: `0 ${theme.spacing(9)}`,
      '@media (max-width: 900px)': {
        display: 'none',
      },
    },
  }),
  { name: 'header' },
);
