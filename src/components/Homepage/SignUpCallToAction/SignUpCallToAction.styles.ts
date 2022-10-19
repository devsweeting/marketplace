import { Box, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: '100%',
  height: '650px',
  backgroundColor: theme.palette.grey['50'],
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    height: '125vw',
  },
}));

export const Square = styled(Box)({
  backgroundColor: 'white',
  height: '265px',
  width: '175px',
  border: '4px solid grey',
  borderRadius: '8px',
  opacity: '0.35',
  position: 'absolute' as const,
});
