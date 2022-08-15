import makeStyles from '@mui/styles/makeStyles';

export const useRangeStyles = makeStyles((theme) => ({
  popoverButton: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  open: {
    boxShadow: 'none',
    width: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
