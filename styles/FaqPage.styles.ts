import { styled } from '@mui/material';

export const PageContainer = styled('div')(({ theme }) => ({
  marginTop: '80px',
  padding: '124px 0',
  flex: 1,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
    padding: '2rem 0',
  },
}));
