import makeStyles from '@mui/styles/makeStyles';

export const useCheckboxStyles = makeStyles((theme) => ({
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
    backgroundColor: theme.palette.accent.main,
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  MenuTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
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
