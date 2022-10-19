import { styled } from '@mui/material';

export const Wrapper = styled('div')(({ theme }) => ({
  width: '100%',
  minWidth: '100%',
  height: '300px',
  backgroundColor: theme.palette.grey['50'],
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'relative',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    height: '90vw',
    padding: '0 10px',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
}));

export const InputContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  [theme.breakpoints.down('sm')]: {
    margin: '15px auto 20% auto',
    width: '100%',
    flexDirection: 'column',
  },
}));
