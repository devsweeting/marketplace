import { makeStyles } from '@mui/styles';

export const useHeroStyles = makeStyles(
  (theme) => ({
    wrapper: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      [theme.breakpoints.down('sm')]: {
        minHeight: '50vh',
      },
    },
    title: {
      [theme.breakpoints.down('sm')]: {
        fontSize: '30px',
      },
    },
    searchBox: {
      border: '1px solid black',
      width: '50%',
      m: 10,
      [theme.breakpoints.down('sm')]: {
        width: '70%',
        margin: '40px',
      },
    },
  }),
  { name: 'hero' },
);
