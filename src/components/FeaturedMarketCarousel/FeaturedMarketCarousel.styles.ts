import { makeStyles } from '@mui/styles';
export const useFeaturedMarketCarouselStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: 'white',
  },

  title: {
    fontSize: '24px',

    margin: `${theme.spacing(3)}`,
    [theme.breakpoints.down('md')]: {
      fontSize: '18px',
      marginBottom: `${theme.spacing(1)}`,
    },
  },
  snap: {
    'scroll-snap-type': 'x proximity',
  },
  slider: {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'scroll',
    'scroll-padding-right': '1vw',
    'scroll-padding-left': '0.1vw',
    scrollBehavior: 'smooth',

    padding: `0`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(1)} ${theme.spacing(1)}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(0.75)} ${theme.spacing(1)}`,
    },
  },

  button: {
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
  },
  prev: {
    right: '70px',
  },
  next: {
    right: '10px',
  },
  disabledButton: {
    opacity: '0.05',
    backgroundColor: theme.palette.secondary.main,
    '&:hover': {
      transform: 'scale(1.10)',
      opacity: '0.05',
      backgroundColor: theme.palette.secondary.main,
    },
  },
  viewMore: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    lineHeight: 'normal',
    margin: '10px 40px 5px 0',
    [theme.breakpoints.down('md')]: {
      fontSize: '16px',
      margin: '0',
      padding: '8px 20px 5px 0',
    },
  },
}));
