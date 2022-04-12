import { makeStyles } from '@mui/styles';

export const useHeaderStyles = makeStyles(
  (theme) => ({
    headerContainer: {
      maxWidth: `calc(1440px - ${theme.spacing(1)})`,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '0 auto',
      width: '100%',
      padding: `0 ${theme.spacing(1)}`,
    },
    searchBoxContainer: {
      width: '100%',
      margin: `0 ${theme.spacing(9)}`,
    },
  }),
  { name: 'header' },
);
