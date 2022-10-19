import { styled, Typography } from '@mui/material';

export const Container = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem 0.5rem',
});

export const Attribute = styled(Typography)({
  fontWeight: 500,
});
