import makeStyles from '@mui/styles/makeStyles';

export const useSearchBoxStyles = makeStyles(
  (theme) => ({
    searchBox: {
      width: '40vw',
      maxWidth: '545px',
      height: '54px',
      border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '4px',
      marginLeft: theme.spacing(4.5),
      marginRight: theme.spacing(9),
    },
    noBorder: {
      border: 'none',
    },
  }),
  { name: 'searchBox' },
);
