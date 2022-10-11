import { styled } from '@mui/material';

export const PageContainer = styled('div')({
  paddingTop: '80px',
  minHeight: '100vh',
  height: '1px',
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const PageLinks = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem 1.5rem',
});
