import makeStyles from '@mui/styles/makeStyles';

export const useNavbarStyles = makeStyles((theme) => ({
  searchIcon: {
    cursor: 'pointer',
    color: theme.palette.primary.main,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '60px',
    '@media (min-width: 900px)': {
      display: 'none',
    },
  },
}));
