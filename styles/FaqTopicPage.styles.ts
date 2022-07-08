import { makeStyles } from '@mui/styles';
import { lighten } from '@mui/material';

export const useFaqPageStyles = makeStyles((theme) => ({
  wrapper: {
    maxWidth: 1440,
    margin: '0 auto',
    marginTop: '0',
    padding: '0 100px',
    [theme.breakpoints.down('md')]: {
      padding: '0',
    },
  },

  showOnMobile: {
    display: 'none',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  showOnDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
  leftColumn: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: theme.spacing(7),
    textAlign: 'center',
  },
  menuTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 34,
    letter: 0.25,
    paddingBottom: theme.spacing(3),
  },
  topicLinkWrapper: {
    cursor: 'pointer',
    width: '232px',
    height: '48px',
    borderRadius: '33px',
    marginBottom: theme.spacing(2),
  },
  topicLink: {
    textTransform: 'uppercase',
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: '16px',
    lineHeight: '48px',
  },
  active: {
    border: `2px solid ${lighten(theme.palette.primary.main, 0.5)}`,
  },
  rightColumn: {
    paddingTop: theme.spacing(8),
    paddingRight: theme.spacing(12.5),
    margin: 0,
    [theme.breakpoints.down('md')]: {
      padding: `0 ${theme.spacing(5)}`,
    },
  },
  topicTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 800,
    fontSize: '48px',
    lineHeight: '57px',
    letter: '-0.5px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginTop: theme.spacing(9),
    },
  },
  accordionWrapper: {
    marginTop: theme.spacing(6),
  },
  ctaWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      textAlign: 'center',
    },
  },
  ctaTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    lineHeight: '150%',
    letter: '0.15px',
  },
  ctaDescription: {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '150%',
    letter: '0.15px',
  },
  blackContainer: {
    background: '#2c2c2c',
    padding: `${theme.spacing(7)} ${theme.spacing(12)}`,
    maxWidth: '1440px',
    margin: `${theme.spacing(8)} auto 0`,
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(7)} ${theme.spacing(5)}`,
    },
  },
  sectionHeading: {
    fontFamily: 'Montserrat',
    fontWeight: 800,
    fontSize: '48px',
    lineHeight: '57px',
    letter: '-0.5px',
    marginTop: theme.spacing(0),
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginTop: theme.spacing(9),
    },
  },
  heading: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    fontSize: 34,
    letter: 0.25,
    lineHeight: '123%',
    color: theme.palette.secondary.main,
  },
  accordionBox: {
    borderRadius: theme.spacing(0.5),
    overflow: 'hidden',
  },
}));