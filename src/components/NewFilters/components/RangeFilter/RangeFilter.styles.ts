import makeStyles from '@mui/styles/makeStyles';

export const useRangeStyles = makeStyles((theme) => ({
  wrapper: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      margin: '0px',
      width: '100%',
    },
  },
  popoverButton: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    color: 'rgba(0, 0, 0, 0.6)',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  open: {
    boxShadow: 'none',
    width: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  MenuTitle: {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.6)',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  MenuBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));
