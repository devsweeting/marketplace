import { styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  borderTop: `1px solid ${theme.palette.divider}`,
}));
