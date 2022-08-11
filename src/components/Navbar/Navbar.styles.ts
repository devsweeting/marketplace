import makeStyles from '@mui/styles/makeStyles';

export const useNavbarStyles = makeStyles((theme) => ({
  searchIcon: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    display: 'flex',
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
}));
