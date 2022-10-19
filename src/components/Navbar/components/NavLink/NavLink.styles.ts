import { lighten, styled, Typography } from '@mui/material';
import type { Theme } from '@mui/material';

export const NavText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }: { theme: Theme; active?: boolean }) => ({
  color: theme.palette.primary.main,
  cursor: 'pointer',
  transition: 'all 250ms ease-in-out',
  '&:hover': {
    color: lighten(theme.palette.primary.main, 0.4),
  },
  ...(active && {
    color: theme.palette.accent.main,
  }),
}));
