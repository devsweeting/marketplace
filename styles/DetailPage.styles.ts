import { makeStyles } from '@mui/styles';

export const useDetailPageStyles = makeStyles(({ theme }) => ({
  // absoluteWrapper: {
  //   position: 'relative',
  //   width: '100%',
  //   // backgroundColor: theme.palette.accentSecondary.main,
  // },
  fixedImage: {
    position: 'absolute',
    top: 200,
    right: -100,
    transform: 'translateX(50%)',
  },
  stickyItem: {},
  leftColumn: {
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '30%',
    backgroundImage: 'url(/images/list/gallery-background.svg)',
    // padding: `0 100px`,
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
