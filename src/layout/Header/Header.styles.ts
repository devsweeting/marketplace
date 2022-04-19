import { makeStyles } from '@mui/styles';

export const useHeaderStyles = makeStyles(
  (theme) => ({
    headerWrapper: {},
    headerContainer: {
      maxWidth: `calc(1440px - ${theme.spacing(1)})`,
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
      padding: `0`,
      borderBottom: '4px solid',
      boxSizing: 'border-box',
      borderImageSlice: 1,
      color: theme.palette.primary.main,
      '& .MuiToolbar-root': {
        '@media (min-width: 600px)': {
          paddingRight: 0,
        },
      },
    },
    searchBoxContainer: {
      width: '100%',
      margin: `0 ${theme.spacing(9)}`,
    },
  }),
  { name: 'header' },
);
