import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useTrendingMarketCardStyles = makeStyles((theme) => ({
  marketCardContainer: {
    'scroll-snap-align': 'start',
  },
  card: {
    height: '330px',
    width: '310px',
    flexDirection: 'column',
    display: 'flex',
    flexWrap: 'nowrap',
    cursor: 'pointer',
    transition: 'all .2s ease-in',
    whiteApace: 'nowrap',
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

  active: {
    backgroundColor: lighten(theme.palette.primary.main, 0.9),
    transition: 'background-color 300ms ease-in',
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
    width: '260px',
    height: '220px',
    margin: '0px auto',
    position: 'relative',
  },
  assetImageOutterContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '60%',
    padding: '0px',
    position: 'relative',
  },
}));
