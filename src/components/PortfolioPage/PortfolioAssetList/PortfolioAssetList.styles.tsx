import { Box, styled } from '@mui/material';
export const Container = styled(Box)(({ theme }) => ({
  display: 'block',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    margin: '0 auto',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '600px',
  },
}));
