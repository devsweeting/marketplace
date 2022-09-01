import { makeStyles } from '@mui/styles';

export const useNewFiltersStyles = makeStyles((theme) => ({
  filterBoxes: {
    margin: '0.8px',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '0px',
      width: '100%',
    },
  },
}));
