import { styled, Card as MuiCard } from '@mui/material';
import type { Theme } from '@mui/material';

export const Card = styled(MuiCard, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }: { theme: Theme; active?: boolean }) => ({
  borderRadius: 0,
  borderColor: theme.palette.grey[200],
  height: '330px',
  width: '310px',
  flexDirection: 'column',
  display: 'flex',
  flexWrap: 'nowrap',
  cursor: 'pointer',
  transition: 'all .2s ease-in',
  whiteApace: 'nowrap',
  [theme.breakpoints.down('sm')]: {
    width: '270px',
  },
  ...(active && {
    backgroundColor: theme.palette.grey[100],
  }),
}));

export const ImgWrapper = styled('div')({
  width: '100%',
  height: '100%',
  margin: 'auto',
  position: 'relative',
});

export const TextContainer = styled('div')({
  flex: 1,
  padding: '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
});
