import { makeStyles } from '@mui/styles';

export const useTestimonialStyles = makeStyles((theme) => ({
  testimonialsWrapper: {
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
  },
  testimonialHeaderWrapper: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '30px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  testimonialsHeader: {
    marginBottom: '15px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '28px',
    },
  },
  testimonialsSubHeader: {
    fontSize: '1.4rem',
    [theme.breakpoints.down('sm')]: {
      width: '85%',
      fontSize: '1rem',
    },
  },
  slider: {
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
  },
  card: {
    width: '33.33%',
    margin: '10px 40px',
    padding: '50px',
    backgroundColor: 'whitesmoke',
    [theme.breakpoints.down('sm')]: {
      width: '90vw',
      margin: '2px 15px',
      padding: '15px',
    },
  },
}));
