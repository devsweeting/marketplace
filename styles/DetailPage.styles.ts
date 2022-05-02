import { makeStyles } from '@mui/styles';

export const useDetailPageStyles = makeStyles((theme) => ({
  // absoluteWrapper: {
  //   position: 'relative',
  //   width: '100%',
  //   backgroundColor: theme.palette.accentSecondary.main,
  // },
  fixedImage: {
    position: 'absolute',
    top: 200,
    right: -100,
    transform: 'translateX(50%)',
  },
  leftColumn: {
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundImage: 'url(/images/nftDetail/background.svg)',
    padding: `0 ${theme.spacing(12)}`,
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  paddingOnMobile: {
    [theme.breakpoints.down('md')]: {
      padding: `0 ${theme.spacing(5)}`,
    },
  },
  exploreMoreButton: {
    width: '100%',
    height: '184px',
    borderRadius: theme.spacing(18),
    fontWeight: '800',
    fontSize: '96px',
    lineHeight: '96px',
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down('md')]: {
      fontSize: '39px',
      lineHeight: '39px',
      borderRadius: theme.spacing(2.5),
      justifyContent: 'space-between',
      textAlign: 'left',
    },
  },
  exploreMoreIcon: {
    fontSize: '96px !important',
    [theme.breakpoints.down('md')]: {
      fontSize: '32px !important',
    },
  },

  // wrapper: {
  //   maxWidth: 1440,
  //   margin: '0 auto',
  //   marginTop: '0',
  //   padding: '0 8px',
  // },
  // sideBar: {
  //   '@media (max-width:900px)': {
  //     position: 'fixed',
  //     minHeight: '100vh',
  //     zIndex: 110,
  //     width: '100vw',
  //     margin: 0,
  //     top: 0,
  //     left: 0,
  //     height: '100%',
  //     overflowY: 'auto',
  //   },
  // },
  // hideOnMobile: {
  //   '@media (max-width:900px)': {
  //     display: 'none',
  //   },
  // },
  // hideOnDesktop: {
  //   '@media (min-width:900px)': {
  //     display: 'none',
  //   },
  // },
  // centerOnMobile: {
  //   '@media (max-width:900px)': {
  //     width: '100%',
  //     textAlign: 'center',
  //   },
  // },
}));
