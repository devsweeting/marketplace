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
    color: 'rgba(0, 0, 0, 0.6)',
    [theme.breakpoints.down('sm')]: {
      color: 'rgba(0, 0, 0, 0.6)',
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
  open: {
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
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
