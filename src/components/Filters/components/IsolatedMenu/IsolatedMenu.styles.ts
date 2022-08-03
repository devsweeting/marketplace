import makeStyles from '@mui/styles/makeStyles';

export const useIsolatedMenuStyles = makeStyles((theme) => ({
  MenuButton: {
    backgroundColor: theme.palette.accent.main,
  },
  MenuTitle: {
    fontSize: '0.85rem',
    fontWeight: '600',
  },
  MenuBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
}));
