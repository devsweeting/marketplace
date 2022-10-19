import { styled } from '@mui/material';
import type { Theme } from '@mui/material';
import { Check } from '@mui/icons-material';

export const StepIconRoot = styled('div', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }: { theme: Theme; active?: boolean }) => ({
  color: theme.palette.grey['300'],
  ...(active && {
    color: theme.palette.primary.main,
  }),
}));

export const CompleteIcon = styled(Check)(({ theme }) => ({
  color: theme.palette.primary.main,
  zIndex: 1,
  fontSize: 18,
}));

export const IncompleteIcon = styled('div')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
});
