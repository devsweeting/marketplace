import makeStyles from '@mui/styles/makeStyles';

export const useSortMenuStyles = makeStyles((theme) => ({
  sortMenu: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      margin: '0',
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  MenuButton: {
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  open: {
    backgroundColor: theme.palette.accent.main,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
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
