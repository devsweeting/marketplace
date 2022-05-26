import { makeStyles } from '@mui/styles';

export const useFaqCtaStyles = makeStyles((theme) => ({
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
}));
