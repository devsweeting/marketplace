import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useMarketCardStyles = makeStyles((theme) => ({
  marketCardContainer: {
    'scroll-snap-align': 'start',
  },
  card: {
    height: '430px',
    width: '310px',
    flexDirection: 'column',
    display: 'flex',
    flexWrap: 'nowrap',
    margin: '10px 60px 15px 15px',
    cursor: 'pointer',
    transition: 'all .2s ease-in',
    boxShadow: ` 0px 1px 20px 0px ${lighten(theme.palette.primary.main, 0.5)}`,
    whiteApace: 'nowrap',

    '&:hover': {
      transform: 'scale(1.05)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '270px',
      margin: '10px 30px 10px 5px',
    },
  },
  assetTextContainer: {
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    margin: '10px 25px',
    [theme.breakpoints.down('sm')]: { width: '235px', margin: ' 5px 17px' },
  },

  cardTitle: {
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  cardDescription: {
    fontSize: '14px',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  cardSubTitle: {
    fontSize: '14px',
    flexWrap: 'wrap',
    marginRight: '16px',
    [theme.breakpoints.down('md')]: {
      fontSize: '12px',
    },
  },
  assetImageInnerContainer: {
    filter: 'drop-shadow(0 6px 14px #8F959988)',
    width: '140px',
    height: '220px',
    margin: '10px auto',
    position: 'relative',
  },
  assetImageOutterContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '60%',
    padding: '0px',
    background: 'linear-gradient(90deg,#fff 24.48%,#f2f3f4 101.77%)',
    position: 'relative',
  },
}));
