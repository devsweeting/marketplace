import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useAssetCardStyles = makeStyles((theme) => ({
  card: {
    cursor: 'pointer',
    borderRadius: '0px',
    [theme.breakpoints.down('md')]: {
      maxWidth: '400px',
      borderRadius: '4px',
      margin: '10px 10px',
    },
  },
  cardBody: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap',
    },
  },
  active: {
    backgroundColor: lighten(theme.palette.primary.main, 0.9),
    transition: 'background-color 300ms ease-in',
  },
  ImageWrapper: {
    maxWidth: '120px',
    backgroundColor: lighten(theme.palette.primary.main, 0.8),
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
    position: 'relative',
    top: '10px',
    right: '10px',
  },
  star: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {},
  },
}));
