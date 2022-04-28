import { makeStyles } from '@mui/styles';

export const useCarouselStyles = makeStyles((theme) => ({
  wrapper: {
    padding: `${theme.spacing(12.5)} 0 ${theme.spacing(14)}`,
    [theme.breakpoints.down('md')]: {
      borderTop: `4px solid ${theme.palette.primary.main}`,
      marginTop: theme.spacing(6),
      padding: `${theme.spacing(6)} 0`,
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  cardWrapper: {
    minWidth: 280,
    marginRight: '46px',
    [theme.breakpoints.down('md')]: {
      minWidth: 'unset',
    },
  },
  title: {
    fontWeight: 700,
    fontSize: '42px',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px',
      textAlign: 'center',
    },
  },
  button: {
    width: 232,
    height: 55,
    fontSize: '16px',
    [theme.breakpoints.down('md')]: {
      width: 295,
      height: 44,
      margin: `${theme.spacing(2)} 0 ${theme.spacing(6)}`,
    },
  },
}));
