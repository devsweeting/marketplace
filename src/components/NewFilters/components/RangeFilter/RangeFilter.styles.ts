import makeStyles from '@mui/styles/makeStyles';
import { lighten } from '@mui/material';

export const useRangeStyles = makeStyles((theme) => ({
  popoverButton: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: lighten(theme.palette.primary.main, 0.9),
    },
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
