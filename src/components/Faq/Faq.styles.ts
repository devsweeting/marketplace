import { styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  maxWidth: '1200px',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '3rem',
  [theme.breakpoints.down('sm')]: {
    padding: '1rem',
    gap: '1rem',
  },
}));

export const TextContainer = styled('div')({});

export const FaqContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    marginTop: '2rem',
  },
}));

export const FaqSection = styled('div')({
  marginBottom: '3rem',
});
