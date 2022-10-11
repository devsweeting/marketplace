import { styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.primary.main,
  padding: '2rem',
  gap: '2rem',
}));

export const TopContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  margin: '1rem 0',
});

export const Img = styled('img')({});

export const SocialLinks = styled('div')({
  display: 'flex',
  gap: '2rem',
});

export const BottomContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '1rem',
});

export const PageLinks = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem 1.5rem',
});
