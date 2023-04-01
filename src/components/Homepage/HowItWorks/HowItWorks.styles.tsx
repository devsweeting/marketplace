import { styled } from '@mui/material';

export const HeroBox = styled('div')(({ theme }) => ({
  margin: '10px 100px',
  [theme.breakpoints.down('sm')]: {
    margin: '0 20px',
    padding: '30px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
