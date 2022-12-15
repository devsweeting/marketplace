import { styled } from '@mui/material';

export const HeroBox = styled('div')(({ theme }) => ({
  margin: '0 100px',
  [theme.breakpoints.down('sm')]: {
    margin: '0 20px',
    padding: '30px 0',
  },
}));
