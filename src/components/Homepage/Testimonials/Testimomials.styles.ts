import { Grid, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '120px',
  marginBottom: '100px',
  maxWidth: '100vw',
  [theme.breakpoints.down('sm')]: {
    marginTop: '20px',
    marginBottom: '10px',
  },
}));

export const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '30px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
});

export const Slider = styled(Grid)(({ theme }) => ({
  display: 'flex',
  overflowX: 'hidden',
  [theme.breakpoints.down('sm')]: {
    padding: `${theme.spacing(0)}`,
    overflowX: 'scroll',
    'scroll-padding-right': '1vw',
    'scroll-padding-left': '0.1vw',
    scrollBehavior: 'smooth',
    'scroll-snap-type': 'x proximity',
  },
}));

export const CardContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    flexWrap: 'nowrap',
  },
}));

export const Card = styled('div')(({ theme }) => ({
  width: '30%',
  margin: '10px 20px',
  padding: '50px',
  backgroundColor: theme.palette.grey['50'],
  borderRadius: 0,
  boxShadow: 'none',
  [theme.breakpoints.down('md')]: {
    margin: '10px 5px',
    padding: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    width: '90vw',
    margin: '2px 15px',
    padding: '15px',
  },
}));