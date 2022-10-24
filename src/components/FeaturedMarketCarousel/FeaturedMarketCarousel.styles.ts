import { Grid, styled } from '@mui/material';

export const Container = styled(Grid)({
  backgroundColor: 'white',
});

export const TopContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
});

export const ButtonContainer = styled('div')({
  display: 'flex',
  gap: '1rem',
});

export const Slider = styled('div')({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'scroll',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x proximity',
  padding: 0,
});
