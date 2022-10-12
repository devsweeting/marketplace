import { Box, styled } from '@mui/material';

export const PageContainer = styled(Box)({
  paddingTop: '80px',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const TextContainer = styled('div')({
  display: 'flex',
  alignItems: 'start',
  flexDirection: 'column',
  maxWidth: '70ch',
  margin: '2rem',
});
