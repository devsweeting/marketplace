import { Grid, styled, Typography } from '@mui/material';
import { Button as CustomButton } from '@/components/Button';

export const Container = styled(Grid)({
  backgroundColor: 'white',
});

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  margin: `${theme.spacing(3)}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: `${theme.spacing(1)}`,
  },
}));

export const Slider = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  overflowX: 'scroll',
  'scroll-padding-right': '1vw',
  'scroll-padding-left': '0.1vw',
  scrollBehavior: 'smooth',
  scrollSnapType: 'x proximity',

  padding: 0,
  [theme.breakpoints.down('md')]: {
    padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
  },
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(0.75)} ${theme.spacing(1)}`,
  },
}));

export const Button = styled(CustomButton)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '40px',
  position: 'absolute',
  top: '-50px',
  zIndex: '50',
  userSelect: 'none',
  borderRadius: '5px',
  width: '45px',
  border: 'none',
  backgroundColor: 'transparent',
  transition: 'all .2s ease-in',
  opacity: '0.65',
  '&:hover': {
    transform: 'scale(1.10)',
    opacity: '1',
    backgroundColor: theme.palette.secondary.main,
  },
  [theme.breakpoints.down('md')]: {
    width: '60px',
    '&:hover': {
      transform: 'scale(1.01)',
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: '45px',
  },
}));
