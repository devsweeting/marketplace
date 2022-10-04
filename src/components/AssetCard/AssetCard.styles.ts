import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useAssetCardStyles = makeStyles((theme) => ({
  card: {
    cursor: 'pointer',
    borderRadius: '0px',
    borderBottom: '1px solid ' + lighten(theme.palette.primary.main, 0.85),
    [theme.breakpoints.down('md')]: {
      maxWidth: '400px',
      borderRadius: '4px',
      margin: '10px 10px',
    },
  },
  cardBody: {
    display: 'flex',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  active: {
    backgroundColor: lighten(theme.palette.primary.main, 0.95),
    transition: 'background-color 300ms ease-in',
  },
  ImageWrapper: {
    maxWidth: '120px',
    backgroundColor: lighten(theme.palette.primary.main, 0.95),
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      margin: 'auto',
    },
  },
  cardImage: {
    textAlign: 'center',
    lineHeight: '60px',
    maxWidth: '100px',
  },
  cardDetailsWrapper: {
    display: 'flex',
    width: '100%',
  },
  essanceInfo: {
    padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
    width: '100%',
  },
  cardPriceWrapper: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    padding: theme.spacing(3),
    [theme.breakpoints.down('md')]: {
      marginLeft: '0',
      padding: `${theme.spacing(2)} 0`,
    },
  },
  cardPriceSection: {
    display: 'flex',
    alignSelf: 'end',
    marginLeft: 'auto',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column-reverse',
    },
  },
  CardPriceItem: {
    minWidth: '100px',
    [theme.breakpoints.down('md')]: {
      minWidth: '0px',
    },
  },
  price: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
  },
  essanceTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '18px',
    overflowWrap: 'break-word',
  },
  starWrapper: {
    position: 'absolute',
    zIndex: 1,
    top: '10px',
    right: '10px',
    [theme.breakpoints.down('sm')]: {
      right: '0px',
    },
  },
  star: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  starWatchlisted: {
    color: theme.palette.primary.main,
  },
  soldOutWrapper: {
    position: 'absolute',
    zIndex: 1,
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(-20deg)',
    [theme.breakpoints.down('md')]: {
      top: '80%',
    },
  },
  soldOutText: {
    zIndex: 1,
    padding: '5px',
    fontSize: '3rem',
    borderStyle: 'dashed',
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
    fontWeight: 700,
    [theme.breakpoints.down(1240)]: {
      fontSize: '3rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '2rem',
      top: '450px',
    },
  },
}));
