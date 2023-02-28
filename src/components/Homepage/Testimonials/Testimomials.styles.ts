import { Grid, styled } from '@mui/material';

export const Container = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '120px',
  maxWidth: '100%',
  [theme.breakpoints.down('sm')]: {
    marginTop: '20px',
    marginBottom: '10px',
  },
}));

export const TextContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  // gap: '1rem',
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

export const Line = styled('div')(() => ({
  padding: '0px',
  width: '3px',
  height: '96px',
  background: 'linear-gradient(180deg, #FF6C9E 0%, #0028E9 100%)',
  borderRadius: '8px',
  transform: 'rotate(-90deg)',
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
